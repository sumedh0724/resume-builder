import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes } from './components/routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import ContextProvider from './services/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className="wrapper flex flex-col justify-start items-center m-auto min-h-full w-full">
    <ContextProvider>
    <RouterProvider router={Routes}/>
    </ContextProvider>
      </div>
  </StrictMode>,
)
