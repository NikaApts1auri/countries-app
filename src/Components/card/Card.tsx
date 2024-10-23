import React from 'react';
import CardContent from './cardContent/CardContent';
import CardFooter from './cardFooter/CardFooter';
import CardHeader from './cardHeader/CardHeader';
import { useNavigate } from 'react-router-dom';

interface CountryCardProps {
  nameEn: string; 
  nameKa: string; 
  capitalEn: string; 
  capitalKa: string; 
  population: string; 
  id: string; 
  voteCount: string; 
  onVote: (id: string) => void; 
  onDelete: (id: string) => void; 
  onUndo: (id: string) => void; 
  isDeleted: boolean; 
  image: string | null; 
  lang: string; 
}

const CountryCard: React.FC<CountryCardProps> = ({ 
  nameEn, 
  nameKa, 
  capitalEn, 
  capitalKa, 
  population, 
  id, 
  voteCount, 
  onVote, 
  onDelete, 
  onUndo, 
  isDeleted,
  image,
  lang 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isDeleted) {
      navigate(`cards/CardPage/${id}`); 
    }
  };

  const handleVoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isDeleted) {
      onVote(id); 
    }
  };

  const displayName = lang === 'ka' ? nameKa : nameEn;
  const displayCapital = lang === 'ka' ? capitalKa : capitalEn;

  return (
    <div onClick={handleCardClick} className={`country-card ${isDeleted ? 'deleted' : ''}`}>
      <CardHeader image={image} />
      <CardContent 
        name={displayName} 
        capital={displayCapital} 
        population={population} 
        voteCount={voteCount} 
        onVote={handleVoteClick} 
        id={id} 
        onDeleteClick={() => onDelete(id)} 
        onUndoClick={() => onUndo(id)} 
        isDeleted={isDeleted}
      />
      <CardFooter 
        onDelete={() => onDelete(id)}
        onUndo={() => onUndo(id)}
        isDeleted={isDeleted} id={id}      />
    </div>
  );
};

export default CountryCard;
