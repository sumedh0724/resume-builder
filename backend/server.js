import {app} from './app.js'
import { connectToDB } from './config/mongoose.js'
import dotenv from 'dotenv'
import airouter from './services/ai/ai.routes.js'
import authrouter from './services/auth/auth.routes.js'


dotenv.config();
connectToDB();

app.use('/ai', airouter);
app.use('/auth', authrouter);


// generateInterviewReport({resume, self_desc, job_desc});

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(process.env.PORT, () => {
    // console.log(`Server started on port ${process.env.PORT}`);
    
});