const User = require('../models/user.model')
const AppError = require('../utils/appError')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
exports.protectToken = catchAsync (async (req, res, next) =>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError('You arent logged, log in to get acces please', 401))
  }


  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED)

    
    
  const user = await User.findOne({
    where:{
      id: decoded.id,
      status: 'available'
    }
  })
  if (!user) {
    return next( new AppError('the owner id it not available', 401))
  }
  
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() /1000, 10
    )
     if(decoded.iat < changedTimeStamp){
      return next(
        new AppError('the user recently changed password, please login again ')
      )
     }
   }

   req.sessionUser = user

   
  next(); 
})


exports.validUser = catchAsync( async (req, res, next) =>{
  
    const {id} = req.params
  //console.log(id)
     const user = await User.findOne({
      where: {
        id,
        status: 'available'
      }
     })

    if(!user){
      return next(new AppError(`User with id ${id} not found 🥩`, 404))
    }
    req.user = user
    next()
  } 
)

exports.rolProtect = (rol) =>{
  return (req, res, next) =>{
    if (!rol.includes(req.sessionUser.role)){
      return next(new AppError('You dont have permission to perform this action.', 403)) 
    }
    next()
  }
}

exports.protectAccount = catchAsync( async (req, res, next) =>{
  
  const {user, sessionUser} = req

  if(user.id !== sessionUser.id) return next(new AppError('You dont have permission to perform this action.', 403))

  next()

}
  )