# CRM MERN Application

A full-stack Customer Relationship Management (CRM) system built using the MERN stack.
This project demonstrates end-to-end development skills including authentication, CRUD operations, API design, state management, and deployment-ready architecture.

## Features
### Authentication and Authorization

- User registration and login

- Secure password hashing (bcrypt)

- JSON Web Token based authentication

- Protected routes for users only

### Customer Management

- Create, read, update, and delete customer profiles

- Search customers by name or email

- Store basic customer details such as name, contact, address, etc.

### User Interface

- Modern, responsive React UI

- Clean table-based customer listing

- Search, filtering, and navigation features

### Backend Architecture

- RESTful API design

- Express server with route modularization

- MongoDB with Mongoose models

- Environment variable configuration

- Error handling middleware

## Tech Stack
### Frontend

- React

- React Router

- Axios

- Tailwind CSS

### Backend

- Node.js

- Express.js

- Mongoose

- JWT authentication

- bcrypt for password hashing

- cookie-parser

- cors

### Database

- MongoDB (Atlas)

## Project Structure
```
crm-mern-/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

## Installation and Setup
1. Clone the Repository
```
git clone https://github.com/amanprasad-07/crm-mern-.git
cd crm-mern-
```

## Backend Setup
2. Install dependencies
```
cd backend
npm install
```

3. Create an .env file

Use the template below:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the backend server
```
npm start
```


The backend will start at
http://localhost:5000

## Frontend Setup
5. Install dependencies
```
cd ../frontend
npm install
```

6. Start the frontend
```
npm run dev
```

Frontend runs at
http://localhost:5173

## API Endpoints (Sample)
### Auth
```
 ___________________________________________________________
|  Method  |  Endpoint             |  Description           |
|-----------------------------------------------------------|
|  POST	   |  /api/auth/register   |  Register a new user   |
|  POST	   |  /api/auth/login      |  Login user            |
|  GET     |  /api/user/protected  |  Protected test route  |       
|___________________________________________________________|
```
### Customers
```
 ___________________________________________________________
|  Method  |  Endpoint            |  Description            |
|-----------------------------------------------------------|
|  POST	   |  /api/customers      |  Create a new customer  |
|  GET	   |  /api/customers      |  Get all customers      |
|  GET     |  /api/customers/:id  |  Get a single customer  |
|  PUT	   |  /api/customers/:id  |  Update customer        |
|  DELETE  |  /api/customers/:id  |  Delete customer        |
|___________________________________________________________|
```
## Future Improvements

- Role-based access (Admin, User)

- Activity logs

- File uploads (customer documents)

- Dashboard with charts

- Pagination and filters

- Dark mode UI

## License

This project is open-source and available under the MIT License.
