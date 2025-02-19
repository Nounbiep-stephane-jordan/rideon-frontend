/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import MeetTeamPhase from "./configuration/meetTeamPhase"
import OnbaordingWizardNavigationSteps from "./configuration/navigationSteps"
import InstallationGuideConfig from "./configuration/installationGuide"
import CoddingStandardsConfig from "./configuration/coddingStandards"
import FileVisualizationConfig from "./configuration/fileVisualizationConfig"
import {AnimatePresence,motion} from "framer-motion"

const OnboardingWizardConfig = ({stage}) => {
      const [activeStep,setActiveStep] = useState(stage)
      const [direction,setDirection] = useState(1) // 1=forward -1 =backward
      const previousStep = useRef(stage)

      const steps = [
          {name:"Meet the Team",component:<MeetTeamPhase/>},
          {name:"Installation guide",component:<InstallationGuideConfig/>},
          {name:"File Visualization",component:<FileVisualizationConfig/>},
          {name:"Codding Standards",component:<CoddingStandardsConfig/>},
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

     return (
          <div className="">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
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

export default OnboardingWizardConfig