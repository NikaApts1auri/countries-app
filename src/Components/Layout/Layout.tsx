import Footer from "#/footer/Footer";
import Header from "#/header/Header";
import Hero from "#/hero/Hero";
import "./layout.css";

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
}

interface LaoutProps {
  countries: ICountryCard[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Laout({ countries, searchTerm, setSearchTerm }: LaoutProps) {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header title="Discover" />

      <Hero 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filteredCountries={filteredCountries}
      />
      <Footer />
    </div>
  );
}
