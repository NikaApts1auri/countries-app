import Hero from "@/Components/hero/Hero";
import CountryCard from "@/Components/card/Card";
import { useState } from "react";

// Sample data for countries
const countries = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million" },
  // Uncomment the lines below to test with more countries
  // { name: "Germany", capital: "Berlin", population: "83 million" },
  // { name: "France", capital: "Paris", population: "67 million" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter the countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Log filtered countries to debug
  console.log("Filtered Countries:", filteredCountries);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCountries={filteredCountries} 
        />
        <div >
          {/* Render CountryCard for each filtered country */}
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <CountryCard
                key={index}
                name={country.name}
                capital={country.capital}
                population={country.population}
              />
            ))
          ) : (
            <p>No countries found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
