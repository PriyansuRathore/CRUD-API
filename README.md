# CRUD REST API

A REST API built with Node.js, Express and PostgreSQL that performs full CRUD operations on a users resource with JWT authentication and rate limiting.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client for Node.js
- **Joi** - Input validation
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-rate-limit** - Rate limiting
- **dotenv** - Environment variable management
- **nodemon** - Auto-restart during development

## Project Structure

```
CRUD api/
├── src/
│   ├── config/
│   │   └── db.js                  # PostgreSQL connection pool
│   ├── controller/
│   │   ├── authController.js      # Register/login logic
│   │   └── userController.js      # Request/response logic
│   ├── data/
│   │   ├── createUserTable.js     # Auto-creates users table on startup
│   │   └── data.sql               # Raw SQL reference
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT token verification
│   │   ├── errorHandler.js        # Centralized error handling
│   │   ├── inputValidator.js      # Joi validation middleware
│   │   └── rateLimiter.js         # Global and auth rate limiters
│   ├── models/
│   │   ├── authModel.js           # Register/login database queries
│   │   └── userModel.js           # All user database queries
│   ├── routes/
│   │   ├── authRoutes.js          # Auth route definitions
│   │   └── userRoutes.js          # User route definitions
│   ├── .env                       # Environment variables (not pushed)
│   ├── env.js                     # Loads .env using dotenv
│   └── index.js                   # Entry point
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Auth Routes (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### User Routes (Protected — requires token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get all users |
| GET | `/api/user/:id` | Get a user by ID |
| POST | `/api/user` | Create a new user |
| PUT | `/api/user/:id` | Update a user by ID |
| DELETE | `/api/user/:id` | Delete a user by ID |

## Request Bodies

### Register
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Create/Update User
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Validation Rules
- `name` — string, min 3 characters, max 255 characters, required
- `email` — valid email format, required
- `password` — required for register and login

## Authentication

This API uses JWT (JSON Web Token) authentication.

1. Register a user via `POST /api/auth/register`
2. Login via `POST /api/auth/login` to get a token
3. Pass the token in the `Authorization` header for all protected routes:

```
Authorization: Bearer <your_token>
```

## Rate Limiting

| Limiter | Routes | Max Requests | Window |
|---------|--------|-------------|--------|
| Global | All routes | 100 requests | 15 minutes |
| Auth | `/api/auth/*` | 10 requests | 15 minutes |

When limit is exceeded:
```json
{
  "status": 429,
  "message": "Too many requests, please try again after 15 minutes"
}
```

## Sample Response

```json
{
  "status": 200,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Installation

1. Clone the repository
```bash
git clone https://github.com/PriyansuRathore/CRUD-API.git
cd CRUD-API
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file inside the `src/` folder
```env
USER=your_postgres_username
HOST=localhost
DATABASE=your_database_name
PASSWORD=your_postgres_password
DBPORT=5432
PORT=3001
JWT_SECRET=your_jwt_secret_key
```

4. Run the server
```bash
npm run dev
```

Server will start on `http://localhost:3001`

> The `users` table is automatically created on startup if it doesn't exist.

## Architecture

This project follows a layered architecture:

```
Request → Routes → Middleware (Auth + Validation) → Controller → Model → Database
                                                                    ↓
Response ←——————————————————————————————————————————————————————————
```

- **Routes** — define endpoints and HTTP methods
- **Auth Middleware** — verifies JWT token on protected routes
- **Validation Middleware** — validates input before it reaches the controller
- **Controller** — handles request/response logic, calls model functions
- **Model** — contains all SQL queries, talks directly to the database
- **Error Handler** — catches all errors and returns a consistent 500 response
- **Rate Limiter** — limits requests per IP to prevent abuse
