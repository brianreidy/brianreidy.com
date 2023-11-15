import { useEffect, useState } from 'react';

const useHighScore = (key: string): [number, (n: number) => void] => {
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialHighScore = localStorage.getItem(key);
      if (initialHighScore) {
        setHighscore(parseInt(initialHighScore));
      }
    }
  }, []);
  return [highscore, setHighscore];
};

export default useHighScore;
