
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { lazy, memo, Suspense, useEffect, useMemo, useRef, useState } from "react"
import {AnimatePresence,motion} from "framer-motion"
import { useGlobalVariables } from "../../context/global"

import OnbaordingWizardNavigationSteps from "./configuration/navigationSteps"
import Congratulations from "./screens/congratulation"
import WizardFallBackLoader from "../../component/fallback/wizardFallbackLoader"



//impliment lazy loading menaing you load components on demand not all at once making initails load faster
const FileVisualization = lazy(()=> import("./screens/fileVisualisation"))
const CoddingStandards = lazy(()=> import("./screens/coddingStandards"))
const InstallationGuide = lazy(()=> import("./screens/installationGuide"))
const MeetTheTeam = lazy(()=> import("./screens/onboardingPhase1"))

const OnboardingWizard = ({stage}) => {
     const [activeStep,setActiveStep] = useState(stage)
     const [direction,setDirection] = useState(1) // 1=forward -1 =backward
     const previousStep = useRef(stage)
     const {setSelectedIcon} = useGlobalVariables()
   

           //we memoize the components so they load faster
           const MemoMeetTheTeam = memo(MeetTheTeam)
           const MemoInstallationGuide = memo(InstallationGuide)
           const MemoFileVisualization = memo(FileVisualization)
           const MemoCoddingStandards = memo(CoddingStandards)
           const MemoCongratulations = memo(Congratulations)
     
        let steps = useMemo(()=> [
          {name:"Meet the Team",component:<MemoMeetTheTeam/>},
          {name:"Installation guide",component:<MemoInstallationGuide/>},
          {name:"File Visualization",component:<MemoFileVisualization/>},
          {name:"Codding Standards",component:<MemoCoddingStandards/>},
          {name:"Congratulations",component:<MemoCongratulations/>},
      ],[])
  

     const stepsId = [
         {index:"meet team",barIndex:"meat teambar1"},
         {index:"file viz",barIndex:"file vizbar1"},
         {index:"instal guid",barIndex:"instal guidbar1"},
         {index:"cod stan",barIndex:"cod stanbar1"},
         {index:"congrat",barIndex:"cod congrat1"},
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
           <AnimatePresence mode="wait" initial={false} custom={direction}>
           <motion.div
              key={activeStep}
              custom={direction}
              initial={{opacity:0,x:direction * 50}}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-direction * 50 }}
              transition={{
                type:"tween",
                duration:0.3,
                ease:[0.32,0.72,0,1],
              }}
              
            
             >
             <Suspense fallback={<WizardFallBackLoader/>}>
             {steps[activeStep].component}
             </Suspense>
             </motion.div>
           </AnimatePresence>
             <OnbaordingWizardNavigationSteps stepsId={stepsId}   numberOfSteps={steps.length} activeStep={activeStep} setActiveStep={setActiveStep}/>
         </div>
    )
}


export default OnboardingWizard