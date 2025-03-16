import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { PlanType } from 'src/commons/enums/planType.enum';
import User from 'src/modules/users/entities/User';

@ObjectType()
export class Subscription {
  @Field(() => ID)
  id: string;

  @Field(() => PlanType)
  planType: PlanType;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field()
  description: string;

  @Field(() => User, { nullable: true })
  user?: User; // L'utilisateur lié à la souscription

  @Exclude()
  userId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
