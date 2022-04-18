import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import colors from '@src/lib/colors';

const Image = styled.img`
  height: 15em;
  width: 15em;
  border-radius: 5em;
`;

export default function Header() {
  return (
    <>
      <Typography variant="h1" color={colors.text.primary}>
        Brian Reidy
      </Typography>
      <Image src="/6af6cfe.jpeg" alt="Brian on a bike" />
      <Typography variant="h2" color={colors.text.primary}>
        About
      </Typography>

      <Typography variant="body1" color={colors.text.primary}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Pellentesque
        adipiscing commodo elit at imperdiet dui accumsan sit. Lacus luctus
        accumsan tortor posuere ac ut consequat semper viverra. Pretium lectus
        quam id leo in vitae turpis massa sed. Suscipit tellus mauris a diam
        maecenas sed. Auctor neque vitae tempus quam pellentesque nec nam
        aliquam sem. Facilisi etiam dignissim diam quis enim lobortis
        scelerisque fermentum. Feugiat pretium nibh ipsum consequat nisl. In
        hendrerit gravida rutrum quisque non tellus. Pellentesque diam volutpat
        commodo sed egestas egestas fringilla phasellus faucibus. Feugiat in
        fermentum posuere urna nec tincidunt praesent semper feugiat.
      </Typography>
      <Typography variant="h2" color={colors.text.primary}>
        Posts
      </Typography>
    </>
  );
}
