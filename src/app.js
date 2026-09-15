import express from "express";
import cors from "cors";
import "dotenv/config";
import bookRoutes from "./routes/books.js";
import pool from "./database/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

try {
	const connection = await pool.getConnection();
	console.log("MySQL connected successfully");
	connection.release();
} catch (error) {
	console.error("MySQL connection failed:", error);
}

app.use("/books", bookRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
