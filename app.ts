import express from 'express';
import mongoose from 'mongoose';
import loanRoutes from './routes/loanRoutes';
import customerRoutes from './routes/customerRoutes'; // Separate customer routes
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());

// Use the loan and customer routes
app.use('/api/loans', loanRoutes); // Loan-specific routes
app.use('/api/customers', customerRoutes); // Customer-specific routes

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || "your_default_connection_string").then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Connection error', err);
});
