import express from 'express';
import { addCustomer, getCustomers, getCustomerById } from '../controllers/loanController'; // You might want to rename the controller to something like 'customerController'

const router = express.Router();

// Customer-specific routes
router.post('/add', addCustomer);
router.get('/', getCustomers);
router.get('/:id', getCustomerById);

export default router;
