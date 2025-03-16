import { ID, Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Client } from 'src/modules/clients/entities/Client';
import { Report } from 'src/modules/reports/entities/Report';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  date: Date;

  @Field()
  description: string;

  @Field(() => Client)
  client: Client;

  @Exclude()
  clientId: string;

  @Field(() => [Report])
  reports: Report[]; // Un projet peut avoir plusieurs rapports

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
