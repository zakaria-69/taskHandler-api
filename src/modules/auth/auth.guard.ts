import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonWebToken';
import { GqlContext } from 'src/commons/context/context.type';
import { JwtPayload } from 'src/commons/interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<GqlContext>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'userId' in decoded
      ) {
        req.user = { userId: (decoded as JwtPayload).userId };
        return true;
      }
      throw new UnauthorizedException('Invalid token');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
