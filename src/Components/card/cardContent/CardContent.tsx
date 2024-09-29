// CardContent.tsx
import React from 'react';

interface CardContentProps {
  name: string;
  capital: string;
  population: string;
}

const CardContent: React.FC<CardContentProps> = ({ name, capital, population }) => {
  return (
    <div className="card-content">
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
    </div>
  );
};

export default CardContent;
