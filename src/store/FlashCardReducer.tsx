
import { CardsType, LanguageKey } from "../types";
import { languageEnglish, languageGerman, languageRussian } from "../words";


const initialState: CardsType[] =[]
// Типы экшенов
type ActionTrasnlationFunc = {
  type: "TRANSLATION-FUNCTION";
  id:number,
  word:string,
  translate:string,
  learned:boolean,
  category:string,
  showTranslate:boolean
}
type GetTranslationAction = {
  type: "GET-TRANSLATION";
  sourceLanguage: LanguageKey;
  targetLanguage: LanguageKey;
  word: string;
};

type AddCardAction = {
  type: "ADD-CARD";
  card: CardsType;
};

type ToggleTranslateAction = {
  type: "TOGGLE-TRANSLATE";
  id: number;
};

type SetCardsAction = {
  type: "SET-CARDS";
  cards: CardsType[];
};

type UpdateCardAction = {
  type: "UPDATE-CARD";
  card: CardsType;
};

type AllActions = ActionTrasnlationFunc |   GetTranslationAction|AddCardAction| ToggleTranslateAction| SetCardsAction | UpdateCardAction;


export const FlashCardReducer = (
  state: CardsType[] = initialState,
  action: AllActions
): CardsType[] => {
  switch (action.type) {
    case "GET-TRANSLATION": {
      const languageMap: Record<LanguageKey, { words: { id: number; word: string }[] }[]> = {
        English: languageEnglish,
        German: languageGerman,
        Russian: languageRussian,
      };

      const sourceWords = languageMap[action.sourceLanguage][0].words;
      const targetWords = languageMap[action.targetLanguage][0].words;

      const wordObject = sourceWords.find((w) => w.word === action.word);
      if (wordObject) {
        const translatedWord =
          targetWords.find((t) => t.id === wordObject.id)?.word ||
          "Translation not found";

        return state.map((card) =>
          card.word === action.word
            ? { ...card, translate: translatedWord }
            : card
        );
      }
      return state;
    }

    case "ADD-CARD":
      return [...state, action.card];

    case "TOGGLE-TRANSLATE":
      return state.map((card) =>
        card.id === action.id
          ? { ...card, showTranslate: !card.showTranslate }
          : card
      );

    case "SET-CARDS":
      return action.cards;

    case "UPDATE-CARD":
      return state.map((c) => (c.id === action.card.id ? action.card : c));

    case "TRANSLATION-FUNCTION": {
      const newCard = {
        id: action.id,
        word: action.word,
        translate: action.translate,
        learned: action.learned,
        category: action.category,
        showTranslate: action.showTranslate,
      };

      return [...state, newCard];
    }

    default:
      return state;
  }
};

// Экшены
export const GetTranslationAC = (
  word: string,
  sourceLanguage: LanguageKey,
  targetLanguage: LanguageKey
): GetTranslationAction => ({
  type: "GET-TRANSLATION",
  word,
  sourceLanguage,
  targetLanguage,
});

export const AddCardAC = (card: CardsType): AddCardAction => ({
  type: "ADD-CARD",
  card,
});

export const ToggleTranslateAC = (id: number): ToggleTranslateAction => ({
  type: "TOGGLE-TRANSLATE",
  id,
});

export const SetCardsAC = (cards: CardsType[]): SetCardsAction => ({
  type: "SET-CARDS",
  cards,
});

export const UpdateCardAC = (card: CardsType): UpdateCardAction => ({
  type: "UPDATE-CARD",
  card,
});
export const TRANSLATION_FUNCTION_AC = (
  id: number,
  word: string,
  translate: string,
  learned: boolean,
  category: string,
  showTranslate: boolean
): ActionTrasnlationFunc => ({
  type: "TRANSLATION-FUNCTION",
  id,
  word,
  translate,
  learned,
  category,
  showTranslate,
})
