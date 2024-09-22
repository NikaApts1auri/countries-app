import React from 'react';

interface ICountryCard {
  name: string;
  capital: string;
  population: string;
}

const CountryCard: React.FC<ICountryCard> = () => {
  const country = {
    name: "Georgia",
    capital: "Tbilisi",
    population: "3.7 million",
    description:"Georgia (Georgian: საქართველო, romanized: sakartvelo, IPA: [sakʰartʰʷelo] ⓘ) is a transcontinental country in Eastern Europe[10][11][12] and West Asia. It is part of the Caucasus region, bounded by the Black Sea to the west, Russia to the north and northeast, Turkey to the southwest, Armenia to the south, and Azerbaijan to the southeast. Georgia covers an area of 69,700 square kilometres (26,900 sq mi).[13] It has a population of 3.7 million,[b][14] of which over a third live in the capital and largest city, Tbilisi. Georgians, who are native to the region, constitute a majority of the country's population and are its titular nation."
  };

  return (
    <div className="country-card">
      <img
        src="https://cdn.britannica.com/23/4723-050-4F01AE9E/features-Georgia.jpg"
        alt="Georgia"
        className="country-image"
      />
      <h2 className="country-name">{country.name}</h2>
      <p className="country-capital">Capital: {country.capital}</p>
      <p className="country-population">Population: {country.population}</p>
      <p className="country-description">Population: {country.description}</p>
    </div>
  );
};

export default CountryCard;
