import mock from '../mock';
import { Chance } from 'chance';
import { random } from 'lodash';
import { sub } from 'date-fns';
import s1 from 'src/assets/images/blog/blog-img1.jpg';
import s2 from 'src/assets/images/blog/blog-img2.jpg';
import s3 from 'src/assets/images/blog/blog-img3.jpg';
import s4 from 'src/assets/images/blog/blog-img4.jpg';
import s5 from 'src/assets/images/blog/blog-img5.jpg';
import s6 from 'src/assets/images/blog/blog-img6.jpg';
import s7 from 'src/assets/images/blog/blog-img11.jpg';
import s8 from 'src/assets/images/blog/blog-img8.jpg';
import s9 from 'src/assets/images/blog/blog-img9.jpg';
import s10 from 'src/assets/images/blog/blog-img10.jpg';

import { uniqueId } from 'lodash';

const chance = new Chance();

const BlogComment = [
  {
    id: uniqueId('#comm_'),
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [],
  },
  {
    id: uniqueId('#comm_'),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [
      {
        id: uniqueId('#comm_'),
        profile: {
          id: chance.integer({ min: 1, max: 2000 }),
          name: chance.name(),
        },
        time: chance.date(),
        comment: chance.paragraph({ sentences: 2 }),
      },
    ],
  },
  {
    id: uniqueId('#comm_'),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [],
  },
];

const BlogPost = [
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Understanding Your First Trimester: What to Expect',
    content: 'Content By Malek',
    coverImg: s1,
    createdAt: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
];

mock.onGet('/api/data/blog/BlogPosts').reply(() => {
  return [200, BlogPost];
});

mock.onGet(/\/api\/data\/blog\/post\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  const post = BlogPost.find((_post) => _post.id === id);

  if (!post) {
    return [404, { message: 'Post not found' }];
  }

  return [200, { post }];
});

mock.onPost('/api/data/blog/post/add').reply((config) => {
  try {
    const { postId, comment } = JSON.parse(config.data);
    const postIndex = BlogPost.findIndex((x) => x.id === postId);
    const post = BlogPost[postIndex];
    const cComments = post.comments || [];
    post.comments = [comment, ...cComments];
    return [200, { posts: [...BlogPost] }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});