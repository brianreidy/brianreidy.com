import { useState, useEffect } from 'react';
import { Theme, styled } from '@mui/material/styles';

type ImageProps = {
  imgOpacity?: number;
  additionalStyles?: React.CSSProperties;
  additionalStylesDesktop?: React.CSSProperties;
  additionalStylesMobile?: React.CSSProperties;
};

const Image = styled('img', {
  shouldForwardProp: (prop) =>
    prop !== 'imgOpacity' &&
    prop !== 'additionalStyles' &&
    prop !== 'additionalStylesDesktop' &&
    prop !== 'additionalStylesMobile',
})<ImageProps>(
  ({
    imgOpacity,
    additionalStyles = {},
    additionalStylesDesktop = {},
    additionalStylesMobile = {},
    theme,
  }) => ({
    ...additionalStyles,
    transition: 'opacity .2s ease-in-out',
    opacity: imgOpacity ?? 1,

    [theme.breakpoints.up('md')]: {
      ...additionalStylesDesktop,
    },

    [theme.breakpoints.down('md')]: {
      ...additionalStylesMobile,
    },
  }),
);

type Props = {
  initialSrc: string;
  secondarySrc: string;
  alt: string;
  additionalStyles?: React.CSSProperties;
  additionalStylesDesktop?: React.CSSProperties;
  additionalStylesMobile?: React.CSSProperties;
};
const ImgToggler = ({
  initialSrc,
  secondarySrc,
  alt,
  additionalStyles,
  additionalStylesDesktop,
  additionalStylesMobile,
}: Props) => {
  const [toggleImg, setToggleImg] = useState(false);
  const [imgOpacity, setImgOpacity] = useState(1);

  useEffect(() => {
    if (imgOpacity === 0.2) {
      const x = setTimeout(() => {
        setImgOpacity(1);
        setToggleImg(!toggleImg);
      }, 200);
      return () => clearTimeout(x);
    }
  }, [imgOpacity]);

  return (
    <Image
      onMouseEnter={() => setImgOpacity(0.2)}
      onMouseLeave={() => setImgOpacity(0.2)}
      onClick={() => setImgOpacity(0.2)}
      additionalStyles={additionalStyles}
      additionalStylesDesktop={additionalStylesDesktop}
      additionalStylesMobile={additionalStylesMobile}
      src={toggleImg ? initialSrc : secondarySrc}
      imgOpacity={imgOpacity}
      alt={alt}
    />
  );
};
export default ImgToggler;
