import { useEffect } from 'react';
import Head from 'next/head';
import { marked } from 'marked';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

import { getPost, getPostPaths, Post } from '@src/lib/getPosts';
import { GetStaticProps } from 'next';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
const Main = styled.main`
  display: flex;
  width: 60%;
  align-items: flex-start;
`;

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
      </Head>

      <Main>
        <div dangerouslySetInnerHTML={{ __html: mdText }}></div>
      </Main>
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
