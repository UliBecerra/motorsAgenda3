const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller.js");
const userMiddleware = require('../middlewares/user.middleware.js')
const validationMiddleware = require('../middlewares/validations.middleware.js')

router
  .route("/")
  .get(usersController.findUsers)

router.post('/signup', validationMiddleware.createUserValidator, usersController.createUser) 

router.post('/login', usersController.login);

  router.get('/:id', userMiddleware.validUser, usersController.findUser)
router
  .use(userMiddleware.protectToken)
  .route("/:id")
  .delete(userMiddleware.validUser, userMiddleware.protectAccount, usersController.deleteUser)
  .patch(validationMiddleware.updateUser, userMiddleware.validUser, userMiddleware.protectAccount , usersController.updateUser)

  module.exports = router