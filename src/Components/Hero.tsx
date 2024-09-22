

 const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover the World's Countries</h1>
        <p>
        The Discover the World app provides a simple and effective way to explore information about countries worldwide. Its main function is to present detailed profiles of each country, including key data such as population, capital city, language, and currency.

The app also offers insights into each country’s culture, history, and geography, with interactive maps and live updates on important statistics. With its user-friendly design and easy navigation, it’s perfect for learning about different countries quickly and efficiently.
        </p>
        <a href="#explore" className="explore-btn">Explore Now</a>
      </div>
      <div className="hero-image">
        <img src="	https://www.mapsofworld.com/style_2019/images/world-map.png?v:1" alt="World Map" />
      </div>
    </section>
  );
};

export default Hero;
