const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    author: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" ,
    }],


    published_date: {
        type: Date,
        default: Date.now

    },
    isbn: {
        type: String,
        required: true,

    },
    genre: {
        type: String,
        required: true,

    },

}, { timestamps: true })


const Book = mongoose.model('Book', BookSchema);

module.exports = Book

