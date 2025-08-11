import { files } from '@/Types'
import React from 'react'
import { DocumentsFill, ImagesFill, MediaFill, OtherFill } from '../icon/Icons'
import { getFileSize, getFileType } from '@/utils/utils'
import Link from 'next/link'

const TypeFile = async ({file}:{file:files[]}) => {
    let Documentsum:any =0;
    let videosum:any =0;
    let imagesum:any =0;
    let othersum:any =0;
    let dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='document'){return Documentsum += f.fileSize}
      },0)
    dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='video'){return videosum += f.fileSize}
      },0)
    dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='image'){return imagesum += f.fileSize}
      },0)
    dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='other'){return othersum += f.fileSize}
      },0)
    const Document = getFileSize(Documentsum)
    const video = getFileSize(videosum)
    const image = getFileSize(imagesum)
    const other = getFileSize(othersum)
  return (
    <div className='gap-4 grid lg:grid-cols-4 sm:grid-rows-4 h-full'>
        <div className='lg:col-span-2 row-span-2'>
            <Link href='/Documents' className='flex lg:flex-col gap-5 bg-[#0000002c] px-3 py-2 rounded-xl w-full h-full cursor-pointer'>
                <div className='flex justify-between items-center gap-6 w-full'>
                    <div className='bg-blue-600 shadow-amber-400 rounded-full size-13 lg:size-20'>
                        <DocumentsFill/>
                    </div>
                    <p className='lg:w-3/4 font-medium text-sm lg:text-xl'>{Document}</p>
                </div>
                <div className='flex justify-center items-center w-full font-semibold text-xl lg:text-2xl'>Documents</div>
            </Link>
        </div>
        <div className='lg:col-span-2 row-span-2'>
            <Link href='/Videos' className='flex lg:flex-col gap-5 bg-[#0000002c] px-3 py-2 rounded-xl w-full h-full cursor-pointer'>
                <div className='flex justify-between items-center gap-6 w-full'>
                    <div className='bg-orange-500 shadow-amber-400 rounded-full size-13 lg:size-20'>
                        <MediaFill/>
                    </div>
                    <p className='lg:w-3/4 font-medium text-sm lg:text-xl'>{video}</p>
                </div>
                <div className='flex justify-center items-center w-full font-semibold text-xl lg:text-2xl'>Media</div>
            </Link>
        </div>
        <div className='lg:col-span-2 row-span-2'>
            <Link href='/Images' className='flex lg:flex-col gap-5 bg-[#0000002c] px-3 py-2 rounded-xl w-full h-full cursor-pointer'>
                <div className='flex justify-between items-center gap-6 w-full'>
                    <div className='bg-emerald-700 shadow-amber-400 rounded-full size-13 lg:size-20'>
                        <ImagesFill/>
                    </div>
                    <p className='lg:w-3/4 font-medium text-sm lg:text-xl'>{image}</p>
                </div>
                <div className='flex justify-center items-center w-full font-semibold text-xl lg:text-2xl'>Images</div>
            </Link>
        </div>
        <div className='lg:col-span-2 row-span-2'>
            <Link href='/Others' className='flex lg:flex-col gap-5 bg-[#0000002c] px-3 py-2 rounded-xl w-full h-full cursor-pointer'>
                <div className='flex justify-between items-center gap-6 w-full'>
                    <div className='bg-pink-400 shadow-amber-400 rounded-full size-13 lg:size-20'>
                        <OtherFill/>
                    </div>
                    <p className='lg:w-3/4 font-medium text-sm lg:text-xl'>{other}</p>
                </div>
                <div className='flex justify-center items-center w-full font-semibold text-xl lg:text-2xl'>Others</div>
            </Link>
        </div>
    </div>
  )
}

export default TypeFile