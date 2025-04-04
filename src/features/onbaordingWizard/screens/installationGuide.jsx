
/* eslint-disable no-unused-vars */

import iconCopy from "../../../assets/copy_icon.svg";
import { useContext, useState } from "react"
import {motion} from "framer-motion"
import fleft from "../../../assets/fleft-orange.webp"
import fright from "../../../assets/fright-orange.webp"
import guidetop from "../../../assets/guide-top.webp"
import guideCenter from "../../../assets/guide-center.webp"
import { useGlobalVariables } from "../../../context/global";
import { WizardProgressContext } from "../../../context/wizardProgressContext";

const cardVariants = {
     front: {
       y: 0,
       x: 0,
       scale: 1,
       zIndex: 10,
       transition: {type:"spring",stiffness:300,damping:20}
     },
     back: {
       y: 60,
       x: 40,
       scale: 0.9,
       opacity:0.8,
       zIndex: 0,
       transition: {type:"spring",stiffness:300,damping:20}
   
     }
   };
   
   const backCardVariants = {
     front: {
       rotateX: -30,
       y: -40,
       scale: 0.9,
       zIndex: 5,
       opacity:0.8,
       transition: {type:"spring",stiffness:300,damping:20}
   
     },
     back: {
       x: 0,
       y: 0,
       scale: 1,
       zIndex: 10,
       transition: {type:"spring",stiffness:300,damping:20}
   
     }
   };
   


const StepModalReady = ({isOpen,onClose}) => {

    
     const {wizardData} = useGlobalVariables()
     const [currentStep, setCurrentStep] = useState(0);
     const [steps, setSteps] = useState( wizardData?.installationGuide?.steps || [{name:"John",description:"test",image:"/loged_user.svg"}]);
     const [newStep, setNewStep] = useState({
       name: wizardData?.installationGuide?.steps[0]?.name,
       description: wizardData?.installationGuide?.steps[0]?.description,
       image:  wizardData?.installationGuide?.steps[0]?.image,
     });


     const handleNavigation = (direction) => {
          const updatedSteps = [...steps]
          updatedSteps[currentStep] = {...newStep}
          setNewStep(updatedSteps)
          const newStepIndex = Math.max(0, Math.min(steps.length - 1, currentStep + direction))
          setCurrentStep(newStepIndex)
          if(steps[newStepIndex]){
               setNewStep({...steps[newStepIndex]})
          } else {
               setNewStep({name:'',description:'',image:null,})
          }
     
       };

     return (
      <div>
                      <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[99999999]"
              >
         
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-white rounded-xl p-6 w-full max-w-lg"
                >
                   <h1 className='text-left font-semibold'>Steps</h1>
                  <div className="space-y-4">
                    <p className="w-full">{newStep.name}</p>
                    <p className="w-full">{newStep.description}</p>
                    
                    <div className="relative">
                      <label
                        htmlFor="imageUpload"
                        className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded cursor-pointer"
                      >
                        
                          <img src={newStep.image} alt="Preview" className="w-full h-full object-cover w-50 h-50" />
                        
                      </label>
                    </div>
    
                    <div className="flex justify-between items-center">
                      {steps.length > 0 && (
                        <div className="flex items-center gap-2">
                          <img 
                            src={fleft}
                            onClick={() => handleNavigation(-1)}
                            className="w-5 cursor-pointer"
                            alt="left"
                          />
                          <span>{currentStep + 1} / {steps.length}</span>
                          <img
                            src={fright} 
                            onClick={() => handleNavigation(1)}
                            className="w-5 cursor-pointer"
                            alt="right"
                          />
                        </div>
                      )}
                    </div>
    
                    <button
                      onClick={() => onClose()}
                      className="w-full py-2 bg-green-500 text-white rounded cursor-pointer"
                    >
                    Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
      </div>
 
     )
}


