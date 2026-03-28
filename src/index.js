import "./env.js";
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorhandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);
// Error handling middleware
app.use(errorhandling);

//Create table before starting server
createUserTable();
// Testing postgres connection
app.get("/", async (req,res)=>{
  console.log("Start");
  const result=await pool.query("SELECT current_database()");
  console.log("end");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});

//server running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});