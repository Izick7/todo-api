# Todo REST API — Thunder Client Testing Guide

Base URL:

```text
http://localhost:5000
```

All requests use JSON unless stated otherwise.

---

# 1. User 1 — Register

### POST

```text
/api/auth/register
```

Full URL:

```text
http://localhost:5000/api/auth/register
```

### Body

```json
{
  "name": "Isaac",
  "email": "isaac2@example.com",
  "password": "Isaac@123",
  "role": "user"
}
```

### Expected Status

```text
201 Created
```

### Expected Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Isaac",
    "email": "isaac2@example.com",
    "role": "user"
  }
}
```

---

# 2. User 1 — Login

### POST

```text
/api/auth/login
```

Full URL:

```text
http://localhost:5000/api/auth/login
```

### Body

```json
{
  "email": "isaac2@example.com",
  "password": "Isaac@123"
}
```

### Expected Status

```text
200 OK
```

### Expected Response

```json
{
  "message": "Login successful",
  "token": "YOUR_USER_1_JWT"
}
```

Copy the JWT.

Use it as:

```text
Authorization: Bearer YOUR_USER_1_JWT
```

for all of User 1's Todo requests.

---

# 3. User 1 — Create Todo

### POST

```text
/api/todos
```

Full URL:

```text
http://localhost:5000/api/todos
```

### Authorization

```text
Bearer Token
```

Use:

```text
USER_1_JWT
```

### Body

```json
{
  "title": "Learn Express",
  "description": "Build and understand my Todo REST API"
}
```

### Expected Status

```text
201 Created
```

### Expected Response

```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": 1,
    "title": "Learn Express",
    "description": "Build and understand my Todo REST API",
    "completed": false,
    "userId": 1,
    "createdAt": "..."
  }
}
```

Important:

`userId` is created by the server from the authenticated JWT.

It is NOT supplied by the client.

---

# 4. User 1 — Get All Todos

### GET

```text
/api/todos
```

Full URL:

```text
http://localhost:5000/api/todos
```

### Authorization

```text
Bearer Token
```

Use:

```text
USER_1_JWT
```

### Expected Status

```text
200 OK
```

### Expected Response

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Learn Express",
      "description": "Build and understand my Todo REST API",
      "completed": false,
      "userId": 1,
      "createdAt": "..."
    }
  ]
}
```

---

# 5. User 1 — Get One Todo

### GET

```text
/api/todos/1
```

Full URL:

```text
http://localhost:5000/api/todos/1
```

### Authorization

```text
Bearer Token
```

Use:

```text
USER_1_JWT
```

### Expected Status

```text
200 OK
```

### Expected Response

```json
{
  "todo": {
    "id": 1,
    "title": "Learn Express",
    "description": "Build and understand my Todo REST API",
    "completed": false,
    "userId": 1,
    "createdAt": "..."
  }
}
```

---

# 6. User 1 — Update Todo

### PUT

```text
/api/todos/1
```

Full URL:

```text
http://localhost:5000/api/todos/1
```

### Authorization

```text
Bearer Token
```

Use:

```text
USER_1_JWT
```

### Body

```json
{
  "description": "Build and understand my Todo REST API",
  "completed": true
}
```

### Expected Status

```text
200 OK
```

### Expected Response

```json
{
  "message": "Todo updated successfully",
  "todo": {
    "id": 1,
    "title": "Learn Express",
    "description": "Build and understand my Todo REST API",
    "completed": true,
    "userId": 1,
    "createdAt": "..."
  }
}
```

---

# 7. User 2 — Register

### POST

```text
/api/auth/register
```

Full URL:

```text
http://localhost:5000/api/auth/register
```

### Body

```json
{
  "name": "Dave",
  "email": "dave@example.com",
  "password": "Dave@123",
  "role": "user"
}
```

### Expected Status

```text
201 Created
```

