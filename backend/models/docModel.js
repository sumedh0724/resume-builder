import mongoose, { mongo } from "mongoose";
import { required } from "zod/mini";

const quesSchema=mongoose.Schema({
    question: {
        type: String,
        required: [true, 'technical question is required.']
    },
    intention: {
        type: String,
        required: [true, 'intention is required.']
    },
    answer: {
        type: String,
        required: [true, 'answer is required.']
    }
});

// const skillGapSchema=mongoose.Schema({
//     skill_name: {
//         type: String,
//         required: [true, 'skill is required.']
//     },
//     skill_desc: {
//         type: String,
//         // required: [true, 'skill is required.']
//     },
//     severity: {
//         type: String,
//         required: [true, 'severity is required.'],
//         enum: ['low', 'medium', 'high']
//     }
// });

const skillGapSchema = mongoose.Schema({
    skill_name: {
        type: String,
        required: [true, "Skill is required."]
    },
    skill_desc: {
        type: String
    },
    severity: {
        type: String,
        required: [true, "Severity is required."],
        enum: ["low", "medium", "high"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const prepSchema=mongoose.Schema({
    day: {
        type: String,
        required: [true, 'day is required.']
    },
    focus: {
        type: String,
        required: [true, 'focus topic is required.']
    },
    tasks:[{
        type: String,
        required: [true, 'task is required.']
    }]
});

const interviewReportSchema=mongoose.Schema({
    // company_name:{
    //     type: String,
    //     required: [true, 'Company name is required.']
    // },
    job_desc: {
        type: String,
        required: [true, 'JD is required.']
    },
    self_desc: {
        type: String
    },
    resume: {
        type: String
    },
    resumeFile: {
        originalName: String,
        storedName: String,
        mimeType: String,
        size: Number
    },
    overall_score:{
        type: Number,
        min: 0,
        max: 100
    },
    technical_questions: [ quesSchema ],
    behavioral_questions: [ quesSchema ],
    skill_gaps: [ skillGapSchema ],
    preparation_plan: [ prepSchema ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    title: {
        type: String,
        required: [ true, "Job title is required" ]
    }
},{
    timestamps: true
})

const interviewReportModel = mongoose.model("interviewReportModel", interviewReportSchema);

export default interviewReportModel;