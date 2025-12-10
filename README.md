  
# 🚀 CRM MERN Application

A full-stack Customer Relationship Management (CRM) system built using the **MERN** stack (MongoDB, Express.js, React, Node.js).

This project demonstrates end-to-end development skills including authentication, CRUD operations, API design, state management, and deployment-ready architecture.

## ✨ Features

### Authentication and Authorization

* User registration and login  
* Secure password hashing (bcrypt)   
* JSON Web Token (JWT) based authentication  
* Protected routes for users only

### Customer Management

* Create, read, update, and delete customer profiles (CRUD operations)  
* Search customers by name or email  
* Store basic customer details such as name, contact, address, etc.

### User Interface

* Modern, responsive React UI  
* Clean table-based customer listing  
* Search, filtering, and navigation features

### Backend Architecture

* RESTful API design  
* Express server with route modularization  
* MongoDB with Mongoose models  
* Environment variable configuration  
* Error handling middleware

---

## 💻 Tech Stack

### Frontend

* **React:** For building the user interface.  
* **React Router:** For navigation between views.  
* **Axios:** For making HTTP requests to the backend API.  
* **Tailwind CSS:** For rapid and responsive styling.

### Backend

* **Node.js & Express.js:** The server runtime and web framework.  
* **Mongoose:** MongoDB Object Data Modeling (ODM).  
* **JWT authentication:** For secure, stateless authentication.  
* **bcrypt:** For secure password hashing.  
* **cookie-parser:** Middleware for handling cookies.  
* **cors:** Middleware to enable Cross-Origin Resource Sharing.

### Database

* **MongoDB (Atlas):** A NoSQL database for flexible data storage. 

[Image of MERN stack architecture diagram]

---

## 📂 Project Structure

crm-mern-/  
│  
├── backend/  
│ ├── config/ # Database connection, environment setup  
│ ├── controllers/ # Request handling logic  
│ ├── middleware/ # Auth checks, error handling  
│ ├── models/ # Mongoose schemas (User, Customer)  
│ ├── routes/ # API endpoint definitions  
│ ├── server.js # Server entry point  
│ └── .env.example # Environment variable template  
│  
├── frontend/  
│ ├── src/ # React source code  
│ ├── public/  
│ └── package.json  
│  
└── README.md

---

## 🛠️ Installation and Setup

### 1\. Clone the Repository

```
git clone [https://github.com/amanprasad-07/crm-mern-.git](https://github.com/amanprasad-07/crm-mern-.git)  
cd crm-mern-
```
### **2\. Backend Setup**

1. **Install dependencies:**  
   ```  
   cd backend  
   npm install
   ```

2. Create an .env file:  
   Copy the contents of .env.example and create a new file named .env in the backend/ directory, filling in your details:
   ```
   MONGO\_URI=your\_mongodb\_connection\_string  
   JWT\_SECRET=your\_jwt\_secret  
   PORT=5000
   ```

4. **Run the backend server:**  
   ``` 
   npm start
   ```

   The backend API will be available at **http://localhost:5000**.

### **3\. Frontend Setup**

1. **Install dependencies:**  
   ```
   cd ../frontend  
   npm install
   ```

2. **Start the frontend:**  
   ``` 
   npm run dev
   ```

   The frontend application will run at **http://localhost:5173**.

---

**🔑 API Endpoints**

### **Authentication Endpoints (Auth)**

| Method | Endpoint | Description | Status |
| :---- | :---- | :---- | :---- |
| POST | /api/auth/register | Register a new user. | Unprotected |
| POST | /api/auth/login | Login user and issue JWT. | Unprotected |
| GET | /api/user/protected | Protected test route (requires JWT). | Protected |

### **Customer Management Endpoints (Customers)**

| Method | Endpoint | Description | Status |
| :---- | :---- | :---- | :---- |
| POST | /api/customers | Create a new customer. | Protected |
| GET | /api/customers | Get all customers (supports search/filtering). | Protected |
| GET | /api/customers/:id | Get a single customer by ID. | Protected |
| PUT | /api/customers/:id | Update customer details. | Protected |
| DELETE | /api/customers/:id | Delete customer profile. | Protected |

---

**📈 Future Improvements**

* Role-based access control (Admin, User)  
* Activity logs for tracking user actions  
* File uploads (customer documents/attachments)  
* Dashboard view with charts and analytics  
* Advanced data features: Pagination and server-side filtering  
* Dark mode UI implementation

---

**📜 License**

This project is open-source and available under the **MIT License**.
