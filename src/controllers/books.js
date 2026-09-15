import pool from "../database/db.js";

async function createBook(req, res) {
	const { title, author, genre, price } = req.body;

	try {
		const [result] = await pool.execute(
			`INSERT INTO books (title, author, genre, price) VALUES (?, ?, ?, ?)`,
			[title, author, genre, price],
		);

		if (result.affectedRows === 1) {
			res.status(201).json({ message: "Book created successfully", bookId: result.insertId });
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to create book" });
	}
}

async function getBooksByKeyword(req, res) {
	const { keyword } = req.params;

	try {
		const [rows] = await pool.execute(
			`SELECT id, title, author, genre, ROUND(price, 2) AS price FROM books WHERE title LIKE ? OR author LIKE ? OR genre LIKE ?`,
			[`%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
		);

		if (rows.length > 0) {
			res.status(200).json(rows);
		} else {
			res.status(404).json([]);
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve books" });
	}
}

export default { createBook, getBooksByKeyword };
