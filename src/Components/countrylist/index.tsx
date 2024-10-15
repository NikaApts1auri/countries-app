// CountryList.tsx
import { countries } from "@/App"; // დარწმუნდი, რომ ეს იმპორტი სწორია
import CountryCard from "../card/Card"; // შესამოწმებლად გაისად

const CountryList = () => {
  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard
          key={country.id}
          name={country.name}
          capital={country.capital}
          population={country.population}
          id={country.id} // ID უნდა გადაეცეს აქ
          voteCount={""} onVote={function (): void {
            throw new Error("Function not implemented.");
          } } onDelete={function (id: string): void {
            throw new Error("Function not implemented.");
          } }        />
      ))}
    </div>
  );
};

export default CountryList;
