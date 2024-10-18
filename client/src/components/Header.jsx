import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
       <Link to={'/'}> <h1 className='text-sm sm:text-xl flex flex-wrap font-bold'>
            <span className='text-slate-500'>My</span>
            <span className='text-slate-700'>Estate</span>
        </h1></Link>
        <form className='bg-slate-100 rounded-lg p-3 flex items-center'>
        <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholder='search..'/>
        <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4'>
           <Link to={'/home'}> <li className='text-slate-700 hover:underline hidden sm:inline' >Home</li></Link>
           <Link to={'/about'}> <li className='text-slate-700 hover:underline hidden sm:inline'>About</li></Link>
           <Link to={'/sign-in'}> <li className='text-slate-700 hover:underline'>SignIn</li></Link>
        </ul>
        </div> 
    </header>
  )
}

export default Header
