// cardsReducer.js
export const cardsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return [...state, { ...action.payload, id: Date.now().toString(), vote: "0" }]; // Assign a unique ID
    case "DELETE_CARD":
      return state.filter((card) => card.id !== action.id);
    case "VOTE_CARD":
      return state.map((card) =>
        card.id === action.id ? { ...card, vote: (parseInt(card.vote) + 1).toString() } : card
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
