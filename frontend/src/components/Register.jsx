import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { hooksFunc } from '../hooks/hooks';
import { contextCreated } from '../services/ContextProvider';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {loading}=useContext(contextCreated);
    const {handleRegister}=hooksFunc();
    const navigate=useNavigate();
    
      async function handleSubmit(e){
        e.preventDefault();
            const response=await handleRegister({username,email,password});
            if (!response) {
              alert("Unable to connect to the server. Please try again.");
              return;
            }

            if (!response.user) {
              alert(response.message || "Unable to create your account.");
              return;
            }

            alert(response.message || "Account created successfully. Please login.");
            navigate('/');
      }

  if(loading) return(
    <LoadingScreen
      title="Loading"
      message="Please wait a moment while we get things ready."
    />
  )

  return (
    <div className="grid min-h-screen w-full bg-[#F2F5F7] text-[#0F2A43] lg:grid-cols-[5fr_6fr]">

      {/* Brand panel */}
      <aside className="rp-chart-dark hidden flex-col justify-between bg-[#0F2A43] p-12 text-white lg:flex">
        <Link to={'/'} className="flex items-center gap-2.5 font-display text-3xl font-bold tracking-tight">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#F5B800]">
            <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" aria-hidden="true">
              <path d="M3 11.5 21 3l-5.2 18-4.1-7.1z" fill="#0F2A43" />
              <path d="m11.7 13.9 9.3-10.9" stroke="#F5B800" strokeWidth="1.4" fill="none" />
            </svg>
          </span>
          ResumePilot
        </Link>

        <div>
          <h2 className="max-w-md font-display text-6xl font-bold leading-[0.95] tracking-tight">
            Check in for your next interview.
          </h2>
          <ul className="mt-8 max-w-sm space-y-4 text-lg leading-7 text-[#B8C9D6]">
            <li className="flex gap-3">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#F5B800]" />
              A match score against the job description
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#F5B800]" />
              Technical and behavioral questions with suggested answers
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#F5B800]" />
              A skill checklist and a day-by-day preparation plan
            </li>
          </ul>
        </div>

        <p className="text-sm text-[#8CA3B5]">Free to start</p>
      </aside>

      {/* Form */}
      <div className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <Link to={'/'} className='mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#5B7083] transition hover:text-[#0F2A43]'>
            <span aria-hidden="true">←</span>
            Back to home
          </Link>

          <h2 className="mb-8 font-display text-5xl font-bold tracking-tight">
            Create Account
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="user"
                className="text-sm font-semibold text-[#27415A]"
              >
                Username
              </label>

              <input
                type="text"
                name="user"
                id="user"
                placeholder="Enter your username"
                className="w-full rounded-md border border-[#B9C8D4] bg-white px-4 py-3 text-[#0F2A43] outline-none transition
                     placeholder:text-[#7F93A3]
                     focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#27415A]"
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-[#B9C8D4] bg-white px-4 py-3 text-[#0F2A43] outline-none transition
                     placeholder:text-[#7F93A3]
                     focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#27415A]"
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-[#B9C8D4] bg-white px-4 py-3 text-[#0F2A43] outline-none transition
                     placeholder:text-[#7F93A3]
                     focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-[#0F2A43] py-3.5 font-semibold text-white transition
                         hover:bg-[#173F63]
                         active:scale-[0.99]
                         focus:outline-none focus:ring-2 focus:ring-[#F5B800]"
            >
              Create Account
            </button>

          </form>
          <p className='mt-6 text-[15px] text-[#4A6073]'>Already have an account? <Link to={'/login'} className='font-semibold text-[#0F2A43] underline decoration-[#F5B800] decoration-2 underline-offset-4'>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
