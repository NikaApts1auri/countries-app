import React from "react";

interface CardContentProps {
  name: string;
  capital: string;
  population: string;
  voteCount: string;
  onVote: () => void;
}

const CardContent: React.FC<CardContentProps> = ({
  name,
  capital,
  population,
  voteCount,
  onVote,
}) => {
  return (
    <div className="card-content">
      <h3>{name}</h3>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Votes: {voteCount}</p>
      <button onClick={onVote}>Vote</button>
    </div>
  );
};

export default CardContent;
