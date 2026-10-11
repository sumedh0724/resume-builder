import express from 'express';
import { handleGenerateInterviewReport, handleViewResume } from './ai.controller/ai.controller.js';
import { authUser } from '../auth/auth.middleware/auth.middleware.js';
import { resumeUpload } from '../../middleware/resumeUpload.js';

const airouter = express.Router();

airouter.post(
	'/generate-report',
	authUser,
	resumeUpload.single('resume'),
	handleGenerateInterviewReport
);
airouter.get('/reports/:reportId/resume', authUser, handleViewResume);

export default airouter;