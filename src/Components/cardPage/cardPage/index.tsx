import { useParams } from "react-router-dom";
import { AboutCard } from "../AboutCard"; 

export default function CardPage() {
  const { id, lang } = useParams<{ id: string; lang: string }>(); 
  const cardInfo = AboutCard.find((card) => card.id === id); 

  if (!cardInfo) {
    return <div>Card not found</div>; 
  }

  
  const name = lang === 'ka' ? cardInfo.nameKa : cardInfo.nameEn;
  const capital = lang === 'ka' ? cardInfo.capitalKa : cardInfo.capitalEn;

  return (
    <div className="card-page">
      <h2>{name}</h2>
      <p><strong>დედაქალაქი:</strong> {capital}</p>
      <p><strong>მოსახლეობა:</strong> {cardInfo.population}</p>
      {cardInfo.info && (
        <a href={cardInfo.info} target="_blank" rel="noopener noreferrer">მეტი ინფორმაცია</a>
      )}
    </div>
  );
}
