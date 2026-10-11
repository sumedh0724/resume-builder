import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true
});

export async function loginFunc({email, password}){
    // console.log("At axios: ", email);
    
    try{
        const response= await api.post('/auth/login',{
            email,
            password
        });
        // console.log(response.data);
        return response.data;
    }
    catch(err){
        // console.log(err);
        return null;
    }
    
}
export async function registerFunc({username, email, password}){
    try{
        // console.log(username);
        
        const response= await api.post('/auth/register',{
            username,
            email,
            password
        });
        // console.log(response.data);
        return response.data;
    }
    catch(err){
        // console.log(err);
        return null;
    }
    
}

export async function logoutFunc(){
    try{
        const response= await api.get('/auth/logout');
        // console.log(response.data);
        return response.data;
    }
    catch(err){
        // console.log(err);
        return null;
    }
}

export async function getMeFunc(){
    try{
        const response= await api.get('/auth/getMe');
        // console.log('response at line 61 of api.js ', response.data);
        
        return response.data;
    }
    catch(err){
        // console.log(err);
        return null;
    }
}

export async function generateReportFunc({firm_name,resume, self_desc, job_desc}){
    const formData = new FormData();
    formData.append("firm_name", firm_name);
    formData.append("resume", resume);
    formData.append("self_desc", self_desc);
    formData.append("job_desc", job_desc);

    const response = await api.post('/ai/generate-report', formData);
    return response;
}

export async function updateSkillCompletion(
    reportId,
    skillGapId,
    isCompleted
) {
    const response = await axios.patch(
        `http://localhost:3000/auth/reports/${reportId}/skills/${skillGapId}`,
        { isCompleted },
        { withCredentials: true }
    );

    return response.data;
}

