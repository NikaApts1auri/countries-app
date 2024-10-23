import React from 'react';
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
  isDeleted: boolean;
  image: string | null; 
}

const CountryCard: React.FC<CountryCardProps> = ({ 
  name, 
  capital, 
  population, 
  id, 
  voteCount, 
  onVote, 
  onDelete, 
  onUndo, 
  isDeleted, 
  image // დაამატეთ ეს ველი
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isDeleted) {
      console.log(`Navigating to /CardPage/${id}`); 
      navigate(`cards/CardPage/${id}`); 
    }
  };

  const handleCardDelete = () => {
    onDelete(id); 
    console.log("clicking delete btn for ID:", id); 
  };

  const handleUndo = () => {
    onUndo(id);
    console.log("undoing delete for ID:", id);
  };

  const handleVoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isDeleted) {
      onVote(id); 
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`country-card ${isDeleted ? 'deleted' : ''}`} 
    >
      <nav>
        <CardHeader image={image} /> {/* აქ გადავცემთ image */}
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
