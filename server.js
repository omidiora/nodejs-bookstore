require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoute=require('./route/user');
const userBook=require('./route/book');
const userRecipe=require('./route/recipe');





const api=process.env.API_URL
app.use(express.json());
app.use(`${api}/user`, userRoute);
app.use(`${api}/book`, userBook);
app.use(`${api}/recipe`, userRecipe);

mongoose.connect(process.env.MONGO_URI).then(() => {

    console.log("Database connection is ready!!!");

}).catch((err) => {
    console.log('something went wrong!!')
    console.log(err, 'Something went wrong');

});

app.listen(process.env.PORT, () => {
    console.log(`htpp://localhost:${process.env.PORT}`);
});




