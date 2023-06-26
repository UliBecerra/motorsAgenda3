const User = require("../models/user.model");
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt')
const AppError = require("../utils/appError")
exports.findUsers = async (req, res, next) => {

  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.json({
    
    results: users.length,
    status: "succes",
    message: "users found",
    users,
  });
};

exports.createUser = catchAsync ( async (req, res, next) => {

  const { name, email, password, role  } = req.body;

  const salt = await bcrypt.genSalt(12)
  const encryptedPassword = await bcrypt.hash(password, salt)



const user = await User.create({
    name: name.toLowerCase(),
    email,
    password: encryptedPassword,
    role
  })

  const token = await generateJWT(user.id)

  return res.status(200).json({
    message: "The user created",
    token,
    user:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
 
})
exports.login = catchAsync ( async (req, res, next) =>{
  const {email, password} = req.body

  const userLogin = await User.findOne({
    where:{
      email: email.toLowerCase(),
      status: 'available'
    }
  })
  if (!userLogin) {
    return next(new AppError(`User with email ${email} not found `, 404))
  }
  if (!(await bcrypt.compare(password, userLogin.password))) {
    return next(new AppError(`incorrect email or password`, '401'))
   }

   const token = await generateJWT(userLogin.id)

   res.status(200).json({
    status: 'succes',
    message:' Welcome',
    token,
    user:{
      id: userLogin.id,
      name: userLogin.id,
      email: userLogin.email,
      role: userLogin.role
    }
   })
})
exports.findUser = catchAsync( async (req, res, next) =>{
  const {user} = req

return res.json({
  status: "succes",
  message: "the user find",
  id: user.id,   
  user:{
    name: user.name,
    email: user.email,
    role: user.role
  }
})

})

exports.updateUser = catchAsync(async (req, res, next) => {

  const {user} = req
  const { email, password } = req.body;


  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

   await user.update({ email: email, password: encryptedPassword });
 
  res.status(200).json({
    status: "succes",
    message: "User has been updadte",
    user:{
      id: user.id,
      email: user.name,
      name: user.name
    }
  });

})

exports.deleteUser = catchAsync(async (req, res, next) => {
  
   const { user } = req
console.log(user)
  if (!user) next ( new AppError(`the user with  not found `, 404))

  await user.update({ status: 'available' }); 

  res.status(200).json({
    status: "succes",
    message: `The user ${user.name} has been delete`,
    
  });

})
