import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import useHighScore from '../../../src/_hooks/useHighScore';
import { getRandomColorRGB } from '@src/colors';

const buttonArray = Array.from(Array(4).keys());

const useGame = () => {
  const [tilesForBlinking, setTilesForBlinking] = useState<number[]>([-1]);
  const [blinkingIndex, setBlinkingIndex] = useState(0);
  const [startBlinking, setStartBlinking] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameStatus, setGameStatus] = useState<
    'displayingSequence' | 'waitingForInput' | 'complete'
  >('displayingSequence');
  const [inputedSequence, setInputedSequence] = useState<number[]>([]);
  const [highscore, setHighscore] = useHighScore('highscore_simon');

  useEffect(() => {
    if (startBlinking) {
      const intervalId = setInterval(() => {
        setBlinkingIndex(
          (prevIndex) => (prevIndex + 1) % tilesForBlinking.length,
        );
      }, 1000); // Adjust the interval time as needed
      if (blinkingIndex === tilesForBlinking.length - 1) {
        clearInterval(intervalId);
        setStartBlinking(false);
        setBlinkingIndex(0);
        setGameStatus('waitingForInput');
      }
      return () => clearInterval(intervalId);
    }
  }, [startBlinking, blinkingIndex, tilesForBlinking.length]);

  const win = () => {
    setCurrentLevel((level) => level + 1);
    setTilesForBlinking((tiles) => [
      ...tiles,
      Math.floor(Math.random() * 4),
      -1,
    ]);
    setInputedSequence([]);
    setGameStatus('displayingSequence');
  };

  const loss = () => {
    setCurrentLevel(0);
    setGameStatus('complete');
    // todo save score
    if (currentLevel > highscore) {
      alert(`New High Score: ${currentLevel}\nrefresh the page to play again`);
      localStorage.setItem('highscore_simon', currentLevel.toString());
      setHighscore(currentLevel);
      return;
    }
    alert(`Gameover: ${currentLevel}\nrefresh the page to play again`);
  };

  useEffect(() => {
    const tiles = tilesForBlinking.filter((x) => x !== -1);
    if (gameStatus === 'displayingSequence') {
      setStartBlinking(true);
    } else if (gameStatus === 'waitingForInput') {
      const tilesUpToInputedSequence = tiles.slice(0, inputedSequence.length);
      if (!isEqual(tilesUpToInputedSequence, inputedSequence)) {
        loss();
      } else {
        if (tiles.length === inputedSequence.length) {
          win();
        }
      }
    }
  }, [gameStatus, inputedSequence, tilesForBlinking]);

  const handleClick = (index: number) => {
    setInputedSequence((prev) => [...prev, index]);
  };

  return {
    tilesForBlinking,
    highscore,
    currentLevel,
    gameStatus,
    blinkingIndex,
    handleClick,
  };
};

export default function SquareColors() {
  const {
    tilesForBlinking,
    highscore,
    currentLevel,
    blinkingIndex,
    handleClick,
    gameStatus,
  } = useGame();
  const [color, setColor] = useState('');
  useEffect(() => {
    setColor(getRandomColorRGB());
  }, []);
  return (
    <Container
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: 1 }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        sx={{ pb: 1 }}
      >
        <Typography
          variant="h5"
          sx={{ pl: 1, whiteSpace: 'nowrap', color: 'text.primary' }}
        >
          level: {currentLevel} highscore: {highscore}
        </Typography>
      </Stack>
      <Grid container spacing={0.5} display="flex" height="100%">
        {buttonArray.map((value) => (
          <Grid item key={value} xs={6} display="flex">
            <Button
              variant="contained"
              onClick={() => handleClick(value)}
              disabled={gameStatus === 'displayingSequence'}
              sx={{
                minWidth: 'unset',
                opacity: tilesForBlinking[blinkingIndex] === value ? 1 : 0.3,
                display: 'flex',
                width: '100%',
                height: '100%',
                aspectRatio: 1,
                backgroundColor: color,
                '&:hover': {
                  opacity: 0.7,
                  backgroundColor: color,
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
