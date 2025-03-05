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
import CustomNotification from "../component/animmateNotification/animatedNotificaiton";
import emptyCredentials from "../assets/empty-credentials.webp"


const MainDashboard = () => {
     const [projectsList,setProjectList] = useState([ 
          {id:"p;",name:"dec"},
])
     // const [credentials, setCredentials] = useState()
     const [activeProjectData,setActiveProjectData] = useState({credentials:[],userProgress:[]})
     const [activeProject,setActiveProject] = useState({})
     const [showDeleteModal,setShowDeleteModal] = useState(false)


     const [message,setMessage] = useState(false)
     const [isVisible,setIsVisible]= useState(false)


     const [focusedIndex,setFocusedIndex] = useState(null)
     const navigate = useNavigate()
     const {setSelectedIcon,hideLoader,showLoader} = useGlobalVariables()
     let user = JSON.parse(localStorage.getItem("user"))

     const handleCardClick = (index) => {
          setFocusedIndex(index === focusedIndex ? null:index)
     }

     const deleteProject = async(project_id) => {
          setShowDeleteModal(false)
          showLoader()
         await API.post("/delete-project",{project_id}).then((res) => {
               //eliminate hte deleted project from the list
               let newList = projectsList.filter((p)=> p.id != project_id)
               setProjectList(newList)
               setMessage(res.data.message)
               setIsVisible(true)
               hideLoader()
          }).catch((err) => {
               console.log(err)
               hideLoader()

          })
     }

     const handleCopyClicked = async(value) => {
          try{
               await navigator.clipboard.writeText(value)
               setMessage("Copied!")
               setIsVisible(true)
                
          }catch(err){
               console.log(err)
          }
     }




 
    const [offset,setOffSet] = useState(0)
    const fetchData = async() => {
     showLoader()

     let user = JSON.parse(localStorage.getItem("user"))
     await API.post(`/user-projects`, { user, offset, limit: PROJECT_LIMIT })
       .then((res) => {
         let newdata = res.data?.projects;
         if (res.data?.projects.length > 0)
         setProjectList([...projectsList, ...newdata]);
         setOffSet(offset + res.data?.projects.length);
         hideLoader()

    
       }) .catch((err) => {
         console.log(err, err?.status);
         hideLoader()

       });
}




const fetchActiveProjectData = async() => {
     
     const {id} = activeProject
     await API.post(`/project-credentials`,{id,user_id:user.id, project_id:activeProject.id, role:user.role}).then((res) => {
          console.log(res.data,"booooooo")
          // let data =  res.data
          setActiveProjectData({...activeProjectData,credentials:res.data?.credentials,userProgress:res.data.progress})
          
     }).catch(err => {
          console.log(err,err?.status)
         

     })
}

     useEffect(() => {
          setSelectedIcon("home");
     }, []);

     useEffect(()=> {
          fetchData()
     },[])
     
    useEffect(() => {
     fetchActiveProjectData();
}, [activeProject])

      
     return (
          <div className="flex flex-col justify-between p-[20px]">
               {isVisible && (               <CustomNotification message={message} isVisible={isVisible} setIsVisible={setIsVisible}/>
               )}
               <h2 className="mb-2 flex flex-start place-items-start main-text">Projects</h2>
               <div className="flex flex-row justify-between mb-5">
               
               <div className="flex flex-col">
               <div className="flex flex-initial justify-between mr-5 p-2 w-[550px] h-[180px] custom-scroll-x relative">
          
             
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

              
               <img onClick={()=> fetchData()} className="cursor-pointer w-10 mb-10 self-center" src="/icons-plus.png"/>
 
               

               </div>

               {
                user?.role == "admin" && (
                    <button onClick={() => {
                         navigate("/wizard-config-1")
                         setSelectedIcon("onboardingWizard")
                         
                    }} className="cursor-pointer rounded-l-full w-[100px] text-sm blue-shadow mt-5 p-[5px] text-center text-white bg-[#530DF6] hover:opacity-80 transition duration-300">Ride on</button>
                    
                )
               }

               <div className="mt-5">
               <ProgressTracker progress={activeProjectData?.userProgress}/>
               </div>

               </div>

               <div className="">
                    <h2 className="text-left second-text">Project Credentials</h2>
                    <div className="orange-shadow p-4 flex flex-col w-[400px] h-[250px] custom-scrollbar box-border">
                    <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>

                    <div className="h-full px-4 pb-10 overflow-y-scroll custom-scrollbar">
                    {activeProjectData.credentials?.length <= 0 ? <div className="flex flex-col items-center justify-center">
                         <img src={emptyCredentials} className="w-40 self-center" alt="cred"/>
                         <button onClick={() => navigate("/wizard-config-1")} className=" cursor-pointer self-center py-[5px] px-[15px] rounded font-bold outline-2 outline-[#8EFF2C]">Start</button>
                    </div> : activeProjectData.credentials.map((section) => (
                    <div key={section.id} className="flex flex-col justify-between mt-[10px]">
                         <h3 className="font-normal text-left">{section.title}</h3>
                         <div>
                         {section?.pairs.map((pair) => (
                         <div key={pair.key+pair.value} className="flex flex-row justify-between">
                              <span className="text-xs">{pair?.key}</span>
                              <span className="text-xs text-[#606060]">{pair?.value}</span>
                              <span onClick={() => handleCopyClicked(pair?.value)}>
                                   <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
                              </span>
                         </div>
                         ))}

                         </div>
                    </div>
                    ))}
 

                    
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