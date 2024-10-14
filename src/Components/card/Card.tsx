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
  voteCount: string; // Ensure this is part of the props
  onVote: (id: string) => void; // Add onVote prop
}

const CountryCard: React.FC<CountryCardProps> = ({ name, capital, population, id, voteCount, onVote }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(`Navigating to /CardPage/${id}`); 
    navigate(`/CardPage/${id}`); 
  };

  return (
    <div style={{ cursor: 'pointer' }} className="country-card">
      <nav onClick={handleCardClick}>
        <CardHeader />
      </nav>

      <main>
        <CardContent 
          name={name} 
          capital={capital} 
          population={population} 
          voteCount={voteCount} 
          onVote={() => onVote(id)} 
        />
      </main>
      <footer>
        <CardFooter id={''} onDelete={function (id: string): void {
          console.log(id)
          throw new Error('Function not implemented.');
        } } />
      </footer>
    </div>
  );
};

export default CountryCard;
