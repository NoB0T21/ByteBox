import Image from "next/image"
import SideBarBtn from "./SideBarBtn"
import User from "./User"
import Link from "next/link"


const Sidebar = () => {
  return (
    <div className='flex flex-col justify-between items-center px-4 w-20 lg:w-60 xl:w-70 transition-(w) duration-200 ease-in-out'>
      <Link href={'/'} className="flex justify-center items-center gap-2 w-full h-1/6">
        <Image src={'/Images/Logo.png'} width={200} height={200} className="size-15 lg:size-20" alt="logo"/>
        <h1 className="hidden lg:flex mb-4 font-semibold text-2xl">ByteBox</h1>
      </Link>

      <div className="flex flex-col gap-2 py-4 w-full">
        <div className="w-full h-10"><SideBarBtn pathname={'/'} name={'Dashboard'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Documents'} name={'Documents'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Images'} name={'Images'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Videos'} name={'Videos'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Others'} name={'Others'}/></div>
      </div>

      <div className="hidden relative lg:flex justify-center mb-4">
        <div className="top-15 -z-1 absolute bg-[#800080] rounded-xl w-[200px] h-[80px]"></div>
        <Image src='/files.png' alt='Logo' width={500} height={500} className='size-30'/>
      </div>
      
      <User/>
    </div>
  )
}

export default Sidebar
