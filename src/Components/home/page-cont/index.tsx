// Home.tsx
import { useState, Suspense, lazy } from "react";

const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const countries = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million", id: "1" },
  { name: "Germany", capital: "Berlin", population: "83 million", id: "2" },
  { name: "France", capital: "Paris", population: "67 million", id: "3" },
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
        <div style={{display:"flex" , flexWrap:"wrap", gap:"15px"}}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <Suspense key={country.id} fallback={<div className="loading-container">
                <div className="loader"></div>
                <h2>Loading, please wait...</h2>
              </div>}>
                <LazyCountryCard
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  id={country.id} // აქ ხდება id-ის გადაცემა
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
