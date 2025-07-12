import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import getPosts, { sortPosts } from '@src/getPosts';
import styled from '@emotion/styled';
import { compact } from 'lodash';
import { useState } from 'react';

import Header from '@components/Header';
import BlogCard from '@components/BlogCard';
import colors from '@src/colors';
import { Container } from '@mui/material';
import FilterComponent, { Filter } from '@components/FilterComponent';

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
  const [filter, setFilter] = useState<keyof typeof Filter>(Filter.all);
  return (
    <Wrapper>
      <Head>
        <title>brian reidy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenterRail maxWidth="md">
        <Header />
        <FilterComponent onFilterChange={setFilter} />
        {posts.map(
          (post) =>
            (filter === Filter.all || post.type === filter) && (
              <BlogCardWrapper key={post.slug}>
                <BlogCard post={post} />
              </BlogCardWrapper>
            ),
        )}
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
