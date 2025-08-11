import { files } from '@/Types'
import React from 'react'
import { getFileType } from '@/utils/utils'
import { getuser } from '@/utils/actions/fileActions'
import { cookies, } from 'next/headers';
import File from './File'

interface User {
    _id:string,
    name:string,
    email:string,
    password:string
}

const RecentFile = async ({file}:{file:files[]}) => {
    const token = (await cookies()).get('token')?.value || ''
    const user:User = await getuser({token: token})
  return (
    <div className='flex flex-col items-center'>
        <p className='font-medium text-xl lg:text-5xl'>Recent File</p>
      {file.length >0 ? 
        <div className='flex flex-col gap-6 px-2 py-5 w-full h-50'>
          {file.map((f: files)=>{
            const {type,extension} = getFileType(f.originalname)
            return(<File key={f._id} file={f} types={type} extrnsion={extension} userId={user._id}/>
            )
          })}
          </div>:<p>No files</p> }
    </div>
  )
}

export default RecentFile
