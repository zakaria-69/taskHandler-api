import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

registerEnumType(Status, {
  name: 'Status',
});
