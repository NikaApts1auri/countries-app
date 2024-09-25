import { useState } from 'react';
import './App.css';
import Header from './Components/header/Header';
import Hero from './Components/hero/Hero';
import CountryCard from './Components/card/Card';
import Footer from './Components/footer/Footer';

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
}

const countries: ICountryCard[] = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million" },
  // Add more countries as needed
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header title="Discover" />
      <main>
        <Hero />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="country-cards-container">
          {filteredCountries.map((country, index) => (
            <CountryCard
              key={index}
              name={country.name}
              capital={country.capital}
              population={country.population}
            />
          ))}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
