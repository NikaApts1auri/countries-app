import { useParams } from "react-router-dom";
import { AboutCard } from "../AboutCard"; // Import your data source

export default function CardPage() {
  const { id } = useParams(); // Retrieve the `id` from the URL
  console.log(id)

  const cardInfo = AboutCard.find((card) => card.id === id); // Use strict equality

  if (!cardInfo) {
    return <div>Card not found</div>; // Handle case where the card is not found
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
