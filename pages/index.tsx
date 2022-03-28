import Head from 'next/head';
import getPosts from '@src/lib/getPosts';
import styled from '@emotion/styled';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { PostMeta } from 'src/lib/getPosts';
import BlogCard from './_common/BlogCard';

const BlogCardWrapper = styled.div`
  width: 70%;
  padding: 10px; 0px;
`;
const Main = styled.main`
  width: 100%;
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
          <BlogCardWrapper key={post.slug}>
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
