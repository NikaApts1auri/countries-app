import { useState, Suspense, lazy, useReducer, FormEvent } from "react";
import "#/hero/hero.css"; 
import { AboutCard } from "@/Components/cardPage/AboutCard";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";

const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); 
    const [sortedAsc, setSortedAsc] = useState<boolean>(true);
  
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
    const handleCardDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation(); // Prevent the event from bubbling up
  
      // Create a new array without the deleted card
      const updatedCardsList = state.filter((card: { id: string; }) => card.id !== id);
  
      // Dispatch the DELETE_CARD action with the updated list
      dispatch({ type: "DELETE_CARD", payload: { updatedCardsList } });
  };

    // Sorting function
    const handleSort = () => {
        dispatch({ type: "SORT_CARDS", sortedAsc });
        setSortedAsc(!sortedAsc);
    };

    const handleCreateCard = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
        const cardObj: ICountryCard = {}; 
        const formData = new FormData(e.currentTarget); 
  
        for (const [key, value] of formData) {
            cardObj[key] = value as string; 
        }
  
        // Make sure you include a unique ID and a default vote count
        dispatch({ type: "ADD_CARD", payload: { ...cardObj, id: Date.now().toString(), vote: "0" } });
    };

    return (
        <div style={{ display: "flex" }}>
            <Suspense fallback={<div className="loading-container"><div className="loader"></div><h2>Loading, please wait...</h2></div>}>
                <LazyHero
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSort={handleSort}
                    filteredCountries={filteredCountries}
                />
            </Suspense>

            <CardCreateForm onCardCreate={handleCreateCard} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                        <Suspense key={country.id} fallback={<div className="loading-container"><div className="loader"></div><h2>Loading, please wait...</h2></div>}>
                            <LazyCountryCard
                                name={country.name}
                                capital={country.capital}
                                population={country.population}
                                voteCount={country.vote}
                                id={country.id}
                                onVote={handleVoteCard}
                                onDelete={handleCardDelete}
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
