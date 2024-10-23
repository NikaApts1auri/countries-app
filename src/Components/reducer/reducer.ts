interface Card {
    name: string;
    image: string;
    id: string;
    nameEn: string; 
    nameKa: string; 
    capitalEn: string; 
    capitalKa: string; 
    population: string;
    vote: string;
    isDeleted?: boolean;
  }
  
  type CardAction =
    | { type: "ADD_CARD"; payload: Omit<Card, "id"> }
    | { type: "DELETE_CARD"; payload: { id: string } }
    | { type: "UNDO_DELETE"; payload: { id: string } }
    | { type: "VOTE_CARD"; id: string }
    | { type: "SORT_CARDS"; sortedAsc: boolean };
  
  export const cardsReducer = (state: Card[], action: CardAction): Card[] => {
    switch (action.type) {
        case "ADD_CARD":
            return [
                ...state,
                {
                    ...action.payload,
                    id: Date.now().toString(),
                    vote: "0",
                    isDeleted: false,
                },
            ];
        
  
      case "DELETE_CARD":
        return state.map((card) =>
          card.id === action.payload.id ? { ...card, isDeleted: true } : card
        );
  
      case "UNDO_DELETE":
        return state.map((card) =>
          card.id === action.payload.id ? { ...card, isDeleted: false } : card
        );
  
      case "VOTE_CARD":
        return state.map((card) =>
          card.id === action.id
            ? { ...card, vote: (parseInt(card.vote) + 1).toString() }
            : card
        );
  
      case "SORT_CARDS":
        return [...state].sort((a, b) => {
          if (action.sortedAsc) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
  
      default:
        return state;
    }
  };
  