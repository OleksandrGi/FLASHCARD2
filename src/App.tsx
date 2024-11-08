import { useState } from 'react';
import './app.css';
import { languageEnglish, languageGerman, languageRussian } from './words';
import Button from "@mui/material/Button";
import { AppBar, Box, IconButton, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import '@fontsource/roboto/400.css';
import FlashCards from './components/flashcard';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Progress from './pages/progress';
import AddFlashCardsPage from './pages/AddFlashCardsPage';
import FlashCardsPage from './pages/FlashCardsPage';
import QuizPage from './pages/QuizPage';
import Navigation from './components/nsvigation';
import HomePage from './pages/HomePage';


export type CardsType = {
  id: number;
  word: string;
  translate: string;
};
export type Keytype = {
  [key: number]: boolean;
};

export type LanguageKey = 'English' | 'German' | 'Russian';

function App() {
  const [cards, setCards] = useState<Array<CardsType>>([]);
  const [newWord, setNewWord] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<LanguageKey>('English');
  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>('Russian');
  const [showTranslate, setShowTranslate] = useState<Keytype>({});

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

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FlashCards
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

  <Navigation/>
      {/* Маршрутизация */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage/>
          }
        />
       
        <Route path="/AddFlashCardsPage" element={<AddFlashCardsPage 
        setSourceLanguage={setSourceLanguage}
        setTargetLanguage={setTargetLanguage}
        handleAddWord={handleAddWord}
        newWord={newWord}
        setNewWord={setNewWord}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}

        />} />
        <Route path="/FlashCardsPage" element={<FlashCardsPage/>} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
      <FlashCards
                toggleTranslateVisibility={toggleTranslateVisibility}
                showTranslate={showTranslate}
                cards={cards}
                setCards={setCards}
              />
    </BrowserRouter>
    
  );
}

export default App;
