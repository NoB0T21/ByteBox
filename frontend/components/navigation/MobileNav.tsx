import Image from "next/image"
import MobileNavSidebar from "./MobileNavSidebar"

const MobileNav = () => {
  return (
    <>
      <div className="p-1 px-2 z-2 w-full">
        <div className="w-full flex justify-between ">
          <div className="flex justify-center gap-2 items-center">
            <Image src={'/Images/Logo.png'} width={50} height={50} alt="logo"/>
            <h1 className="flex font-semibold text-md">ByteBox</h1>
          </div>
          <MobileNavSidebar/>
        </div>
      </div>
    </>
  )
}

export default MobileNav
