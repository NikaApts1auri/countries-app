import { Link } from 'react-router-dom';
import './about.css'; // Import the CSS file

export default function AboutView() {
  return (
    <div className="about-container">
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Back to Home</Link>
      </nav>

      <h1 className="about-title">About Our Country Information Site</h1>
      <p className="about-text">
        Welcome to our country information website! Our goal is to provide you with accurate 
        and up-to-date information about the countries of the world. Whether you're looking 
        for details on population, geography, or culture, we strive to offer comprehensive 
        data on every nation.
      </p>
      <p className="about-text">
        Explore fascinating facts, discover capital cities, and learn about the unique 
        characteristics that make each country special. We hope this platform serves 
        as a valuable resource for students, travelers, and geography enthusiasts alike.
      </p>
      <p className="about-text">
        Feel free to explore, search for countries, and dive into the world of global knowledge. 
        If you have any questions or suggestions, don't hesitate to reach out to us!
      </p>
    </div>
  );
}
