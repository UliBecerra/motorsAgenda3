require('dotenv').config();
const app = require("./app");

const { db } = require("./database/db");
const initModel = require('./models/initModel');

const PORT = process.env.PORT;
//🎈👑🥇🪄🗝️🩹🛡️🧲🗡️✏️🍔
db.authenticate()
  .then(() => console.log("database authenticated 🎉 "))
  .catch((err) => console.log(err));
initModel()
db.sync()
  .then(() => console.log("database synced 💎 "))
  .catch((err) => console.log(err));

  app.listen(PORT, () =>{
    console.log('Ser_ver ✨ Running ')
  })