/* eslint-disable react/prop-types */


const OnbaordingWizardNavigationSteps = ({numberOfSteps,activeStep,setActiveStep,stepsId}) => {
     
     const steps = Array.from({length:numberOfSteps},(_,i) => i)
 
     if(numberOfSteps<1) return null
     
     return ( 

        
           <div key="super-nav" className="flex flex-auto flex-row justify-evenly place-content-evenly items-center fixed bottom-5 left-1/2 -translate-x-1/2 w-[300px] h-[10px]">
               {steps.map((step,index) => (
                    <div key={stepsId[index].index} className="flex flex-row items-center justify-between">
                    <div   onClick={()=> setActiveStep(index)}
                         className={`${stepsId[index].index} w-8 h-8 cursor-pointer rounded-full transition duration-300 ${index===activeStep?'shadow-lg blue-bg':'bg-[#D9D9D9]'}`}
                         ></div>

                    {index<steps.length-1 && (
                         <div key={stepsId[index].barIndex} className={`${stepsId[index].barIndex} w-7 h-1 ml-2 mr-2 bg-[#D9D9D9]`}  ></div>
                    )}
                    </div> 
          ))}
            </div>
           
      )

}

export default OnbaordingWizardNavigationSteps;