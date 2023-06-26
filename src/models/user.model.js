const {DataTypes} = require('sequelize')
const {db} = require('./../database/db')

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client'
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available'
  }
});

module.exports = User
