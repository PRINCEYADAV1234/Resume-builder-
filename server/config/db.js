import mongoose from "mongoose";

const connectdb = async () => {
    try {
        // MongoDB URL
        let mongodburl = process.env.MONGO_URL;
        const projectName = "resume-builder";

        if (!mongodburl) {
            throw new Error("MongoDB URI not set");
        }

        // Remove trailing slash
        if (mongodburl.endsWith('/')) {
            mongodburl = mongodburl.slice(0, -1);
        }

        const finalURL = `${mongodburl}/${projectName}`;

        await mongoose.connect(finalURL);
        
            console.log("Database connected successfully");


        mongoose.connection.on("error", (err) => {
            console.log("MongoDB connection error:", err);
        });

    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
};

export default connectdb;



