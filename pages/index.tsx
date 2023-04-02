import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import getPosts, { sortPosts } from '@src/lib/getPosts';
import styled from '@emotion/styled';
import { compact } from 'lodash';

import Header from '@components/Header';
import BlogCard from '@components/BlogCard';
import colors from '@src/lib/colors';

const Container = styled.div`
  padding-top:1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
c  background-color: ${colors.background.primary};
`;
const BlogCardWrapper = styled.div`
  padding: 10px 0px 10px 0px;
  width: 100%;
`;
const Main = styled.main`
  width: 50%;

  padding: 10px; 0px;
  @media (max-width: 768px) {
  width: 95%;
  }
  align-items:baseline;
`;

export default function Home({
  posts = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>Brian Reidy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header />
        {posts.map((post) => (
          <BlogCardWrapper key={post.slug}>
            <BlogCard post={post} />
          </BlogCardWrapper>
        ))}
      </Main>
    </Container>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  const sortedPosts = sortPosts(compact(posts));
  return {
    props: { posts: sortedPosts },
  };
};
