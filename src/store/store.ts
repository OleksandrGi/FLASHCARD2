import { combineReducers, createStore } from "redux";
import { FlashCardReducer } from "./FlashCardReducer";



const rootReducer = combineReducers({
    flashCards: FlashCardReducer, // <- это "flashCards"
  });
  export const Store = createStore(rootReducer)
export type AppRootState = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = Store;