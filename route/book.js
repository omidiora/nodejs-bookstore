const express = require('express');
const Joi = require('joi');
const Book = require('../model/book');
const router = express.Router();

// Joi Schema for Validation
const bookSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    isbn: Joi.string().length(13).required(),
    genre: Joi.string().min(3).max(50).required()
});

router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { error } = bookSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.details.map(err => err.message),
                success: false
            });
        }

        const { title, author, published_date, isbn, genre } = req.body;

        // Check if book with same ISBN exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                message: "A book with this ISBN already exists",
                success: false
            });
        }

        // Create and save book
        const newBook = new Book({ title, author, published_date, isbn, genre });
        await newBook.save();

        return res.status(201).json({
            message: "Book registered successfully",
            success: true,
            book: newBook
        });

    } catch (error) {
        console.error("Error in /register:", error); // Log error for debugging
        if (!res.headersSent) { // Prevent multiple responses
            return res.status(500).json({
                message: "Internal Server Error",
                success: false
            });
        }
    }
});

module.exports = router;
