import Image from "next/image"
import SideBarBtn from "./SideBarBtn"
import User from "./User"


const Sidebar = () => {
  return (
    <div className='flex flex-col justify-between items-center px-4 w-19 lg:w-60 xl:w-70 transition-(w) duration-200 ease-in-out'>
      <div className="flex justify-center items-center gap-2 w-full h-1/6">
        <Image src={'/Images/Logo.png'} width={80} height={80} alt="logo"/>
        <h1 className="hidden lg:flex font-semibold text-2xl">ByteBox</h1>
      </div>
      <div className="flex flex-col gap-2 py-4 w-full">
        <div className="w-full h-10"><SideBarBtn pathname={'/'} name={'Dashboard'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Documents'} name={'Documents'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Images'} name={'Images'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Videos'} name={'Videos'}/></div>
        <div className="w-full h-10"><SideBarBtn pathname={'/Others'} name={'Others'}/></div>
      </div>
      <div className="hidden relative lg:flex justify-center mb-4 w-full h-30">
        <div className="top-15 -z-1 absolute bg-[#ff06de38] rounded-xl w-2/3 h-1/2"></div>
        <Image src='/files.png' alt='Logo' width={100} height={90} className='h-auto'/>
      </div>
      <User/>
    </div>
  )
}

export default Sidebar
