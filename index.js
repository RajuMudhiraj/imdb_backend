require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan")
const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const verifyToken = require('./middleware/verifyToken')

// Connecting to the elephantSql database using sequelize
const {sequelize, connect} = require('./config/database')
connect(sequelize)

// Logging request using morgan
app.use(morgan('tiny'))

// Allowing Cross Origin Resource Sharing from all domains 
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to IMDB" });

});

app.use('/users', require('./routes/user'))

// set port, listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});