import { useState, Suspense, lazy, useReducer } from "react";
import "#/hero/hero.css"; // Make sure CSS is correctly included
import { AboutCard } from "@/Components/cardPage/AboutCard";
import { cardsReducer } from "@/Components/reducer/reducer";

const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term
  const [sortedAsc, setSortedAsc] = useState<boolean>(true); // Sorting direction
  
  // Using reducer to manage country data
  const [state, dispatch] = useReducer(cardsReducer, AboutCard);

  // Filtering countries by name
  const filteredCountries = state.filter((country: { name: string; }) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle voting
  const handleVoteCard = (id: string) => {
    dispatch({ type: "VOTE_CARD", id });
  };

  // Function to handle deletion
  const handleDeleteCard = (id: string) => {
    console.log("Deleting card with ID:", id);
    dispatch({ type: "DELETE_CARD", id });
    console.log("Current state after deletion:", state);
  };
  

  // Sorting function
  const handleSort = () => {
    dispatch({ type: "SORT_CARDS", sortedAsc });
    setSortedAsc(!sortedAsc); // Toggle sorting direction
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Lazy load Hero component */}
      <Suspense
        fallback={
          <div className="loading-container">
            <div className="loader"></div>
            <h2>Loading, please wait...</h2>
          </div>
        }
      >
        <LazyHero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSort={handleSort}
          filteredCountries={filteredCountries}
        />
      </Suspense>

      {/* Display cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country: { id: string; name: string; capital: string; population: string; vote: string; }) => (
            <Suspense
  key={country.id}
  fallback={
    <div className="loading-container">
      <div className="loader"></div>
      <h2>Loading, please wait...</h2>
    </div>
  }
>
  <LazyCountryCard
    name={country.name}
    capital={country.capital}
    population={country.population}
    voteCount={country.vote}
    id={country.id}
    onVote={handleVoteCard} // Voting function
    onDelete={handleDeleteCard} // Pass deletion function
  />
</Suspense>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
