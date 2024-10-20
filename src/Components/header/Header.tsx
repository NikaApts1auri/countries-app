import React from 'react';
import './header.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { texts } from '../text/text';


interface IHeaderProps {
  setLanguage: (lang: string) => void; 
}

const Header: React.FC<IHeaderProps> = ({ setLanguage }) => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>(); 

  const handleChangeLanguage = (newLang: string) => {
    setLanguage(newLang);
    navigate(`/${newLang}`); 
  };

  return (
    <header>
      <h1 style={{ cursor: 'pointer' }}>
        {lang === 'ka' ? texts.headerTitle.ka : texts.headerTitle.en}
      </h1>
      <div>
        <button 
          onClick={() => handleChangeLanguage("en")} 
          style={{ backgroundColor: lang === "en" ? 'green' : 'lightgray' }} 
        >
          en
        </button>
        <button 
          onClick={() => handleChangeLanguage("ka")} 
          style={{ backgroundColor: lang === "ka" ? 'green' : 'lightgray' }} 
        >
          ka
        </button>
      </div>
      <nav>
        <ul style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to={`/${lang}/`} style={{ color: "white", textDecoration: "none" }}>
            <h3>{lang === 'ka' ? texts.home.ka : texts.home.en}</h3>
          </Link>
          <Link to={`/${lang}/about`} style={{ textDecoration: 'none', color: "white" }}>
            <h3>{lang === 'ka' ? texts.about.ka : texts.about.en}</h3>
          </Link>
          <Link to={`/${lang}/contact`} style={{ color: "white", textDecoration: "none" }}>
            <h3>{lang === 'ka' ? texts.contact.ka : texts.contact.en}</h3>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
