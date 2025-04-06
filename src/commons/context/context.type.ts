import { Request } from 'express';

export interface GqlContext {
  req: RequestWithUser;
}

export interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}
