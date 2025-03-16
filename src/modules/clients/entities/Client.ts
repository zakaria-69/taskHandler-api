import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Project } from 'src/modules/projects/entities/Project';
import User from 'src/modules/users/entities/User';

@ObjectType()
export class Client {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  activity: string;

  @Field(() => User)
  user: User;

  @Field(() => [Project])
  projects: Project[];

  @Exclude()
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
