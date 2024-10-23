import React, { useState, Suspense, lazy, useReducer, FormEvent } from "react";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";
import { AboutCard } from "@/Components/cardPage/AboutCard";

// Lazy-loaded components
const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); 
    const [sortedAsc, setSortedAsc] = useState<boolean>(true);
    const [state, dispatch] = useReducer(cardsReducer, AboutCard);
    const [image, setImage] = useState<string | null>(null);
    const [lang, setLang] = useState<string>("en");

    const filteredCountries = state.filter((country: { nameEn: string; }) => 
        country.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCountries = [...filteredCountries].sort((a, b) => {
        if (a.isDeleted === b.isDeleted) {
            return sortedAsc ? a.nameEn.localeCompare(b.nameEn) : b.nameEn.localeCompare(a.nameEn);
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
        setSortedAsc(!sortedAsc);
    };

    const handleCreateCard = (e: FormEvent<HTMLFormElement>, image: string | null, nameEn: string, nameKa: string, capitalEn: string, capitalKa: string, population: string) => {
        e.preventDefault();
        const cardObj = { nameEn, nameKa, capitalEn, capitalKa, population, vote: "0", image };
        dispatch({ type: "ADD_CARD", payload: { ...cardObj, id: Date.now().toString() } });
    };

    return (
        <div style={{ display: "flex" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyHero
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSort={handleSort}
                    filteredCountries={sortedCountries}
                    lang={lang}
                    setLang={setLang}
                />
            </Suspense>

            <CardCreateForm onCardCreate={handleCreateCard} setImage={setImage} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {sortedCountries.length > 0 ? (
                    sortedCountries.map((country) => (
                        <Suspense key={country.id} fallback={<div>Loading...</div>}>
                            <LazyCountryCard
                                nameEn={country.nameEn}
                                nameKa={country.nameKa}
                                capitalEn={country.capitalEn}
                                capitalKa={country.capitalKa} 
                                population={country.population}
                                voteCount={country.vote}
                                id={country.id}
                                onVote={handleVoteCard}
                                onDelete={handleCardDelete}
                                onUndo={handleUndoDelete}
                                isDeleted={country.isDeleted || false} 
                                image={country.image} 
                                lang={lang}
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
