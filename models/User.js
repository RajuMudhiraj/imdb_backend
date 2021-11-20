const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const {sequelize} = require('../config/database')


const User = sequelize.define('User', {
    // Model attributes are defined here
    // id:{type: DataTypes.UUIDV4(),
    //   primaryKey:true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      defaultValue:"false",
    }
  }, {
timestamp:true  });

  module.exports = User;