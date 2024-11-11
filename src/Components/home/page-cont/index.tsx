import React, { useState, Suspense, lazy, useReducer, useEffect } from "react";
import axios from "axios";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";
import { useParams, useSearchParams } from "react-router-dom";
import { ICountryCard } from "@/Components/cardPage/AboutCard";
import { getCountries } from "@/api/countries";

// Lazy-loaded components
const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { lang = "en" } = useParams<{ lang: "en" | "ka" }>();

  const [state, dispatch] = useReducer(cardsReducer, [] as ICountryCard[]);


  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrderParam = searchParams.get("sortOrder");

  const sortedAsc = sortOrderParam !== "false";

  
  useEffect(() => {
    const sortQuery = sortedAsc ? "_sort=like" : "_sort=-like";
    getCountries(sortQuery)
      .then((data) => {
        console.log("Countries data:", data);
        dispatch({ type: "SET_COUNTRIES", payload: data });
      })
      .catch((error) => {
        console.error(
          "Error fetching countries:",
          error.response ? error.response.data : error.message
        );
      });
  }, [sortedAsc]);

  const filteredCountries = state ? state.filter((country: { nameEn: string; nameKa: string }) => {
    if (!country.nameEn || !country.nameKa) {
      return false;
    }
    return (
      country.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.nameKa.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) : [];


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
    const cardID = typeof id === "string" ? Number(id) : id;

    if (isNaN(cardID)) {
      console.error("Invalid ID:", id);
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
    const newSortOrder = !sortedAsc;
    setSearchParams({ sortOrder: newSortOrder.toString() }); // Save the sort order to the URL
  };

  const handleCreateCard = async (image: string | null, nameEn: string, nameKa: string, capitalEn: string, capitalKa: string, population: string) => {
    const existingCard = state.find(
      (card) => card.nameEn === nameEn && card.capitalEn === capitalEn
    );
 
    if (existingCard) {
      alert("ქარდი უკვე არსებობს!");
      return;
    }
 
    const cardObj = {
      id: Date.now().toString(),
      nameEn,
      nameKa,
      capitalEn,
      capitalKa,
      population,
      vote: 0,
      image,
      isDeleted: false,
    };
 
    try {
      await axios.post("http://localhost:3000/countries", cardObj);
      dispatch({ type: "ADD_CARD", payload: cardObj });
    } catch (error) {
      console.error("Error adding card:", error);
    }
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
