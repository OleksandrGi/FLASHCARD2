import { combineReducers, createStore } from "redux";
import { FlashCardReducer } from "./FlashCardReducer";


export const Store = createStore(FlashCardReducer)

export type AppRootState = ReturnType<typeof FlashCardReducer>;

//@ts-ignore
window.store = Store;