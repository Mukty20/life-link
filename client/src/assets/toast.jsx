import React from 'react'
import { HiXCircle } from 'react-icons/hi'
import useToast from '../../public/context/toast.js'


const Toast = () => {
  
  const toastValue = useToast((state) => state.toast)
  const setToast = useToast((state) => state.setToast)

  return (
     <div className={`fixed flex
         items-center
         gap-3.5 
         place-content-center 
         left-5 right-5 bottom-8 px-2 py-3
    
        bg-[#c31b1b] shadow-xl shadow-gray-400
          text-white
         rounded-2xl z-10 p-3.5     
         md:right-35 
         md:left-35 
         transition-all
         duration-[.5s]
         text-[14px]
         h-[3rem]
         
    
         ${toastValue === '' ? ' translate-y-30.5' : ' translate-y-0'}
    
         
        `}>
          {/* <BsFillExclamationCircleFill /> */}
          <>{toastValue}</>
          <div 
            className="absolute right-5 top-2 text-2xl cursor-pointer text-[black]"
            onClick={() => setToast('')}
          ><HiXCircle /></div>
        </div>
  )
}

export default Toast
