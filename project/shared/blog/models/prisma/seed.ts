import { PrismaClient, PostStatus, PostType } from '@prisma/client';

const FIRST_TAG_ID = 'bbcc874f-9f66-4ca9-8ab3-04005e3f8cad';
const SECOND_TAG_ID = 'c27c03d6-ad18-457d-99b2-b784cda13a23';

const FIRST_LIKE_ID = '7f87b466-8ea0-4eb0-a954-c18843229532';
const SECOND_LIKE_ID = '0b3ce60a-a45d-4428-ad65-9ae5aa8cfca6';

const FIRST_COMMENT_ID = 'd0d0d0d0-d0d0-4d0d-8d0d-0d0d0d0d0d0d';
const SECOND_COMMENT_ID = 'e1e1e1e1-e1e1-4e1e-8e1e-1e1e1e1e1e1e';

const FIRST_POST_ID = 'a0a0a0a0-a0a0-4a0a-8a0a-0a0a0a0a0a0a';
const SECOND_POST_ID = 'b1b1b1b1-b1b1-4b1b-8b1b-1b1b1b1b1b1b';
const THIRD_POST_ID = 'c2c2c2c2-c2c2-4c2c-8c2c-2c2c2c2c2c2c';

const getTags = () => [
  {
    id: FIRST_TAG_ID,
    name: 'tag1',
  },
  {
    id: SECOND_TAG_ID,
    name: 'tag2',
  },
];

const getLikes = () => [
  { id: FIRST_LIKE_ID, userId: '1', post: { connect: { id: FIRST_POST_ID } } },
  { id: SECOND_LIKE_ID, userId: '2', post: { connect: { id: SECOND_POST_ID } } },
];

const getComments = () => [
  {
    id: FIRST_COMMENT_ID,
    authorId: '1',
    post: { connect: { id: FIRST_POST_ID } },
    text: 'comment1',
  },
  {
    id: SECOND_COMMENT_ID,
    authorId: '2',
    post: { connect: { id: SECOND_POST_ID } },
    text: 'comment2',
  },
];

const getPosts = () => [
  {
    id: FIRST_POST_ID,
    authorId: '1',
    status: PostStatus.draft,
    type: PostType.video,
    videoPost: {
      connect: { postId: FIRST_POST_ID },
    },
  },
  {
    id: SECOND_POST_ID,
    authorId: '2',
    status: PostStatus.draft,
    type: PostType.link,
    linkPost: {
      connect: { postId: SECOND_POST_ID },
    },
  },
  {
    id: THIRD_POST_ID,
    authorId: '3',
    status: PostStatus.draft,
    type: PostType.text,
    textPost: {
      connect: { postId: THIRD_POST_ID },
    },
  },
];

const getVideoPosts = () => [
  {
    post: {
      connect: { id: FIRST_POST_ID },
    },
    name: 'video1',
    videoUrl: 'https://www.youtube.com/watch?v=M_N__4Y44Yc',
  },
];

const getLinkPosts = () => [
  {
    post: {
      connect: { id: SECOND_POST_ID },
    },
    linkUrl: 'https://www.google.com',
    description: 'description1',
  },
];

const getTextPosts = () => [
  {
    post: {
      connect: { id: THIRD_POST_ID },
    },
    name: 'text1',
    text: 'text1',
    anonsText: 'anonsText1',
  },
];

const getTagsOnPosts = () => [
  {
    post: {
      connect: { id: FIRST_POST_ID },
    },
    tag: {
      connect: { id: FIRST_TAG_ID },
    },
  },
  {
    post: {
      connect: { id: SECOND_POST_ID },
    },
    tag: {
      connect: { id: SECOND_TAG_ID },
    },
  },
  {
    post: {
      connect: { id: THIRD_POST_ID },
    },
    tag: {
      connect: { id: FIRST_TAG_ID },
    },
  },
  {
    post: {
      connect: { id: THIRD_POST_ID },
    },
    tag: {
      connect: { id: SECOND_TAG_ID },
    },
  },
];

const seedDb = async (prismaClient: PrismaClient) => {
  const mockedTags = getTags();
  const mockedLikes = getLikes();
  const mockedComments = getComments();
  const mockedPosts = getPosts();
  const mockedVideoPosts = getVideoPosts();
  const mockedLinkPosts = getLinkPosts();
  const mockedTextPosts = getTextPosts();
  const mockedTagsOnPosts = getTagsOnPosts();

  for (const tag of mockedTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: tag,
    });
  }

  for (const post of mockedPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        authorId: post.authorId,
        status: post.status,
        type: post.type,
      },
    });
  }

  for (const videoPost of mockedVideoPosts) {
    await prismaClient.videoPost.upsert({
      where: { postId: videoPost.post.connect.id },
      update: {},
      create: videoPost,
    });
  }

  for (const linkPost of mockedLinkPosts) {
    await prismaClient.linkPost.upsert({
      where: { postId: linkPost.post.connect.id },
      update: {},
      create: linkPost,
    });
  }

  for (const textPost of mockedTextPosts) {
    await prismaClient.textPost.upsert({
      where: { postId: textPost.post.connect.id },
      update: {},
      create: textPost,
    });
  }

  for (const tagOnPost of mockedTagsOnPosts) {
    await prismaClient.tagsOnPost.create({
      data: tagOnPost,
    });
  }

  for (const like of mockedLikes) {
    await prismaClient.like.upsert({
      where: { id: like.id },
      update: {},
      create: like,
    });
  }

  for (const comment of mockedComments) {
    await prismaClient.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: comment,
    });
  }

  console.log('Database seeded.');
};

const bootstrap = async () => {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
};

bootstrap();
