import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useToast } from './Toast'
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth()
    const { success } = useToast()
    const navigate = useNavigate()
    
    const logoutUser = () => {
        logout()
        success('Logged out successfully')
    }


  return (
    <div className='shadow bg-white'>
    <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>

    <Link to ="/">
    <img src="/logo.svg" alt="" className='h-11 w-auto'/>
    </Link>

    <div className='flex items-center gap-4 text-sm'>
        {user && <p className='max-sm:hidden'>Hi, {user.name}</p>}
        <button onClick={logoutUser} className='bg-white hover:bg-slate-500 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
    </div>
    </nav>
    </div>
  )
}
