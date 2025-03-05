// import {Line} from "rc-progress"


// const ProgressTracker = () => {
//   const paths = [{value:75,img:"/Ellipse 7.png",color:"#530DF6"},{value:65,img:"/Ellipse 10.png",color:"rgba(246,150,54,1)"},{value:25,img:"/Ellipse 9.png",color:"#530DF6"},{value:65,img:"/Ellipse 10.png",color:"rgba(246,150,54,1)"}]
//   return (
//     <div className="">
//      <h1 className="flex flex-start place-items-start second-text">Onbaording Progression</h1>
//      <div className="relative custom-scrollbar h-[200px] w-[500px] box-border p-4">
//      <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>

//     <div className="h-full px-4 pb-10 overflow-y-scroll custom-scrollbar">
//     {paths.map((p,index) => 
//           <>
//           <div key={index} className="flex flex-row mt-5">
//                <div className="">
//                  <img className="w-8" src={p.img} alt="" />
//                </div> 
//                <div className="ml-5">
//                  <p className="text-start">John doe {p.value}%</p>
//                  <div className="w-70">
//                  <Line percent={p.value} strokeLinecap="butt" trailColor="#F5F5F5" trailWidth={6} strokeWidth={6} strokeColor={p.color} className="tracker"/>
//                  </div>
//                </div>
//             </div>
//           </>
//       )}
//     </div>


//      </div>
//     </div>
//   )
// }

// export default ProgressTracker




import { Line } from "rc-progress";
import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { WizardProgressContext } from "../../context/wizardProgressContext";
import API from "../../api/api";
import { useGlobalVariables } from "../../context/global";
 

const ProgressTracker = ({ progress }) => {
  const navigate = useNavigate()

   
    const {setWizardData,setWizardStartStage,showLoader,hideLoader} = useGlobalVariables()
    const {setWizardProgressSaved} = useContext(WizardProgressContext)
   
     const startWizard = async(project_id,phase) => {
      showLoader()
      await API.post("/start-wizard",{project_id}).then((res) => {
        console.log("res data",project_id,phase)
         setWizardData({...res.data,project_id,projectName:res.data.installationGuide.textData.projectName})
         setWizardProgressSaved(false)
         setWizardStartStage(phase)
         navigate("/wizard")
         hideLoader()
       }).catch(err => {
         console.log(err,"in start wizard")
       })
     
     }
  
  // Define static images array based on your original paths
  const images = [
    "/Ellipse 7.png",
    "/Ellipse 10.png", 
    "/Ellipse 9.png",
    "/Ellipse 10.png"
  ];

  // Color pattern based on index
  const colors = ["#530DF6", "rgba(246,150,54,1)"];
  let user= JSON.parse(localStorage.getItem("user"))
  return (
    <div className="">
      <h1 className="flex flex-start place-items-start second-text">
        Onboarding Progression
      </h1>
      <div className="relative custom-scrollbar h-[200px] w-[500px] box-border p-4">
        <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>

        <div className="h-full px-4 pb-10 overflow-y-scroll custom-scrollbar">
          {progress?.map((prog, index) => {
            const displayName = prog.user_name || `User ${prog.user_id}`;
            const color = colors[index % colors.length];
            const image = images[0];

            return (
              <div key={prog.user_id} className="flex flex-row mt-5">
                <div>
                  <img className="w-8" src={image} alt="User avatar" />
                </div>
                <div className="ml-5 ">
                  
                  <div className="flex flex-row items-center">
                  <p className={`text-[15px] text-[${color}] capitalize mr-2`}>{displayName}</p> <p className="text-[15px]"> {prog.progress.percentage}%</p>
                  </div>
                   
                  <div className="w-70">
                    <Line
                      percent={prog.progress.percentage}
                      strokeLinecap="butt"
                      trailColor="#F5F5F5"
                      trailWidth={6}
                      strokeWidth={6}
                      strokeColor={color}
                      className="tracker"
                    />
                  </div>

               
                  {user.role =="member" ?prog.progress.customMessages?.map((cm) => {
                     
                    return (
                      <p key={cm.messages[0]} onClick={()=>startWizard(prog?.project_id,cm?.phaseNumber)} className="mt-5">
                      <span className={`capitalize cursor-pointer text-[${color}]`}>{cm?.phase}</span> :
                      {cm?.messages[0]}
                    </p>
                    )
                  }):null}
                     
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;