import { useState } from 'react'
import './App.css'
import Login from './components/login'
import Register from './components/Register'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Layout from './components/Layout/Layout';
import ContextProvider from './services/ContextProvider';


function App() {
  
  return (
    <div>
        <h1>Home</h1>
    </div>
  );
}

export default App
