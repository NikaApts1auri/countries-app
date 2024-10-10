import "#/hero/hero.css";

interface ICountryCard {
  id: string;
  name: string;
  capital: string;
  population: string;
}

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSort: () => void; // Accept sort function as a prop
  filteredCountries: ICountryCard[];
}

const Hero: React.FC<HeroProps> = ({ searchTerm, setSearchTerm, handleSort, filteredCountries }) => {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover the World's Countries</h1>
          <p>
            The Discover the World app provides a simple and effective way to explore information about countries worldwide. Its main function is to present detailed profiles of each country, including key data such as population, capital city, language, and currency.
            <br />
            The app also offers insights into each country’s culture, history, and geography, with interactive maps and live updates on important statistics. With its user-friendly design and easy navigation, it’s perfect for learning about different countries quickly and efficiently.
          </p>
          <a href="#explore" className="explore-btn">Explore Now</a>
        </div>
        <div className="hero-image">
          <img src="https://www.mapsofworld.com/style_2019/images/world-map.png?v:1" alt="World Map" />
        </div>
      </section>

      <section className="card-section">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="search-card">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
<button
  onClick={handleSort}
  style={{
    padding: "10px 20px", // Padding for spacing
    backgroundColor: "#007BFF", // Button color
    color: "#FFFFFF", // Text color
    border: "none", // No border
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    fontSize: "16px", // Font size
    transition: "background-color 0.3s", // Transition for hover effect
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
>
  SORT
</button>

        </div>
        <div style={{background:"grey"}} className="country-cards">
          {filteredCountries.map((country, index) => (
            <div key={index} className="country-card">
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
