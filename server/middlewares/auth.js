// const protect = async (req,resizeBy,next)=>{
//     const token = req.headers.authorization;

//     if(!token){
//         return res.status(401).json({message:'Unauthorized'});
//     }
//     try {
//         const decoded = jwt.verify(token,process.env,JWT_SECRET)
//         res.userId = decoded.userId;
//     } catch (error) {
//         return res.status(401).json({message:'unauthorized'})
//     }
// }



import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId || decoded.id).select("-password");
    req.userId = decoded.userId || decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
