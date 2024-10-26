# Login Microservice API Documentation

## Base URL
```
http://localhost:{LOGIN_PORT}
```

## Authentication
The service uses JWT (JSON Web Token) for authentication. Tokens are delivered via HTTP-only cookies.

## Endpoints

### 1. User Login
**POST** `/api/login`

Authenticates a user and creates a session.

#### Request
```json
{
  "user": "string",
  "password": "string"
}
```

#### Response
- **200 OK**
```json
{
  "message": "User Logged",
  "redirect": "/admin"
}
```
- **400 Bad Request**
```json
{
  "status": "Error",
  "message": "incomplete fields"
}
```
- **401 Unauthorized**
```json
{
  "status": "Error",
  "message": "incorrect password"
}
```
- **404 Not Found**
```json
{
  "status": "Error",
  "message": "the user doesn´t exists"
}
```
- **500 Internal Server Error**
```json
{
  "status": "Error",
  "message": "Error trying to log in"
}
```

#### Cookie
On successful login, sets an HTTP-only cookie named "jwt" containing the authentication token.

### 2. User Registration
**POST** `/api/register`

Registers a new user in the system.

#### Request
```json
{
  "user": "string",
  "email": "string",
  "password": "string"
}
```

#### Response
- **201 Created**
```json
{
  "status": "Success",
  "message": "Usuario registrado exitosamente",
  "redirect": "/"
}
```
- **400 Bad Request**
```json
{
  "status": "Error",
  "message": "incomplete fields"
}
```
```json
{
  "status": "Error",
  "message": "This user already exists"
}
```
- **500 Internal Server Error**
```json
{
  "status": "Error",
  "message": "Internal server error"
}
```

### 3. Get User Information
**GET** `/api/login/:name`

Retrieves user information by username.

#### Parameters
- `name` (string): Username to look up

#### Response
- **200 OK**
```json
{
  "user_id": "number",
  "name": "string"
}
```
- **404 Not Found**
```json
{
  "message": "User not found"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

### 4. Frontend Routes

#### Home Page
**GET** `/`
- Serves the login page
- Requires: No authentication
- Redirects to `/admin` if user is already authenticated

#### Registration Page
**GET** `/register`
- Serves the registration page
- Requires: No authentication
- Redirects to `/admin` if user is already authenticated

#### Admin Dashboard
**GET** `/admin`
- Serves the admin dashboard
- Requires: Valid JWT authentication
- Redirects to `/` if user is not authenticated

## Database Schema



## Environment Variables
```
LOGIN_PORT=<port_number>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRATION=<token_expiration_time>
JWT_COOKIE_EXPIRES=<cookie_expiration_days>
```

## Security Features
- Passwords are hashed using bcryptjs with a salt round of 3
- JWT tokens are delivered via HTTP-only cookies
- Authentication state is maintained via JWT verification
- Role-based access control for admin routes