import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Post } from '@src/getPosts';
import colors from '@src/colors';

const BlogCard = ({ post }: { post: Post }) => (
  <CardActionArea href={`${post.slug}`} component="a">
    <Card
      sx={[
        {
          '&:hover': {
            backgroundColor: colors.cta.primary,
          },
        },
        { display: 'flex', backgroundColor: colors.background.secondary },
      ]}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography component="h2" variant="h5">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color={colors.text.primary}>
          {post.date}
        </Typography>
        {post.description && (
          <Typography
            variant="subtitle1"
            paragraph
            color={colors.text.secondary}
          >
            {post.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  </CardActionArea>
);
export default BlogCard;
