// Header.tsx
import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <Link to="/about" style={{ textDecoration: 'none', color:"white"}}>
  About
</Link>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
