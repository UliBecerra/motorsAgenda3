const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync')
exports.repairsFind = catchAsync( async(req, res) =>{

    const repairs = await Repair.findAll({
      where:{
        status: ["pending", "completed"]
      },
      include:[
        {
          model:User,
          attributes:['id', 'name', 'email', 'role', 'status']
        }
      ]
    })
    res.json({
      
      results: repairs.length,
      status: "succes",
      message: "Repairs found",
      repairs,
    });
  }
)
exports.repairCreate = catchAsync(async(req, res) =>{
 
    const {date, userId, motorsNumber, description} = req.body
console.log(date, userId, motorsNumber, description)
  const repair = await Repair.create({
    date, userId, motorsNumber, description
  })
  return res.status(201).json({
    message: "product created",
    repair,
    motorsNumber,
    description
  })
 
})
exports.repairFind = catchAsync( async(req, res) =>{


  const {repair} = req
  
  console.log('paso')
  return res.status(200).json({
    status:"sucess",
    message:"Repair found",

    repair
  })
})
exports.repairUpdate = catchAsync(async(req, res) =>{

   
    const repairUpdate = req.repair
    //console.log(repairUpdate)
    await repairUpdate.update({status: "completed"}) 
    return res.status(200).json({
      status:"succes",
      message:"The repair completed "
    })

  
})
exports.repairDelete = async (req, res) =>{

      const {id} = req.params

    const repairDelete = req.repair

    await repairDelete.update({status: "cancelled"})
    res.status(200).json({
      status: "succes",
      message: "The user has been delete",
      id,
    });


}
