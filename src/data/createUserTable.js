import pool from "../config/db.js";

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            password VARCHAR(255) NOT NULL
        )
    `;
    try {
        await pool.query(query);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};

export default createUserTable;