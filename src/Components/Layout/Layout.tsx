import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
}

interface LayoutProps {
  countries: ICountryCard[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setLanguage: (lang: string) => void;
}

export default function Layout({
  countries,
  searchTerm,
  setSearchTerm,
  setLanguage,
}: LayoutProps) {
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div>
      <Header title="Discover" setLanguage={handleLanguageChange} />
      <Outlet context={{ countries, searchTerm, setSearchTerm }} />
      <Footer />
    </div>
  );
}
