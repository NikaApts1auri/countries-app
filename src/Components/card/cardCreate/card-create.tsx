import { ChangeEvent, FormEvent, useState } from 'react';
import './card-create.css';

type CardCreateFormProps = {
  onCardCreate: (e: FormEvent<HTMLFormElement>, image: string | null) => void;
  setImage: (image: string | null) => void;
};

export default function CardCreateForm({ onCardCreate }: CardCreateFormProps) {
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [validationError, setValidationError] = useState("");
  const [image, setImage] = useState<string | null>(null); 

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
    onCardCreate(e, image); 
  };

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        
        const validImage = ['image/jpeg', 'image/png'];
        if (!validImage.includes(file.type)) {
            alert('Please upload a valid image file (jpg or png).');
            return; 
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                setImage(reader.result as string);
            }
        };
        reader.readAsDataURL(file);
    }
};



  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setCapital(e.target.value)}
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
          onChange={(e) => setPopulation(e.target.value)}
          id="population"
          name="population"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="upload">Image Upload</label>
        <input
          type="file"
          onChange={handleAddImage}
          id="image"
          name="image"
          required
        />
      </div>

      {validationError && <p className="error">{validationError}</p>} 

      <button type="submit">Create Card</button>
    </form>
  );
}
