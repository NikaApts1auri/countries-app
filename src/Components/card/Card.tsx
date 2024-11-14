import React from "react";
import CardContent from "./cardContent/CardContent";
import CardFooter from "./cardFooter/CardFooter";
import CardHeader from "./cardHeader/CardHeader";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  id: number;
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  voteCount: string;
  onVote: (id: number) => void;
  onDelete: (id: number) => void;
  onUndo?: (id: number) => void;
  isDeleted: boolean;
  image: string | null;
  lang: "en" | "ka";
  capital: string;
}

const CountryCard: React.FC<CountryCardProps> = ({
  id,
  nameEn,
  nameKa,
  capitalEn,
  capitalKa,
  population,
  voteCount,
  onVote,
  onDelete,
  isDeleted,
  image,
  lang,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isDeleted) {
      navigate(`cards/CardPage/${id}`);
    }
  };

  function onUndo(p0: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      onClick={handleCardClick}
      className={`country-card ${isDeleted ? "deleted" : ""}`}
    >
      <CardHeader image={image} />
      <CardContent
        nameEn={nameEn}
        nameKa={nameKa}
        capitalEn={capitalEn}
        capitalKa={capitalKa}
        population={population}
        voteCount={voteCount}
        onVote={onVote}
        lang={lang}
        id={id}
        isDeleted={isDeleted}
      />

      <CardFooter
        onDelete={() => onDelete(+id)}
        onUndo={() => onUndo(+id)}
        isDeleted={isDeleted}
        id={id.toString()}
      />
    </div>
  );
};

export default CountryCard;
