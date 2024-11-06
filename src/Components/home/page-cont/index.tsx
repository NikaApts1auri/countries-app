import React, { useState, Suspense, lazy, useReducer, useEffect } from "react";
import axios from "axios";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";
import { useParams } from "react-router-dom";
import { ICountryCard } from "@/Components/cardPage/AboutCard";

// Lazy-loaded components
const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortedAsc, setSortedAsc] = useState<boolean>(true);

  const { lang = "en" } = useParams<{ lang: "en" | "ka" }>();

  const [state, dispatch] = useReducer(cardsReducer, [] as ICountryCard[]);

  // Fetch countries data from database.json
  useEffect(() => {
    axios
      .get("/database.json")
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_COUNTRIES", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const filteredCountries = state.filter((country) => {
    console.log("Filtered country:", country);
    if (!country.nameEn || !country.nameKa) {
      return false;
    }
    return (
      country.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.nameKa.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (a.isDeleted === b.isDeleted) {
      return sortedAsc
        ? a.nameEn.localeCompare(b.nameEn)
        : b.nameEn.localeCompare(a.nameEn);
    }
    return a.isDeleted ? 1 : -1;
  });

  const handleVoteCard = (id: number) => {
    dispatch({ type: "VOTE_CARD", payload: { id } });
  };

  const handleCardDelete = async (id: string | number) => {
    // Ensure ID is a valid number (either from a string or number type)
    const cardID = typeof id === "string" ? Number(id) : id;

    if (isNaN(cardID)) {
      console.error("Invalid ID:", id); // თუ ID არ შეიძლება რიცხვად გადაკეთდეს
      return;
    }

    console.log("Deleting card with ID:", cardID);

    try {
      await axios.delete(`http://localhost:3000/countries/${id.toString()}`);

      dispatch({ type: "DELETE_CARD", payload: { id: cardID } });
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleSort = () => {
    setSortedAsc((prev) => !prev);
  };

  const handleCreateCard = (
    image: string | null,
    nameEn: string,
    nameKa: string,
    capitalEn: string,
    capitalKa: string,
    population: string,
  ) => {
    const existingCard = state.find(
      (card) =>
        (card.nameEn === nameEn && card.capitalEn === capitalEn) ||
        (card.nameKa === nameKa && card.capitalKa === capitalKa),
    );

    if (existingCard) {
      alert("ქარდი უკვე არსებობს!");
      return;
    }

    const cardObj: ICountryCard = {
      id: Date.now(), // id is now a number
      nameEn,
      nameKa,
      capitalEn,
      capitalKa,
      population,
      vote: 0,
      image,
      isDeleted: false,
    };
    dispatch({ type: "ADD_CARD", payload: cardObj });
  };

  return (
    <div style={{ display: "flex" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSort={handleSort}
          lang={lang}
          filteredCountries={[]}
          image={null}
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
                voteCount={(country.vote ?? 0).toString()}
                id={country.id} 
                onVote={handleVoteCard}
                onDelete={handleCardDelete}
                isDeleted={country.isDeleted || false}
                image={country.image}
                lang={lang}
                capital={country.capitalEn}
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
