import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../../App";
import Layout from "../Layout/Layout";
import LandingPage from "../Landing";
import Login from "../login";
import Register from "../Register";
import InputForm from "../InputForm";
import Dashboard from "../Dashboard";

export const Routes=createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='' element={<LandingPage/>}/>
                <Route path='/ai/generate-report' element={<InputForm/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Route>
        </>
    )
)