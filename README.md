# CRUD REST API

A REST API built with Node.js, Express and PostgreSQL that performs full CRUD operations on a users resource.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client for Node.js
- **Joi** - Input validation
- **dotenv** - Environment variable management
- **nodemon** - Auto-restart during development

## Project Structure

```
CRUD api/
├── src/
│   ├── config/
│   │   └── db.js              # PostgreSQL connection pool
│   ├── controller/
│   │   └── userController.js  # Request/response logic
│   ├── data/
│   │   ├── createUserTable.js # Auto-creates users table on startup
│   │   └── data.sql           # Raw SQL reference
│   ├── middleware/
│   │   ├── errorHandler.js    # Centralized error handling
│   │   └── inputValidator.js  # Joi validation middleware
│   ├── models/
│   │   └── userModel.js       # All database queries
│   ├── routes/
│   │   └── userRoutes.js      # API route definitions
│   ├── .env                   # Environment variables (not pushed)
│   ├── env.js                 # Loads .env using dotenv
│   └── index.js               # Entry point
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get all users |
| GET | `/api/user/:id` | Get a user by ID |
| POST | `/api/user` | Create a new user |
| PUT | `/api/user/:id` | Update a user by ID |
| DELETE | `/api/user/:id` | Delete a user by ID |

## Request Body (POST & PUT)

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Validation Rules
- `name` — string, min 3 characters, max 255 characters, required
- `email` — valid email format, required

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
Request → Routes → Middleware (Validation) → Controller → Model → Database
                                                              ↓
Response ←————————————————————————————————————————————————————
```

- **Routes** — define endpoints and HTTP methods
- **Middleware** — validates input before it reaches the controller
- **Controller** — handles request/response logic, calls model functions
- **Model** — contains all SQL queries, talks directly to the database
- **Error Handler** — catches all errors and returns a consistent 500 response
