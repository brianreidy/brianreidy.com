import styled from '@emotion/styled';

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
const range = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};
export default function Home() {
  return (
    <Container>
      {range(1, 38).map((i) => (
        <Picture>
          <source
            media="(max-width:600px)"
            srcSet={`/2022_June_B&W_New_York/${i}_mobile.JPEG`}
          />
          <Image
            key={i}
            src={`/2022_June_B&W_New_York/${i}.JPEG`}
            alt="spring images in black and white"
            loading="lazy"
          />
        </Picture>
      ))}
    </Container>
  );
}
