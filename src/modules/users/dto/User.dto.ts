import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ClientDTO } from '../../clients/dto/Client.dto';
import { SubscriptionDTO } from '../../subscription/dto/Subscription.dto';

@ObjectType()
export class UserDTO {
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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => SubscriptionDTO, { nullable: true })
  subscription?: SubscriptionDTO;

  @Field(() => [ClientDTO])
  clients?: ClientDTO[];
}
