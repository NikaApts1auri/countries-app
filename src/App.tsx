import { useState } from 'react';
import Layout from '#/Layout/Layout'; // alias for Layout
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutView from './Components/about';
import HomeView from './Components/home/view';

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
    <BrowserRouter>
      <Routes>
        {/* Layout is the parent route */}
        <Route 
          path="/" 
          element={<Layout countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
        >
          <Route path='/' element={<HomeView/>}/>
          <Route path="about" element={<AboutView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
