/* eslint-disable react-refresh/only-export-components */





// 1. Create a Wizard Progress Context
import { createContext,useState } from 'react';
 

export const WizardProgressContext = createContext();

 //requirements to mark a wizard step as completed
 const defaultCompletedRequirements = {
     0:{ //meet the team
        time:30, // atleast spend 30 seconds on the phase
        stepstake:0,stepgoal1:0,stepgoal2:0,stepprob:0,
        clicks:0
        //3 clicks: if usercliked on the project card twice taht is to see the stake holders and  and what proble it solves and also one time to see the project impact
     },
     1:{ //installation guide
        time:30, // atleast spend 30 seconds on the phase
        customGuideClick:0,
        backCardClick:0,
        clicks:0,
        //2 clicks: if they click on the custom guide button and to swtch between the project credntials and the additional links
     },
     2:{ // github phase
        time:30, // atleast spend 30 seconds on the phase
        fileClick:0,
        folderClick:0,
        smallBoxClick:0 ,
        clicks:0,
        // 3 clicks clikcing on a folder , a file and the small box

     },
     3:{ //codding standards
      time:30,
      step1Click:0,
      step2Click:0,
      step3Click:0,
      clicks:0
        // 3 clicks changing between its three screen
     }
 }

 
export const WizardProgressProvider = ({ children }) => {

const [interactionsTrackerMeet,setInteractionsTrackerMeet] = useState(defaultCompletedRequirements[0])
const [interactionsTrackerInstall,setInteractionsTrackerInstall] = useState(defaultCompletedRequirements[1])
const [interactionsTrackerGit,setInteractionsTrackerGit] = useState(defaultCompletedRequirements[2])
const [interactionsTrackerCod,setInteractionsTrackerCod] = useState(defaultCompletedRequirements[3])
const [wizardProgressSaved,setWizardProgressSaved] = useState(false)

 
  return (
    <WizardProgressContext.Provider value={{
      interactionsTrackerInstall,setInteractionsTrackerInstall,
      interactionsTrackerCod,setInteractionsTrackerCod,
      interactionsTrackerGit,setInteractionsTrackerGit,
      interactionsTrackerMeet,setInteractionsTrackerMeet,
      wizardProgressSaved,setWizardProgressSaved
    }}>
      {children}
    </WizardProgressContext.Provider>
  );

 
};

