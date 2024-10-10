import "#/hero/hero.css";

interface ICountryCard {
  id:string
  name: string;
  capital: string;
  population: string;
}

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCountries: ICountryCard[];
}

const Hero: React.FC<HeroProps> = ({ searchTerm, setSearchTerm, filteredCountries }) => {
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
        <div style={{display:"flex", flexDirection:"column", gap:"1rem" }} className="search-card">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <button >SORT</button>
        </div>
        <div className="country-cards">
          {filteredCountries.map((_country, index) => (
            <div key={index} className="country-card">
          
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Hero