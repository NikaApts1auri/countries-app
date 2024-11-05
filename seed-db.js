import axios from 'axios';
import fs from 'fs/promises';

// მონაცემების წამოღება
axios.get('https://restcountries.com/v3.1/all')
  .then(response => {
    const countries = response.data;

    // გადამუშავება
    const processedCountries = countries.map(country => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      population: country.population,
    }));

    // ჩაწერა database.json ფაილში
    fs.readFile('database.json', 'utf8')
      .then(data => {
        const db = JSON.parse(data);
        db.countries = processedCountries;

        fs.writeFile('database.json', JSON.stringify(db, null, 2))
          .then(() => {
            console.log('Database has been updated with country data.');
          })
          .catch(err => {
            console.error('Error writing to database.json:', err);
          });
      })
      .catch(err => {
        console.error('Error reading database.json:', err);
      });
  })
  .catch(error => {
    console.error('Error fetching country data:', error);
  });
