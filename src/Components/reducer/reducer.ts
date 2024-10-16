export const cardsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return [
        ...state, 
        { ...action.payload, id: Date.now().toString(), vote: "0", isDeleted: false } 
      ];

    case "DELETE_CARD":
      return state.map((card: { id: string; }) => 
        card.id === action.payload.id
          ? { ...card, isDeleted: true }
          : card
      );

    case "UNDO_DELETE":
      return state.map((card) =>
        card.id === action.payload.id ? { ...card, isDeleted: false } : card 
      );

    case "VOTE_CARD":
      return state.map((card: { id: string; vote: string; }) =>
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
