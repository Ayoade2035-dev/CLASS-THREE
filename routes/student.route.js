import { getStudent, createStudent, getStudents, updateStudent, deleteStudent } from "../controllers/student.controller.js"
import mongoose from "mongoose"
import express from "express"

const router = express.Router()

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

export default router