# Swift Pay Backend

Swift Pay Backend is a server-side application designed to handle user authentication, account management, and transactions for the Swift Pay mobile application. This backend system provides APIs for user signup, signin, account creation, balance inquiries, fund transfers between user accounts, and updating user account details.

## Features

- User Signup: Allows new users to register an account by providing necessary details.
- User Signin: Enables existing users to authenticate themselves securely.
- Account Creation: Automatically creates a bank account for each registered user.
- Account Balance Inquiry: Allows users to check their account balances.
- Fund Transfer: Facilitates secure transfer of funds between user accounts.
- Update Account Details: Allows users to update their account information such as name, password etc.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web application framework for Node.js, used for routing and middleware.
- **MongoDB**: NoSQL database for storing user accounts and transactions.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.
- **Zod**: Schema validation for data parsing and validation.

## API Endpoints

- `POST /api/v1/user/signup`: Register a new user account.
- `POST /api/v1/user/signin`: Authenticate a user and generate a JWT token.
- `PUT /api/v1/user/`: Update the user details of the authenticated user.
- `GET /api/v1/account/balance`: Get the account balance of the authenticated user.
- `POST /api/v1/account/transfer`: Transfer funds from the authenticated user's account to another user's account.

## Transactions and Sessions

Swift Pay Backend utilizes MongoDB transactions and sessions to ensure data integrity and consistency during financial transactions. Here's how it works:

- **Transactions**: MongoDB transactions allow multiple operations to be grouped together into a single, atomic unit of work. This means that either all operations within the transaction succeed, or they all fail, ensuring data consistency.
  
- **Sessions**: MongoDB sessions provide a way to encapsulate a series of related operations into a single logical unit. Sessions are used to start and commit transactions, ensuring that all operations within the transaction are executed against the same session, maintaining session-level consistency.

By leveraging MongoDB transactions and sessions, Swift Pay Backend guarantees that financial transactions, such as fund transfers between user accounts, are executed reliably and consistently, even in the face of failures or concurrent access.

