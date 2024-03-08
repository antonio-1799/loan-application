import Joi, { ObjectSchema } from 'joi';
import { LoanType } from '../../common/enums';

// Create loan validation
export const createLoanSchema: ObjectSchema = Joi.object().keys({
  id: Joi.string().required(),
  applicantName: Joi.string().required(),
  loanAmount: Joi.number().min(10000).required(),
  loanType: Joi.valid(LoanType.CAR, LoanType.PERSONAL).required(),
  income: Joi.number().min(1000).required(),
  interestRate: Joi.number().min(1).required(),
});

// Update loan schema
export const updateLoanSchema: ObjectSchema = Joi.object().keys({
  applicantName: Joi.string().required(),
  loanAmount: Joi.number().min(10000).required(),
  loanType: Joi.valid(LoanType.CAR, LoanType.PERSONAL).required(),
  income: Joi.number().min(1000).required(),
  interestRate: Joi.number().min(1).required(),
});
