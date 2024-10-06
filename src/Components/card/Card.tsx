import CardContent from './cardContent/CardContent';
import CardFooter from './cardFooter/CardFooter';
import CardHeader from './cardHeader/CardHeader';
import { useNavigate } from 'react-router-dom';

interface CountryCardProps {
  name: string;
  capital: string;
  population: string;
  id: string; // Make sure id is properly typed
}

const CountryCard: React.FC<CountryCardProps> = ({ name, capital, population, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(`Navigating to /CardPage/${id}`); // Log to verify the ID is correct
    navigate(`/CardPage/${id}`); // Navigate to the correct URL with the id
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleCardClick} className="country-card">
      <CardHeader />
      <main>
        <CardContent name={name} capital={capital} population={population} />
      </main>
      <footer>
        <CardFooter />
      </footer>
    </div>
  );
};

export default CountryCard;
