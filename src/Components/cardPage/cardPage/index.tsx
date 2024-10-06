import { useParams } from "react-router-dom";
import { AboutCard } from "../AboutCard"; 

export default function CardPage() {
  const { id } = useParams<{ id: string }>(); 
  const cardInfo = AboutCard.find((card) => card.id === id); 

  if (!cardInfo) {
    return <div>Card not found</div>; 
  }

  return (
    <div className="card-page">
      <h2>{cardInfo.name}</h2>
      <p><strong>Capital:</strong> {cardInfo.capital}</p>
      <p><strong>Population:</strong> {cardInfo.population}</p>
      <a href={cardInfo.info} target="_blank" rel="noopener noreferrer">Learn more</a>
    </div>
  );
}
