import React, { useContext, useEffect } from 'react'
import { contextCreated } from '../services/ContextProvider'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { hooksFunc } from '../hooks/hooks';
import LoadingScreen from './LoadingScreen';

function Protected() {
    const {user,loading}=useContext(contextCreated);
    if(loading) return(
      <LoadingScreen
        title="Verifying your session"
        message="One moment while we check your sign-in."
      />
    )
      if(!user){
      // console.log("Not loggged in...");
    return (<Navigate to="/login" />)
      }
  return (<Outlet/>)
}

export default Protected
