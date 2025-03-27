/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Steps from "../steps/steps";
import "./style.css"
import { useGlobalVariables } from "../../context/global";
 

const WizardCardComplete = ({img,text,heading,numberOfSteps,subcards,stepsId,ids}) => {
     const {meetTheTeamConfigData,setMeetTheTeamConfigData} = useGlobalVariables() // get the wizaad data if it had it
     
     const [activeWizardCardIndex,setActiveWiwardCardIndex] = useState(0)
     const currrentContent = numberOfSteps>1 && subcards ?subcards[activeWizardCardIndex]:{heading,img,text}
     const defaultText = "Enter a brief description..."
     const [stepContents,setStepContents] = useState(()=> {
          const initialContent = {}
         
               Array.from({length:numberOfSteps}).forEach((_,i) => {
                    initialContent[ids[i]] = meetTheTeamConfigData.stepContents[ids[i]] || defaultText
               })
          
          return initialContent
     })

     useEffect(()=> {
          
          setMeetTheTeamConfigData((prev)=>({
               ...prev,stepContents:{...prev.stepContents,[ids[activeWizardCardIndex]]:stepContents[ids[activeWizardCardIndex]]}
          }))
        },[stepContents,activeWizardCardIndex])


 

    //prelaod images
    useEffect(()=>{
     if(numberOfSteps>1){
          subcards.forEach(step => {
               const img = new Image()
               img.src = step.img
          });
     }
    },[])


 
    const [error,setError] = useState(null)

 

 

     return (
          <div className="w-[250px] h-[280px] grid grid-cols-1 grid-rows-auto gap-1 p-5 bg-white outline-2 outline-[#FF8000]">
               <h1 className="text-sm text-left items-start cursor-pointer place-items-start">{currrentContent.heading}</h1>
                
               {numberOfSteps>1?(
                                   <p className="h-[80px] bg-transparent"
                                   >paragram</p>):
                                   (<p className="h-[80px] bg-transparent"
                                        >paragraph</p>)}

               <div className="cursor-pointer mb-5 slef-center place-items-center flex justify-center">
                   <div className="w-30 h-20"> 
                    <img className="static self-center" key={currrentContent.img} src={currrentContent.img} alt="goal image"/></div>
               </div>

               
                <div className="flex h-[50px] items-center justify-center place-items-center">
               <Steps currrentContent={currrentContent} stepsId={stepsId} numberOfSteps={numberOfSteps} activeWizardCardIndex={activeWizardCardIndex} setActiveWiwardCardIndex={setActiveWiwardCardIndex}/>
               </div>
               
 
          </div>
     )
}


export default WizardCardComplete;