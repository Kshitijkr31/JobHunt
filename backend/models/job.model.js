import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    requirements: [{
        type: [String],
    }],
    preferredQualifications: [
        {
          category: {
            type: String, // e.g., "Required Education", "Technical Skills", etc.
            required: true,
          },
          details: [String], // List of skills or qualifications for the category
        }
      ],
    salary: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const regex = /^[1-9]\d*(?:[\s-][1-9]\d*)?\s*LPA$/;
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid salary format. Use formats like "3 LPA" or "3-5 LPA".`
        }
    },    
    experienceLevel:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
                const regex = /^[1-9]\d*(?:-[1-9]\d*)?\s*years$/; // Matches "1 year", "1-2 years"
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid experience format. Use formats like "1 year" or "1-2 years".`
        }
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema); 