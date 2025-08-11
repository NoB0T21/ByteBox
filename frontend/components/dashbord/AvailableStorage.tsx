import React from 'react'

const AvailableStorage = ({percentage,size}:{percentage:string,size:string}) => {
  return (
    <div className='flex p-2 px-4 w-full h-full'>
        <div className="hidden relative lg:flex h-full">
          <svg className="size-full rotate-[135deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-300" strokeWidth="1" strokeDasharray="75 100" strokeLinecap="round"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current" strokeWidth="3" strokeDasharray={`${percentage} 100`} strokeLinecap="round"></circle>
          </svg>

          <div className="top-1/2 absolute p-1 text-center -translate-x-1/2 -translate-y-1/2 start-1/2 transform">
            <span className="font-bold lg:text-4xl">{percentage}%</span>
            <span className="block lg:text-xl">Space used</span>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full lg:w-2/3 h-full'>
            <p className='font-semibold text-3xl lg:text-4xl'>Available Storage</p>
            <p className='font-semibold text-xl lg:text-2xl'>{size} / 500MB</p>
        </div>
    </div>
  )
}

export default AvailableStorage
