// cardsReducer.ts
export const cardsReducer = (state, action) => {
    switch (action.type) {
      case "VOTE_CARD":
        return state.map(card =>
          card.id === action.id ? { ...card, vote: card.vote + 1 } : card
        );
      case "DELETE_CARD":
        // Filter out the card that matches the ID provided in the action
        return state.filter(card => card.id !== action.id);
      case "SORT_CARDS":
        return [...state].sort((a, b) =>
          action.sortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
      default:
        return state;
    }
  };
  