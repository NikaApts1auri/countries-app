import "./cardFooter.css";

interface CardFooterProps {
  id: string; // ID of the card to be deleted
  onDelete: (id: string) => void; // Function to handle deletion
}

const CardFooter: React.FC<CardFooterProps> = ({ id, onDelete }) => {
  const handleArticleDelete = () => {
    onDelete(id); // Call the delete function with the card's ID
    console.log("clicking delete btn for ID:", id); // Console log for debugging
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

      <span onClick={handleArticleDelete} style={{ color: "red", cursor: "pointer" }}>
        DELETE
      </span>
    </div>
  );
};

export default CardFooter;
