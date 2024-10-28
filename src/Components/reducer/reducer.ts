import { ICountryCard } from "@/Components/cardPage/AboutCard";

type AddCardPayload = Omit<ICountryCard, 'id' | 'vote' | 'isDeleted'>
interface DeleteCardPayload { id: string; }
interface UndoDeletePayload { id: string; }
interface VoteCardPayload { id: string; }

interface CardAction {
  type: "ADD_CARD" | "DELETE_CARD" | "UNDO_DELETE" | "VOTE_CARD";
  payload?: AddCardPayload | DeleteCardPayload | UndoDeletePayload | VoteCardPayload;
}

const cardsReducer = (state: ICountryCard[], action: CardAction): ICountryCard[] => {
  switch (action.type) {
    case "ADD_CARD":
      return [
        ...state,
        {
          ...action.payload,
          id: Date.now().toString(),
          vote: 0,
          isDeleted: false,
        } as ICountryCard,
      ];

    case "DELETE_CARD":
      return state.map((card) =>
        card.id === (action.payload as DeleteCardPayload).id ? { ...card, isDeleted: true } : card,
      );

    case "UNDO_DELETE":
      return state.map((card) =>
        card.id === (action.payload as UndoDeletePayload).id ? { ...card, isDeleted: false } : card,
      );

    case "VOTE_CARD":
      return state.map((card) =>
        card.id === (action.payload as VoteCardPayload).id ? { ...card, vote: card.vote + 1 } : card,
      );

    default:
      return state;
  }
};



export { cardsReducer };
