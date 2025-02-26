/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import ProgressTracker from "../component/progressTracker/progressTracker"
import ProjectCard from "../component/ProjectCard/projectCard"
import iconCopy from "../../src/assets/copy_icon.svg";
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";
import { useGlobalVariables } from "../context/global";
import API from "../api/api";
import {PROJECT_LIMIT} from "../utils/constants"

const MainDashboard = () => {
     const [projectsList,setProjectList] = useState([ 
          {id:"p;",name:"dec"},
          {id:"p;;",name:"dec"}])
     // const [credentials, setCredentials] = useState()

     const [activeProject,setActiveProject] = useState({})
     const [showDeleteModal,setShowDeleteModal] = useState(false)
     const [copied,setCopied] = useState(false)
     const [focusedIndex,setFocusedIndex] = useState(null)
     const navigate = useNavigate()
     const {setSelectedIcon} = useGlobalVariables()
     let user = JSON.parse(localStorage.getItem("user"))

     const handleCardClick = (index) => {
          setFocusedIndex(index === focusedIndex ? null:index)
     }

     const deleteProject = async(project_id) => {
          setShowDeleteModal(false)
         await API.post("/delete-project",{project_id}).then((res) => {
               console.log(res)
          }).catch((err) => {
               console.log(err)
          })
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




 
    const [offset,setOffSet] = useState(0)
    const fetchData = async() => {
     let user = JSON.parse(localStorage.getItem("user"))
     await API.post(`/user-projects`, { user, offset, limit: PROJECT_LIMIT })
       .then((res) => {
         let newdata = res.data?.projects;
         if (res.data?.projects.length > 0)
           setProjectList([...projectsList, ...newdata]);
         setOffSet(offset + res.data?.projects.length);
         console.log(offset, projectsList, "lets see", res.data?.projects);
       }) .catch((err) => {
         console.log(err, err?.status);
       });
}



const fetchCredentials = async() => {
     const {pid} = activeProject
     await API.post(`/project-credentials`,{pid})
     .then((res) => {
          // let credentialsData = res.data?.projects
          console.log("Cedentials in description",res.data?.projects)
          console.log("Active project data", activeProject)
     }).catch(err => {
console.log(err,err?.status)})
}

     useEffect(() => {
          setSelectedIcon("home");
     }, []);

     useEffect(()=> {
          fetchData()

     },[])
    useEffect(() => {
     fetchCredentials();}, [activeProject])

      
     return (
          <div className="flex flex-col justify-between p-[20px]">
               <h2 className="mb-2 flex flex-start place-items-start main-text">Projects</h2>
               <div className="flex flex-row justify-between mb-5">
               
               <div className="flex flex-col">
               <div className="flex flex-row justify-between mr-5 p-2 w-[500px] h-[180px] custom-scroll-x realative">
               <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>
               
             
               {projectsList.map((project) => (
     
                    <motion.div key={project.id} className="mr-5" 
                    initial={{opacity:0.8}}
                    animate={{
                         opacity:focusedIndex === null || focusedIndex === project.id ? 1: 0.4,
                         scale:focusedIndex ===project.id ? 1.1 : 1,
                         // y:focusedIndex===null?0:project.id===focusedIndex?-project.id*1:20,
                         
                        }}

                    transition={{type:"spring",stiffness:300,damping:20}}
                    
                    >
                    <ProjectCard setActiveProject={() =>setActiveProject({...project})} project_id={project.id} setShowDeleteModal={setShowDeleteModal}  handleCardClick={handleCardClick} p={project.id} isSelected={focusedIndex ===project.id} name={project.name.length > 15 ? project.name.slice(0,15)+"..." : project.name} is_fully_configured={project?.is_fully_configured}/>
                    </motion.div>
                    
               ))}

               <div className='w-50 self-center'>
               <img onClick={()=> fetchData()} className=" cursor-pointer self-center" src="/icons-plus.png"/>

               </div>
               

               </div>

               {
                user?.role == "admin" && (
                    <button onClick={() => {
                         setSelectedIcon("onboardingWizard")
                         navigate("/wizard-config-1")
                    }} className="cursor-pointer rounded-l-full w-[100px] text-sm blue-shadow mt-5 p-[5px] text-center text-white bg-[#530DF6] hover:opacity-80 transition duration-300">Ride on</button>
                    
                )
               }

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
              

{/* delete modal */}
{showDeleteModal ?     <div> 
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-sm p-6 w-full max-w-lg"
      >
        <div className="flex flex-col items-center justify-between">
          <div className="self-center">
          <img alt="dustbin" src="/delete-icon.svg"/>
          </div>
          <p className="w-1/2 m-auto text-center">Do you really want to delete <span className="text-[#530DF6] font-semibold uppercase">{activeProject.name}</span> ? this action is irriversible</p>
           <div className="grid gap-5 grid-cols-2 items-center justify-between mt-5">
               <button onClick={() => setShowDeleteModal(false)} className="cursor-pointer bg-[#FA1818] px-5 py-2 shadow text-white font-semibold">Cancel</button>
               <button onClick={() => deleteProject(activeProject.id)} className="cursor-pointer bg-[#8EFF2C] px-5 py-2 shadow text-white font-semibold">Ok</button>
           </div>
        </div>

      </motion.div>
    </motion.div>
</div>:null}

          </div>
     )
}

export default MainDashboard