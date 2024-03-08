import { LoanType } from './enums';

export const loanTermMap = new Map<LoanType, number>([
  [LoanType.CAR, 5],
  [LoanType.PERSONAL, 3],
]);
