import React, { useState } from "react";
import axios from "axios";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(nameEn);
  const [editedCapital, setEditedCapital] = useState(capitalEn);
  const [editedPopulation, setEditedPopulation] = useState(population);

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

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:3000/countries/${id}`, {
        nameEn: editedName,
        nameKa: editedName,
        capitalEn: editedCapital,
        capitalKa: editedCapital,
        population: editedPopulation,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating card:", error);
      alert("შეცდომა ქარდის განახლებისას");
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stop propagation to prevent routing
  };

  return (
    <div className="card-content" onClick={handleCardClick}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedCapital}
            onChange={(e) => setEditedCapital(e.target.value)}
          />
          <input
            type="text"
            value={editedPopulation}
            onChange={(e) => setEditedPopulation(e.target.value)}
          />
          <button onClick={handleSave}>შენახვა</button>
          <button onClick={() => setIsEditing(false)}>გაუქმება</button>
        </div>
      ) : (
        <>
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
              style={{
                cursor: isDeleted ? "not-allowed" : "pointer",
                opacity: isDeleted ? 0.5 : 1,
              }}
            />
            <button onClick={handleEditClick} disabled={isDeleted}>
              Edit
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default CardContent;
