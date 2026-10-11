import { loginFunc, logoutFunc, registerFunc } from "../components/Api/api";
import { contextCreated } from "../services/ContextProvider";
import { useContext } from "react";
import { generateReportFunc } from "../components/Api/api";

export function hooksFunc() {
    
    const {setLoading,setUser}=useContext(contextCreated);
    
    async function handleLogin({email, password}){
        
        setLoading(true);
        try{
        const response= await loginFunc({email,password});
        setUser(response?.user ?? null);
        setLoading(false);
        return response;
        }
        catch(err){
            // console.log(err);
            return null;
        }
        finally{
            setLoading(false);
        }
    }
    
    async function handleGenerateReport({firm_name,resume, self_desc, job_desc}){

        // console.log("At hooks: ",firm_name);
        
        
        setLoading(true);
        try{
        const response= await generateReportFunc({firm_name, resume, self_desc, job_desc});
        return response.data;
        }
        catch(err){
            // console.log(err);
            return null;
        }
        finally{
            setLoading(false);
        }
    }
    
    async function handleLogout(){
        try{setLoading(true);
        const response=await logoutFunc();
        setUser(null);
        setLoading(false);
        return response;
        }
        catch(err){
            // console.log(err);
            return null;
        }
        finally{
            setLoading(false);
        }
    }
    
    async function handleRegister({username, email, password}){
        try{
            setLoading(true);
            const response=await registerFunc({username,email,password});
            setUser(response?.user ?? null);
            setLoading(false);
            return response;
        }
        catch(err){
            // console.log(err); 
            return null;           
        }
        finally{
            setLoading(false);
        }
    }
    return {handleLogin, handleLogout, handleRegister, handleGenerateReport};
}