export type CardsType = {
  showTranslate: boolean
    id: number;
    word: string;
    translate: string;
    learned: boolean;
    category: string;
   
  };
  export type Keytype = {
    [key: number]: boolean;
  };
  export type testType = {
    id:number,
    title:string,
    training:string,
    Questions:number,
    isDone:boolean
  
  }
  
  export type LanguageKey = 'English' | 'German' | 'Russian';
  export type CardsStateType = {
    [key: string]: CardsType;
  };