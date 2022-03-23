import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();

  return <p>Post: {router.query.slug}</p>;
};

export default Post;
