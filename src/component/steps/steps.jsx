/* eslint-disable react/prop-types */
const Steps = ({numberOfSteps,activeWizardCardIndex,setActiveWiwardCardIndex,stepsId,currrentContent}) => {

      
     const steps = Array.from({length:numberOfSteps},(_,i) => i)
 
     if(numberOfSteps<1) return null
     
     return ( 

        
           <div key={currrentContent.heading+currrentContent.text} className="flex flex-auto flex-row justify-evenly place-content-evenly items-center">
               {steps.map((step,index) => (
                    <>
                    <div   key={stepsId[index].index} onClick={()=> setActiveWiwardCardIndex(index)}
                         className={`${stepsId[index].index} w-5 h-5 cursor-pointer rounded-full transition duration-300 ${index===activeWizardCardIndex?'shadow-lg bg-[#ff8000]':'bg-[#D9D9D9]'}`}
                         ></div>

                    {index<steps.length-1 && (
                         <div key={stepsId[index].barIndex} className={`${stepsId[index].barIndex} w-5 h-1 ml-2 mr-2 bg-[#D9D9D9]`}  ></div>
                    )}
                    </>   
          ))}
            </div>
           
      )


}

export default Steps