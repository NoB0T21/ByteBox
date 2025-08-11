'use client'
import { useAppContext } from "@/context"
import Image from "next/image"

const User = () => {
    const {user} = useAppContext()
    const {name,email, picture} = user
  return (
    <div className="flex sm:justify-center lg:justify-start items-center gap-2 bg-purple-900 mt-1 mb-5 sm:p-0 px-2 lg:px-2 rounded-xl sm:rounded-full w-full h-12 lg:h-14">
        <div className="size-10 lg:size-11">
            <Image width={100} height={100} alt="profile" src={picture || '/Images/Logo.png'} className="rounded-full size-full object-cover"/>
        </div>
        <div className="sm:hidden flex lg:flex flex-col justify-center w-2/3 font-light text-md">
          <p>{name}</p>
          <p className="text-sm truncate">{email}</p>
        </div>
    </div>
  )
}

export default User
