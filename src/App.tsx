import { useState } from 'react';
import Layout from '#/Layout/Layout'; //alias

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
}

const countries: ICountryCard[] = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout 
      countries={countries} 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm} 
    />
  );
}

export default App;
