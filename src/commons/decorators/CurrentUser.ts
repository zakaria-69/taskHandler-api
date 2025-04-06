import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '../context/context.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): { userId: string } => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<GqlContext>().req;
    return request.user;
  },
);
