
import { useNavigate } from "react-router-dom"
import congratulation from "../../../assets/congratulation.webp"
import leftcongrat from "../../../assets/right-congrat.webp"
import rightcongrat from "../../../assets/right-congrat.webp"
import API from "../../../api/api"
import { useContext } from "react"
import { WizardProgressContext } from "../../../context/wizardProgressContext"
import { useGlobalVariables } from "../../../context/global"

const Congratulations = () => {
     const navigate = useNavigate()
     const {      interactionsTrackerInstall,
          interactionsTrackerCod,
          interactionsTrackerGit,
          interactionsTrackerMeet,wizardProgressSaved,setWizardProgressSaved} = useContext(WizardProgressContext)
     const {wizardData} = useGlobalVariables()
     const saveWizardProgress = async() => {
          let user = JSON.parse(localStorage.getItem("user"))
          const data  = {
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
                    setWizardProgressSaved(false)
               }).catch(err => {
                    console.log(err)
               })
          }
        
     }
 
     return (
          <div className="flex items-center flex-col justify-center m-auto mt-10">
               <h1 className="text-2xl font-bold mb-5">Congratulations</h1>
               <p className="w-1/2 text-[20px] font-meduim capitalize">you have succefully onboarded on the prject  Easybuy. you are ready to get productie and rrideon</p>
               <div className="items-center relative">
               
               <div className="flex flex-row justify-between items-center">
               <div className="h-60">
               <img alt="congrat left" src={leftcongrat} className="scale-x-[-1]"/>
               
               </div>
              
               <div className="relative">
               <img alt="congrats image" className="w-100" src={congratulation}/>
               <button onClick={() => saveWizardProgress()} className="absolute cursor-pointer self-center bottom-22 left-37 py-[5px] px-[15px] rounded font-bold text-white bg-[#8EFF2C]">Terminate</button>
               </div>

               <div className="h-60">
               <img alt="congrat right" src={rightcongrat}/>
               </div>
               </div>

               </div>
          </div>
     )
}

export default Congratulations