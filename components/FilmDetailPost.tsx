import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { range } from 'lodash';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

type Props = {
  imageCount: number;
  folderName: string;
};

export default function Film({ imageCount, folderName }: Props) {
  return (
    <Container>
      {range(1, imageCount + 1).map((i) => (
        <Box key={i} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <LazyLoadImage
            style={{ maxHeight: '100vh', maxWidth: '100%', margin: '0 auto' }}
            alt=""
            src={`/${folderName}/${i}.JPEG`}
            placeholder={
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  aspectRatio: '16 / 9',
                }}
              ></Box>
            }
          />
        </Box>
      ))}
    </Container>
  );
}
