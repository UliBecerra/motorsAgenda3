const express = require("express");
const router = express.Router();

const repairsController = require("../controllers/repairs.controller.js");
const repairMiddleware = require('../middlewares/repair.middleware.js')
const userMiddleware = require('../middlewares/user.middleware.js')
const validationMiddleware = require('../middlewares/validations.middleware.js')

 router.use(userMiddleware.protectToken) 
 router
  .route("/")
    .get( repairsController.repairsFind)
  .post(validationMiddleware.createReapairValidator, repairsController.repairCreate);

router
  .route("/:id")
  .get(repairMiddleware.rolProtect('employee'), repairMiddleware.validRepair, repairsController.repairFind)
  .patch(repairMiddleware.rolProtect('employee'), repairMiddleware.validRepair, repairsController.repairUpdate)
  .delete(repairMiddleware.rolProtect('employee'), repairMiddleware.validRepair, repairsController.repairDelete);

module.exports = router
