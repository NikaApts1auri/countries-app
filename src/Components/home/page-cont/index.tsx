import { useState, Suspense, lazy } from "react";

const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const countries = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million" },
  // Uncomment the lines below to test with more countries
  // { name: "Germany", capital: "Berlin", population: "83 million" },
  // { name: "France", capital: "Paris", population: "67 million" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Countries:", filteredCountries);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Suspense fallback={<div className="loading-container">
      <div className="loader"></div>
      <h2>Loading, please wait...</h2>
    </div>}>
          <LazyHero
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredCountries={filteredCountries}
          />
        </Suspense>
        <div>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <Suspense key={index} fallback={<div className="loading-container">
                <div className="loader"></div>
                <h2>Loading, please wait...</h2>
              </div>}>
                <LazyCountryCard
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                />
              </Suspense>
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
