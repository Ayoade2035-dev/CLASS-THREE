import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Router from "./routes/student.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;


app.set("view engine", "ejs")
import studentModel from './models/student.model.js';

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))           

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

app.post("/testing", async(req, res)=>{
  console.log(req.body);
  res.json(req.body)
  
})

app.get("/signup", (req, res)=>{
  res.render("signup")
})

app.listen(port, () => {
  console.log(`Payment system is running on port ${port}`);
});

