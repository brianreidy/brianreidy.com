import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import { z } from 'zod';

const Post = z.object({
  attributes: z.object({
    title: z.string(),
    date: z.string(),
  }),
  body: z.string(),
});
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  body: string;
};

// relative to the server output not the source!

const postsPath = './posts';
const getPosts = async () => {
  const dir = await fs.readdir('./posts');
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const content = parseFrontMatter(file.toString());
      try {
        const {
          attributes: { title, date },
          body,
        } = Post.parse(content);
        return {
          slug: filename.replace(/\.md$/, ''),
          title,
          date,
          body,
        };
      } catch (e) {
        console.log('failed to parse post', e);
        return null;
      }
    }),
  );
};

export default getPosts;
