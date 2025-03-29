import { useEffect, useState } from "react";
import { useGlobalVariables } from "../../context/global";


const DependencyMap = () => {
const {setSelectedIcon} = useGlobalVariables()
const [active,setActive] = useState("func")

     useEffect(() => {
          setSelectedIcon("fileVisualisation")
     },[])
     
     return (
          <div className="p-[20px] flex flex-col justify-center">
               <div className="grid grid-cols-2 grid-rows-1 gap-5 items-center shadow-sm w-1/2">
                    <div onClick={()=> setActive("func")} className={`py-5 pl-5 cursor-pointer rounded-l-lg ${active == "func" ? 'bg-[#530DF6] text-white font-semibold':'bg-white text-black'}`}><h1>Function calls</h1></div>
                    <div onClick={()=> setActive("import")} className={`py-5 pl-5 cursor-pointer  rounded-r-lg ${active == "import" ? 'bg-[#530DF6] text-white font-semibold':'bg-white text-black'}`}><h1>Import Export relationships</h1></div>
               </div>
               <h1 className="mt-5 font-[25px]">Example if index.js calls the function geuser  writen in the file getuser.js</h1>

          </div>
     )
}


export default DependencyMap;