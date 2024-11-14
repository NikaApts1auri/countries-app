import React, {
  useState,
  Suspense,
  lazy,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQueryClient, useInfiniteQuery, useMutation } from "react-query";
import { useVirtual } from "react-virtual";

import {
  getCountries,
  postCountries,
  deleteCountry,
  patchCountry,
} from "@/api/countries";
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
  const sortOrderParam = searchParams.get("sortOrder") || "desc";
  const sortedAsc = sortOrderParam === "asc";

  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["countries", sortOrderParam],
    ({ pageParam = 1 }) =>
      getCountries(
        `_page=${pageParam}&_limit=10&_sort=vote&_order=${sortedAsc ? "asc" : "desc"}`,
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  );

  const createCountryMutation = useMutation(postCountries, {
    onSuccess: () => {
      queryClient.invalidateQueries("countries");
    },
    onError: (error) => {
      console.error("Error creating country:", error);
    },
  });
  const deleteCountryMutation = useMutation(deleteCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries("countries");
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
    },
  });

  const patchCountryMutation = useMutation(
    ({
      id,
      updatedData,
    }: {
      id: string | number;
      updatedData: Partial<ICountry>;
    }) => patchCountry(id, { vote: updatedData.vote }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("countries");
      },
      onError: (error) => {
        console.error("Error updating country:", error);
      },
    },
  );

  const handleCreateCard = async (
    image: string | null,
    nameEn: string,
    nameKa: string,
    capitalEn: string,
    capitalKa: string,
    population: string,
  ) => {
    const existingCard =
      Array.isArray(state) &&
      state.find(
        (card) => card.nameEn === nameEn && card.capitalEn === capitalEn,
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

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: data?.pages.reduce((acc, page) => acc + page.length, 0) || 0,
    parentRef,
    estimateSize: useCallback(() => 250, []),
    overscan: 10,
  });

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
  }, [data]);

  const handleSort = () => {
    const newSortOrder = sortedAsc ? "desc" : "asc";
    setSearchParams({ sortOrder: newSortOrder });
  };

  const loadMoreItems = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Sorting by vote
  const sortedCountries = data?.pages.flat().sort((a, b) => {
    const voteA = a.vote || 0;
    const voteB = b.vote || 0;
    return sortedAsc ? voteA - voteB : voteB - voteA;
  });

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

      <CardCreateForm onCardCreate={handleCreateCard} refetch={() => {}} />

      <div
        ref={parentRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          overflowY: "auto",
          maxHeight: "600px",
        }}
        onScroll={(e) => {
          if (
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            e.currentTarget.clientHeight
          ) {
            loadMoreItems();
          }
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const country = sortedCountries?.[virtualRow.index];
          if (!country) return null;

          return (
            <div
              key={country.id}
              ref={virtualRow.measureRef}
              style={{
                ...virtualRow.style,
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LazyCountryCard
                  nameEn={country.nameEn}
                  nameKa={country.nameKa}
                  capitalEn={country.capitalEn}
                  capitalKa={country.capitalKa}
                  population={country.population}
                  voteCount={(country.vote ?? 0).toString()}
                  id={country.id}
                  onVote={() =>
                    patchCountryMutation.mutate({
                      id: country.id,
                      updatedData: {
                        vote: (country.vote ?? 0) + 1,
                      },
                    })
                  }
                  onDelete={() => handleCardDelete(country.id)}
                  isDeleted={country.isDeleted || false}
                  image={country.image}
                  lang={lang}
                  capital={country.capitalEn}
                />
              </Suspense>
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div style={{ marginTop: "20px" }}>
        {isLoading ? <div>Loading...</div> : null}
        {error ? <div>Error loading countries</div> : null}
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
};

export default Home;
