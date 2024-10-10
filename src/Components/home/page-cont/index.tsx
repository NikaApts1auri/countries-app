import { useState, Suspense, lazy } from "react";

const LazyCountryCard = lazy(() => import("@/Components/card/Card"));
const LazyHero = lazy(() => import("@/Components/hero/Hero"));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [cardList, setCardList] = useState<
    { name: string; capital: string; population: string; id: string; vote: string }[]
  >([
    { name: "Georgia", capital: "Tbilisi", population: "3.7 million", id: "1", vote: "0" },
    { name: "Germany", capital: "Berlin", population: "83 million", id: "2", vote: "0" },
    { name: "France", capital: "Paris", population: "67 million", id: "3", vote: "0" },
  ]);

  const filteredCountries = cardList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
// if else მაგივრად გამოვიყენე ტერნერი ოპერატორი, ბევრად კარგი შესახედია.
  const handleVoteCard = (id: string) => {
    setCardList((prevCardList) =>
      prevCardList.map((card) =>
        card.id === id ? { ...card, vote: (parseInt(card.vote) + 1).toString() } : card // ვოუთის ანუ შეფასების ტიპი მაქვს სტრინგი, რისგამოც დამჭირდა ფარსინტის გამოყენება <3
      )
    );
  };

  return (
    <>
      <div style={{ display: "flex" }}>
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
            filteredCountries={filteredCountries}
          />
        </Suspense>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
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
                  onVote={handleVoteCard} 
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
