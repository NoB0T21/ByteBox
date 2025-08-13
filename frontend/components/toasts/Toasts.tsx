import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from 'react'
import {Info, Warning} from "../icon/Icons"

type NotiType = 'infoMsg' | 'warningMsg' | 'successMsg' | 'erreoMsg'

const Toasts = ({type, msg}: {type: NotiType, msg: string}) => {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
          }, 3000);
    },[])

    return (
        <div className='flex flex-col'>
            <AnimatePresence initial={false}>
            {isVisible ? (
                <motion.div 
                initial={{ x:300, scale: 0 }}
                animate={{x:0, scale: 1 }}
                exit={{x:300,scale: 0 }}
                    className={`absolute z-999 top-0 right-0 m-3 bg-[#2A2A2A] p-2 w-65 rounded-md`}>
                        {type === 'warningMsg' && <>
                            <div className=" flex px-1 gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <div className="w-6 h-6 text-yellow-500"><Warning/></div>
                                    <p className="text-md font-semibold">Warning</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md ">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="px-2 m-2 font-medium">{msg}</div>
                        </>}
                        {type === 'infoMsg' && <>
                            <div className=" flex px-1 gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <div className="w-6 h-6 text-blue-400"><Info/></div>
                                    <p className="text-md font-semibold">Info</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md ">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="px-2 m-2 font-medium">{msg}</div>
                        </>}
                        {type === 'erreoMsg' && <>
                            <div className=" flex px-1 gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <div className="w-6 h-6 text-[#FF6666]"><Warning/></div>
                                    <p className="text-md font-semibold">Error</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md ">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="px-2 m-2 font-medium">{msg}</div>
                        </>}
                        {type === 'successMsg' && <>
                            <div className=" flex px-1 gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <div className="w-6 h-6 text-[#33CC99]"><Warning/></div>
                                    <p className="text-md font-semibold">Success</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md ">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="px-2 m-2 font-medium">{msg}</div>
                        </>}
                </motion.div>): null}
                </AnimatePresence>
        </div>
    )
}

export default Toasts
