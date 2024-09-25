import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { useEffect, useReducer, useState } from 'react';
import useHighScore from '../../../src/_hooks/useHighScore';
import { getRandomColorRGB } from '@src/colors';

const buttonArray = Array.from(Array(4).keys());

enum GameStatus {
  displayingSequence = 'displayingSequence',
  waitingForInput = 'waitingForInput',
}
type State = {
  currentLevel: number;
  highScore: number;
  tilesSequence: number[];
  tilesClicked: number[];
  gameStatus: GameStatus;
  tileIndexBlinking: number;
};

enum actions {
  'tileClicked' = 'tileClicked',
  'win' = 'win',
  'loss' = 'loss',
  'blink' = 'blink',
  'stopBlinking' = 'stopBlinking',
}

type TileClicked = {
  type: actions.tileClicked;
  payload: {
    tileClicked: number;
  };
};

type Win = {
  type: actions.win;
  payload: {
    newTileForSequence: number;
  };
};

type Blink = {
  type: actions.blink;
  payload: {};
};
type StopBlinking = {
  type: actions.stopBlinking;
  payload: {};
};
type Actions = TileClicked | Win | Blink | StopBlinking;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case actions.tileClicked:
      return {
        ...state,
        tilesClicked: [...state.tilesClicked, action.payload.tileClicked],
      };
    case actions.win:
      return {
        ...state,
        tilesClicked: [],
        gameStatus: GameStatus.displayingSequence,
        currentLevel: state.currentLevel + 1,
        tilesSequence: [
          ...state.tilesSequence,
          action.payload.newTileForSequence,
          -1,
        ],
      };
    case actions.blink:
      return {
        ...state,
        tileIndexBlinking: state.tileIndexBlinking + 1,
      };
    case actions.stopBlinking:
      return {
        ...state,
        gameStatus: GameStatus.waitingForInput,
        tileIndexBlinking: 0,
      };
    default:
      throw new Error();
  }
};

const initialState = {
  currentLevel: 0,
  highScore: 0,
  gameStatus: GameStatus.displayingSequence,
  tileIndexBlinking: 0,
  tilesClicked: [],
  tilesSequence: [-1],
};

const useGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [highscore, setHighscore] = useHighScore('highscore_simon');
  const {
    currentLevel,
    gameStatus,
    tileIndexBlinking,
    tilesClicked,
    tilesSequence,
  } = state;

  useEffect(() => {
    if (gameStatus === GameStatus.displayingSequence) {
      const intervalId = setInterval(
        () => dispatch({ type: actions.blink, payload: {} }),
        1000,
      ); // Adjust the interval time as needed
      if (tileIndexBlinking >= tilesSequence.length - 1) {
        clearInterval(intervalId);
        dispatch({ type: actions.stopBlinking, payload: {} });
      }
      return () => clearInterval(intervalId);
    }
  }, [gameStatus, tileIndexBlinking, tilesSequence.length]);

  const win = () =>
    dispatch({
      type: actions.win,
      payload: { newTileForSequence: Math.floor(Math.random() * 4) },
    });

  const loss = () => {
    if (currentLevel > highscore) {
      setHighscore(currentLevel);
      localStorage.setItem('highscore_simon', currentLevel.toString());
      alert(`New High Score: ${currentLevel}\nrefresh the page to play again`);
      return;
    }
    alert(`Gameover: ${currentLevel}\nrefresh the page to play again`);
  };

  useEffect(() => {
    const tiles = tilesSequence.filter((x) => x !== -1);
    if (gameStatus === 'waitingForInput') {
      const tilesUpToInputedSequence = tiles.slice(0, tilesClicked.length);
      if (!isEqual(tilesUpToInputedSequence, tilesClicked)) {
        loss();
      } else {
        if (tiles.length === tilesClicked.length) {
          win();
        }
      }
    }
  }, [gameStatus, tilesClicked, tilesSequence]);

  const handleClick = (index: number) =>
    dispatch({ type: actions.tileClicked, payload: { tileClicked: index } });

  return {
    tilesSequence,
    highscore,
    currentLevel,
    isDisplayingSequence: gameStatus === 'displayingSequence',
    tileIndexBlinking,
    handleClick,
  };
};

export default function SquareSimon() {
  const {
    tilesSequence,
    highscore,
    currentLevel,
    tileIndexBlinking,
    handleClick,
    isDisplayingSequence,
  } = useGame();
  const [color, setColor] = useState('');
  useEffect(() => {
    setColor(getRandomColorRGB());
  }, []);

  return (
    <Container
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        py: 1,
      }}
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
              sx={{
                minWidth: 'unset',
                opacity: tilesSequence[tileIndexBlinking] === value ? 1 : 0.3,
                display: 'flex',
                width: '100%',
                height: '100%',
                aspectRatio: 1,
                backgroundColor: isDisplayingSequence ? 'none' : color,
                ':hover': {
                  opacity: tilesSequence[tileIndexBlinking] === value ? 1 : 0.3,
                  backgroundColor: isDisplayingSequence ? 'none' : color,
                },
              }}
              disabled={isDisplayingSequence}
            >
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
