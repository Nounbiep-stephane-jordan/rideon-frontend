




// 1. Create a Wizard Progress Context
import { createContext, useContext, useEffect, useRef,useState } from 'react';
 

const WizardProgressContext = createContext();

 //requirements to mark a wizard step as completed
 const defaultCompletedRequirements = {
     0:{ //meet the team
        time:30, // atleast spend 30 seconds on the phase
        clicks:3 //if usercliked on the project card twice taht is to see the stake holders and  and what proble it solves and also one time to see the project impact
     },
     1:{ //installation guide
        time:30, // atleast spend 30 seconds on the phase
        clicks:2   //if they click on the custom guide button and to swtch between the project credntials and the additional links
     },
     3:{ // github phase
        time:30, // atleast spend 30 seconds on the phase
        clicks:5 //

     }
 }

 
export const WizardProgressProvider = ({ children }) => {

 

 
  return (
    <WizardProgressContext.Provider value={{

    }}>
      {children}
    </WizardProgressContext.Provider>
  );
};

 