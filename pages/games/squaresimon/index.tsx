import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import isEqual from 'lodash/isEqual';
import compact from 'lodash/compact';
import { useEffect, useState } from 'react';

const buttonArray = Array.from(Array(4).keys());

const colors = [
  { r: 142, g: 202, b: 233 },
  { r: 33, g: 158, b: 188 },
  { r: 2, g: 48, b: 71 },
  { r: 255, g: 183, b: 3 },
  { r: 251, g: 133, b: 0 },
];
function rgb({ r, g, b }: { r: number; g: number; b: number }) {
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

const tilesForBlinking = [0, -1, 1, -1, 2, -1, 2, -1];
const tiles = tilesForBlinking.filter((x) => x !== -1);

const useHighScore = (): [number, (n: number) => void] => {
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialHighScore = localStorage.getItem('highscore_simon');
      if (initialHighScore) {
        setHighscore(parseInt(initialHighScore));
      }
    }
  }, []);
  return [highscore, setHighscore];
};

const useGame = () => {
  const [blinkingIndex, setBlinkingIndex] = useState(0);
  const [startBlinking, setStartBlinking] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameStatus, setGameStatus] = useState<
    'displayingSequence' | 'waitingForInput' | 'complete'
  >('displayingSequence');

  const [inputedSequence, setInputedSequence] = useState<number[]>([]);

  const [highscore, setHighscore] = useHighScore();

  useEffect(() => {
    if (startBlinking) {
      const intervalId = setInterval(() => {
        setBlinkingIndex(
          (prevIndex) => (prevIndex + 1) % tilesForBlinking.length,
        );
      }, 1000); // Adjust the interval time as needed
      if (blinkingIndex === tilesForBlinking.length - 1) {
        clearInterval(intervalId);
        setGameStatus('waitingForInput');
      }
      return () => clearInterval(intervalId);
    }
  }, [startBlinking, blinkingIndex, tiles.length]);

  const win = () => {
    console.log('win');
    setCurrentLevel((level) => level + 1);
    setGameStatus('displayingSequence');
  };

  const loss = () => {
    console.log('loss');
    setCurrentLevel(0);
    setGameStatus('complete');

    // todo save score
    if (currentLevel > highscore) {
      localStorage.setItem('highscore_simon', currentLevel.toString());
      setHighscore(currentLevel);
    }
  };

  useEffect(() => {
    if (gameStatus === 'displayingSequence') {
      setStartBlinking(true);
    } else if (gameStatus === 'waitingForInput') {
      const blah = tiles.slice(0, inputedSequence.length);
      console.log('tiles', tiles);
      console.log('blah', blah);
      console.log('inputedSequence', inputedSequence);

      if (!isEqual(blah, inputedSequence)) {
        loss();
      } else {
        if (tiles.length === inputedSequence.length) {
          win();
        }
      }
    }
  }, [gameStatus, inputedSequence]);

  useEffect(() => {}, [inputedSequence]);

  const handleClick = (index: number) => {
    setInputedSequence((prev) => [...prev, index]);
  };

  return {
    highscore,
    currentLevel,
    gameStatus,
    blinkingIndex,
    handleClick,
  };
};

export default function SquareColors() {
  const { highscore, currentLevel, blinkingIndex, handleClick, gameStatus } =
    useGame();
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
                opacity: tilesForBlinking[blinkingIndex] === value ? 1 : 0.7,
                display: 'flex',
                width: '100%',
                height: '100%',
                aspectRatio: 1,
                backgroundColor: rgb(colors[0]),
                '&:hover': {
                  opacity: 1,
                  backgroundColor: rgb(colors[0]),
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
