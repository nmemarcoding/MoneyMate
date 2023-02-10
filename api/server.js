// express server on port 3001 with mongoose connection to mongodb

// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// import cors
const cors = require('cors');
// import body-parser
const bodyParser = require('body-parser');
// import dotenv
require('dotenv').config();

// create express app
const app = express();

// use cors
app.use(cors());

// use body-parser
app.use(bodyParser.json());

// connect to mongodb
mongoose
    .connect("mongodb+srv://nima1377:Nima1377@cluster0.czizweb.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})


// // import routes
// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// // use routes
// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

// start server
app.listen(3001, () => {
  console.log(`Server is running on port: 3001`);
});



