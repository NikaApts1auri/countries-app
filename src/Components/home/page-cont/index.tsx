import React, { useState, Suspense, lazy, useReducer, FormEvent } from "react";
import "#/hero/hero.css";
import { AboutCard } from "@/Components/cardPage/AboutCard";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";

// Lazy-loaded components
const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));


interface Card {
    id: string;
    name: string;
    capital: string;
    population: string;
    vote: string;
    isDeleted?: boolean; 
}

type State = Card[];

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); 
    const [sortedAsc, setSortedAsc] = useState<boolean>(true);


    const [state, dispatch] = useReducer(cardsReducer, AboutCard as State);

   
    const filteredCountries = state.filter((country: Card) => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sortireba
    const sortedCountries = [...filteredCountries].sort((a, b) => {
        if (a.isDeleted === b.isDeleted) {
            return sortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
       
        return a.isDeleted ? 1 : -1; 
    });
    

    const handleVoteCard = (id: string) => {
        dispatch({ type: "VOTE_CARD", id });
    };

    const handleCardDelete = (id: string) => {
        dispatch({ type: "DELETE_CARD", payload: { id } });
    };

    const handleUndoDelete = (id: string) => {
        dispatch({ type: "UNDO_DELETE", payload: { id } });
    };

    const handleSort = () => {
        dispatch({ type: "SORT_CARDS", sortedAsc });
        setSortedAsc(!sortedAsc);
    };

    const handleCreateCard = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
        const cardObj: Omit<Card, "id"> = {
            name: "",
            capital: "",
            population: "",
            vote: "0" 
        }; 
        const formData = new FormData(e.currentTarget); 

        for (const [key, value] of formData) {
            cardObj[key as keyof Omit<Card, "id">] = value as string; 
        }
  
        dispatch({ type: "ADD_CARD", payload: { ...cardObj, id: Date.now().toString() } }); 
    };

    return (
        <div style={{ display: "flex" }}>
            <Suspense fallback={<div className="loading-container"><div className="loader"></div><h2>Loading, please wait...</h2></div>}>
                <LazyHero
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSort={handleSort}
                    filteredCountries={sortedCountries} 
                />
            </Suspense>

            <CardCreateForm onCardCreate={handleCreateCard} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {sortedCountries.length > 0 ? (
                    sortedCountries.map((country) => (
                        <Suspense key={country.id} fallback={<div className="loading-container"><div className="loader"></div><h2>Loading, please wait...</h2></div>}>
                            <LazyCountryCard
                                name={country.name}
                                capital={country.capital}
                                population={country.population}
                                voteCount={country.vote}
                                id={country.id}
                                onVote={handleVoteCard}
                                isDeleted={country.isDeleted || false} 
                                onDelete={handleCardDelete}
                                onUndo={handleUndoDelete}
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
