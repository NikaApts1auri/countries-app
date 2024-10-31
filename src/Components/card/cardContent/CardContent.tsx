import React from "react";
import "./CardContent.css";

interface CardContentProps {
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  voteCount: string;
  onVote: (id: string) => void;
  lang: "en" | "ka";
  id: string;
  isDeleted: boolean; 
}

const CardContent: React.FC<CardContentProps> = ({
  nameEn,
  nameKa,
  capitalEn,
  capitalKa,
  population,
  voteCount,
  onVote,
  lang,
  id,
  isDeleted, 
}) => {
  const displayName = lang === "ka" ? nameKa : nameEn;
  const displayCapital = lang === "ka" ? capitalKa : capitalEn;

  const handleVoteClick = (
    event: React.MouseEvent<HTMLImageElement>,
    id: string,
  ) => {
    event.stopPropagation();
    if (!isDeleted) { 
      onVote(id);
    } else {
      alert("ქარდი წაშლილია, ხმა ვერ მიცემთ!");
    }
  };

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
          onClick={(e) => handleVoteClick(e, id)}
          style={{ cursor: isDeleted ? "not-allowed" : "pointer", opacity: isDeleted ? 0.5 : 1 }} // ეფექტის დამატება
        />
      </nav>
    </div>
  );
};

export default CardContent;
