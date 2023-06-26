const {body, validationResult} = require('express-validator')

const validFields = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped()
    })
  }
next()
}

exports.createUserValidator = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password cannot be empty').isLength({min:8, max:16}).withMessage('Passsword must be least 8 characters long'),
  validFields,
]
exports.createReapairValidator = [
 
  body('date').notEmpty().withMessage('Date cannot be empty'),
  body('motorsNumber').notEmpty().withMessage('Number motor cannot be empty'),
  body('description').notEmpty().withMessage('Description cannot be empty'),
  validFields,
]

exports.updateUser = [
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password cannot be empty').isLength({min:8, max:16}).withMessage('Passsword must be least 8 characters long'),
  validFields,
]