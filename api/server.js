// express server on port 3001 with mongoose connection to mongodb
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require("./routes/auth");

require('dotenv').config();

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




// use routes
app.use("/api/auth", authRoute);

// start server
app.listen(3001, () => {
  console.log(`Server is running on port: 3001`);
});



