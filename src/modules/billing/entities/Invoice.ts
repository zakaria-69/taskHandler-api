import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
// import { Status } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Status } from 'src/commons/enums/status.enum';
import { Report } from 'src/modules/reports/entities/Report';

@ObjectType()
export class Invoice {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Status)
  status: Status;

  @Exclude()
  reportId: Report;

  @Field(() => Report)
  report: Report;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
