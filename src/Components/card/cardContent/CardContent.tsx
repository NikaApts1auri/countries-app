import { useState } from "react";
import axios from "axios";

interface CardContentProps {
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  voteCount: string;
  onVote: (id: number) => void;
  lang: "en" | "ka";
  id: number;
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
  const [editedNameKa, setEditedNameKa] = useState(nameKa);
  const [editedCapital, setEditedCapital] = useState(capitalEn);
  const [editedCapitalKa, setEditedCapitalKa] = useState(capitalKa);
  const [editedPopulation, setEditedPopulation] = useState(population);
  const [isLoading, setIsLoading] = useState(false);

  const displayName = lang === "ka" ? nameKa : nameEn;
  const displayCapital = lang === "ka" ? capitalKa : capitalEn;

  const handleVoteClick = (
    event: React.MouseEvent<HTMLImageElement>,
    id: number,
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
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:3000/countries/${id}`,
        {
          nameEn: editedName,
          nameKa: editedNameKa,
          capitalEn: editedCapital,
          capitalKa: editedCapitalKa,
          population: editedPopulation,
        },
      );
      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating card:",
          error.response?.data || error.message,
        );
      } else {
        console.error("Unexpected error:", error);
      }
      alert("შეცდომა ქარდის განახლებისას");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="card-content" onClick={handleCardClick}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            disabled={isDeleted}
            required
          />
          <input
            type="text"
            value={editedNameKa}
            onChange={(e) => setEditedNameKa(e.target.value)}
            disabled={isDeleted}
            required
          />
          <input
            type="text"
            value={editedCapital}
            onChange={(e) => setEditedCapital(e.target.value)}
            disabled={isDeleted}
            required
          />
          <input
            type="text"
            value={editedCapitalKa}
            onChange={(e) => setEditedCapitalKa(e.target.value)}
            disabled={isDeleted}
            required
          />
          <input
            type="number" // Change to number
            value={editedPopulation}
            onChange={(e) => setEditedPopulation(e.target.value)}
            disabled={isDeleted}
            required
          />
          <button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "შენახვა"}
          </button>
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
                width: "30px",
                height: "30px",
                cursor: isDeleted ? "not-allowed" : "pointer",
                opacity: isDeleted ? 0.5 : 1,
              }}
            />
            <button onClick={handleEditClick} disabled={isDeleted || isLoading}>
              Edit
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default CardContent;
