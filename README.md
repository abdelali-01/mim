# Project Overview

This project consists of a full-stack web application with a Next.js frontend and an Express.js backend. The frontend is built using Next.js 15, React 19, TypeScript, and Tailwind CSS, while the backend is built using Express.js, MongoDB, and various middleware for security and session management.

The dashboard is a store management system that provides multiple features to manage orders, cash register, and client relationships. It includes a notebook system to track credit and payments of store clients, along with comprehensive statistics for monthly and yearly store income tracking.

## Features

### Store Management
- Order tracking and management
- Cash register operations
- Client credit and payment tracking
- Inventory management for tampons and products
- Trodat orders management

### Financial Tracking
- Monthly and yearly income statistics
- Payment tracking
- Credit management


### User Management
- User authentication and authorization
- Profile management
- Role-based access control

### Additional Features
- Calendar for scheduling and tracking
- Data visualization through charts
- Form management
- Responsive dashboard interface

## Frontend (my-app)

### Overview
The frontend is a Next.js application that provides a dashboard interface with various features such as authentication, profile management, calendar, forms, charts, and tables. It is built using the following technologies:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Directory Structure
- **src/app**: Contains the main pages and layouts of the application.
  - **admin**: Contains the admin-related pages and layouts.
    - **(others-pages)**: Contains various pages such as tables, register, profile, calendar, blank, forms, and charts.
      - **(tables)**: Contains tables for tampon stock, trodat orders, cash register, accounts, and notebooks.
      - **register**: Contains the register page.
      - **profile**: Contains the profile page.
      - **calendar**: Contains the calendar page.
      - **blank**: Contains a blank page.
      - **(forms)**: Contains form elements.
      - **(chart)**: Contains line and bar charts.
- **src/components**: Contains reusable components for the application.
  - **auth**: Authentication components.
  - **tables**: Table components.
  - **example**: Example components.
  - **ui**: UI components.
  - **videos**: Video components.
  - **user-profile**: User profile components.
  - **header**: Header components.
  - **form**: Form components.
  - **ecommerce**: E-commerce components.
  - **common**: Common components.
  - **charts**: Chart components.
  - **calendar**: Calendar components.

### Environment Setup
Create a `.env.local` file in the `my-app` directory with the following variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation
1. Clone the repository.
2. Navigate to the `my-app` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Backend

### Overview
The backend is an Express.js application that provides API endpoints for the frontend. It is built using the following technologies:
- Express.js
- MongoDB
- Mongoose
- Passport.js for authentication
- Various middleware for security and session management

### Directory Structure
- **index.js**: The main entry point of the backend application.
- **routers**: Contains the API routes for the application.
  - **auth.js**: Authentication routes.
  - **product.js**: Product routes.
  - **notebook.js**: Notebook routes.
  - **cashRegister.js**: Cash register routes.
  - **trodatRegister.js**: Trodat register routes.
  - **tamponTable.js**: Tampon table routes.
  - **statistic.js**: Statistic routes.
- **models**: Contains the data models for the application.
  - **User.js**: User model.
  - **TamponStockTable.js**: Tampon stock table model.
  - **TrodatRegister.js**: Trodat register model.
  - **CashRegister.js**: Cash register model.
  - **Notebook.js**: Notebook model.
  - **ServiceProduct.js**: Service product model.
  - **Product.js**: Product model.

### Environment Setup
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret

# Admin Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
ADMIN_USERNAME=admin
ADMIN_ROLE=admin
```

### Initial Setup
1. Set up the environment variables as shown above.
2. The system will automatically create an admin user with the provided credentials on first run if it doesn't exist.
3. Make sure to use a strong password for the admin account.
4. You can change the admin credentials by updating the environment variables and restarting the server.

### API Endpoints

#### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/logout` - Logout user

#### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

#### Notebooks
- GET `/api/notebooks` - Get all notebooks
- POST `/api/notebooks` - Create new notebook
- PUT `/api/notebooks/:id` - Update notebook
- DELETE `/api/notebooks/:id` - Delete notebook

#### Cash Register
- GET `/api/cash-register` - Get cash register entries
- POST `/api/cash-register` - Add new entry
- PUT `/api/cash-register/:id` - Update entry
- DELETE `/api/cash-register/:id` - Delete entry

#### Trodat Register
- GET `/api/trodat-register` - Get trodat orders
- POST `/api/trodat-register` - Create new order
- PUT `/api/trodat-register/:id` - Update order
- DELETE `/api/trodat-register/:id` - Delete order

#### Statistics
- GET `/api/statistic` - Get store statistics

### Installation
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## License
This project is licensed under the MIT License. 