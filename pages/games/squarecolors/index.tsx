import { Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const buttonArray = Array.from(Array(36).keys()); // creates an array of 49 numbers from 0 to 48

const colors = [
  { r: 142, g: 202, b: 230 },
  { r: 33, g: 158, b: 188 },
  { r: 2, g: 48, b: 71 },
  { r: 255, g: 183, b: 3 },
  { r: 251, g: 133, b: 0 },
];

function rgb({ r, g, b }: { r: number; g: number; b: number }) {
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function levelIndex(currentLevel: number) {
  console.log('currentLevel', currentLevel);
  const final = 50 / (1 + currentLevel / 25) ** 2;
  console.log('final', final);
  return final;
}

function getDifferentRGB(
  { r, g, b }: { r: number; g: number; b: number },
  index: number,
) {
  const rOffset = Math.max(0, Math.min(255, r + index));
  const gOffset = Math.max(0, Math.min(255, g + index));
  const bOffset = Math.max(0, Math.min(255, b + index));
  return { r: rOffset, g: gOffset, b: bOffset };
}
const initialRGB = { r: 33, g: 158, b: 188 };

const useGame = () => {
  const [color, setColor] = useState(rgb(initialRGB));
  const [offColor, setOffColor] = useState(
    rgb(getDifferentRGB(initialRGB, 60)),
  );
  const [selectedTile, setSelectedTile] = useState(5);
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleClick = (index: number) => {
    const newBaseColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(rgb(newBaseColor));
    setSelectedTile(Math.floor(Math.random() * 36));
    if (selectedTile === index) {
      setCurrentLevel(currentLevel + 1);
      setOffColor(rgb(getDifferentRGB(newBaseColor, levelIndex(currentLevel))));
    } else {
      setCurrentLevel(0);
      setOffColor(rgb(getDifferentRGB(newBaseColor, levelIndex(0))));
    }
  };
  return { color, offColor, selectedTile, currentLevel, handleClick };
};

export default function SquareColors() {
  const { color, offColor, selectedTile, currentLevel, handleClick } =
    useGame();
  return (
    <Container
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h4">Score: {currentLevel}</Typography>
      <Grid container spacing={0.5} display="flex" height="100%">
        {buttonArray.map((value) => (
          <Grid item key={value} xs={2} display="flex">
            <Button
              variant="contained"
              onClick={() => handleClick(value)}
              sx={{
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
