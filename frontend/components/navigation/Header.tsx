import React from 'react'
import Search from '../Search'
import FileUpload from '../FileUpload'
import Logoutbtn from './Logoutbtn'

const Header = () => {
  return (
    <header className='flex justify-between items-center px-2 w-full h-20'>
        <Search/>
      <div className='flex items-center'>
        <FileUpload/>
        <Logoutbtn/>
      </div>
    </header>
  )
}

export default Header
