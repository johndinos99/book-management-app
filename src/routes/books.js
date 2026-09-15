import express, { Router } from "express";
import bookController from "../controllers/books.js";

const router = Router();

router.post("/", bookController.createBook);

router.get("/:keyword", bookController.getBooksByKeyword);

export default router;
