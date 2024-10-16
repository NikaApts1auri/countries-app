// CountryList.tsx
import React from "react";
import { countries } from "@/App";
import CountryCard from "../card/Card"; 

const CountryList: React.FC = () => {
  const handleVote = (id: string) => {
  
    console.log(`votee ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleted country with ID: ${id}`);
  };

  return (
    <div className="country-list">
      {countries.map((country: Country) => (
        <CountryCard
          key={country.id}
          name={country.name}
          capital={country.capital}
          population={country.population}
          id={country.id}
          voteCount={""}
          onVote={handleVote}
          onDelete={handleDelete}
          onUndo={function (id: string): void {
            throw new Error("Function not implemented.");
          } } isDeleted={false}        />
      ))}
    </div>
  );
};

export default CountryList;
