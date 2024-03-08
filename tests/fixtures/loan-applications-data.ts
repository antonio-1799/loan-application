import { LoanType } from '../../src/common/enums';
import { CharacterSetType, generateRandomString } from 'ts-randomstring/lib';

const applicantName = generateRandomString({
  length: 5,
  charSetType: CharacterSetType.Alphabetic,
});

export const loanApplicationSeed = {
  id: '1',
  applicantName,
  loanAmount: 10000,
  loanType: LoanType.CAR,
  income: 1000,
  interestRate: 6,
};

export const loanApplicationSuccess = {
  id: '2',
  applicantName,
  loanAmount: 20000,
  loanType: LoanType.PERSONAL,
  income: 2000,
  interestRate: 4,
};

export const loanApplicationError = {
  id: 'random',
  applicantName,
  loanAmount: 50000,
  loanType: LoanType.PERSONAL,
  income: 100,
  interestRate: 2,
};

export const updateLoanApplicationSuccess = {
  applicantName: 'Updated applicant',
  loanAmount: 30000,
  loanType: LoanType.CAR,
  income: 5000,
  interestRate: 6,
};

export const updateLoanApplicationError = {
  applicantName: 'Updated applicant',
  loanAmount: 30000,
  loanType: 'sample loan type',
  income: 5000,
  interestRate: 6,
};
