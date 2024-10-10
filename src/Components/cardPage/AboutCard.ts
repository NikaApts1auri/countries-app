interface ICountryCard {
    info: string | undefined;
    name: string;
    capital: string;
    population: string;
    id:string;
    vote:string
  }

  export const AboutCard:ICountryCard[] = [
    { name: "Georgia", capital: "Tbilisi", population: "3.7 million", id: "1", info: undefined ,vote:"0" },
    { name: "Germany", capital: "Berlin", population: "83 million", id: "2", info: undefined ,vote:"0"},
    { name: "France", capital: "Paris", population: "67 million", id: "3", info: undefined ,vote:"0"},
  ];