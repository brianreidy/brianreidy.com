import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import colors from '@src/lib/colors';
import bicycleClear from 'public/bicycleClear.jpg';

const Image = styled('img')(({ imgOpacity }: { imgOpacity?: number }) => ({
  height: '15em',
  width: '15em',
  borderRadius: '5em',
  transition: 'opacity 0.5s ease-in-out',
  opacity: imgOpacity ?? 1,
}));

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
  const [isHovered, setIsHovered] = useState(false);

  // TODO: abstract fading image component
  const [imgOpacity, setImgOpacity] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDesktop(window.innerWidth > 650);
    }
  }, []);

  useEffect(() => {
    if (imgOpacity === 0) {
      setTimeout(() => {
        setImgOpacity(1);
        setIsHovered(!isHovered);
      }, 500);
    }
  }, [imgOpacity]);
  return (
    <HorizontalView>
      <VerticalView>
        <Typography variant="h1" color={colors.text.primary}>
          brian reidy
        </Typography>

        {!isDesktop && <Image src="/6af6cfe.jpeg" alt="Brian on a bike" />}
        <Typography gutterBottom variant="h2" color={colors.text.primary}>
          about
        </Typography>

        <Typography variant="body1" color={colors.text.primary}>
          <i>three questions i get to know someone</i>
          <br />
          <b>what is your hobby?</b>
          <br />
          walking through new neigborhoods, bike rides and eating.
          <br />
          <b>what is your favorite food?</b>
          <br />
          I love xi'an style hand pulled noodles.
          <br />
          <b>when and where was the last time you saw a monkey?</b>
          <br />
          2019 at arashiyama monkey park iwatayama in japan.
        </Typography>
        <Typography gutterBottom variant="h2" color={colors.text.primary}>
          posts
        </Typography>
      </VerticalView>
      {isDesktop && (
        <div
          onMouseEnter={() => {
            setImgOpacity(0);
          }}
          onMouseLeave={() => {
            setImgOpacity(0);
          }}
        >
          <Image
            src={isHovered ? '/bicycleClear.jpeg' : '/bicycleDrawing.jpeg'}
            imgOpacity={imgOpacity}
            alt="Brian on a bike"
          />
        </div>
      )}
    </HorizontalView>
  );
}
