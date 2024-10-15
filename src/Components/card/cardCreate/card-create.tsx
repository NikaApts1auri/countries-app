import { FormEvent } from 'react';
import './card-create.css'; // Import the CSS file

type CardCreateFormProps = {
  onCardCreate: (e: FormEvent<HTMLFormElement>) => void; // Corrected the type here
};

export default function CardCreateForm({ onCardCreate }: CardCreateFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onCardCreate(e); // Call the onCardCreate function
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}> {/* Attach the handleSubmit function */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="capital">Capital</label>
        <input type="text" id="capital" name="capital" required />
      </div>
      <div className="form-group">
        <label htmlFor="population">Population</label>
        <input type="text" id="population" name="population" required />
      </div>
      <button type="submit">Create Card</button>
    </form>
  );
}
