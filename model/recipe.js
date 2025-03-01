const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: { type: String },

    cooking: {
        type: Number,
        required: true,
    },

    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    serving: {
        type: Number,
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",

    },
}, { timestamps: true })


const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe


