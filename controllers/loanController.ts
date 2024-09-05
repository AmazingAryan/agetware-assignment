import { Request, Response } from 'express';
import Loan from '../models/Loan';
import Transaction from '../models/Transaction';
import Customer from '../models/Customer';

export const addCustomer = async (req: Request, res: Response) => {
    const { name, email} = req.body;

    try {
        const newCustomer = new Customer({
            name,
            email,
        });

        await newCustomer.save();
        res.json(newCustomer);
    } catch (error) {
        res.status(400).json({ error: 'Error adding customer', details: error });
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching customers', details: error });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        res.json(customer);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching customer', details: error });
    }
};

export const lendMoney = async (req: Request, res: Response) => {
    const { customerId, principal, loanPeriod, interestRate } = req.body;
    
    // Convert annual interest rate to monthly
    const monthlyInterestRate = interestRate / (12 * 100);
    
    // Total number of months
    const numberOfMonths = loanPeriod * 12;

    // EMI calculation using standard EMI formula
    const emiAmount = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    const totalAmount = emiAmount * numberOfMonths;

    const loan = new Loan({
        customerId,
        principal,
        interestRate,
        loanPeriod,
        totalAmount,
        emiAmount,
        balanceAmount: totalAmount,
        numberOfEmiLeft: numberOfMonths,
    });

    await loan.save();
    res.json({ totalAmount, emiAmount, loanId: loan._id });
};


export const makePayment = async (req: Request, res: Response) => {
    const { loanId, paymentAmount, paymentType } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    loan.paidAmount += paymentAmount;
    loan.balanceAmount -= paymentAmount;

    if (paymentType === 'EMI') {
        loan.numberOfEmiLeft -= 1;
    } else {
        loan.numberOfEmiLeft = Math.ceil(loan.balanceAmount / loan.emiAmount);
    }

    await loan.save();

    const transaction = new Transaction({
        loanId,
        paymentAmount,
        paymentType,
        remainingBalance: loan.balanceAmount,
    });

    await transaction.save();
    res.json({ loan, transaction });
};

export const getLedger = async (req: Request, res: Response) => {
    const { loanId } = req.params;

    const transactions = await Transaction.find({ loanId });
    const loan = await Loan.findById(loanId);

    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    res.json({ loan, transactions });
};

export const getAccountOverview = async (req: Request, res: Response) => {
    const { customerId } = req.params;

    const loans = await Loan.find({ customerId });

    res.json(loans);
};
