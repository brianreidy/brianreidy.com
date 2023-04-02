import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import colors from '@src/lib/colors';

const Image = styled.img`
  height: 15em;
  width: 15em;
  border-radius: 5em;
`;

const HorizontalView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
`;

const VerticalView = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Header() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDesktop(window.innerWidth > 650);
    }
  }, []);
  return (
    <HorizontalView>
      <VerticalView>
        <Typography variant="h1" color={colors.text.primary}>
          Brian Reidy
        </Typography>

        {!isDesktop && <Image src="/6af6cfe.jpeg" alt="Brian on a bike" />}
        <Typography variant="h2" color={colors.text.primary}>
          About
        </Typography>

        <Typography variant="body1" color={colors.text.primary}>
          three questions i get to know someone
          <br />
          what is your hobby?
          <br />
          walking through new neigborhoods, bike rides and eating.
          <br />
          what is your favorite food?
          <br />
          I love xi'an style hand pulled noodles.
          <br />
          when and where was the last time you saw a monkey?
          <br />
          2019 at arashiyama monkey park iwatayama in japan.
        </Typography>
        <Typography variant="h2" color={colors.text.primary}>
          Posts
        </Typography>
      </VerticalView>
      {isDesktop && <Image src="/6af6cfe.jpeg" alt="Brian on a bike" />}
    </HorizontalView>
  );
}
