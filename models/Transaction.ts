import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
    loanId: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentType: string;
    dateOfPayment: Date;
    remainingBalance: number;
}

const TransactionSchema: Schema = new Schema({
    loanId: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
    paymentAmount: { type: Number, required: true },
    paymentType: { type: String, required: true },
    dateOfPayment: { type: Date, default: Date.now },
    remainingBalance: { type: Number, required: true },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
