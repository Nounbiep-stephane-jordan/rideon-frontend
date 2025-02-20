/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Steps from "../steps/steps";
import "./style.css"
import { MaxLength } from "../../utils/constants";
import { useGlobalVariables } from "../../context/global";
 

const WizardCard = ({img,text,heading,numberOfSteps,subcards,stepsId,ids}) => {
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


     const [hasEdited,setHasEdited] = useState({})

     const handleContentChange = (e) => {
          setHasEdited(prev=>({...prev,[ids[activeWizardCardIndex]]:true}))
          if(e.target.value.length>MaxLength) {
               setError(`max length of words excited please reduced the letter count to ${MaxLength}`) 
               setTimeout(()=> setError(null),3000)
           }  else {
               setStepContents(prev=>({
                    ...prev,
                    [ids[activeWizardCardIndex]]:e.target.value
               }))
           }   


     }

    //prelaod images
    useEffect(()=>{
     if(numberOfSteps>1){
          subcards.forEach(step => {
               const img = new Image()
               img.src = step.img
          });
     }
    },[numberOfSteps,subcards])


 
    const [error,setError] = useState(null)

  const handleBlur = () => {
     //only revert to default text if not edited and empty
     
     if(hasEdited[ids[activeWizardCardIndex]] && stepContents[ids[activeWizardCardIndex]]?.trim() === "") {
          setStepContents(prev=>({
               ...prev,
               [ids[activeWizardCardIndex]]:defaultText
          }))
     }
     
}

const handleFocus = () => {
     //clear the text only if its initial default value
     if(stepContents[ids[activeWizardCardIndex]] == defaultText) {
          setStepContents(prev=>({
               ...prev,
               [ids[activeWizardCardIndex]]:""
          }))
     }
}

     return (
          <div className="w-[250px] h-[250px] grid grid-cols-1 grid-rows-auto gap-1 custom-wizard-config-shadow p-5 bg-white">
               <h1 className="text-sm text-left items-start cursor-pointer h-[20px] place-items-start">{currrentContent.heading}</h1>
               {error ? <p className="text-red-700">{error}</p>: null}
               {numberOfSteps>1?(
                                   <textarea
                                   value={stepContents[ids[activeWizardCardIndex]]==="" && !hasEdited[ids[activeWizardCardIndex]] ? defaultText:stepContents[ids[activeWizardCardIndex]]}
                                   onChange={(e) => handleContentChange(e)}
                                   onFocus={() => handleFocus()}
                                   onBlur={() => handleBlur()}
                                    
                                   className="heading-config-mini h-[80px] bg-transparent focus:outline-none resize-none"
                                   />):
                                   (<textarea
                                  
                                   value={stepContents[ids[0]]==="" && !hasEdited[ids[activeWizardCardIndex]] ? defaultText:stepContents[ids[0]]}

                                   onChange={(e) => handleContentChange(e)}
                                   onFocus={() => handleFocus()}
                                   onBlur={() => handleBlur()}
                                    
                                   className="heading-config-mini h-[80px] bg-transparent focus:outline-none resize-none"
                                   />)}

               <div className="cursor-pointer mb-5 slef-center place-items-center flex justify-center">
                   <div className="w-30 h-20"> 
                    <img className="static self-center" key={currrentContent.img} src={currrentContent.img} alt="goal image"/></div>
                    {/* no need to be able to uplaod image anymore */}
                    {/* <img className="absolute w-8 custom-blue-plus-position" src="/plus-image-blue.png" alt="blue add image"/> */}
               </div>

               
                <div className="flex h-[50px] items-center justify-center place-items-center">
               <Steps currrentContent={currrentContent} stepsId={stepsId} numberOfSteps={numberOfSteps} activeWizardCardIndex={activeWizardCardIndex} setActiveWiwardCardIndex={setActiveWiwardCardIndex}/>
               </div>
               
 
          </div>
     )
}


export default WizardCard;