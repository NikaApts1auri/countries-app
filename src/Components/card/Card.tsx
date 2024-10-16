import React, { useState } from 'react';
import CardContent from './cardContent/CardContent';
import CardFooter from './cardFooter/CardFooter';
import CardHeader from './cardHeader/CardHeader';
import { useNavigate } from 'react-router-dom';

interface CountryCardProps {
  name: string;
  capital: string;
  population: string;
  id: string;
  voteCount: string; 
  onVote: (id: string) => void;
  onDelete: (id: string) => void; 
  onUndo: (id: string) => void; 
}

const CountryCard: React.FC<CountryCardProps> = ({ name, capital, population, id, voteCount, onVote, onDelete, onUndo }) => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false); 

  const handleCardDelete = (id: string) => {
    onDelete(id); 
    setIsDeleted(true);
    console.log("clicking delete btn for ID:", id); 
  };

  const handleUndo = () => {
    onUndo(id);
    setIsDeleted(false); 
    console.log("undoing delete for ID:", id);
  };

  const handleCardClick = () => {
    console.log(`Navigating to /CardPage/${id}`); 
    navigate(`/CardPage/${id}`); 
  };

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`country-card ${isDeleted ? 'deleted' : ''}`} 
    >
      <nav>
        <CardHeader />
      </nav>

      <main>
        <CardContent 
          name={name} 
          capital={capital} 
          population={population} 
          voteCount={voteCount} 
          onVote={handleVoteClick} 
        />
      </main>

      <footer>
        <CardFooter 
          id={id} 
          onDelete={handleCardDelete} 
          isDeleted={isDeleted} 
          onUndo={handleUndo} 
        />
      </footer>
    </div>
  );
};

export default CountryCard;