### Expected Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "name": "Dave",
    "email": "dave@example.com",
    "role": "user"
  }
}
```

---

# 8. User 2 — Login

### POST

```text
/api/auth/login
```

Full URL:

```text
http://localhost:5000/api/auth/login
```

### Body

```json
{
  "email": "dave@example.com",
  "password": "Dave@123"
}
```

### Expected Status

```text
200 OK
```

### Expected Response

```json
{
  "message": "Login successful",
  "token": "YOUR_USER_2_JWT"
}
```

Copy this JWT separately.

You now have:

```text
USER_1_JWT
USER_2_JWT
```

Do not mix them up.

---

# 9. User 2 — Create Todo

### POST

```text
/api/todos
```

Full URL:

```text
http://localhost:5000/api/todos
```

### Authorization

```text
Bearer Token
```

Use:

```text
USER_2_JWT
```

### Body

```json
{
  "title": "Learn JWT",
  "description": "Understand authentication and authorization"
}
```

### Expected Status

```text
201 Created
```

### Expected Response

```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": 2,
    "title": "Learn JWT",
    "description": "Understand authentication and authorization",
    "completed": false,
    "userId": 2,
    "createdAt": "..."
  }
}
```

Notice:

```text
Todo 1 → userId: 1
Todo 2 → userId: 2
```

---

# 10. User 2 — Get Their Todos

### GET

```text
/api/todos
```

Full URL:

```text
http://localhost:5000/api/todos
```

### Authorization

Use:

```text
USER_2_JWT
```

### Expected Result

User 2 should see Todo 2 but not User 1's Todo.

```json
{
  "todos": [
    {
      "id": 2,
      "title": "Learn JWT",
      "description": "Understand authentication and authorization",
      "completed": false,
      "userId": 2,
      "createdAt": "..."
    }
  ]
}
```

---

# 11. Ownership Test — User 2 Tries to View User 1's Todo

This is an important security test.

### GET

```text
/api/todos/1
```

Full URL:

```text
http://localhost:5000/api/todos/1
```

### Authorization

Use:

```text
USER_2_JWT
```

NOT User 1's token.

### Expected Status

```text
403 Forbidden
```

### Expected Response

```json
{
  "message": "You are not authorized to access this todo"
}
```

User 2 must NOT be able to view Todo 1.

---

# 12. Ownership Test — User 2 Tries to Update User 1's Todo

### PUT

```text
/api/todos/1
```

Full URL:

```text
http://localhost:5000/api/todos/1
```

### Authorization

Use:

```text
USER_2_JWT
```

### Body

```json
{
  "title": "Trying to modify another user's todo"
}
```

### Expected Status

```text
403 Forbidden
```

### Expected Response

```json
{
  "message": "You are not authorized to update this todo"
}
```

Todo 1 should remain unchanged.

---

# 13. Ownership Test — User 2 Tries to Delete User 1's Todo

### DELETE

```text
/api/todos/1
```

Full URL:

```text
http://localhost:5000/api/todos/1
```

### Authorization

Use:

```text
USER_2_JWT
```

### Expected Status

```text
403 Forbidden
```

### Expected Response

```json
{
  "message": "You are not authorized to delete this todo"
}
```

Todo 1 should still exist.

---

# 14. User 1 — Delete Their Own Todo

After completing the ownership tests, switch back to User 1.

### DELETE

```text
/api/todos/1
```

Full URL:

```text
http://localhost:5000/api/todos/1
```

### Authorization

Use:

```text
USER_1_JWT
```

### Expected Status

```text
200 OK
```

### Expected Response

```json
{
  "message": "Todo deleted successfully"
}
```

---

# 15. Authentication Protection Test

Remove the Authorization header completely.

Then try:

### GET

```text
http://localhost:5000/api/todos
```

Expected result:

```text
401 Unauthorized
```

This proves that Todo routes cannot be accessed without authentication.

---

# Test Summary

| Test                         | Expected  |
| ---------------------------- | --------- |
| User 1 registration          | 201       |
| User 1 login                 | 200 + JWT |
| User 1 creates Todo          | 201       |
| User 1 gets Todos            | 200       |
| User 1 gets own Todo         | 200       |
| User 1 updates own Todo      | 200       |
| User 2 registration          | 201       |
| User 2 login                 | 200 + JWT |
| User 2 creates Todo          | 201       |
| User 2 gets own Todos        | 200       |
| User 2 views User 1's Todo   | 403       |
| User 2 updates User 1's Todo | 403       |
| User 2 deletes User 1's Todo | 403       |
| User 1 deletes own Todo      | 200       |
| Unauthenticated Todo request | 401       |

# Core Requirements Verified

* [x] User registration
* [x] User login
* [x] bcrypt password hashing
* [x] JWT authentication
* [x] Protected Todo routes
* [x] Create Todo
* [x] Get user's Todos
* [x] Get single Todo
* [x] Update Todo
* [x] Delete Todo
* [x] Todo ownership
* [x] Input validation
* [x] Appropriate HTTP status codes
* [x] Password not exposed
* [x] `.env` configuration
* [x] Authentication testing
* [x] Authorization/ownership testing
