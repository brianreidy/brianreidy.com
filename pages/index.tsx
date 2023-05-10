import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import getPosts, { sortPosts } from '@src/lib/getPosts';
import styled from '@emotion/styled';
import { compact } from 'lodash';

import Header from '@components/Header';
import BlogCard from '@components/BlogCard';
import colors from '@src/lib/colors';
import { Container, Typography } from '@mui/material';

const Wrapper = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background.primary};
`;
const BlogCardWrapper = styled.div`
  padding: 10px 0px 10px 0px;
  width: 100%;
`;
const CenterRail = styled(Container)`

  padding: 10px; 0px;
  align-items:baseline;
`;

export default function Home({
  posts = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Wrapper>
      <Head>
        <title>brian reidy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenterRail maxWidth="md">
        <Header />
        {posts.map((post) => (
          <BlogCardWrapper key={post.slug}>
            <BlogCard post={post} />
          </BlogCardWrapper>
        ))}
        {/* TODO: abstract games into its own componentabstract games into its own component */}

        <Typography gutterBottom variant="h2" color={colors.text.primary}>
          games
        </Typography>
        <BlogCard
          post={{
            slug: '/games/squarecolors',
            title: 'square colors',
            date: '2023/5/01',
            body: 'chose the color thats different',
            description: 'recreation of an android app i made in highschool',
          }}
        />
      </CenterRail>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  const sortedPosts = sortPosts(compact(posts));
  return {
    props: { posts: sortedPosts },
  };
};
