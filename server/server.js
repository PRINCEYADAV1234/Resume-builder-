import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/db.js";
import userRouter from "./routes/UserRoutes.js";
import resumeRouter from "./routes/ResumeRoutes.js";

const app = express();
const PORT  = process.env.PORT  || 7000;


await connectdb();
app.use (express.json())
app.use(cors())
app.get('/', (req,res) => res.send("server is live"))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})