const InstallationGuide = () => {
 
      
     const [isOpen, setIsOpen] = useState(false);
    const {wizardData} = useGlobalVariables()
    const [textData,setTextData] = useState( wizardData?.installationGuide?.textData)
    const {interactionsTrackerInstall,setInteractionsTrackerInstall} = useContext(WizardProgressContext)

    

     const [isFlipped, setIsFlipped] = useState(false);
     const [additionalLinks,setAdditionalLinks] = useState(wizardData?.installationGuide?.additionalLinks)
     const [activeOS,setActiveOS] = useState("windows")
     const [installationGuidesOsText,setInstallationGuidesOsText] = useState(wizardData?.installationGuide?.installationGuidesOsText )
     const [credentials,setCredentials] = useState(wizardData?.installationGuide?.credentials)

 const [prerequisites,setPrerequisites] = useState(wizardData?.installationGuide?.prerequisites)

 const [copied,setCopied] = useState(false)
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
     
                  <div className="flex flex-col justify-bewtween items-center p-[20px]">

<div className="flex flex-row items-start justify-start">
<div className="flex-col flex">
<h1 className="self-start text-2xl font-semibold">{textData?.projectName}</h1>
     <h3 className={`self-start font-meduim text-sm mt-2 w-3/4 text-left`}>
          {textData?.projectDescription}
     </h3>
</div>

     <div className="self-start w-50 fixed top-4 right-30">
     <img alt="img" src={guidetop}/>
     </div>
</div>

<div className=" fixed top-0 right-1/2">
{copied&&<span className="text-green-500">Copied!</span>}
</div>

<div className="grid gap-4 grid-cols-2 items-center justify-between">


<div className="p-[15px] h-[280px] fixed top-60 left-60 mt-2 w-[300px] blue-shadow outline-2 outline-[#530DF6] bg-white overflow-x-scroll custom-scrollbar">
     <h1 className="text-left font-medium">Prerequisite</h1>

     <div className="flex flex-row justify-between items-center">
    
    <div className="flex flex-col justify-evenly items-start ">
    {prerequisites.map((pair) => {
      
      return (
  
        <div key={pair.id} className="flex flex-row justify-between items-centers mt-[3px]">
        <div  className="mt-[2px] flex flex-row justify-between items-centers">
             <p className="text-sm w-1/2 mr-2 p-1">{pair.key}</p>
             <p className="text-sm w-1/2 mr-2 p-1">{pair.value}</p>
           </div>
        </div>
 
         )
    })}    
    </div>
  


     </div>




     <div className="mt-2">
     <h1 className="text-left font-medium">Installation guides</h1>
     <div className="flex flex-row items-center justify-between">
     {Object.keys(installationGuidesOsText).map((os) => (
          <button
            key={os}
            className={`text-[15px] cursor-pointer`}
            onClick={() => setActiveOS(os)}
          >
            {os.charAt(0).toUpperCase() + os.slice(1)}
            {
              activeOS === os ? <div className="h-[2px] bg-[#FF8000]"></div> : ""
            }
          </button>
        ))}
     </div>
     </div>


      <p className="text-[12px] mt-[2px] bg-transparent mt-2 mb-5">
      {installationGuidesOsText[activeOS]}
      </p>

     <div onClick={() => {
      if(interactionsTrackerInstall.clicks <= 2) {
        setInteractionsTrackerInstall((prev) => ({...prev,customGuideClick:1,clicks:interactionsTrackerInstall.clicks+1}))
      }
     
      setIsOpen(true)
     }}  className="flex flex-row items-center justify-between">
     <button className="text-xs text-white self-center bg-[#FF8000] px-5 py-2 cursor-pointer">Custom guide</button>
    
     </div>



    </div>
    

           <div className={`relative`}>

<motion.div
className="absolute left-[30px] top-20"
variants={cardVariants}
animate={isFlipped ? "back" : "front"}

>
 
 <div className="p-[15px] h-[280px] w-[300px] outline-2 outline-[#530DF6] blue-shadow bg-white overflow-x-scroll custom-scrollbar">
  
  <h1 className="text-left font-medium cursor-pointer" onClick={() => !isFlipped && setIsFlipped(true)}>Project credentials</h1>
  <div className="mt-[10px]">

{credentials.map((section, sectionIndex) => (
<div key={`${section?.id}-${sectionIndex}`} className="mb-4">
 <div className="flex justify-between items-center">
   <p className="font-medium text-sm">Database acess </p>
 </div>
 
 <div className="">
 {section?.pairs.map((pair, pairIndex) => (
   <div key={`${pair.id}-${pairIndex}`} className="flex items-center justify-between gap-2 mb-2">
     <p className="w-full text-sm">{pair?.key}</p>
     <p className="w-full text-sm">{pair?.value}</p>
     <span className="" onClick={() => handleCopyClicked(pair.value)}>
       <img alt="copy icon" src={iconCopy} className="w-8 cursor-pointer"/>
       </span>
   </div>
 ))}
  </div>

</div>
))}

</div>
   
 </div>
</motion.div>



<motion.div
className={`absolute ${isFlipped ? 'top-15':'left-20 top-40'}`}
variants={backCardVariants}
animate={isFlipped ? "back" : "front"}

>
<div className="p-[15px] h-[280px] w-[300px] blue-shadow bg-white outline-2 outline-[#530DF6]">
<h1 className="text-left font-medium cursor-pointer" onClick={() => {
  if(interactionsTrackerInstall.clicks <= 2) {
    setInteractionsTrackerInstall((prev) => ({...prev,backCardClick:1,clicks:interactionsTrackerInstall.clicks+1}))
    }
  isFlipped && setIsFlipped(false)
}}>Additional links</h1>

<div className="flex flex-row justify-between items-center mt-[2px]">
 
 <div className="flex flex-col justify-evenly items-start ">
 {additionalLinks.map((pair) => (
    
    <div key={pair.id} className="flex flex-row justify-between items-centers mt-[2px]">
    <div  className="mt-[2px] flex flex-row justify-between items-center">
         <p className="text-sm mr-2 p-1">{pair.value}</p>
       <span className="" onClick={() => handleCopyClicked(pair.value)}>
       <img alt="copy icon" src={iconCopy} className="size-4 cursor-pointer"/>
       </span>
       </div>


    </div>


     ))}    
 </div>



  </div>

</div>
</motion.div>
</div>

</div>



     <div className="h-90 w-90 mt-20" style={{backgroundImage:`url(${guideCenter})`,backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>
   
     </div>




     {isOpen ? (
      <StepModalReady key={"modal-pop-up"} isOpen={isOpen} onClose={() => setIsOpen(false)} />
     ) : null}


</div>


   
     )
}


export default InstallationGuide