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
import { link } from 'fs';
import { Link } from 'react-router-dom';

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

function App() {
  const [test, setTest] = useState<testType[]>([ 
    {id:1,title:'Test',training:'training 1',Questions:10, isDone:false},
{id:2,title:'Test1',training:'training 2',Questions:15, isDone:false},
{id:3,title:'Test2',training:'training 2',Questions:5, isDone:false},
{id:4,title:'Test3',training:'training 3',Questions:40, isDone:false},
{id:5,title:'Test4',training:'training 4',Questions:25, isDone:false},
{id:6,title:'Test5',training:'training 5',Questions:31, isDone:false},
{id:7,title:'Test6',training:'training 6',Questions:10, isDone:false},
{id:8,title:'Test7',training:'training 7',Questions:5, isDone:false},
{id:9,title:'Test8',training:'training 8',Questions:1, isDone:false},
{id:10,title:'Test9',training:'training 9',Questions:90, isDone:false},
{id:11,title:'Test10',training:'training 10',Questions:50, isDone:false},
{id:12,title:'Test11',training:'training 11',Questions:20, isDone:false},
{id:13,title:'Test12',training:'training 12',Questions:10, isDone:false},
{id:14,title:'Test13',training:'training 13',Questions:90, isDone:false},
{id:15,title:'Test14',training:'training 14',Questions:50, isDone:false},
{id:16,title:'Test15',training:'training 15',Questions:15, isDone:false},
{id:17,title:'Test16',training:'training 16',Questions:16, isDone:false},
{id:18,title:'Test17',training:'training 17',Questions:17, isDone:false},
{id:19,title:'Test18',training:'training 18',Questions:18, isDone:false},
{id:20,title:'Test19',training:'training 19',Questions:12, isDone:false},])
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

  function getTranslation(word: string): string {
    const sourceWords = languageMap[sourceLanguage][0].words;
    const targetWords = languageMap[targetLanguage][0].words;

    const wordObject = sourceWords.find((w) => w.word === word);
    if (wordObject) {
      const translatedWord = targetWords.find((t) => t.id === wordObject.id);
      return translatedWord ? translatedWord.word : 'Translation not found';
    }
    return 'Word not found in source language';
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
