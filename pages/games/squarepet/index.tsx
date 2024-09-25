import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';

type PetProps = {
  name: string;
};

type PetState = {
  hunger: number;
  happiness: number;
  energy: number;
};
function TextArt({ label, text }: { label: string; text: string }) {
  return (
    <Box
      component="pre"
      aria-label={label}
      sx={{
        backgroundColor: 'hsla(0, 0%, 50%, 0.15)',
        fontFamily: 'monospace',
        fontSize: '1rem',
        lineHeight: 1,
        overflow: 'auto',
        padding: '1rem',
        whiteSpace: 'pre',
      }}
    >
      {text}
    </Box>
  );
}

const hungry = ' ________\n |  ____  |\n | | 🤤 | |\n | |_🍕_| |\n |________|';
const sad = ' ________\n |  ____  |\n | | 😢 | |\n | |_💔_| |\n |________|';
const tired = ' ________\n |  ____  |\n | | 😪 | |\n | |_🛌_| |\n |________|';
const Pet: React.FC<PetProps> = ({ name }) => {
  const [petState, setPetState] = useState<PetState>({
    hunger: 50,
    happiness: 50,
    energy: 50,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update Pet's stats periodically
      setPetState((prevState) => ({
        hunger: Math.max(0, prevState.hunger - 5),
        happiness: Math.max(0, prevState.happiness - 3),
        energy: Math.max(0, prevState.energy - 2),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const feedPet = () => {
    setPetState((prevState) => ({
      ...prevState,
      hunger: Math.min(100, prevState.hunger + 10),
    }));
  };

  const playWithPet = () => {
    setPetState((prevState) => ({
      ...prevState,
      happiness: Math.min(100, prevState.happiness + 15),
      energy: Math.max(0, prevState.energy - 10),
    }));
  };

  const sleepPet = () => {
    setPetState((prevState) => ({
      ...prevState,
      energy: Math.min(100, prevState.energy + 20),
    }));
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Hunger: {petState.hunger}</p>
      <p>Happiness: {petState.happiness}</p>
      <p>Energy: {petState.energy}</p>
      {petState.hunger < 70 && <TextArt label="hunger" text={hungry} />}
      {petState.happiness < 70 && <TextArt label="hunger" text={sad} />}
      {petState.energy < 70 && <TextArt label="hunger" text={tired} />}
      <Button sx={{ m: 1 }} variant="contained" onClick={feedPet}>
        Feed
      </Button>
      <Button sx={{ m: 1 }} variant="contained" onClick={playWithPet}>
        Play
      </Button>
      <Button sx={{ m: 1 }} variant="contained" onClick={sleepPet}>
        Sleep
      </Button>
    </div>
  );
};

export default Pet;
