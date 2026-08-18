const { getStudent, createStudent, getStudents, updateStudent, deleteStudent } = require("../controllers/student.controller")
const mongoose = require("mongoose")

const router = require("express").Router()

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid student ID format" })
  }
  next()
}

router.get("/", getStudents)
router.get("/:id", validateObjectId, getStudent)
router.post("/", createStudent)
router.patch("/:id", updateStudent)
router.delete("/:id", deleteStudent)

module.exports = router