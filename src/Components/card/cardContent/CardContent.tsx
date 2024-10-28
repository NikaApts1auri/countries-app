import React from 'react';
import './CardContent.css';

interface CardContentProps {
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  voteCount: string;
  onVote: () => void;
  lang: 'en' | 'ka';
}

const CardContent: React.FC<CardContentProps> = ({
  nameEn,
  nameKa,
  capitalEn,
  capitalKa,
  population,
  voteCount,
  onVote,
  lang
}) => {
  const displayName = lang === 'ka' ? nameKa : nameEn;
  const displayCapital = lang === 'ka' ? capitalKa : capitalEn;

  return (
    <div className="card-content">
      <h2 className="country-name">{displayName}</h2>
      <p className="country-capital">Capital: {displayCapital}</p>
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
