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

    console.log('Authorization header:', authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token);
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log('Decoded token:', decoded);
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'userId' in decoded
      ) {
        const userId = (decoded as JwtPayload).userId;
        console.log('Decoded userId:', userId);
        req.user = { userId: (decoded as JwtPayload).userId };
        console.log('Assigned user to req.user:', req.user);
        return true;
      }
      throw new UnauthorizedException('Invalid token');
    } catch (err) {
      console.error('Token verification failed:', err);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.name === 'TokenExpiredError') {
        console.log('Token has expired');
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
