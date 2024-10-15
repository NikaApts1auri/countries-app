import "./cardFooter.css";

interface CardFooterProps {
  id: string; // ID of the card to be deleted
  onDelete: (id: string) => void; // Function to handle deletion
}

const CardFooter: React.FC<CardFooterProps> = ({ id, onDelete }) => {
  
  const handleCardDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    onDelete(id); 
    console.log("clicking delete btn for ID:", id); 
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

      <button onClick={(e) => handleCardDelete(e, id)} style={{ color: "red", cursor: "pointer" }}>
  DELETE
</button>

    </div>
  );
};

export default CardFooter;
