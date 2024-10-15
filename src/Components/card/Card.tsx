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
  onDelete: (id: string) => void; // აქ დაამატე onDelete prop
}

const CountryCard: React.FC<CountryCardProps> = ({ name, capital, population, id, voteCount, onVote, onDelete }) => {
  const navigate = useNavigate();

  // Handle card deletion
  const handleCardDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onDelete(id); // გამოძახება წაშლის ფუნქციის
    console.log("clicking delete btn for ID:", id); 
  };

  // Navigation on card click
  const handleCardClick = () => {
    console.log(`Navigating to /CardPage/${id}`); 
    navigate(`/CardPage/${id}`); 
  };

  // Handle vote click, stop event propagation
  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ავცილდეთ card-ის წკაპის გავრცელებას
    onVote(id);
  };

  return (
    <div onClick={handleCardClick} style={{ cursor: 'pointer' }} className="country-card">
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
        {/* წაშლის ფუნქციის გადაცემა */}
        <CardFooter id={id} onDelete={handleCardDelete} />
      </footer>
    </div>
  );
};

export default CountryCard;
