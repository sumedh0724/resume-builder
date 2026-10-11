import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import zodToJsonSchema from "zod-to-json-schema";
import {z} from 'zod';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    timeout: 60000
  }
});

// export const invokeAi=async function(){
//     const response=await ai.models.generateContent({
//         model: 'gemini-3.1-flash-lite',
//         contents: "Explain how AI works in a few words",
//     })
    
// }


const interviewReportSchema= { 
    type: "object",
  properties: {
    overall_score: {
        type: 'integer',
        description: 'It is the overall score of the candidate for the job profile for which he is willing to apply. The score should be between 0 to 100. Where 0 shows the job is not good for the candidate considering the job profile while 100 means the candidate is the perfect fit for the job.'
    },
    technical_questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "Technical question which can be asked considering candidate's resume and the job description profile for which hiring is taken place."},
          intention: { type: "string", description: "Intention or what is the view of the interviewer or what the interviewer wants to know when asking this question."},
          answer: { type: "string", description: "A sample answer in brief that can be given to the question asked."}
        },
        required: ["question", "intention", 'answer']
      },
      description: "Set of Technical questions that can be asked by the interviewer considering the candidate's profile through the resume and the job requirements."
    },
    behavioral_questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "Behavioral question which can be asked considering candidate's resume and the job description profile for which hiring is taken place."},
          intention: { type: "string", description: "Intention or what is the view of the interviewer or what the interviewer wants to know when asking this question."},
          answer: { type: "string", description: "A sample answer in brief that can be given to the question asked."}
        },
        required: ["question", "intention", 'answer']
      },
      description: "Set of behavioral questions that can be asked by the interviewer considering the candidate's profile through the resume and the job requirements."
    },
    preparation_plan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { 
            type: "string", 
            description: "Current day of the preparation plan."
          },
          focus: { 
            type: "string", 
            description: "Areas or skills on which the candidate should focus on to make his profile stronger."
          },
          tasks: { 
            type: "array",
            items: {
                type: 'string', 
                description: 'Tasks or actions that may be performed by the candidate at the current day.'
            }
          }
        },
        required: ['day', 'focus','tasks'],
        description: 'Preparation plan that can be followed by the candidate for the upcoming job posting mentioned in job description. If the duration between the starting day of preparation and the job date is huge, consider giving preparation plan in set of range of days like day1-day4, day5-day8 and so on... So, wrapping in maximum of 5 to 6 segments.'
      }
    },
    skill_gaps: {
        type: "array",
        items: {
        type: "object",
        properties: {
            skill_name: { type: "string", description: "Skill title where the candidate is lagging from the job for which he is willing to apply."},
            skill_desc: { type: 'string', description: 'Brief description of what the skill is about, how is it connected with the job and why is it necessary to be learned.'},
            severity: { type: "string", enum: ["low", "medium", "high"], description: "It is the complexity or duration required to acquire the skill. It will be categorized in 3 types as low, medium and high. Low if it can be acquired/ learned easily and high if it is hard or near to impossible to get acquire considering the time left."}
        },
        required: ['skill_name','skill_desc','severity']
        },
        description: 'List of skill gaps telling the candidate where he is lagging and severity of the skill on basis of whether the candidate can acquire it considering the time left for the job interview.'
    }
  },
  required: ["overall_score", "technical_questions", "behavioral_questions","skill_gaps","preparation_plan"]

};

const interviewSchema = z.fromJSONSchema(interviewReportSchema);

export async function generateInterviewReport({company_name, resume, self_desc, job_desc}){

    // console.log(typeof(resume));
    

    const prompt = `
        Analyze the candidate's resume, self-description, and the given job description.

        Resume:
        ${resume}

        Self Description:
        ${self_desc}

        Job Description:
        ${job_desc}

        Generate an interview preparation report containing:
        - Overall suitability score from 0-100
        - Technical interview questions with interviewer intention and sample answers
        - Behavioral interview questions with interviewer intention and sample answers
        - Skill gaps relevant to the job, with low/medium/high severity based on difficulty and time available
        - A practical day-wise preparation plan focused on the most important skill gaps and interview topics

        Base the analysis only on the provided information. Do not invent candidate experience or skills. Prioritize skills and requirements that are most relevant to the job.
    `;

    // const interaction = await ai.interactions.create({
    // model: 'gemini-3.1-flash-lite',
    // input: prompt,
    // response_format: {
    //     type: 'text',
    //     mime_type: 'application/json',
    //     schema: interviewReportSchema
    // },
    // }
// );

let response;

try{
  response = await ai.models.generateContent({
  model: "gemini-3.1-flash-lite",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: interviewReportSchema
  }
});
}
catch(err){
  // console.log(err.message);
  return err.message;
}

const report = interviewSchema.parse(
  JSON.parse(response.text)
);

// console.log(report);

return report;
    
}