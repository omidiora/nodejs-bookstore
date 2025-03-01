const express = require('express');
const Joi = require('joi');
const Recipe = require('../model/recipe');
const router = express.Router();

// Joi Schema for Validation
const RecipeSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(100).required(),
    author: Joi.array().items(Joi.required()).min(1).required(),
    cooking: Joi.number().required(),
    serving: Joi.number().max(100).required(),
    book: Joi.string().required(),
});



router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { error } = RecipeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.details.map(err => err.message),
                success: false
            });
        }

        const { title, description, author, cooking, serving, book } = req.body;

        // Create and save Recipe
        const newRecipe = new Recipe({ title, description, author, cooking, serving, book });
        await newRecipe.save();

        return res.status(201).json({
            message: "Recipe registered successfully",
            success: true,
            Recipe: newRecipe
        });

    } catch (error) {
            return res.status(500).json({
                message: error,
                success: false
            });
        
    }
});

module.exports = router;
