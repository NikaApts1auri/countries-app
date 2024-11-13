import React, { useState, Suspense, lazy, useReducer } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCountries, postCountries, deleteCountry, patchCountry } from "@/api/countries";
import { cardsReducer } from "@/Components/reducer/reducer";
import CardCreateForm from "@/Components/card/cardCreate/card-create";
import { ICountry } from "@/api/countries/api";

// Lazy-loaded components
const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { lang = "en" } = useParams<{ lang: "en" | "ka" }>();
  const [state, dispatch] = useReducer(cardsReducer, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrderParam = searchParams.get("sortOrder");
  const sortedAsc = sortOrderParam !== "false";

  const queryClient = useQueryClient();

  // Fetch countries with useQuery
  const { data, error, isLoading } = useQuery(
    ["countries", sortedAsc],
    () => getCountries(sortedAsc ? "_sort=like" : "_sort=-like"),
    {
      onSuccess: (data) => dispatch({ type: "SET_COUNTRIES", payload: data }),
    }
  );

  // Create country with useMutation
  const createCountryMutation = useMutation(postCountries, {
    onSuccess: () => {
      queryClient.invalidateQueries("countries");
    },
    onError: (error) => {
      console.error("Error creating country:", error);
    }
  });

  // Delete country with useMutation
  const deleteCountryMutation = useMutation(deleteCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries("countries");
    
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
    }
  });

  // Patch country with useMutation
  const patchCountryMutation = useMutation(
    ({ id, updatedData }: { id: string | number; updatedData: ICountry }) =>
      patchCountry(id, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("countries");
      },
      onError: (error) => {
        console.error("Error updating country:", error);
      }
    }
  );

  const handleCreateCard = async (
    image: string | null,
    nameEn: string,
    nameKa: string,
    capitalEn: string,
    capitalKa: string,
    population: string
  ) => {
    const existingCard = Array.isArray(state) && state.find(
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

    createCountryMutation.mutate(cardObj);
  };

  const handleCardDelete = (id: string | number) => {
    deleteCountryMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading countries</div>;

  return (
    <div style={{ display: "flex" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSort={() => setSearchParams({ sortOrder: (!sortedAsc).toString() })}
          lang={lang}
          filteredCountries={[]}
          image={null}
        />
      </Suspense>

      <CardCreateForm onCardCreate={handleCreateCard} refetch={() => {}} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {data?.length > 0 ? (
          data?.map((country: { id: React.Key | null | undefined; nameEn: string; nameKa: string; capitalEn: string; capitalKa: string; population: string; vote: number; isDeleted: boolean; image: string | null; }) => (
            <Suspense key={country.id} fallback={<div>Loading...</div>}>
              <LazyCountryCard
                nameEn={country.nameEn}
                nameKa={country.nameKa}
                capitalEn={country.capitalEn}
                capitalKa={country.capitalKa}
                population={country.population}
                voteCount={(country.vote ?? 0).toString()}
                id={country.id}
                onVote={() => patchCountryMutation.mutate({ id: country.id, updatedData: { vote: country.vote + 1 } })}
                onDelete={() => handleCardDelete(country.id)}
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
