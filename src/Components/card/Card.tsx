import CardContent from "./cardContent/CardContent";
import CardFooter from "./cardFooter/CardFooter";
import CardHeader from "./cardHeader/CardHeader";

interface CountryCardProps {
  name: string;
  capital: string;
  population: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ name, capital, population }) => {
  return (
    <div className="country-card">
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
