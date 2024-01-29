import { User } from '@project/shared/types';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: User;
}
