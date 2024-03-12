import { LoanType } from '../common/enums';

export interface ILoanApplication {
  id: string;
  applicantName: string;
  loanAmount: number;
  loanType: LoanType;
  income: number;
  interestRate: number;
  monthlyPayment: number | undefined;
  loanTerm: number | undefined;
}
