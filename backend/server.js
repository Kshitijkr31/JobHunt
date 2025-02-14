import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});

const app = express();

const _dirname = path.resolve();


app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am from backend",
        success: true,
    });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up CORS
const corsOptions = {
    // origin: process.env.FRONTEND_URL || "http://localhost:5173", // Update if deployed
    origin: "process.env.FRONTEND_URL" || "http://localhost:5173", // Update if deployed
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.resolve(_dirname, 'frontend', 'dist')));
app.get('*', (_,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});