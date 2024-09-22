// Header.tsx
import React from 'react';

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
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
