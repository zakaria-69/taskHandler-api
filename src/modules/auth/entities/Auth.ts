import { Field, ID, ObjectType } from '@nestjs/graphql';
// import User from 'src/modules/users/entities/User';
import User from '../../users/entities/User';

@ObjectType()
export class Auth {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  password: string;

  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => User)
  user: User;
}
