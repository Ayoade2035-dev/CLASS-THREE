const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const Router = require("./routes/student.route")


app.set("view engine", "ejs")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const studentModel = require('./models/student.model');           

app.use("/student", Router)
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(uri)
  .then(() => {
    console.log('We Are in power ,DB are good to go');
  })
  .catch((err) => {
    console.log('DB failed to connect', err);
  })


app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
  console.log("welcome");
  
});

// app.post('/submit',(req,res)=>{
//   const {firstName,lastName, email, password} = req.body
//   const payload ={firstName, lastName, email, password}
//   console.log(payload);
//   res.status(201).json({status:true, message:payload})
//   // res.json({status:201, message:payload})

// })


app.get("/signup", (req, res)=>{
  res.render("signup")
})

app.listen(port, () => {
  console.log(`Payment system is running on port ${port}`);
});

