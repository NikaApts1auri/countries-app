import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface CardInfo {
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  info?: string;
}

export default function CardPage() {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null); // უფრო კონკრეტული ტიპი
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Requested id:", id);
    const fetchCardInfo = async () => {
      try {
        const response = await axios.get<CardInfo>(
          `http://localhost:3000/countries/${id}`,
        );
        setCardInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card info:", error);
        setLoading(false);
      }
    };

    fetchCardInfo();
  }, [id]);

  if (loading) {
    return <div>მონაცემების მიღება...</div>;
  }

  if (!cardInfo) {
    return <div>ქარდი ვერ მოიძებნა</div>;
  }

  const name = lang === "ka" ? cardInfo.nameKa : cardInfo.nameEn;
  const capital = lang === "ka" ? cardInfo.capitalKa : cardInfo.capitalEn;

  return (
    <div className="card-page">
      <h2>{name}</h2>
      <p>
        <strong>დედაქალაქი:</strong> {capital}
      </p>
      <p>
        <strong>მოსახლეობა:</strong> {cardInfo.population}
      </p>
      {cardInfo.info && (
        <a href={cardInfo.info} target="_blank" rel="noopener noreferrer">
          მეტი ინფორმაცია
        </a>
      )}
    </div>
  );
}
