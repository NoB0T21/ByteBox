import React from 'react'
import Image from 'next/image'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
        <section className='hidden lg:flex flex-col gap-8 bg-indigo-500 p-10 rounded-r-xl w-1/3'>
            <div className='flex justify-start xl:justify-center items-center gap-2 xl:pr-7'>
                <Image src='/Images/Logo.png' alt='Logo' width={100} height={100} className='h-auto xl:size-40'/>
                <h2 className='mb-3 font-semibold text-3xl xl:text-5xl'>ByteBox</h2>
            </div>
            <div className='flex flex-col gap-5'>
                <h1 className='font-black text-4xl xl:text-6xl'>Manage your files the best way</h1>
                <h5 className='xl:text-3xl'>Awesome, we've created the perfect place for you to store all your documents</h5>
            </div>
            <div className='flex justify-center my-7'>
                <Image src='/files.png' alt='Logo' width={200} height={200} className='h-auto xl:size-60 hover:-rotate-5 hover:scale-120 transition-all duration-300 ease-in-out'/>
            </div>
        </section>
      <div className='flex flex-col flex-1 lg:justify-center items-center p-4 lg:p-10 py-10 lg:py-0'>
        <div className='lg:hidden flex justify-center items-center gap-2'>
            <Image src='/Images/Logo.png' alt='Logo' width={100} height={100} className='h-auto'/>
            <h2 className='mb-3 font-bold text-4xl'>ByteBox</h2>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
