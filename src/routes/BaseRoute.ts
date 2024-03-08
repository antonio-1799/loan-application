import { Router } from 'express';
import loansRouter from './LoansRoute';

const router = Router();

router.use('/loans', loansRouter);

export default router;
