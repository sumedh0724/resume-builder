import express from 'express';
import { handleGetMe, handleLogin, handleLogout, handleRegister, updateSkillCompletion } from './auth.controller/auth.controller.js';

const authrouter = express.Router();

authrouter.post('/register', handleRegister);
authrouter.get('/logout', handleLogout);
authrouter.post('/login', handleLogin);
authrouter.get('/getMe', handleGetMe);
authrouter.patch(
    "/reports/:reportId/skills/:skillGapId",
    updateSkillCompletion
);

export default authrouter;