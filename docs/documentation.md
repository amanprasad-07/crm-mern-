## 📚 CRM MERN Application Backend Documentation

This document provides detailed information on the architecture, setup, database design, API, logic, and testing approach for the backend component of the CRM application.

### **1\. Backend Folder Structure Explanation**

The backend follows a modular and organized structure based on the separation of concerns principle, making it maintainable and scalable.

crm-mern-/  
├── backend/  
│   ├── config/          \<-- System configuration and initial settings  
│   ├── controllers/     \<-- Logic to handle incoming requests and send responses  
│   ├── models/          \<-- Defines the schema and structure for MongoDB collections  
│   ├── routes/          \<-- Defines API endpoints and links them to controllers  
│   ├── middleware/      \<-- Functions executed before reaching the controller logic  
│   ├── server.js        \<-- Entry point of the application  
│   └── .env    \<-- Template for environment variables

| Folder/File | Description |
| :---- | :---- |
| **server.js** | The main file that initializes the Express application, connects to the database, and loads the routes and middleware. |
| **config/** | Contains configuration files, such as the database connection logic (e.g., db.js). |
| **controllers/** | Contains functions (handlers) that receive the request from the route, interact with the model/services, and formulate the response. |
| **models/** | Houses the Mongoose schemas, defining the structure, types, and constraints for data stored in MongoDB (e.g., User.js, Customer.js). |
| **routes/** | Defines the URL structure and HTTP methods for the application's API endpoints (e.g., /api/auth, /api/customers). |
| **middleware/** | Contains custom functions that can be executed in the request/response cycle, such as authentication checks (authMiddleware.js) and error handling. |
| **services/** | (Placeholder for complex business logic). These functions would typically encapsulate logic that is shared across multiple controllers or is too complex for the controller itself. |

### **2\. Environment Setup Documentation**

#### **How to Use .env**

The application uses environment variables for configuration settings that change based on the deployment environment (e.g., development, production) and for storing sensitive secrets.

1. **Locate the Template:** In the backend/ directory, find the .env.example file.  
2. **Create .env:** Copy the contents of .env.example and create a new file named **.env** in the same backend/ directory.  
3. **Populate Variables:** Replace the placeholder values with your actual configuration details.

#### **Existing Environment Variables**

| Variable | Description | Example Value |
| :---- | :---- | :---- |
| **NODE\_ENV** | Specifies the environment mode (e.g., development, production). | development |
| **PORT** | The port number the Express server will run on. | 5000 |
| **MONGO\_URI** | The connection string for your MongoDB database (e.g., MongoDB Atlas). | mongodb+srv://user:pass@cluster0.abc.mongodb.net/crm\_db |
| **JWT\_SECRET** | A long, complex, and random string used to sign (encrypt) JWT tokens. **Crucial for security.** | some\_long\_and\_very\_secret\_key |

#### **Why We Don't Commit .env**

The .env file is explicitly listed in the project's .gitignore file for **security reasons**.

* It contains **secrets** (MONGO\_URI, JWT\_SECRET) that should never be exposed publicly.  
* Committing secrets to a public repository (like GitHub) is a major security vulnerability, allowing unauthorized access to your database and authentication system.

#### **Recommended Tools**

* **VS Code (Visual Studio Code):** The primary IDE for coding, debugging, and project file management.  
* **Postman:** Used for testing the backend API endpoints (see Section 6: Testing Approach).  
* **Git:** Used for version control, cloning the repository, and managing code changes.

### **3\. Database Design (Mongoose Models)**

The database design is composed of two primary collections: **User** (for authentication) and **Customer** (for CRM data).

#### **User Collection Design**

(Defined in backend/models/User.js)

| Field | Type | Required | Description | Notes |
| :---- | :---- | :---- | :---- | :---- |
| name | String | Yes | User's full name. |  |
| email | String | Yes | Unique email address for login. | Must be unique. |
| password | String | Yes | Hashed password for security. | Hashed using **bcrypt**. |
| role | String | No | User's role (e.g., 'admin', 'user'). | Defaults to 'user'. |
| createdAt | Date | Yes | Timestamp of account creation. | Handled by Mongoose timestamps. |

#### **Customer Collection Design**

(Defined in backend/models/Customer.js)

| Field | Type | Required | Description | Notes |
| :---- | :---- | :---- | :---- | :---- |
| name | String | Yes | Customer's name. |  |
| email | String | No | Customer's email address. |  |
| phone | String | No | Customer's phone number. |  |
| address | String | No | Customer's physical address. |  |
| company | String | No | Customer's associated company. |  |
| source | String | No | How the customer was acquired (e.g., 'Referral', 'Web'). |  |
| assignedTo | ObjectId | No | The ID of the User who created/manages this customer. | References the User collection. |
| status | String | No | Current stage in the sales cycle (e.g., 'Lead', 'Active', 'Closed'). |  |

#### **Case Collection (Not required for basic CRM)**

This design currently focuses on core CRM functions (customers). For a more advanced system, a Case (or Interaction) collection would be useful:

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| customer | ObjectId | Yes | The Customer the case is related to. |
| subject | String | Yes | Short summary of the case/interaction. |
| details | String | Yes | Detailed description of the issue or interaction. |
| type | String | No | Type of interaction (e.g., 'Support', 'Sales', 'Complaint'). |
| status | String | No | Status of the case (e.g., 'Open', 'Pending', 'Resolved'). |
| createdBy | ObjectId | Yes | The ID of the User who logged the case. |

### **4\. API Documentation**

The backend exposes a set of RESTful endpoints for authentication and customer management. All Customer endpoints require a valid JWT (authenticated user).

#### **Auth Endpoints (Unprotected)**

| Method | Endpoint | Description | Expected Input (Body) | Expected Output (Success: 200/201) |
| :---- | :---- | :---- | :---- | :---- |
| POST | /api/auth/register | Registers a new user. | { name, email, password } | { \_id, name, email, token } |
| POST | /api/auth/login | Logs in a user. | { email, password } | { \_id, name, email, token } **(Token is set as an HTTP-only cookie)** |

**Sample JSON Response (Login):**

JSON

{  
  "\_id": "60c72b2f9f1b2c001f8e1234",  
  "name": "Jane Doe",  
  "email": "jane.doe@example.com",  
  "token": "eyJhbGciOiJIUzI1NiI..." // Sent in body and set as cookie  
}

#### ---

**Customer Endpoints (Protected \- Requires Auth)**

All requests must include a JWT in the Authorization header (Bearer \<token\>) or as an HTTP-only cookie.

| Method | Endpoint | Description | Expected Input (Body) | Expected Output (Success: 200/201) |
| :---- | :---- | :---- | :---- | :---- |
| POST | /api/customers | Creates a new customer. | { name, email, phone, company } | The newly created Customer object. |
| GET | /api/customers | Retrieves all customers (can be filtered/searched). | None (Optional: query params for search) | \[{ Customer }, { Customer }, ...\] |
| GET | /api/customers/:id | Retrieves a single customer by ID. | None | The Customer object. |
| PUT | /api/customers/:id | Updates a customer by ID. | { name, phone, status, ... } | The updated Customer object. |
| DELETE | /api/customers/:id | Deletes a customer by ID. | None | { message: "Customer removed" } |

**Sample JSON Response (GET /api/customers/:id):**

JSON

{  
  "\_id": "60c72c1c9f1b2c001f8e5678",  
  "name": "Acme Corp",  
  "email": "contact@acme.com",  
  "phone": "555-1234",  
  "company": "Acme Inc.",  
  "status": "Lead",  
  "assignedTo": "60c72b2f9f1b2c001f8e1234",  
  "createdAt": "2021-06-14T10:00:00.000Z"  
}

### **5\. Explanation of Backend Logic**

#### **How JWT Authentication Works**

1. **Login/Registration:** The user sends their credentials to the backend.  
2. **Token Creation:** The server validates the credentials. If successful, it creates a JSON Web Token (JWT). The token contains a payload (e.g., the user's ID: \_id) and is cryptographically signed using the secret key (JWT\_SECRET).  
3. **Token Transmission:** The server sends the JWT back to the client, typically as an HTTP-only cookie and sometimes in the response body.  
4. **Protected Request:** When the client requests a protected route (e.g., POST /api/customers), it includes the JWT in the Authorization: Bearer \<token\> header or as a cookie.  
5. **Verification (Middleware):** The **Authentication Middleware** intercepts the request, extracts the token, and verifies its signature using JWT\_SECRET.  
6. **Authorization:** If the token is valid, the middleware decodes the payload, attaches the user's data (e.g., req.user \= decoded\_user\_id) to the request object, and calls the next function (the controller). If invalid, it returns a **401 Unauthorized** error.

#### **How Password Hashing Works**

1. **Hashing Library:** The application uses the **bcrypt** library, which is specifically designed for securely hashing passwords.  
2. **Salting:** Before hashing, a random value called a **salt** is automatically generated and combined with the plain-text password. This prevents "rainbow table" attacks.  
3. **One-Way Hash:** The password \+ salt is run through a strong, computationally intensive hashing algorithm to produce a one-way hash.  
4. **Storage:** Only the resulting hash is stored in the User collection.  
5. **Verification:** During login, the submitted password is salted with the salt stored alongside the hash and then hashed. The resulting hash is compared to the stored hash. Since hashing is a one-way process, the original password is never needed or exposed.

#### **What Middleware Does**

Middleware functions are executed sequentially between receiving a request and sending a response.

* **Authentication Middleware:** (backend/middleware/authMiddleware.js)  
  * **Primary Role:** To check if the request is from an authenticated user.  
  * **Function:** Verifies the JWT, populates req.user, and blocks unauthenticated access to protected routes.  
* **Error Handling Middleware:** (Often defined at the end of server.js)  
  * **Primary Role:** To catch errors thrown by controllers or other middleware.  
  * **Function:** Formats the error into a consistent, user-friendly JSON response (e.g., status code and a message) instead of exposing raw server errors.

#### **What Services Handle**

The services/ layer is intended to hold **business logic** that is independent of the HTTP request/response cycle.

* **In this CRM:** A service layer would be used for complex tasks like:  
  * Calculating customer lifetime value.  
  * Generating reports (e.g., all customers in 'Lead' status).  
  * Sending out automated email notifications.

### **6\. Testing Approach (Using Postman)**

The primary method for testing the backend API during development is using **Postman** (or a similar tool like Thunder Client in VS Code) to simulate HTTP requests.

#### **Example Test Cases**

| Endpoint | Method | Test Case Description | Expected Result |
| :---- | :---- | :---- | :---- |
| /api/auth/register | POST | Valid user registration. | Status **201**, new User object \+ Token. |
| /api/auth/login | POST | Log in with correct credentials. | Status **200**, User object \+ Token (cookie set). |
| /api/auth/login | POST | Log in with incorrect password. | Status **401**, error message. |
| /api/customers | GET | Get all customers **without** a token. | Status **401 Unauthorized**. |
| /api/customers | POST | Create a customer with a valid token. | Status **201**, the newly created Customer object. |
| /api/customers/:id | PUT | Update a customer's status field. | Status **200**, the updated Customer object with the new status. |
| /api/customers/:id | DELETE | Delete a non-existent customer. | Status **404 Not Found**. |

### **7\. Final Conclusion**

#### **How the Backend Supports the CRM System**

The MERN backend acts as the secure and reliable foundation for the entire CRM application:

1. **Data Persistence:** It securely stores all critical CRM data (Users, Customers) in a scalable MongoDB database.  
2. **Business Logic:** It enforces business rules, such as requiring a customer name or checking if a user email is unique.  
3. **Security:** It protects the data through robust authentication (JWT) and data security measures (bcrypt password hashing).  
4. **API Gateway:** It provides a clear, documented RESTful API that allows the React frontend (and any other client) to interact with the data in a standardized, stateless manner.

#### **Scalability**

The architecture is designed for scalability:

* **Statelessness:** The use of JWTs makes the server largely stateless, allowing the application to be easily horizontally scaled by adding more Express instances behind a load balancer.  
* **MongoDB:** MongoDB is inherently scalable and supports sharding for handling large volumes of data.  
* **Modular Design:** The separation of concerns (Controllers, Models, Routes, Middleware) prevents monolithic code, allowing new features or changes to be isolated and deployed independently.

#### **Security Considerations**

* **Input Validation:** All incoming data (registration, customer updates) must be validated (e.g., using libraries like express-validator or Mongoose schema validation) to prevent injection and corruption attacks.  
* **CORS Configuration:** Proper configuration of the cors middleware is necessary to restrict which domains can access the API.  
* **HTTPS:** The application should be deployed behind a reverse proxy (like Nginx or a cloud service) that enforces **HTTPS** to encrypt all communication, especially the transmission of credentials and JWTs.  
* **Dependency Management:** Regularly updating project dependencies (npm audit) to patch known vulnerabilities.
