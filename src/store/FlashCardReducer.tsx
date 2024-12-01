import { CardsStateType, CardsType, LanguageKey } from "../App";
import { languageEnglish, languageGerman, languageRussian } from "../words";


const initialState: CardsType[] = [
  { id: 30, word: 'wolke', category: 'Nature', translate:'trasalte',learned:false }
];



type GetTranslationAction = {
    type: 'GET-TRANSLATION',
    sourceLanguage:LanguageKey,
    targetLanguage:LanguageKey,
    word:string


}

type AllActions = GetTranslationAction;

export const FlashCardReducer = (state: CardsType[] = initialState, action: AllActions): CardsType[] => {
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
          const translatedWord = targetWords.find((t) => t.id === wordObject.id)?.word || "Translation not found";
  
          const updatedState = state.map((card) =>
            card.word === action.word ? { ...card, translate: translatedWord } : card
          );
  
         
          if (!state.some((card) => card.word === action.word)) {
            return [
              ...updatedState,
              { id: Date.now(), word: action.word, category: "Uncategorized", translate: translatedWord, learned: false },
            ];
          }
  
          return updatedState;
        }
        return state; 
      }
      default:
        return state;
    }
  };
  export const GetTranslationAC = (word: string,sourceLanguage: LanguageKey,targetLanguage:LanguageKey):GetTranslationAction => {
    return { type: "GET-TRANSLATION", word, sourceLanguage, targetLanguage };
  };
  