import React from "react";
import CardContent from "./cardContent/CardContent";
import CardFooter from "./cardFooter/CardFooter";
import CardHeader from "./cardHeader/CardHeader";
import { useNavigate } from "react-router-dom";
import { ICountryCard } from "../cardPage/AboutCard";

interface CountryCardProps extends ICountryCard {
  voteCount: string;
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onUndo: (id: string) => void;
  isDeleted: boolean;
  image: string | null;
  lang: "en" | "ka";
  capital: string;
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
  lang,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isDeleted) {
      navigate(`cards/CardPage/${id}`);
    }
  };

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
        onDelete={() => onDelete(id)}
        onUndo={() => onUndo(id)}
        isDeleted={isDeleted}
        id={id}
      />
    </div>
  );
};

export default CountryCard;
