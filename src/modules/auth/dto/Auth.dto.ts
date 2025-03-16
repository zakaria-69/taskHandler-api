import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDTO } from 'src/modules/users/dto/User.dto';

@ObjectType()
export class AuthDTO {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserDTO)
  user: UserDTO;
}
