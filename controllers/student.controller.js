const studentModel = require("../models/student.model");
const bcrypt = require("bcryptjs")

exports.createStudent = async (req, res) => {
  // const { first_name, last_name, email, student_id, password, active_status } = req.body;
  // const studentPayload = { first_name, last_name, email, student_id, password, active_status }
  // console.log(studentPayload);
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword
    const newStudent = new studentModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      student_id: req.body.student_id,
      password: hashedPassword,
    })
    const savedStudent = await newStudent.save();
    console.log(savedStudent);
    res.status(201).json({ status: true, message:savedStudent })


  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "something went wrong" })
  }

}

exports.getStudents = async (req, res) => {
  try {
    // console.log('i can get student');
    // res.send("i can get student");
    // const allstudent = await studentModel.find()
    const allstudents = await studentModel.find()
    res.status(201).json({ status: true, message: allstudents })
    console.log(allstudents);
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, message: "something went wrong" })
  }
}

exports.getStudent = async (req, res) => {
  console.log(req.params.id);
  try {
    const student = await studentModel.findById(req.params.id);
    res.status(201).json({ status: true, message: "all message fetch", student })

  } catch (error) {
    console.log(error);
  }
}

exports.updateStudent = async (req, res) => {
  // console.log(req.body);
  try {
    const result = await studentModel.findOneAndUpdate(
      {
        email: req.body.email
      },
      req.body
    );
    res.json({ message: "record updated", result })

  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong", error })
  }
}

exports.deleteStudentByEmail = async (req, res) => {
  // console.log(req.body);
  try {
    const result = await studentModel.findOneAndDelete(
      {
        email: req.body.email
      }
    );
    res.json({ message: "record deleted", result })

  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong", error })
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    const result = await studentModel.findByIdAndDelete(req.params.id)
    res.json({ message: "record delete", result })
  } catch (error) {
    console.log(error);
    res.json({ message: "some thing went wrong" })
  }
}
exports.testing = async(req, res)=>{
  console.log(req.body);
  res.json(req.body) 
}