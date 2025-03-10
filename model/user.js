const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        default: 'user'

    },

    book: {
        name: String,
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    }

})


const User = mongoose.model('User', UserSchema);

module.exports = User