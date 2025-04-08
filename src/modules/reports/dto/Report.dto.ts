import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { InvoiceDTO } from '../../billing/dto/Invoice.dto';
import { ProjectDTO } from '../../projects/dto/Project.dto';

@ObjectType()
export class ReportDTO {
  @Field(() => ID)
  id: string;

  @Field(() => Number)
  totalSpentTime: number;

  @Field(() => Float)
  billingAmount: number;

  @Field(() => Date)
  generatedAt: Date;

  @Field(() => ProjectDTO)
  project: ProjectDTO;

  @Field(() => InvoiceDTO, { nullable: true })
  invoice?: InvoiceDTO;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
