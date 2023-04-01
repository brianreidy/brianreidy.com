import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import { z } from 'zod';

import NonmarkdownPosts from 'pages/posts/NonmarkdownPosts';

const Post = z.object({
  attributes: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
  }),
  body: z.string(),
});

// A little different then above because I flatten and add slug k/v
export type Post = {
  slug: string;
  title: string;
  date: string;
  body: string;
  description: string;
};

const postsPath = './posts';

export const getPostPaths = async () => {
  const dir = await fs.readdir('./posts');
  const dirNameNoFileType = dir
    .map((r) => r.replace(/\.md$/, ''))
    .map((r) => r.replace(/\%2F/, '/'));
  return dirNameNoFileType.map((path) => ({
    params: { slug: path },
  }));
};

const getPosts = async () => {
  const dir = await fs.readdir('./posts');
  return [
    ...NonmarkdownPosts,
    ,
    ...(await Promise.all(
      dir.map(async (filename) => {
        const file = await fs.readFile(path.join(postsPath, filename));
        const content = parseFrontMatter(file.toString());
        try {
          const {
            attributes: { title, date, description = '' },
            body,
          } = Post.parse(content);
          return {
            slug: filename.replace(/\.md$/, ''),
            title,
            date,
            body,
            description,
          };
        } catch (e) {
          console.log('failed to parse post', e);
          return Promise.resolve(null);
        }
      }),
    )),
  ];
};

export const sortPosts = (posts: Post[]) => {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getPost = async (slug: string) => {
  const file = await fs.readFile(path.join(postsPath, `${slug}.md`));
  const content = parseFrontMatter(file.toString());
  try {
    const {
      attributes: { title, date, description = '' },
      body,
    } = Post.parse(content);
    return {
      slug,
      title,
      date,
      body,
      description,
    };
  } catch (e) {
    console.log('failed to parse post', e);
    return null;
  }
};

export default getPosts;
