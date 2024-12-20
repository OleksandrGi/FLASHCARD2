import { Box, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { Category} from '../words';
import { CardsType } from '../types';

type  MainPageType ={
    cards:CardsType[]
}

const MainPage = (props:MainPageType) => {
  
  const flashcards = props.cards

  const category = Category.categories

  const learnedWords = flashcards.filter((card) => card.learned).length;
  const totalWords = flashcards.length;
  const dailyGoal = 5;
  const dailyProgress = Math.min((learnedWords / dailyGoal) * 100, 100);

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Готовы выучить новые слова?
      </Typography>

    
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6">Общий прогресс</Typography>
        <CircularProgress variant="determinate" value={dailyProgress} size={100} />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {learnedWords} из {totalWords} слов изучены
        </Typography>
      </Box>

     
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Категории</Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {category.map((category) => (
            <Card key={category} sx={{ minWidth: 120, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="body1">{category}</Typography>
                <Typography variant="body2">{flashcards.filter(card => card.category === category).length} слов</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

    
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Последние добавленные карточки</Typography>
        <Box display="flex" gap={2}>
          {flashcards.slice(-5).map((card, index) => (
            <Card key={index} sx={{ minWidth: 100, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="body1">{card.word}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

    
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Button component={Link} to="/AddFlashCardsPage" variant="contained" color="primary" sx={{ mr: 2 }}>
          Добавить новую карточку
        </Button>
        <Button component={Link} to="/QuizPage" variant="outlined" color="secondary">
          Начать тренировку
        </Button>
      </Box>

      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">Ежедневная цель</Typography>
        <CircularProgress variant="determinate" value={dailyProgress} size={80} />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {learnedWords} из {dailyGoal} слов выучены на сегодня
        </Typography>
        {dailyProgress < 100 && (
          <Button component={Link} to="/test" variant="contained" color="success" sx={{ mt: 2 }}>
            Завершить цель
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MainPage;
