//?Esta aplicacion simulara una agenda de citas para reparar motos
//! Se crean 2 bases de datos

/* 
Users 
  id 
  name
  email
  password
  role
  status 
  */

/* 
repairs 
  id 
  date
  *motorsNumber 
  *description
  status 
  userId
  */
const globalErrorhandler = require('./controllers/error.controller')
const express = require('express')
const app = express()
const routeUser = require('./routes/users.routes')
const routeRepairs = require('./routes/repairs.routes')
const AppError = require('./utils/appError')
app.use(express.json());

// * Ruta de Users
app.use('/api/v1/users', routeUser)

// * Ruta de Repairs
app.use('/api/v1/repairs', routeRepairs)

app.all('*', (req, res, next ) =>{
  return next( new AppError(`Can´t find ${req.originalUrl} on this server😔`, 404))
} )
app.use(globalErrorhandler)

module.exports = app