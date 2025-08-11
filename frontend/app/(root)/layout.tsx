import Header from '@/components/navigation/Header'
import MobileNav from '@/components/navigation/MobileNav'
import Sidebar from '@/components/navigation/Sidebar'
import React from 'react'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <main className='flex h-screen'>
        <div className='hidden sm:flex'><Sidebar/></div>
        <section className='flex flex-col flex-1 pr-5 pb-5'>
            <div className='sm:hidden flex'><MobileNav/> </div>
            <div className='hidden sm:flex w-full'><Header/></div>
            <div className='flex-1 bg-zinc-900 sm:mr-7 md:mb-7 px-5 md:px-9 py-7 md:py-10 sm:rounded-2xl w-full h-full overflow-auto remove-scrollbar'>{children}</div>
        </section>
    </main>
  )
}

export default Layout
