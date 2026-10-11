import React from 'react'
import { useState, useEffect ,createContext } from 'react'
import { getMeFunc } from '../components/Api/api';

export const contextCreated=createContext()

function ContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    useEffect(()=>{
      async function getUser(){
        const response=await getMeFunc();
        setUser(response?.user)
        setLoading(false)
      }
      getUser();
    },[])

  return (
    <contextCreated.Provider value={{user,setUser,loading,setLoading}}>{children}</contextCreated.Provider>
  )
}

export default ContextProvider
