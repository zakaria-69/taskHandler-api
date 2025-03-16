import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Invoice } from 'src/modules/billing/entities/Invoice';
import { Project } from 'src/modules/projects/entities/Project';

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field(() => Number)
  totalSpentTime: number;

  @Field(() => Float)
  billingAmount: number;

  @Field(() => Date)
  generatedAt: Date;

  @Exclude()
  projectId: string;

  @Field(() => Project)
  project: Project;

  @Field(() => Invoice)
  invoice?: Invoice;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
