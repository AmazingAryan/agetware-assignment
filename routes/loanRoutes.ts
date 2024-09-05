import express from 'express';
import { lendMoney, makePayment, getLedger, getAccountOverview } from '../controllers/loanController';

const router = express.Router();

// Loan-related routes
router.post('/lend', lendMoney);
router.post('/payment', makePayment);
router.get('/ledger/:loanId', getLedger);
router.get('/customer/:customerId/loans', getAccountOverview);

export default router;
