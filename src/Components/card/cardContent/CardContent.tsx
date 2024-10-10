import React from 'react';
import './CardContent.css';


interface CardContentProps {
  name: string;
  capital: string;
  population: string;
  voteCount: string; 
  onVote: () => void; 
}

const CardContent: React.FC<CardContentProps> = ({ name, capital, population, voteCount, onVote }) => {
  return (
    <div className="card-content">
      <h2 className="country-name">{name}</h2>
      <p className="country-capital">Capital: {capital}</p>
      <p className="country-population">Population: {population}</p>
      <nav className="vote-container">
        <span className="vote-count">{voteCount}</span>
        <img 
          src="./likeIcon.webp" 
          alt="Like Icon" 
          className="like-icon" 
          onClick={onVote} 
        />
      </nav>
    </div>
  );
};

export default CardContent;
