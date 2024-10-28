import React, { useState, Suspense, lazy, useReducer } from "react";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";
import { AboutCard } from "@/Components/cardPage/AboutCard";
import { useParams } from "react-router-dom";

// Lazy-loaded components
const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

interface Country {
    id: string;
    nameEn: string;
    nameKa: string;
    capitalEn: string;
    capitalKa: string;
    population: string;
    vote: string;
    isDeleted?: boolean;
    image?: string | null;
}

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortedAsc, setSortedAsc] = useState<boolean>(true);
    const [state, dispatch] = useReducer(cardsReducer, AboutCard as Country[]);
    const { lang } = useParams<{ lang: string }>()
    const filteredCountries = state.filter((country: Country) =>
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

    const handleCreateCard = (image: string | null, nameEn: string, nameKa: string, capitalEn: string, capitalKa: string, population: string) => {

        const existingCard = state.find((card: { nameEn: string; capitalEn: string; nameKa: string; capitalKa: string; }) =>
            (card.nameEn === nameEn && card.capitalEn === capitalEn) ||
            (card.nameKa === nameKa && card.capitalKa === capitalKa)
        );

        if (existingCard) {
            alert('ქარდი უკვე არსებობს!');
            return;
        }

        const cardObj: Country = { nameEn, nameKa, capitalEn, capitalKa, population, vote: "0", image, id: Date.now().toString() };
        dispatch({ type: "ADD_CARD", payload: cardObj });
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

                />
            </Suspense>


            <CardCreateForm onCardCreate={handleCreateCard} />

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
