import styled from '@emotion/styled';
import { range } from 'lodash';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Picture = styled.picture`
  max-width: 100%;
  max-height: 100vh;
  margin: 0 auto;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100vh;
  margin: 0 auto;
`;

type Props = {
  imageCount: number;
  folderName: string;
};

export default function Film({ imageCount, folderName }: Props) {
  return (
    <Container>
      {range(1, imageCount + 1).map((i) => (
        <Picture>
          <source
            media="(max-width:600px)"
            srcSet={`/${folderName}/${i}_mobile.JPEG`}
          />
          <Image
            key={i}
            src={`/${folderName}/${i}.JPEG`}
            alt="images in black and white"
            loading="lazy"
          />
        </Picture>
      ))}
    </Container>
  );
}
