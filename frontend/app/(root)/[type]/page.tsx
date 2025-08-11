import { getFiles, getuser, SearchFiles, SortFiles } from '@/utils/actions/fileActions';
import ShortFile from '@/components/ShortFile';
import React from 'react'
import { cookies, } from 'next/headers';
import {SearchParamProps,files} from '@/Types/index'
import FileCard from '@/components/card/FileCard';
import { getFileSize, getFileType } from '@/utils/utils';
import TotalSize from '@/components/card/TotalSize';

interface User {
    _id:string,
    name:string,
    email:string,
    password:string
}


const page = async ({params,searchParams}:SearchParamProps) => {
  const qq = (await searchParams).q || '';
  const sort = (await searchParams).sort || '';
  const types = ((await params)?.type as string) || '';
  const token = (await cookies()).get('token')?.value || ''
  const search = qq.toString()
  const sorts = sort.toString()
  let file
  if(qq){
    file = await SearchFiles({token: token, query:search})
  }else if(sort){
    file = await SortFiles({token: token, query:sorts})
  }else{
    file = await getFiles({token: token})
  }

  const user:User = await getuser({token: token})
  let sum:any =0;
  const size =await file.forEach((f: files)=>{
    const {type} = getFileType(f.originalname)
    if(type===types.toLowerCase().slice(0,-1)){return sum += f.fileSize}
  },0)

  const total = getFileSize(sum)

  return (
    <div className='flex flex-col items-center gap-8 w-full'>
      <section className='w-full'>
        <div className='font-bold text-4xl'>{types==='Videos'?'Media':`${types}`}</div>
        <div className='flex justify-between my-3 w-full h-[10%] font-medium text-md'>
          <TotalSize size={total}/>
          <ShortFile />
        </div>
      </section>
        {file.length >0 ? 
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full h-50'>
          {file.map((f: files)=>{
            const {type,extension} = getFileType(f.originalname)
            return(type===types.toLowerCase().slice(0,-1) &&
                <FileCard key={f._id} file={f} types={type} extrnsion={extension} userId={user._id}/>
            )
          })}
          </div>:<p>No files</p> }
    </div>
  )
}

export default page
