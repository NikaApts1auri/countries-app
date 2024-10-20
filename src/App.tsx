// App.tsx
import { useState, lazy, Suspense } from 'react';
import Layout from '#/Layout/Layout';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoadingFallback from './Components/LoadingFallBack';

const CardPageView = lazy(() => import('./Components/cardPage/view'));
const LazyHomeView = lazy(() => import('./Components/home/view'));
const LazyAboutView = lazy(() => import('./Components/about'));
const LazyContactView = lazy(() => import('./Components/contact/view'));

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
  id: string;
  vote: string;
}

export const countries: ICountryCard[] = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million", id: "1", vote: "0" },
  { name: "Germany", capital: "Berlin", population: "83 million", id: "2", vote: "0" },
  { name: "France", capital: "Paris", population: "67 million", id: "3", vote: "0" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en'); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<Layout countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setLanguage={setLanguage} />}>
          <Route index element={<Suspense fallback={<LoadingFallback />}><LazyHomeView /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<LoadingFallback />}><LazyAboutView /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<LoadingFallback />}><LazyContactView /></Suspense>} />
          <Route path="cards/CardPage/:id" element={<Suspense fallback={<LoadingFallback />}><CardPageView /></Suspense>} />
        </Route>
        <Route path="/" element={<Navigate to="/en" />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
