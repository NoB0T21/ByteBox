'use client'

import { usePathname } from "next/navigation"
import { Dashboard,DashboardFill, Documents, DocumentsFill, Images, ImagesFill, Media, MediaFill, Other, OtherFill } from "../icon/Icons"
import Link from "next/link"

const SideBarBtn = ({pathname,name}:{pathname: string, name: string}) => {
    const path = usePathname()
  return (
    <Link href={`${pathname}`} className={`${path===pathname?'bg-[#4B004B] lg:border-r-8 border-[#800080] text-[#FFFFFF]':'text-[#AAAAAA] hover:text-[#FFFFFF] hover:bg-[#B266B2]'}  flex justify-start sm:justify-center lg:justify-start h-full gap-2 rounded-md items-center px-6 sm:px-0 lg:px-6 w-full transition-all duration-200 ease-in-out`}>
        <div className="flex justify-center items-center w-12 sm:w-18 lg:w-12 h-18 p-0.5 lg:p-1">
            {name==='Dashboard' && (path==='/'?<DashboardFill/>:<Dashboard/>)}
            {name==='Documents' && (path===pathname?<DocumentsFill/>:<Documents/>)}
            {name==='Images' && (path===pathname?<ImagesFill/>:<Images/>)}
            {name==='Videos' && (path===pathname?<MediaFill/>:<Media/>)}
            {name==='Others' && (path===pathname?<OtherFill/>:<Other/>)}
        </div>
        <div className="sm:hidden flex lg:flex">{name}</div>
    </Link>
  )
}

export default SideBarBtn
