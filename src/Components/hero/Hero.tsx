import "#/hero/hero.css";
import CardHeader from "../card/cardHeader/CardHeader";


interface ICountryCard {
  id: string;
  name: string;
  capital: string;
  population: string;
}

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSort: () => void;
  filteredCountries: ICountryCard[];
  image: string | null;
  lang: "en" | "ka";
}

const Hero: React.FC<HeroProps> = ({
  searchTerm,
  setSearchTerm,
  handleSort,
  filteredCountries,
  image,
}) => {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover the World's Countries</h1>
          <p>
            The Discover the World app provides a simple and effective way to
            explore information about countries worldwide...
          </p>
          <a href="#explore" className="explore-btn">
            Explore Now
          </a>
        </div>
        <CardHeader image={image} />
      </section>


   


      <section className="card-section">
        <div className="search-card">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSort}>SORT</button>
        </div>
        <div className="country-cards">
          {filteredCountries.map((country) => (
            <div key={country.id} className="country-card">
              <h2>{country.name}</h2>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
            </div>
          ))}
        </div>
      </section>


    </main>
  );
};

export default Hero;
