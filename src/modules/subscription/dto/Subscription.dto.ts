import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PlanType } from '../../../commons/enums/planType.enum';
import { UserDTO } from '../../users/dto/User.dto';

@ObjectType()
export class SubscriptionDTO {
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

  @Field(() => UserDTO, { nullable: true })
  user?: UserDTO;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
