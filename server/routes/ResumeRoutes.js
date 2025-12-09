import express from "express";
import { createResume, deleteResume, getResumeById, updateResume } from "../controllers/resumeController.js";
import { protect } from '../middlewares/auth.js';

const resumeRouter = express.Router();

// Create resume
resumeRouter.post('/create', protect, createResume)

// Get resume by ID
resumeRouter.get('/get/:resumeId', protect, getResumeById)

// Update resume
resumeRouter.put('/update/:resumeId', protect, updateResume)

// Delete resume
resumeRouter.delete('/delete/:resumeId', protect, deleteResume)

export default resumeRouter;

