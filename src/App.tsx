import { useState, lazy, Suspense } from 'react';
import Layout from '#/Layout/Layout'; // alias for Layout
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const LazyHomeView = lazy(() => import('./Components/home/view'));
const LazyAboutView = lazy(() => import('./Components/about'));

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
          <Route 
            index //which routes have index its like a parrent element
            element={
              <Suspense fallback={<div className="loading-container">
                <div className="loader"></div>
                <h2>Loading, please wait...</h2>
              </div>}>
                <LazyHomeView />
              </Suspense>
            }
          />
          <Route 
            path="about" 
            element={
              <Suspense fallback={<div className="loading-container">
                <div className="loader"></div>
                <h2>Loading, please wait...</h2>
              </div>}>
                <LazyAboutView />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
