// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connect } from "mongoose";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";
// // import path from "path";

// dotenv.config({});

// const app = express();

// // const _dirname = path.resolve();


// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "I am from backend",
//         success: true,
//     });
// });

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Set up CORS
// const corsOptions = {
//     // origin: process.env.FRONTEND_URL || "http://localhost:5173", // Update if deployed
//     origin: process.env.FRONTEND_URL || "http://localhost:5173", // Update if deployed
//     credentials: true,
// };
// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 3000;

// // API Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// // app.use(express.static(path.resolve(_dirname, 'frontend', 'dist')));
// // app.get('*', (_,res)=>{
// //     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// // })

// // Start Server
// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve React frontend
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

// React Router fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});