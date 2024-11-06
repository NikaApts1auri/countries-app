import axios from "axios";
import fs from "fs/promises";

async function updateDatabase() {
  try {
    // API-დან მონაცემების წამოღება
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data;
    console.log("Fetched countries:", countries);

    // მონაცემების გადამუშავება და id-ის მინიჭება
    const processedCountries = countries.map((country, index) => {
      console.log("Processing country:", country);
      return {
        id: index + 1, // მინიჭდება რიგითობა
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "N/A",
        population: country.population,
      };
    });

    console.log("Processed countries with IDs:", processedCountries);

    // database.json ფაილის წაკითხვა
    const data = await fs.readFile("database.json", "utf8");
    const db = JSON.parse(data);

    // თუ db.countries უკვე შეიცავს მონაცემებს, ახალ მონაცემებს ვამატებთ და ID-ს ვანიჭებთ
    const updatedCountries = db.countries
      ? db.countries.concat(
          processedCountries.map((country, index) => ({
            ...country,
            id: db.countries.length + index + 1, // ვანგარიშებთ ახალ ID-ს
          })),
        )
      : processedCountries;

    // ჩაწერა database.json ფაილში
    db.countries = updatedCountries;
    console.log("Database after update:", db);
    await fs.writeFile("database.json", JSON.stringify(db, null, 2));
    console.log("Database has been updated with new country data and IDs.");
  } catch (error) {
    console.error("Error updating database:", error);
  }
}

// ფუნქციის გაშვება
updateDatabase();
