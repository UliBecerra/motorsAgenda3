const AppError = require("../utils/appError")


const handleCastError23505 = () =>
  new AppError('Duplicate email', 400)

const handleJWTExpiredError = () => new AppError('Your token has expired!, Please login again', 401)

const handleJWTError = () => new AppError('Invalid Token, Please login again', 401)

const sendErrorDev = (err, res) =>{
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
   })
}

const sendErrorProd = (err, res) => {
  if(err.isOperational){
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }else{
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!'
    })
  }

}

const globalErrorhandler = (err, req, res, next) =>{
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'fail'
 //console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
  sendErrorDev(err, res)
 }

 if (process.env.NODE_ENV === 'production') {
  let error = err
  //console.log(error.parent.code)
  if (error.parent?.code === '23505') error = handleCastError23505()
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()
  if (error.name === 'JsonWebTokenError') error = handleJWTError()
  sendErrorProd(error, res)
 }
}
module.exports = globalErrorhandler