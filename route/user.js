const express = require('express');
const bcrypt = require("bcryptjs");
const User  = require('../model/user');
const router = express.Router();

// Create a new user
router.post('/register', async (req, res) => {

    try {
        const { name, email, password,role } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);


        const newUser = new User({
            name,
            email,
           password: hashPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            success: true,
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;
