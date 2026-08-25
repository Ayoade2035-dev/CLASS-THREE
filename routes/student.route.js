const { getStudent, createStudent, getStudents, updateStudent, deleteStudent, testing } = require("../controllers/student.controller")
const mongoose = require("mongoose")

const router = require("express").Router()

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid student ID format" })
  }
  next()
}

router.post("/poststudent", createStudent)
router.get("/", getStudents)
router.get("/:id", validateObjectId, getStudent)
router.patch("/:id", updateStudent)
router.delete("/:id", deleteStudent)
router.post("/testing", testing) // Add the testing route

module.exports = router