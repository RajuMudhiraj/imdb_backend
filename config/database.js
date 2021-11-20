const { Sequelize, Op, Model, DataTypes } = require('sequelize')


const sequelize = new Sequelize(process.env.ELEPHANTSQL_URI)
async function connect(sequelize) {
    try {
        await sequelize.authenticate();
        console.log('Connection to elephantsql has been established successfully.');

        // making sequelize create tables if not exist 
        await sequelize.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connect }