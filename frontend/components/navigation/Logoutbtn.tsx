'use client'
 import React from 'react'
import { Logout } from '../icon/Icons'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
 
 const Logoutbtn = () => {
  const router= useRouter()

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      Cookie.remove('token')
      Cookie.remove('user')
      router.push('/sign-up')
    }

   return (
    <button onClick={logout} className='flex justify-center items-center gap-2 bg-red-700 hover:bg-red-600 mx-2 p-1 rounded-full w-full sm:w-10 h-10'><Logout/><p className='sm:hidden flex'>Logout</p></button>
   )
 }
 
 export default Logoutbtn
 