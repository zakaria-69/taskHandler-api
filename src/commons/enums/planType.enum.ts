import { registerEnumType } from '@nestjs/graphql';

export enum PlanType {
  FREE = 'FREE',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

registerEnumType(PlanType, {
  name: 'PlanType',
});
