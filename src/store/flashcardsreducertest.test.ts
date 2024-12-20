
import { FlashCardReducer, GetTranslationAC } from "./FlashCardReducer";
import { CardsType, LanguageKey } from "../types";


const mockLanguageEnglish = [
  {
    words: [
      { id: 1, word: "hello" },
      { id: 2, word: "world" },
    ],
  },
];
const mockLanguageGerman = [
  {
    words: [
      { id: 1, word: "hallo" },
      { id: 2, word: "welt" },
    ],
  },
];
const mockLanguageRussian = [
  {
    words: [
      { id: 1, word: "привет" },
      { id: 2, word: "мир" },
    ],
  },
];


const initialState: CardsType[] = [
  { id: 1, word: "hello", translate: "", learned: false, category: "greetings", showTranslate: false },
];

describe("FlashCardReducer", () => {
  it("should translate the word and not return undefined", () => {
    const action = GetTranslationAC("hello", "English" as LanguageKey, "German" as LanguageKey);

    const languageEnglish = mockLanguageEnglish;
    const languageGerman = mockLanguageGerman;
    const languageRussian = mockLanguageRussian;

    const newState = FlashCardReducer(initialState, action);

    expect(newState[0].translate).toBe("hallo");
  });
});
