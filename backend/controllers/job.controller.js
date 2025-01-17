import { Job } from "../models/job.model.js";

// // admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements,preferredQualifications, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !preferredQualifications || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false,
            })
        };

        const formattedRequirements = Array.isArray(requirements)
        ? requirements
        : requirements.split(",");

        let formattedPreferredQualifications = [];
        if (Array.isArray(preferredQualifications)) {
            formattedPreferredQualifications = preferredQualifications.map((item) => {
                if (typeof item !== 'object' || !item.category) {
                    throw new Error("Each preferred qualification must include a category.");
                }
                return {
                    category: item.category,
                    details: Array.isArray(item.details) ? item.details : item.details.split(","),
                };
            });
        } else {
            return res.status(400).json({
                message: "Preferred qualifications must be an array of objects with a category.",
                success: false,
            });
        }
        const job = await Job.create({
            title,
            description,
            requirements: formattedRequirements,
            preferredQualifications: formattedPreferredQualifications,
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin ne kitne job create krra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateJob = async (req, res) => {
    try {
        

        const jobId = req.params.id;

        const formattedRequirements = Array.isArray(requirements)
            ? requirements
            : requirements.split(",");

        const formattedPreferredQualifications = preferredQualifications.map((item) => ({
            category: item.category,
            details: Array.isArray(item.details) ? item.details : item.details.split(","),
        }));

        const updateData = {
            title,
            description,
            requirements: formattedRequirements,
            preferredQualifications: formattedPreferredQualifications,
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
        };

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.log(error);
        
    }
};
