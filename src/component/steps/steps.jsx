/* eslint-disable react/prop-types */
const Steps = ({numberOfSteps,activeWizardCardIndex,setActiveWiwardCardIndex,stepsId,currrentContent}) => {

      
     const steps = Array.from({length:numberOfSteps},(_,i) => i)
 
     if(numberOfSteps<1) return null
     if(numberOfSteps === 1) {
          return ( 

        
               <div key={currrentContent.heading+currrentContent.text} className="flex flex-auto flex-row justify-center items-center">
                   {steps.map((step,index) => (
                        <div key={stepsId[index].index} className="grid grid-cols-auto grid-rows-auto place-items-center justify-center items-center">
                        <div    onClick={()=> setActiveWiwardCardIndex(index)}
                             className={`${stepsId[index].index} w-5 h-5 cursor-pointer rounded-full transition duration-300 ${index===activeWizardCardIndex?'shadow-lg bg-[#ff8000]':'bg-[#D9D9D9]'}`}
                             ></div>
                        </div>   
              ))}
                </div>
               
          )
     }

     if(numberOfSteps === 2 ) {
               return ( 

        
           <div key={currrentContent.heading+currrentContent.text} className="flex flex-auto flex-row justify-center items-center">
                
                    <div key={stepsId[0].index} className="grid grid-cols-3 grid-rows-1 gap-4 place-items-center justify-center items-center">
                    <div    onClick={()=> setActiveWiwardCardIndex(0)}
                         className={`${stepsId[0].index} w-5 h-5 cursor-pointer rounded-full transition duration-300 ${0===activeWizardCardIndex?'shadow-lg bg-[#ff8000]':'bg-[#D9D9D9]'}`}
                         ></div>

                   
                         <div key={stepsId[0].barIndex} className={`${stepsId[0].barIndex} w-5 h-1 bg-[#D9D9D9]`}  ></div>
                     
                         <div    onClick={()=> setActiveWiwardCardIndex(1)}
                         className={`${stepsId[1].index} w-5 h-5 cursor-pointer rounded-full transition duration-300 ${1===activeWizardCardIndex?'shadow-lg bg-[#ff8000]':'bg-[#D9D9D9]'}`}
                         ></div>
                    </div>   
         
            </div>
           
      )
     }


}

export default Steps