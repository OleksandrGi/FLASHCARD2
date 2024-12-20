import './app.css';
import Button from "@mui/material/Button";
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '@fontsource/roboto/400.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Progress from './pages/progress';
import AddFlashCardsPage from './pages/AddFlashCardsPage';
import FlashCardsPage from './pages/FlashCardsPage';
import QuizPage from './pages/QuizPage';
import Navigation from './components/nsvigation';
import HomePage from './pages/HomePage';
import TestSolvePage from './pages/TestSolvePage';
import { LoginForm } from './components/loginForm';
import Account from './pages/Account';
import { useDispatch, useSelector } from 'react-redux';
import {  GetTranslationAC, TRANSLATION_FUNCTION_AC, ToggleTranslateAC } from './store/FlashCardReducer';
import { AppRootState } from './store/store';
import { LanguageKey, testType } from './types';
import { useState } from 'react';
import { languageEnglish, languageGerman, languageRussian } from './words';

function App() {
  const dispatch = useDispatch();
  const cards = useSelector((state: AppRootState) => state.flashCards);

  const translations = useSelector((state: AppRootState) => state.flashCards);

  const [test, setTest] = useState<testType[]>([
    { id: 1, title: 'Test', training: 'training 1 Test', Questions: 5, isDone: false },
    { id: 2, title: 'Test', training: 'training 1 Learn', Questions: 5, isDone: false },
    { id: 3, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 4, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 5, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 6, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 7, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 8, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 9, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 10, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 11, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
    { id: 12, title: 'Test', training: 'training 1', Questions: 5, isDone: false },
  ]);

  const [newWord, setNewWord] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<LanguageKey>('English');
  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>('Russian');
  const [newCardCategory, setNewCardCategory] = useState<string>('Basic');
  const [AppBarT, setAppBarT] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<testType | any>();

  const getTranslation = (word: string) => {
    dispatch(GetTranslationAC(word, sourceLanguage, targetLanguage));
    const card = translations.find((card) => card.word === word);
    return card?.translate || 'Not translated';
  };

  const handleAddWord = () => {
    if (!newWord) {
      alert('Введите слово для перевода');
      return;
    }
  
    const languageMap: Record<LanguageKey, { words: { id: number; word: string }[] }[]> = {
      English: languageEnglish,
      German: languageGerman,
      Russian: languageRussian,
    };
  
    const sourceWords = languageMap[sourceLanguage][0].words;
    const targetWords = languageMap[targetLanguage][0].words;
  
    const wordObject = sourceWords.find((w) => w.word === newWord);
    const translation =
      wordObject && targetWords.find((t) => t.id === wordObject.id)?.word
        ? targetWords.find((t) => t.id === wordObject.id)?.word
        : "Translation not found";
  
    
    dispatch(
      TRANSLATION_FUNCTION_AC(
        Date.now(),
        newWord,
        translation || "Translation not found",
        false, //learned
        newCardCategory,
        false 
      )
    );
  
    setNewWord('');
  };
  const toggleTranslateVisibility = (id: number) => {
    dispatch(ToggleTranslateAC(id));
  };

  const changeTarget = () => setAppBarT((prev) => !prev);

  const handleStartLearn = (id: number) => {
    const foundTest = test.find((test) => test.id === id);
    setSelectedTest(foundTest );
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
            cards={cards}
          />
        } />
        <Route path="/QuizPage" element={
          <QuizPage 
            test={test}
            setTest={setTest}
            handleStartLearn={handleStartLearn}
          />
        } />
        <Route path="/progress" element={<Progress />} />
        <Route path="/testSolve" element={
          <TestSolvePage 
            test={test}
            handleStartLearn={handleStartLearn}
            foundTest={selectedTest}
          />
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
