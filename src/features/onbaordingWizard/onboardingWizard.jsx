
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import {AnimatePresence,motion} from "framer-motion"
import { useGlobalVariables } from "../../context/global"
import MeetTheTeam from "./screens/meetTheTeam"
import FileVisualization from "./screens/fileVisualisation"
import CoddingStandards from "./screens/coddingStandards"
import InstallationGuide from "./screens/installationGuide"
import OnbaordingWizardNavigationSteps from "./configuration/navigationSteps"


const OnboardingWizard = ({stage}) => {
     const [activeStep,setActiveStep] = useState(stage)
     const [direction,setDirection] = useState(1) // 1=forward -1 =backward
     const previousStep = useRef(stage)
     const {setSelectedIcon} = useGlobalVariables()
   
        let steps = [
           {name:"Meet the Team",component:<MeetTheTeam/>},
           {name:"Installation guide",component:<InstallationGuide/>},
           {name:"File Visualization",component:<FileVisualization/>},
           {name:"Codding Standards",component:<CoddingStandards/>},
       ]
  

     const stepsId = [
         {index:"meet team",barIndex:"meat teambar1"},
         {index:"file viz",barIndex:"file vizbar1"},
         {index:"instal guid",barIndex:"instal guidbar1"},
         {index:"cod stan",barIndex:"cod stanbar1"},
     ]

     //update direction when steps changes
     useEffect(() => {
       setDirection(activeStep>previousStep.current?1:-1)
       previousStep.current = activeStep
      
     },[activeStep])

     useEffect(()=>{
       setSelectedIcon("onboardingWizard")
  },[])

    return (
         <div className="">
           <AnimatePresence mode="wait" custom={direction}>
           <motion.div
             key={activeStep}
             custom={direction}
             initial={{x:direction * 100 + "%"}}
             animate={{x:0}}
             exit={{x:-direction * 100 + "%"}}
             transition={{
               type:"spring",
               stiffness:300,
               damping:30,
             }}

            
             >
             {steps[activeStep].component}
             </motion.div>
           </AnimatePresence>
             <OnbaordingWizardNavigationSteps stepsId={stepsId}   numberOfSteps={steps.length} activeStep={activeStep} setActiveStep={setActiveStep}/>
         </div>
    )
}


export default OnboardingWizard