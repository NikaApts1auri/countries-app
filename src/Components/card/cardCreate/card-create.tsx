import { ChangeEvent, FormEvent, useState } from 'react';
import './card-create.css';

type CardCreateFormProps = {
  onCardCreate: (e: FormEvent<HTMLFormElement>) => void;
};

export default function CardCreateForm({ onCardCreate }: CardCreateFormProps) {
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setValidationError("Name is required.");
      return;
    }
    if (!capital) {
      setValidationError("Capital is required.");
      return;
    }
    if (!population || isNaN(Number(population)) || Number(population) < 0) {
      setValidationError("Population must be a positive number.");
      return;
    }

    setValidationError(""); 
    onCardCreate(e); 
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeCapital = (e: ChangeEvent<HTMLInputElement>) => {
    setCapital(e.target.value);
  };

  const handleChangePopulation = (e: ChangeEvent<HTMLInputElement>) => {
    setPopulation(e.target.value);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChangeName}
          id="name"
          name="name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="capital">Capital</label>
        <input
          type="text"
          value={capital}
          onChange={handleChangeCapital}
          id="capital"
          name="capital"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="population">Population</label>
        <input
          type="text"
          value={population}
          onChange={handleChangePopulation}
          id="population"
          name="population"
          required
        />
      </div>

      {validationError && <p className="error">{validationError}</p>} 

      <button type="submit">Create Card</button>
    </form>
  );
}
