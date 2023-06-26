const jwt = require('jsonwebtoken')

const generateJWT = (id) =>{
  return new Promise ((resolve, reject) =>{
    const payload = {id}
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: process.env.JWT_EXPIRE_IN
      },
      // Se manda un callbac con el error y la data (el token)
      (err, token) =>{
        if(err){
          reject(err)
        }
        resolve(token)      
      }
      )
  })
}
module.exports = generateJWT