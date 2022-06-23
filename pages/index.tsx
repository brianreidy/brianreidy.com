import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import getPosts from '@src/lib/getPosts';
import styled from '@emotion/styled';

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
  padding: 10px; 0px;
  width:100%;
`;
const Main = styled.main`
  width: 50%;

  padding: 10px; 0px;
  @media (max-width: 768px) {
  width: 95%;
  }
`;

const FilmPost = {
  slug: 'film',
  title: 'spring film shoot',
  date: '2022/6/8',
  body: 'harmon disposable but not actually disposable film camera',
  description: '',
};

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
        <BlogCardWrapper>
          <BlogCard post={FilmPost} />
        </BlogCardWrapper>

        {posts.map((post) =>
          post ? (
            <BlogCardWrapper key={post.slug}>
              <BlogCard post={post} />
            </BlogCardWrapper>
          ) : null,
        )}
      </Main>
    </Container>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
