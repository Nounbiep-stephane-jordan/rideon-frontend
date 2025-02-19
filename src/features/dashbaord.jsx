import { useState } from "react"
import ProgressTracker from "../component/progressTracker/progressTracker"
import ProjectCard from "../component/ProjectCard/projectCard"
import iconCopy from "../../src/assets/copy_icon.svg";
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";
import { useGlobalVariables } from "../context/global";

const MainDashboard = () => {
     const [projectsList,setProjectList] = useState([1,2,3,4,5])
     const [copied,setCopied] = useState(false)
     const [focusedIndex,setFocusedIndex] = useState(null)
     const navigate = useNavigate()
     const {setSelectedIcon} = useGlobalVariables()

     const handleCardClick = (index) => {
          setFocusedIndex(index === focusedIndex ? null:index)
     }

     const handleCopyClicked = async(value) => {
          try{
               await navigator.clipboard.writeText(value)
               setCopied(true)
               setTimeout(()=>setCopied(false),2000)
          }catch(err){
               console.log(err)
          }
     }
     return (
          <div className="flex flex-col justify-between p-[20px]">
               <h2 className="mb-2 flex flex-start place-items-start main-text">Projects</h2>
               <div className="flex flex-row justify-between mb-5">
               
               <div className="flex flex-col">
               <div className="flex flex-row justify-between mr-5 p-2 w-[500px] h-[150px] custom-scroll-x realative">
               <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>
               
             
               {projectsList.map((p) => (
                    <>
                    <motion.div key={p} className="mr-5" 
                    initial={{opacity:0.8}}
                    animate={{
                         opacity:focusedIndex === null || focusedIndex === p ? 1: 0.4,
                         scale:focusedIndex ===p ? 1.1 : 1,
                         y:focusedIndex===null?0:p===focusedIndex?-p*1:20,
                         
                        }}

                    transition={{type:"spring",stiffness:300,damping:20}}
                    
                    >
                    <ProjectCard handleCardClick={handleCardClick} p={p} isSelected={focusedIndex ===p} name={"dev 1"} isFullySetup={false}/>
                    </motion.div>
                    </>
               ))}
            
            

               

               </div>

               <button onClick={() => {
                    setSelectedIcon("onboardingWizard")
                    navigate("/wizard-config-1")
               }} className="cursor-pointer rounded-l-full w-[100px] text-sm blue-shadow mt-5 p-[5px] text-center text-white bg-[#530DF6] hover:opacity-80 transition duration-300">Ride on</button>
               
               <div className="mt-5">
               <ProgressTracker/>
               </div>

               </div>

               <div className="">
                    <h2 className="text-left second-text">Project Credentials</h2>
                    {copied&&<span className="text-green-500">Copied!</span>}
                    <div className="relative orange-shadow p-4 flex flex-col w-[400px] h-[250px] custom-scrollbar box-border">
                    <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>

                    <div className="h-full px-4 pb-10 overflow-y-scroll custom-scrollbar">
                    <div className="flex flex-col justify-between mt-[10px]">
                         <h3 className="font-normal text-left">Database access</h3>
                         <div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Name</span>
                              <span className="text-xs text-[#606060]">My database</span>
                              <span onClick={() => handleCopyClicked("My database")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Password</span>
                              <span className="text-xs text-[#606060]">7582132563</span>
                              <span className="" onClick={() => handleCopyClicked("7582132563")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         </div>
                    </div>

                    <div className="flex flex-col justify-between mt-[10px]">
                         <h3 className="font-normal text-left">Database access</h3>
                         <div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Name</span>
                              <span className="text-xs text-[#606060]">My database</span>
                              <span onClick={() => handleCopyClicked("My database")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Password</span>
                              <span className="text-xs text-[#606060]">7582132563</span>
                              <span className="" onClick={() => handleCopyClicked("7582132563")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         </div>
                    </div>

                    <div className="flex flex-col justify-between mt-[10px]">
                         <h3 className="font-normal text-left">Test users</h3>
                         <div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Name</span>
                              <span className="text-xs text-[#606060]">Jordan</span>
                              <span onClick={() => handleCopyClicked("Jordan")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Password</span>
                              <span className="text-xs text-[#606060]">Okay2025</span>
                              <span className="" onClick={() => handleCopyClicked("Okay2025")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Name</span>
                              <span className="text-xs text-[#606060]">test</span>
                              <span className="" onClick={() => handleCopyClicked("test")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         <div className="flex flex-row justify-between">
                              <span className="text-xs">Password</span>
                              <span className="text-xs text-[#606060]">Okay2025</span>
                              <span className="" onClick={() => handleCopyClicked("Okay2025")}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         </div>
                    </div>
                    </div>

                    </div>

               </div>


               </div>
              

          </div>
     )
}

export default MainDashboard