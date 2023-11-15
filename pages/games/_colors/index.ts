export const colors = [
  { r: 142, g: 202, b: 233 },
  { r: 33, g: 158, b: 188 },
  { r: 2, g: 48, b: 71 },
  { r: 255, g: 183, b: 3 },
  { r: 251, g: 133, b: 0 },
];

export const rgb = ({ r, g, b }: { r: number; g: number; b: number }) =>
  'rgb(' + r + ',' + g + ',' + b + ')';

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
};

export const getRandomColorRGB = () => rgb(getRandomColor());

export const getDifferentRGB = (
  { r, g, b }: { r: number; g: number; b: number },
  index: number,
) => {
  const rOffset = Math.max(0, Math.min(255, r + index));
  const gOffset = Math.max(0, Math.min(255, g + index));
  const bOffset = Math.max(0, Math.min(255, b + index));
  return { r: rOffset, g: gOffset, b: bOffset };
};
