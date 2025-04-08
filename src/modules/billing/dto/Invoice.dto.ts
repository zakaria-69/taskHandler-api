import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Status } from '../../../../src/commons/enums/status.enum';
import { ReportDTO } from '../../reports/dto/Report.dto';

@ObjectType()
export class InvoiceDTO {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Status)
  status: Status;

  @Field(() => ReportDTO)
  report: ReportDTO;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
