import Resume from "../models/Resume.js";


// Create
// controller for creating new resume      
// post: api/resume/create
export const createResume = async(req,res)=>{
    try {
        const userId= req.userId;
        const {title} = req.body;
        // create new resume
        const newResume = await Resume.create({userId,title})
        return res.status (201).json({message:'Resume created sucessfully',resume:newResume})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

// Delete
// controller for the delete resume
// delete api/resumes/delete
export const deleteResume = async(req,res)=>{
    try {
        const userId= req.userId;
        const {resumeId} = req.params;

        // create new resume
        await Resume.findOneAndDelete({userId,_id:resumeId})

        return res.status (201).json({message:'Resume deleted sucessfully'})        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


// Read Operation 
// get user resume by id
// get api/resume/get




export const getResumeById = async(req,res)=>{
    try {
        const userId= req.userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({userId, _id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume not found"})
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt= undefined;
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

// Update
// controller for updating resume
// put: api/resumes/update/:resumeId
export const updateResume = async(req,res)=>{
    try {
        const userId= req.userId;
        const {resumeId} = req.params;
        const updateData = req.body;

        const resume = await Resume.findOne({userId, _id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume not found"})
        }

        // Update resume with new data
        const updatedResume = await Resume.findByIdAndUpdate(
            resumeId,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        return res.status(200).json({message:'Resume updated successfully', resume:updatedResume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


