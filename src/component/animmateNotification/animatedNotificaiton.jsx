/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {motion,AnimatePresence} from "framer-motion"
import {useEffect,useState} from "react"

const CustomNotification = ({message,setIsVisible}) => {
    
     const [timeoutId,setTimeoutId] = useState(null)

     useEffect(()=>{
          const id = setTimeout(()=>setIsVisible(false),2000)
          setTimeoutId(id)
          return () => clearTimeout(id)
     },[])

     const handleHover = () => {
          clearTimeout(timeoutId)
          setTimeoutId(null)
     }

     const handleHoverEnd = () => {
          const id = setTimeout(()=>setIsVisible(false),2000)
          setTimeoutId(id)
     }
     return (
          <AnimatePresence>
          
 

<motion.div
               className="fixed top-10 right-1/2"
               initial={{
                    opacity:0,
                    backgroundColor:"none",
                    width:"0px"
               }}
               animate={{
                    opacity:1,
                    backgroundColor:"#8EFF2C",
                    width:"30%" 
               }}


               exit={{
                    opacity:0,
                    backgroundColor:"none",
                    width:"0px" 
               }}

               transition={{
                    type:"spring",
                    stiffness:300,
                    damping:20
               }}

               onHoverStart={handleHover}
               onHoverEnd={handleHoverEnd}
               
               >
               <div className="text-white font-semibold text-center m-auto px-4 py-2 rounded-lg cursor-pointer bg-[#8EFF2C]">
               {message}
               </div>
               </motion.div>


 
          

          </AnimatePresence>
     )
}


export default CustomNotification