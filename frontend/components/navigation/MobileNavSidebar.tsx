'use client'
import { useState } from 'react'
import User from './User'
import SideBarBtn from "./SideBarBtn"
import FileUpload from '../FileUpload'
import Logoutbtn from './Logoutbtn'
import { Menuses } from '../icon/Icons'

const MobileNavSidebar = () => {
    const [show,setShow] = useState(false)
  return (
    <>
      <div onClick={()=>setShow(!show)} className='flex justify-center items-center m-1 w-8'><Menuses/></div>
      <div className={`${show?'flex ':'hidden'} absolute top-0 right-0 h-screen w-full  backdrop-blur-xs justify-end transition-all duration-300 ease-in-out`}>
        <div className='flex flex-col gap-2 bg-zinc-900 p-3 rounded-l-xl w-3/4'>
            <div className='mb-3' onClick={()=>setShow(!show)}>X</div>
            <User/>
            <div className="flex flex-col gap-2 py-4 w-full">
                <div className="w-full h-10"><SideBarBtn pathname={'/'} name={'Dashboard'}/></div>
                <div className="w-full h-10"><SideBarBtn pathname={'/Documents'} name={'Documents'}/></div>
                <div className="w-full h-10"><SideBarBtn pathname={'/Images'} name={'Images'}/></div>
                <div className="w-full h-10"><SideBarBtn pathname={'/Videos'} name={'Videos'}/></div>
                <div className="w-full h-10"><SideBarBtn pathname={'/Other'} name={'Others'}/></div>
            </div>
            <FileUpload/>
            <Logoutbtn/>
        </div>
      </div>
    </>
  )
}

export default MobileNavSidebar
