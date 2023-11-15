import { useEffect } from 'react';
import Head from 'next/head';
import { marked } from 'marked';
import { styled } from '@mui/material/styles';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

import { getPost, getPostPaths, Post } from '@src/getPosts';
import { GetStaticProps } from 'next';

const Background = styled('div')`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
const Main = styled('main')(
  ({ theme }) => `
  display: flex;
  width: 90%;
  align-items: flex-start;
  padding-top: ${theme.spacing(1)};
  padding-bottom: ${theme.spacing(3)};

  ${theme.breakpoints.up('md')} {
    width: 60%;
  }

  img {
    width: 100%;
  }

  pre {
    width: 100%;
    overflow: scroll;
  }
`,
);

const Post = ({ post }: { post: Post | null }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  if (!post) return null;
  const mdText = marked.parse(post.body);
  return (
    <Background>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Main dangerouslySetInnerHTML={{ __html: mdText }} />
    </Background>
  );
};

export async function getStaticPaths() {
  const possiblePostPaths = await getPostPaths();
  return {
    paths: possiblePostPaths,
    fallback: true, // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || typeof params.slug !== 'string') {
    return { props: { post: null } };
  }
  const post = await getPost(params.slug);

  return {
    props: {
      post,
    },
  };
};

export default Post;
