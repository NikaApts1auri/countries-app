import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Hero from './Components/Hero';
import CountryCard from './Components/Card';

const countries = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(country =>
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
    </>
  );
}

export default App;
