import mongoose, { Document, Schema } from 'mongoose';

interface ILoan extends Document {
    customerId: mongoose.Types.ObjectId;
    principal: number;
    interestRate: number;
    loanPeriod: number;
    totalAmount: number;
    emiAmount: number;
    balanceAmount: number;
    paidAmount: number;
    numberOfEmiLeft: number;
}

const LoanSchema: Schema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    principal: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    loanPeriod: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    emiAmount: { type: Number, required: true },
    balanceAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    numberOfEmiLeft: { type: Number, required: true },
});

export default mongoose.model<ILoan>('Loan', LoanSchema);
