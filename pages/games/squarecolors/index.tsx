import {
  Button,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getDifferentRGB, getRandomColor, rgb } from '@src/colors';
import useHighScore from '../../../src/_hooks/useHighScore';

const buttonArray = Array.from(Array(36).keys()); // creates an array of 49 numbers from 0 to 48

function levelIndex(currentLevel: number) {
  console.log('currentLevel', currentLevel);
  const final = 50 / (1 + currentLevel / 25) ** 2;
  console.log('final', final);
  return final;
}

const initialRGB = { r: 33, g: 158, b: 188 };

const useGameTimer = (): [number, (n: number) => void] => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  return [timer, setTimer];
};

const useBlinking = (): [boolean, (b: boolean) => void] => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [startBlinking, setStartBlinking] = useState(false);

  useEffect(() => {
    if (startBlinking) {
      const blinkInterval = setInterval(() => {
        setIsBlinking((prevIsBlinking) => !prevIsBlinking);
      }, 500);

      // stop blinking after 5 seconds
      setTimeout(() => {
        clearInterval(blinkInterval);
        setIsBlinking(false);
      }, 5000);

      return () => clearInterval(blinkInterval);
    }
  }, [startBlinking]);
  return [isBlinking, setStartBlinking];
};

const useGame = () => {
  const [color, setColor] = useState(rgb(initialRGB));
  const [offColor, setOffColor] = useState(
    rgb(getDifferentRGB(initialRGB, 60)),
  );
  const [selectedTile, setSelectedTile] = useState(5);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'complete'>(
    'idle',
  );

  const [highscore, setHighscore] = useHighScore('highscore');
  const [isBlinking, setStartBlinking] = useBlinking();
  const [timer, setTimer] = useGameTimer();

  const win = () => {
    const newBaseColor = getRandomColor();
    setColor(rgb(newBaseColor));
    setSelectedTile(Math.floor(Math.random() * 36));
    setScore(score + currentLevel * timer);
    setCurrentLevel(currentLevel + 1);
    setOffColor(rgb(getDifferentRGB(newBaseColor, levelIndex(currentLevel))));
    setStartBlinking(false);
    setTimer(10);
    if (gameStatus === 'complete') {
      setGameStatus('playing');
      setScore(0);
    }
  };

  const loss = () => {
    setCurrentLevel(0);
    setGameStatus('complete');
    setStartBlinking(true);
    setTimer(0);

    // todo save score
    if (score > highscore) {
      localStorage.setItem('highscore', score.toString());
      setHighscore(score);
    }
  };

  useEffect(() => {
    if (timer === 0 && gameStatus === 'complete') {
      loss();
    }
  }, [timer, gameStatus]);

  const handleClick = (index: number) => {
    if (selectedTile === index) {
      win();
    } else {
      loss();
    }
  };
  return {
    color,
    offColor,
    selectedTile,
    score,
    highscore,
    currentLevel,
    timer,
    isGameComplete: gameStatus === 'complete',
    isBlinking,
    handleClick,
  };
};

export default function SquareColors() {
  const {
    color,
    offColor,
    selectedTile,
    score,
    highscore,
    currentLevel,
    timer,
    isBlinking,
    handleClick,
  } = useGame();
  return (
    <Container
      sx={{ height: '100dvh', display: 'flex', flexDirection: 'column', py: 1 }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        sx={{ pb: 1 }}
      >
        <LinearProgress
          variant="determinate"
          value={timer * 10}
          sx={{ my: 1, width: '100%' }}
        />
        <Typography
          variant="h5"
          sx={{ pl: 1, whiteSpace: 'nowrap', color: 'text.primary' }}
        >
          level: {currentLevel} score: {score} highscore: {highscore}
        </Typography>
      </Stack>
      <Grid container spacing={0.5} display="flex" height="100%">
        {buttonArray.map((value) => (
          <Grid item key={value} xs={2} display="flex">
            <Button
              variant="contained"
              onClick={() => handleClick(value)}
              sx={{
                minWidth: 'unset',
                opacity: isBlinking && selectedTile === value ? 0.5 : 1,
                display: 'flex',
                width: '100%',
                height: '100%',
                aspectRatio: 1,
                backgroundColor: selectedTile === value ? offColor : color,
                '&:hover': {
                  backgroundColor: selectedTile === value ? offColor : color,
                },
              }}
            >
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
