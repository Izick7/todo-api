# Todo REST API

A secure RESTful Todo API built with **Node.js** and **Express.js**.

The API provides user authentication, JWT-based authorization, protected Todo CRUD operations, ownership control, input validation, request logging, and rate limiting.

---

## Features

### Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT authentication
* Protected routes

### Todo Management

* Create Todo
* Get all user's Todos
* Get a single Todo
* Update Todo
* Delete Todo
* Todo ownership authorization

### Security & Middleware

* bcrypt password hashing
* JWT authentication
* Environment variables for sensitive configuration
* Request validation
* Request logging
* Rate limiting
* Ownership authorization
* Appropriate HTTP status codes
* Password hashes are never returned in responses

---

## Tech Stack

* Node.js
* Express.js
* bcrypt
* JSON Web Token
* dotenv
* express-rate-limit
* CommonJS
* Thunder Client for API testing

---

## Project Structure

```text
src/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── todoController.js
├── data/
│   ├── todos.js
│   └── users.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── rateLimiter.js
│   └── validation.js
├── models/
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── todoRoutes.js
└── server.js
```

---

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
JWT_SECRET=your_secret_key
```

Start the server:

```bash
node src/server.js
```

The API will run on:

```text
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Register

**POST**

```text
/api/auth/register
```

Request:

```json
{
  "name": "Isaac",
  "email": "isaac@example.com",
  "password": "Isaac@123",
  "role": "user"
}
```

Successful registration returns the user's public information without the password hash.

---

### Login

**POST**

```text
/api/auth/login
```

Request:

```json
{
  "email": "isaac@example.com",
  "password": "Isaac@123"
}
```

The response contains a JWT token.

Use the token for protected routes:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Todo Endpoints

All Todo endpoints require authentication.

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/api/todos`     | Create a Todo        |
| GET    | `/api/todos`     | Get all user's Todos |
| GET    | `/api/todos/:id` | Get one Todo         |
| PUT    | `/api/todos/:id` | Update a Todo        |
| DELETE | `/api/todos/:id` | Delete a Todo        |

---

## Create Todo

**POST**

```text
/api/todos
```

Request:

```json
{
  "title": "Learn Express",
  "description": "Build my Todo REST API"
}
```

The server automatically adds:

* `id`
* `completed`
* `userId`
* `createdAt`

The `userId` comes from the authenticated user rather than from the request body.

Example response:

```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": 1,
    "title": "Learn Express",
    "description": "Build my Todo REST API",
    "completed": false,
    "userId": 1,
    "createdAt": "2026-09-25T10:00:00.000Z"
  }
}
```

---

## Get All Todos

**GET**

```text
/api/todos
```

Returns only Todos belonging to the authenticated user.

---

## Get One Todo

**GET**

```text
/api/todos/:id
```

Example:

```text
/api/todos/1
```

A user can only retrieve their own Todo.

---

## Update Todo

**PUT**

```text
/api/todos/:id
```

Example:

```text
/api/todos/1
```

Request:

```json
{
  "description": "Build and understand my Todo REST API",
  "completed": true
}
```

The API supports updating:

* `title`
* `description`
* `completed`

---

## Delete Todo

**DELETE**

```text
/api/todos/:id
```

Example:

```text
/api/todos/1
```

Only the owner of the Todo can delete it.

---

# Authentication & Authorization

Authentication determines **who the user is**.

Authorization determines **what that authenticated user is allowed to access**.

The authentication flow is:

```text
Login
  ↓
Credentials checked
  ↓
JWT generated
  ↓
Client sends JWT
  ↓
authMiddleware verifies JWT
  ↓
req.user is created
  ↓
Controller uses req.user.id
```

Todo ownership is enforced using the authenticated user's ID.

For example:

```text
User 1 → Todo 1
User 2 → Todo 2
```

If User 2 attempts to access Todo 1:

```text
User 2
  ↓
JWT verified
  ↓
req.user.id = 2
  ↓
Todo 1 userId = 1
  ↓
IDs don't match
  ↓
403 Forbidden
```

---

# Middleware

## Logger

The logger records incoming requests:

```text
GET /api/todos
POST /api/auth/login
DELETE /api/todos/1
```

It then calls `next()` so the request can continue.

---

## Rate Limiter

The rate limiter protects the API against excessive requests.

The current configuration allows:

```text
100 requests
within 15 minutes
```

Requests exceeding the limit receive an error response asking the client to try again later.

---

## Authentication Middleware

The authentication middleware:

1. Reads the Authorization header.
2. Extracts the Bearer token.
3. Verifies the JWT.
4. Identifies the user.
5. Attaches the user information to `req.user`.
6. Allows the request to continue.

---

## Validation Middleware

Validation middleware checks incoming Todo data before it reaches the controller.

It ensures that:

* `title` is present and valid.
* `description` is present and valid.

The controller performs additional validation for operations such as updating `completed`.

---

# Request Flow

A typical protected Todo request follows this flow:

```text
Client
  ↓
Express Server
  ↓
Logger
  ↓
Rate Limiter
  ↓
JSON Parser
  ↓
Todo Route
  ↓
Authentication Middleware
  ↓
Validation Middleware
  ↓
Todo Controller
  ↓
In-Memory Todo Data
  ↓
JSON Response
```

---

# HTTP Status Codes

| Status | Meaning                            |
| ------ | ---------------------------------- |
| 200    | Request successful                 |
| 201    | Resource created                   |
| 400    | Invalid request                    |
| 401    | Authentication required or invalid |
| 403    | Authenticated but not authorized   |
| 404    | Resource not found                 |
| 500    | Server error                       |

---

# Security

The API uses several security mechanisms:

### Password hashing

Passwords are hashed using bcrypt before being stored.

### JWT authentication

JWT tokens are used to authenticate protected requests.

### Environment variables

Sensitive configuration such as the JWT secret is stored in `.env`.

The `.env` file should **not** be committed to Git.

### Ownership authorization

Users cannot access, update, or delete another user's Todo.

### Rate limiting

The API limits excessive requests within a defined time window.

### Input validation

Invalid Todo data is rejected before processing.

---

# Testing

The API was tested using Thunder Client.

Testing covers:

* User registration
* User login
* JWT authentication
* Todo creation
* Get all Todos
* Get one Todo
* Todo updates
* Todo deletion
* Invalid input
* Unauthenticated requests
* Todo ownership using multiple users
* Request logging
* Rate limiting configuration

---

# Current Data Storage

The application currently uses in-memory arrays for users and Todos.

Therefore:

```text
Server restart
     ↓
Application memory cleared
     ↓
Users and Todos reset
```

A database can be introduced later for persistent storage.

---

# Possible Future Improvements

The following are outside the current core implementation:

* Database integration
* Automated tests
* More advanced global error handling
* Todo search
* Todo completion filtering
* Pagination
* Refresh tokens
* Production deployment

---

## Author

**Isaac Moses**
