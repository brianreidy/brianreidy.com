import Head from 'next/head';
import getPosts from '@src/lib/getPosts';
import styled from 'styled-components';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { PostMeta } from 'src/lib/getPosts';
import BlogCard from './_common/BlogCard';

const Main = styled.main`
  width: 70%;
`;
const BlogCardWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  margin-bottom: 5px;
`;

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="container">
      <Head>
        <title>Brian Reidy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header title="Brian Reidy" />
        <p className="description">Blogs</p>
        {posts.map((post) => (
          <BlogCardWrapper>
            <BlogCard post={post} />
          </BlogCardWrapper>
        ))}
      </Main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  console.log('posts', posts);
  return {
    props: { posts },
  };
};
