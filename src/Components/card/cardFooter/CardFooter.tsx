import React from 'react';
import "./cardFooter.css";

interface CardFooterProps {
  id: string; // ID of the card to be deleted
  onDelete: (id: string) => void; // Function to handle deletion
  isDeleted: boolean; // New prop to determine if the card is deleted
  onUndo: (id: string) => void; // New prop for the undo function
}

const CardFooter: React.FC<CardFooterProps> = ({ id, onDelete, isDeleted, onUndo }) => {
  
  const handleCardDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    onDelete(id); 
    console.log("clicking delete btn for ID:", id); 
  };
  
  const handleUndo = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onUndo(id); // Call the undo function
  };
  
  return (
    <div className="country-footer">
      <p>
        Learn more on{" "}
        <a
          href="https://en.wikipedia.org/wiki/countries_(country)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>
      </p>

      {isDeleted ? ( // Conditionally render the button based on isDeleted
        <button onClick={handleUndo} style={{ backgroundColor:"grey", color: "green-700", cursor: "pointer" }}>
          UNDO
        </button>
      ) : (
        <button onClick={(e) => handleCardDelete(e, id)} style={{ color: "red", cursor: "pointer" }}>
          DELETE
        </button>
      )}
    </div>
  );
};

export default CardFooter;
