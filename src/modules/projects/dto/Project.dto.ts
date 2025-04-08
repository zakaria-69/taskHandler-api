import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ClientDTO } from '../../clients/dto/Client.dto';
import { ReportDTO } from '../../reports/dto/Report.dto';

@ObjectType()
export class ProjectDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  date: Date;

  @Field()
  description: string;

  @Field(() => ClientDTO)
  client: ClientDTO;

  @Field(() => [ReportDTO])
  reports: ReportDTO[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
