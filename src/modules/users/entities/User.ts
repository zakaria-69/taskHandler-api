// import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Client } from 'src/modules/clients/entities/Client';
import { Subscription } from 'src/modules/subscription/entities/Subscription';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Int)
  nbrProjects: number;

  @Field(() => Boolean)
  isPremium: boolean;

  @Field(() => Date, { nullable: true })
  premiumExpiresAt?: Date;

  @Field(() => Subscription, { nullable: true })
  subscription?: Subscription;

  @Field(() => [Client])
  clients: Client[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
