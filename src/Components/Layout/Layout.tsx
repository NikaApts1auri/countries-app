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
}

// eslint-disable-next-line no-empty-pattern
export default function Layout({  }: LayoutProps) {
  return (
    <div>
      <Header title="Discover" />
      <Outlet />
      <Footer />
    </div>
  );
}
