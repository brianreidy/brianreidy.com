import Head from 'next/head';
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

import colors from '@src/colors';

const Wrapper = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background.primary};
  height: 100vh;
  overflow: hidden;
`;
const CenterRail = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px; 0px;
  flex-direction: column;
  height: 100%;
`;

const useTimer = (
  def: number | undefined,
): [number | undefined, (n: number | undefined) => void] => {
  const [timer, setTimer] = useState<number | undefined>(def);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer ? prevTimer - 1 : prevTimer));
    }, 1000);

    if (timer === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  return [timer, setTimer];
};

const getProgress = (timer: number): number => {
  return (timer / (25 * 60)) * 100;
};

export default function PomoTimer() {
  const [timer, setTimer] = useTimer(25 * 60);
  const [timerState, setTimerState] = useState<'work' | 'break'>('work');
  // const [timer, setTimer] = useTimer(1);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Create a ref for the Audio element

  useEffect(() => {
    if (timer === 0 && audioRef?.current !== null) {
      audioRef.current.play();
      if (timerState === 'work') {
        setTimer(5 * 60);
        setTimerState('break');
      } else {
        setTimer(25 * 60);
        setTimerState('work');
      }
    }
  }, [timer]);

  const handleStartBreakClick = () => {
    setTimer(5 * 60);
    setTimerState('break');
  };

  const handleStartWorkClick = () => {
    setTimer(5 * 60);
    setTimerState('break');
  };

  return (
    <Wrapper>
      <Head>
        <title>Pomodoro Timer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <audio ref={audioRef}>
        <source src="/cowBells.wav" type="audio/wav" />
      </audio>

      <CenterRail maxWidth="md">
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            variant="determinate"
            color={timerState === 'work' ? 'primary' : 'success'}
            value={timer ? getProgress(timer) : 0}
            sx={{ display: 'flex', alignItems: 'center' }}
            size={'70%'}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              {timerState === 'work' ? 'go' : 'break'}
            </Typography>
          </Box>
        </Box>

        <FormControl>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            variant="text"
          >
            <Button key="break" sx={{ p: 2 }} onClick={handleStartBreakClick}>
              Start Break
            </Button>
            <Button key="work" sx={{ p: 2 }} onClick={handleStartWorkClick}>
              Start Work
            </Button>
          </ButtonGroup>
        </FormControl>
      </CenterRail>
    </Wrapper>
  );
}
