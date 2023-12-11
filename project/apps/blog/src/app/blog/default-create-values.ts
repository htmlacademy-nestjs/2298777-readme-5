import { PostStatus } from '@project/shared/types';

export const defaultCreateValues = {
  status: PostStatus.Draft,
  likesCount: 0,
  commentsCount: 0,
};
