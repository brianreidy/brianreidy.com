import Head from 'next/head';
import { marked } from 'marked';
import styled from '@emotion/styled';

import Header from '@components/Header';
import { getPost, Post } from '@src/lib/getPosts';
import { GetServerSideProps } from 'next';

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
  if (!post) return null;
  const mdText = marked.parse(post.body);
  return (
    <Background>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header title={post.title} />
        <div dangerouslySetInnerHTML={{ __html: mdText }}></div>
      </Main>
    </Background>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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