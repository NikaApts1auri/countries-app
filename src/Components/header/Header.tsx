// Header.tsx
import React from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const BackToHome = () => {
    navigate("/");
  };

  return (
    <header>
      <h1 onClick={BackToHome} style={{ cursor: 'pointer' }}>{title}</h1> {/* Change cursor to pointer */}
      <nav>
        <ul style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
            <h3>Home</h3>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: "white" }}>
            <h3>About</h3>
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to={"/contact"}>
            <h3>Contact</h3>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
