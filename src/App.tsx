import { useState, lazy, Suspense } from 'react';
import Layout from '#/Layout/Layout'; // alias for Layout
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactView from './Components/contact/view';
import LoadingFallback from './Components/LoadingFallBack';

// Lazy loading CardPageView
const CardPageView = lazy(() => import('./Components/cardPage/view'));
const LazyHomeView = lazy(() => import('./Components/home/view'));
const LazyAboutView = lazy(() => import('./Components/about'));

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
  id:string;
}
 export const countries:ICountryCard[] = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million", id:"1" },
  { name: "Germany", capital: "Berlin", population: "83 million", id:"2" },
  { name: "France", capital: "Paris", population: "67 million" , id:"3"},
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
          <Route 
            index 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <LazyHomeView />
              </Suspense>
            }
          />
          <Route 
            path="about" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <LazyAboutView />
              </Suspense>
            } 
          />

          <Route 
            path="contact" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ContactView />
              </Suspense>
            } 
          />

<Route 
  path="/CardPage/:id" 
  element={
    <Suspense fallback={<LoadingFallback />}>
      <CardPageView />
    </Suspense>
  }
/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
