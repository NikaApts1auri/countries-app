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
        <ul style={{display:"flex",alignItems:"center",gap:"1rem"}}>
          <Link style={{color:"white" ,textDecoration:"none"}} to={"/"}><h3>Home</h3></Link >
          <Link to="/about" style={{ textDecoration: 'none', color:"white"}}>
          <h3>About</h3>
</Link>
        <Link style={{color:"white" ,textDecoration:"none"}} to={"/contact"}> <h3>contact</h3></Link>   
        </ul>
      </nav>
    </header>
  );
};

export default Header;
