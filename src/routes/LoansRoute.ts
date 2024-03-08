import { Router } from 'express';
import {
  createLoan,
  deleteLoan,
  getLoan,
  getLoans,
  updateLoan,
} from '../controllers/LoansController';
import { schemaValidator } from '../middlewares/schemaValidator';
import {
  createLoanSchema,
  updateLoanSchema,
} from '../utils/validations/loan-validations';

const loansRouter = Router();

loansRouter.post('/', schemaValidator(createLoanSchema), createLoan);
loansRouter.get('/', getLoans);
loansRouter.get('/:id', getLoan);
loansRouter.put('/:id', schemaValidator(updateLoanSchema), updateLoan);
loansRouter.delete('/:id', deleteLoan);

export default loansRouter;
