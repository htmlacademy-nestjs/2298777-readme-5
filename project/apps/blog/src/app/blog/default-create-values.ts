import { PostStatus } from '@project/shared/types';

export const defaultCreateValues = {
  status: PostStatus.Draft,
  createDate: new Date(),
  likesCount: 0,
  commentsCount: 0,
};
