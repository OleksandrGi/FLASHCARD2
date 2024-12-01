import { useState } from 'react';
import './app.css';
import {  languageEnglish, languageGerman, languageRussian } from './words';
import Button from "@mui/material/Button";
import { AppBar, Box, IconButton,  Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '@fontsource/roboto/400.css';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import Progress from './pages/progress';
import AddFlashCardsPage from './pages/AddFlashCardsPage';
import FlashCardsPage from './pages/FlashCardsPage';
import QuizPage from './pages/QuizPage';
import Navigation from './components/nsvigation';
import HomePage from './pages/HomePage';
import TestSolvePage from './pages/TestSolvePage';
import { LoginForm } from './components/loginForm';
import { Link } from 'react-router-dom';
import Account from './pages/Account';
import { useDispatch, useSelector } from 'react-redux';
import { GetTranslationAC } from './store/FlashCardReducer';
import { AppRootState } from './store/store';

export type CardsType = {
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
function App() {
  const [test, setTest] = useState<testType[]>([ 
    {id:1,title:'Test',training:'training 1',Questions:5, isDone:false},
])
  const [cards, setCards] = useState<Array<CardsType>>([
   
  ]);
  const [newWord, setNewWord] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<LanguageKey>('English');
  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>('Russian');
  const [newCardCategory, setNewCardCategory] = useState<string>('Basic'); 
  const [showTranslate, setShowTranslate] = useState<Keytype>({});
  const [AppBarT, setAppBarT] = useState<boolean>(false);


  const languageMap: Record<LanguageKey, { words: { id: number; word: string }[] }[]> = {
    English: languageEnglish,
    German: languageGerman,
    Russian: languageRussian,
  };
const dispatch =  useDispatch()

  function getTranslation(word: string) {
    const translation = useSelector((state: AppRootState) =>
  state.flashCards.find(card => card.word === newWord)?.translate || "Not translated"
);
   dispatch(GetTranslationAC(word, sourceLanguage, targetLanguage))
  }

  function handleAddWord() {
    if (!newWord) {
      alert('Введите слово для перевода');
      return;
    }
    const translation = getTranslation(newWord);
    const newCard = {
      id: cards.length + 1,
      word: newWord,
      translate: translation,
      learned: true,
      category: newCardCategory
    };
    setCards([...cards, newCard]);
    setNewWord('');
  }

  const toggleTranslateVisibility = (id: number) => {
    setShowTranslate((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  function changeTarget() {
    setAppBarT((state) => !state);
  }
  const [selectedTest, setSelectedTest] = useState<testType | any>();

  const handleStartLearn = (id: number) => {
    const foundTest = test.find((test) => test.id === id);
    setSelectedTest(foundTest);
  };

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={changeTarget}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FlashCards
            </Typography>
            <Link to="/Login">
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      {AppBarT && <Navigation />}
      
      <Routes>
        <Route path="/" element={<HomePage cards={cards} />} />
        <Route path="/AddFlashCardsPage" element={
          <AddFlashCardsPage 
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            handleAddWord={handleAddWord}
            newWord={newWord}
            setNewWord={setNewWord}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
          />
        } />
        <Route path="/FlashCardsPage" element={
          <FlashCardsPage
            toggleTranslateVisibility={toggleTranslateVisibility}
            showTranslate={showTranslate}
            cards={cards}
            setCards={setCards}
          />
        } />
        <Route path="/QuizPage" element={<QuizPage 
        test={test}
        setTest={setTest}
        handleStartLearn={handleStartLearn}/>
     
        } />
        <Route path="/progress" element={<Progress />} />
        <Route path="/testSolve" element={<TestSolvePage test={test}
        handleStartLearn={handleStartLearn}
        foundTest={selectedTest}
        />} />

        <Route path="/login" element={<LoginForm 
        />} />
        

        <Route path="/Account" element={<Account
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
