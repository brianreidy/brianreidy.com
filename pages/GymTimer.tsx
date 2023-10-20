import Head from 'next/head';
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
} from '@mui/material';

import colors from '@src/lib/colors';

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

type WorkoutType = 'main' | 'accessory';

const getProgress = (
  workoutType: WorkoutType | undefined,
  timer: number,
): number => {
  if (workoutType === 'main') {
    return (timer / (4 * 60)) * 100;
  } else if (workoutType === 'accessory') {
    return (timer / (2 * 60)) * 100;
  }
  return 0;
};

export default function GymTimer() {
  const [timer, setTimer] = useTimer(undefined);
  const [workoutType, setWorkoutType] = useState<WorkoutType | undefined>();
  const audioRef = useRef<HTMLAudioElement | null>(null); // Create a ref for the Audio element

  useEffect(() => {
    console.log(timer);
    if (timer) console.log(getProgress(workoutType, timer));

    if (timer === 0 && audioRef?.current !== null) {
      console.log('play');
      audioRef.current.play();
    }
  }, [timer, workoutType]);

  const handleFinishLiftClick = (workOutType: WorkoutType) => {
    if (workOutType === 'main') {
      setTimer(4 * 60);
    } else {
      setTimer(2 * 60);
    }
  };

  return (
    <Wrapper>
      <Head>
        <title>brian reidy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <audio ref={audioRef}>
        <source src="/cowBells.wav" type="audio/wav" />
      </audio>
      <CenterRail maxWidth="md">
        <CircularProgress
          variant="determinate"
          value={timer ? getProgress(workoutType, timer) : 0}
          size={'70%'}
          sx={{ display: 'flex' }}
        />
        {workoutType === undefined ? (
          <FormControl fullWidth>
            <ButtonGroup
              sx={{ pt: 2 }}
              orientation="vertical"
              aria-label="vertical outlined button group"
            >
              <Button
                key="main"
                sx={{ p: 2 }}
                onClick={() => setWorkoutType('main')}
              >
                Main Lift (4 min)
              </Button>
              <Button
                key="accessory"
                sx={{ p: 2 }}
                onClick={() => setWorkoutType('accessory')}
              >
                Accessory Lift (2 min)
              </Button>
            </ButtonGroup>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="contained"
            >
              <Button
                key="main"
                sx={{ p: 2 }}
                onClick={() => handleFinishLiftClick(workoutType)}
              >
                Start Rest
              </Button>
              <Button
                key="accessory"
                sx={{ p: 2 }}
                onClick={() => {
                  setWorkoutType(undefined);
                  setTimer(undefined);
                }}
              >
                Back
              </Button>
            </ButtonGroup>
          </FormControl>
        )}
      </CenterRail>
    </Wrapper>
  );
}
