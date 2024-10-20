import Footer from "#/footer/Footer";
import Header from "#/header/Header";
import "./layout.css";
import { Outlet } from "react-router-dom";

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

export default function Layout({ countries, searchTerm, setSearchTerm, setLanguage }: LayoutProps) {
  return (
    <div>
      <Header title="Discover" setLanguage={setLanguage} /> 
      <Outlet context={{ countries, searchTerm, setSearchTerm }} /> 
      <Footer />
    </div>
  );
}
