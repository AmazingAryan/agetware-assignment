# Backend Documentation

## Overview

This backend application manages loans and customers. It provides API endpoints for creating and managing loans, processing payments, and managing customer data. The application is built using Express.js and MongoDB with Mongoose.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Environment Variables](#environment-variables)
3. [API Endpoints](#api-endpoints)
   - [Customer Endpoints](#customer-endpoints)
   - [Loan Endpoints](#loan-endpoints)
4. [Running the Application](#running-the-application)
5. [Error Handling](#error-handling)

## Getting Started

To get started with the backend application, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of your project directory with the following content:

   ```plaintext
   MONGO_URI="your-mongodb-connection-string"
   PORT=5000
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

   The application will start on the port specified in your `.env` file (default is 5000).

## Environment Variables

- `MONGO_URI`: The connection string for your MongoDB database.
- `PORT`: The port on which the server will run.

## API Endpoints

### Customer Endpoints

#### 1. **Add Customer**

- **Endpoint:** `POST /api/customers/add`
- **Description:** Adds a new customer to the database.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "customer-id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "__v": 0
  }
  ```
- **Errors:**
  - `400 Bad Request`: Invalid input data.

#### 2. **Get All Customers**

- **Endpoint:** `GET /api/customers`
- **Description:** Retrieves a list of all customers.
- **Response:**
  ```json
  [
    {
      "_id": "customer-id",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "__v": 0
    }
  ]
  ```

#### 3. **Get Customer by ID**

- **Endpoint:** `GET /api/customers/:id`
- **Description:** Retrieves a specific customer by ID.
- **Response:**
  ```json
  {
    "_id": "customer-id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "__v": 0
  }
  ```
- **Errors:**
  - `404 Not Found`: Customer not found.

### Loan Endpoints

#### 1. **Lend Money**

- **Endpoint:** `POST /api/loans/lend`
- **Description:** Creates a new loan for a customer.
- **Request Body:**
  ```json
  {
    "customerId": "customer-id",
    "principal": 10000,
    "loanPeriod": 5,
    "interestRate": 5
  }
  ```
- **Response:**
  ```json
  {
    "totalAmount": 15000,
    "emiAmount": 300,
    "loanId": "loan-id"
  }
  ```

#### 2. **Make Payment**

- **Endpoint:** `POST /api/loans/payment`
- **Description:** Processes a payment for a loan.
- **Request Body:**
  ```json
  {
    "loanId": "loan-id",
    "paymentAmount": 300,
    "paymentType": "EMI"
  }
  ```
- **Response:**
  ```json
  {
    "loan": {
      "_id": "loan-id",
      "customerId": "customer-id",
      "principal": 10000,
      "interestRate": 5,
      "loanPeriod": 5,
      "totalAmount": 15000,
      "emiAmount": 300,
      "balanceAmount": 14700,
      "paidAmount": 300,
      "numberOfEmiLeft": 59
    },
    "transaction": {
      "_id": "transaction-id",
      "loanId": "loan-id",
      "paymentAmount": 300,
      "paymentType": "EMI",
      "dateOfPayment": "2024-09-04T00:00:00.000Z",
      "remainingBalance": 14700
    }
  }
  ```

#### 3. **Get Loan Ledger**

- **Endpoint:** `GET /api/loans/ledger/:loanId`
- **Description:** Retrieves the ledger of transactions for a specific loan.
- **Response:**
  ```json
  {
    "loan": {
      "_id": "loan-id",
      "customerId": "customer-id",
      "principal": 10000,
      "interestRate": 5,
      "loanPeriod": 5,
      "totalAmount": 15000,
      "emiAmount": 300,
      "balanceAmount": 14700,
      "paidAmount": 300,
      "numberOfEmiLeft": 59
    },
    "transactions": [
      {
        "_id": "transaction-id",
        "loanId": "loan-id",
        "paymentAmount": 300,
        "paymentType": "EMI",
        "dateOfPayment": "2024-09-04T00:00:00.000Z",
        "remainingBalance": 14700
      }
    ]
  }
  ```

#### 4. **Get Account Overview**

- **Endpoint:** `GET /api/loans/customer/:customerId/loans`
- **Description:** Retrieves all loans for a specific customer.
- **Response:**
  ```json
  [
    {
      "_id": "loan-id",
      "customerId": "customer-id",
      "principal": 10000,
      "interestRate": 5,
      "loanPeriod": 5,
      "totalAmount": 15000,
      "emiAmount": 300,
      "balanceAmount": 14700,
      "paidAmount": 300,
      "numberOfEmiLeft": 59
    }
  ]
  ```

## Running the Application

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**

   Create a `.env` file with your MongoDB connection string and port.

3. **Start the Server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

## Error Handling

The application handles errors by returning appropriate HTTP status codes and error messages. Common errors include:

- `400 Bad Request`: Invalid input data.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server-side issues.

---