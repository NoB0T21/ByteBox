'use client'
import React, { useEffect, useState } from 'react'
import {Searchbtn} from './icon/Icons'
import Cookies from 'js-cookie'
import { SearchFiles } from '@/utils/actions/fileActions'
import { usePathname, useRouter } from 'next/navigation'
import { files } from '@/Types'
import { getFileSize, getFileType } from '@/utils/utils'
import Thumbnail from './Thumbnail'

const Search = () => {
  const token = Cookies.get('token') || ''
  const route = useRouter()
  const path = usePathname()
  const [search,setSearch] = useState('')
  const [result,setResult] =useState<files[]>([])
  const [type,setType] = useState('')

  useEffect(()=>{
    if (!search) {
    setResult([]);
    return;
  }
   const delayDebounce = setTimeout(() => {
    const fetch = async () => {
      const res = await SearchFiles({token:token, query:search})
      setResult(res)
    };

    fetch();
  }, 300);
  return () => clearTimeout(delayDebounce);
  },[search])

  const handleSubmit = async () => {
    setResult([])
    route.push(`${type}?q=${search}`)
  }
  const handleSubmit2 = async ({types,searchs}:{types:string,searchs:string}) => {
    setResult([])
    route.push(`/${types==='document'?'Documents'
            :`${types==='image'?'Images'
            :`${types==='video'?'Videos'
            :`${types==='other'?'Others'
            :``}`}`}`}?q=${searchs}`)
  }
  return (
    <div className='w-100 lg:w-150'>
      <div className='flex items-center gap-4 w-full'>
        <button onClick={()=>handleSubmit()} className='size-6'>
          <Searchbtn/>
        </button>
        <input placeholder='Search' value={search} onChange={(e)=>{setSearch(e.target.value);setType(path)}} type="text" className='bg-zinc-700 p-2 px-5 rounded-full outline-none w-full h-full' />
      </div>
      {result.length<=0?'':<>
        <div className='top-18 absolute flex flex-col gap-5 bg-zinc-700 p-4 rounded-xl w-100 lg:w-150 h-auto min-h-25'>
        {result.map((file)=>{
          const {type,extension} = getFileType(file.originalname)
          const filesize = getFileSize(file.fileSize)
          return(<>
          <div key={file._id} onClick={()=>{handleSubmit2({types:type,searchs:file.originalname})}} className='flex gap-5 bg-zinc-600 p-2 rounded-xl'>
            <div className='w-15 h-full'>
              <Thumbnail type={type} extension={extension} url={file.imageURL}/>
            </div>
            <div className='flex flex-col justify-center w-full'>
              <div className='w-full font-medium text-xl truncate'>{file.originalname}</div>
              <div className='flex justify-between w-full'>
                <div>{filesize}</div>
                <div>{file.createdAt.split('T')[1].split(':')[0]}:{file.createdAt.split('T')[1].split(':')[1]}, {file.createdAt.split('T')[0]}</div>
              </div>
            </div>
          </div>
        </>)})}
        </div>
      </>}
    </div>
  )
}

export default Search
