import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
const Navbar = () => {
  const {user} = useContext(UserContext)
  return (
    <header className='p-4 flex items-center justify-between'>
      <Link to={'/'} href="" className='flex items-center gap-1 logoAnchor'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="-rotate-90 w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className='font-bold text-xl'>airbnb</span>
      </Link>
      <div className='searchBarMain shadow-md shadow-gray-200 gap-2 flex border border-slate-300 rounded-full px-4 py-2'>
        <div>Anywhere</div>
        <div className=" border-l border-slate-300"></div>
        <div>Any week</div>
        <div className=" border-l border-slate-300"></div>

        <div>Any guests</div>
        <button className='searchBtn bg-primary rounded-full p-2 text-white p-1 font-bold'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 font-bold">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        </button>
      </div>
      
      <Link to={user? '/account':'/login'} className='searchBarMain items-center  gap-2 flex border border-slate-300 rounded-full px-4 py-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {
            user && (
              <div>
                {user.name}
              </div>
            )
          }
        <div className="rounded-full border border-gray-500 user bg-gray-500 text-white overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative top-1 w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
          
        </div>
      </Link>
    </header>
  )
}

export default Navbar