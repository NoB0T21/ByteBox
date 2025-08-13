import Image from "next/image"
import MobileNavSidebar from "./MobileNavSidebar"

const MobileNav = () => {
  return (
    <>
      <div className="z-2 w-full">
        <div className="w-full flex justify-between ">
          <div className="flex justify-center gap-2 items-center">
            <Image src={'/Images/Logo.png'} width={200} height={200} className="size-12" alt="logo"/>
            <h1 className="flex mb-2 font-semibold text-md">ByteBox</h1>
          </div>
          <MobileNavSidebar/>
        </div>
      </div>
    </>
  )
}

export default MobileNav
