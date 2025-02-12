import "./style.css"
const Steps = () => {

     return (<div className="flex flex-auto h-20 w-60 flex-row justify-between place-content-evenly items-center">
               <div className="w-10 h-10 cursor-pointer rounded-full active-step shadow-lg" >
               </div>
               <div className="w-10 h-1 normal-step-bar ml-2 mr-2">
               </div>
               <div className="w-10 h-10 cursor-pointer rounded-full normal-step " >
               </div>
               <div className="w-10 h-1 normal-step-bar ml-2 mr-2">
               </div>
               <div className="w-10 h-10 cursor-pointer rounded-full normal-step" >
               </div>
     </div>)
}

export default Steps