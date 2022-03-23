import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { PostMeta } from '@src/lib/getPosts';

const BlogCard = ({ post }: { post: PostMeta }) => (
  <CardActionArea href={`/posts/${post.slug}`} component="a">
    <Card sx={{ display: 'flex' }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography component="h2" variant="h5">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {post.date}
        </Typography>
        <Typography variant="subtitle1" paragraph>
          description
        </Typography>
        <Typography variant="subtitle1" color="primary">
          Continue reading...
        </Typography>
      </CardContent>
    </Card>
  </CardActionArea>
);
export default BlogCard;
