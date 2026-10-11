import React from 'react'
import {Outlet} from 'react-router-dom'
// import { getMeFunc } from '../Api/api'
import { contextCreated } from '../../services/ContextProvider';
import { useContext } from 'react';

function Layout() {

  // const response= await getMeFunc();

  const {user, setUser} =useContext(contextCreated);

  function handleLogout(){
    setUser(null);
    alert("User logged out successfully...");
  }

  
  return (
    <>
        {/* <h1 className='p-4 font-medium text-center'>Resume Builder</h1> */}
      <div className='w-full min-h-full flex flex-col justify-start items-center gap-5 tracking-tighter'>
        {/* {user && <button className='w-fit h-fit px-3 py-1 bg-red-700 text-white absolute top-0 right-10 mt-2 rounded-md cursor-pointer hover:bg-red-800' onClick={handleLogout}>Logout</button>} */}
        <Outlet/>
      </div>
    </>
  )
}

export default Layout
