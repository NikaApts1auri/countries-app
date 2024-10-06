// App.tsx
import { useState, lazy, Suspense } from 'react';
import Layout from '#/Layout/Layout'; // alias for Layout
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingFallback from './Components/LoadingFallBack';



// Lazy loading CardPageView and other views
const CardPageView = lazy(() => import('./Components/cardPage/view'));
const LazyHomeView = lazy(() => import('./Components/home/view')); // Ensure LazyHomeView points to HomeView
const LazyAboutView = lazy(() => import('./Components/about'));
const LazyContactView=lazy(()=>import("./Components/contact/view"))

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
  id: string;
}

export const countries: ICountryCard[] = [
  { name: "Georgia", capital: "Tbilisi", population: "3.7 million", id: "1" },
  { name: "Germany", capital: "Berlin", population: "83 million", id: "2" },
  { name: "France", capital: "Paris", population: "67 million", id: "3" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Layout countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
        >
          <Route 
            index 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <LazyHomeView /> {/* This is where HomeView is rendered */}
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
                <LazyContactView />
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
