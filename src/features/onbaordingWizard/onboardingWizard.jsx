/* eslint-disable react-hooks/exhaustive-deps */
 

import { lazy, memo, Suspense, useContext, useEffect, useMemo, useRef, useState } from "react"
import {AnimatePresence} from "framer-motion"
import { useGlobalVariables } from "../../context/global"
import {  useBlocker, useNavigate } from 'react-router-dom';
import OnbaordingWizardNavigationSteps from "./configuration/navigationSteps"
import Congratulations from "./screens/congratulation"
import Spinner from "../../component/spinner/spinner"
import { WizardProgressContext } from "../../context/wizardProgressContext";
import API from "../../api/api";
import {motion} from 'framer-motion'

 


 
const FileVisualization = lazy(()=> import("./screens/fileVisualisation"))
const CoddingStandards = lazy(()=> import("./screens/codingStandards"))
const InstallationGuide = lazy(()=> import("./screens/installationGuide"))
const MeetTheTeam = lazy(()=> import("./screens/meetTheTeam"))

const OnboardingWizard = ( ) => {
  
  const {setSelectedIcon,wizardStartStage:stage} = useGlobalVariables()
  const {wizardProgressSaved,setWizardProgressSaved} = useContext(WizardProgressContext)
 
  const [activeStep,setActiveStep] = useState(stage)
     const [direction,setDirection] = useState(1) // 1=forward -1 =backward
     const previousStep = useRef(stage)
     
   
    const [showSaveModal,setShowSaveModal] = useState(false)
    const navigate = useNavigate()
     const blocker = useBlocker(({ currentLocation, nextLocation }) => activeStep!==4 &&wizardProgressSaved == false && currentLocation.pathname !== nextLocation.pathname
    );


  // Handle window/tab close or refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (wizardProgressSaved === false) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [wizardProgressSaved]);

  // Show modal when navigation is blocked
  useEffect(() => {
    if (blocker.state === 'blocked') {
      setShowSaveModal(true);
    }
  }, [blocker.state]);


  const {      interactionsTrackerInstall,
    interactionsTrackerCod,
    interactionsTrackerGit,
    interactionsTrackerMeet} = useContext(WizardProgressContext)
const {wizardData} = useGlobalVariables()
const saveWizardProgress = async() => {
    let user = JSON.parse(localStorage.getItem("user"))
    const data  = {
         user_name:user.user_name,
         user_id:user.id,
         project_id:wizardData?.project_id,
         interactionsTrackerInstall,
         interactionsTrackerCod,
         interactionsTrackerGit,
         interactionsTrackerMeet
    }

    if(wizardData?.project_id && wizardProgressSaved == false) {
         await API.post("/save-wizard-progress",{...data}).then((res)=> {
              console.log("in save wizard progress",res.data)
              navigate("/")
              setWizardProgressSaved(true)
         }).catch(err => {
              console.log(err)
         })
    }
  
}

  const handleSave = async () => {
    try {
      // Perform your save operation here
      await saveWizardProgress();
      setShowSaveModal(false);
      if (blocker.state === 'blocked') {
        blocker.proceed(); // Proceed with the blocked navigation
      }
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleLeaveWithoutSaving = () => {
    setWizardProgressSaved(false);
    setShowSaveModal(false);
    if (blocker.state === 'blocked') {
      blocker.proceed();
    }
  };

  const handleCancel = () => {
    setShowSaveModal(false);
    setSelectedIcon("onboardingWizard");

    blocker.reset(); // Cancel the navigation
  };


  //we memoize the components so they load faster
  const MemoMeetTheTeam = memo(MeetTheTeam);
  const MemoInstallationGuide = memo(InstallationGuide);
  const MemoFileVisualization = memo(FileVisualization);
  const MemoCoddingStandards = memo(CoddingStandards);
  const MemoCongratulations = memo(Congratulations);

  let steps = useMemo(
    () => [
      { name: "Meet the Team", component: <MemoMeetTheTeam /> },
      { name: "Installation guide", component: <MemoInstallationGuide /> },
      { name: "File Visualization", component: <MemoFileVisualization /> },
      { name: "Codding Standards", component: <MemoCoddingStandards /> },
      { name: "Congratulations", component: <MemoCongratulations /> },
    ],
    []
  );

  const stepsId = [
    { index: "meet team", barIndex: "meat teambar1" },
    { index: "file viz", barIndex: "file vizbar1" },
    { index: "instal guid", barIndex: "instal guidbar1" },
    { index: "cod stan", barIndex: "cod stanbar1" },
    { index: "congrat", barIndex: "cod congrat1" },
  ];

  //update direction when steps changes
  useEffect(() => {
    setDirection(activeStep > previousStep.current ? 1 : -1);
    previousStep.current = activeStep;
  }, [activeStep]);

 
  useEffect(() => {
    setSelectedIcon("onboardingWizard");
  }, []);
 

 
 

 

    return (
         <div className="">

                {/* Confirmation Modal */}
      {showSaveModal && (
        <div className=" flex flex-col items-center fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-[99999999]">
          <div className="">
            <h3>You have unsaved changes!</h3>
            <p className="mb-5">Do you want to save your wizard progress changes before leaving?</p>
            <div className=" flex flex-row items-center justify-between">
              <button onClick={handleSave} className="cursor-pointer bg-green-500 text-white px-8 py-2 font-semibold">Save and Leave</button>
              <button onClick={handleLeaveWithoutSaving} className="cursor-pointer bg-red-500 px-8 py-2 text-white font-semibold mr-5 ml-5">Leave Without Saving</button>
              <button onClick={handleCancel} className="cursor-pointer bg-orange-500 text-white font-semibold px-8 py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

           <Suspense fallback={<Spinner text="Loading....subsequent loads will be much faste"/>}> 
           <AnimatePresence mode="wait" initial={false} custom={direction}>
           <motion.div
              key={activeStep}
              custom={direction}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-direction * 50 }}
              transition={{
                type:"tween",
                duration:0.3,
                ease:[0.32,0.72,0,1],
              }}
              
            
             >
            
             {steps[activeStep].component}
              
             </motion.div>
           </AnimatePresence>
             <OnbaordingWizardNavigationSteps stepsId={stepsId}   numberOfSteps={steps.length} activeStep={activeStep} setActiveStep={setActiveStep}/>
         </Suspense>
         </div>
    )
}
 

  

export default OnboardingWizard;
