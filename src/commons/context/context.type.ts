import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface GqlContext {
  req: RequestWithUser;
  user: JwtPayload;
}

export interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}
