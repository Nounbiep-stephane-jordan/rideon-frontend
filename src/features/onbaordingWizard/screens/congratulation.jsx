
import { useNavigate } from "react-router-dom"
import congratulation from "../../../assets/congratulation.jpg"
import leftcongrat from "../../../assets/left-congrat.jpg"
import rightcongrat from "../../../assets/right-congrat.jpg"

const Congratulations = () => {
     const navigate = useNavigate()

 
     return (
          <div className="flex items-center flex-col justify-center m-auto mt-10">
               <h1 className="text-2xl font-bold mb-5">Congratulations</h1>
               <p className="w-1/2 text-[20px] font-meduim capitalize">you have succefully onboarded on the prject  Easybuy. you are ready to get productie and rrideon</p>
               <div className="grid grid-cols-3 grid-rows-1 gap-5 items-center relative">
               <button onClick={() => navigate("/")} className="absolute cursor-pointer self-center bottom-22 left-156 py-[5px] px-[15px] rounded font-bold text-white bg-[#8EFF2C]">Terminate</button>
               <img alt="congrat left" src={leftcongrat}/>
               <img alt="congrats image" src={congratulation}/>
               <img alt="congrat right" src={rightcongrat}/>

               </div>
          </div>
     )
}

export default Congratulations