import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectDTO } from 'src/modules/projects/dto/Project.dto';
import { UserDTO } from 'src/modules/users/dto/User.dto';

@ObjectType()
export class ClientDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  activity: string;

  @Field(() => UserDTO)
  user: UserDTO;

  @Field(() => [ProjectDTO])
  projects: ProjectDTO[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
