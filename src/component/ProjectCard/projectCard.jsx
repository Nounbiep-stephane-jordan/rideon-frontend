
 
import API from "../../api/api"
import OrangeExclamation from "../../assets/orange-exclamation.webp"
import { useContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import {useGlobalVariables} from "../../context/global"
import cardImg from "../../assets/card.webp"
import { WizardProgressContext } from "../../context/wizardProgressContext"


const ProjectCard = ({resetActiveProject,setActiveProject,name,isSelected,handleCardClick,p,is_fully_configured,project_id,setShowDeleteModal}) => {
  const navigate = useNavigate()
  const {setSelectedIcon,setWizardData,setIsEditingWizard,setCoddingStandardsConfigData,setInstallationGuidesConfigData,setMeetTheTeamConfigData,setGithubPhaseConfigData,setEditingWizardProjectId,setWizardStartStage} = useGlobalVariables()
 const {setWizardProgressSaved} = useContext(WizardProgressContext)
 let user = JSON.parse(localStorage.getItem("user"))
  const startWiward = async(project_id) => {
   await API.post("/start-wizard",{project_id}).then((res) => {
      setWizardData({...res.data,project_id,projectName:res.data.installationGuide.textData.projectName})
      setWizardProgressSaved(false)
      setWizardStartStage(0)
      navigate("/wizard")
    }).catch(err => {
      console.log(err,"in start wizard")
    })
  
  }


  const editWizard = async(project_id) => {
   
   await API.post("/edit-wizard",{project_id}).then((res) => {
       
      let {
        installationGuide,
        coddingStandards,
        meetTheTeam,
        githubPhase
      } = res.data
      setMeetTheTeamConfigData(meetTheTeam)
      setCoddingStandardsConfigData(coddingStandards)
      setInstallationGuidesConfigData(installationGuide)
      setGithubPhaseConfigData(githubPhase)
      setIsEditingWizard(true)
      setEditingWizardProjectId(project_id)
      navigate("/wizard-config-1")

    }).catch((err) => {
      console.log(err,"in edit wizard")
    })
  }

 
const options = user.role == "admin" ? [
  {key:"Start wizard",handler:(project_id)=> startWiward(project_id)},
    {key:"Edit wizard",handler:(project_id)=> {
    editWizard(project_id)
  }},
  {key:"File visual..",handler:()=> {
    navigate("/file-visualisation")
    setSelectedIcon("fileVisualisation")
  }},
  {key:"Faq",handler:()=> {
    navigate("/faq")
    setSelectedIcon('faq')
  }},
  {key:"Delete",handler:()=> {
    setShowDeleteModal(true) 
  }},
]: [
  {key:"Start wizard",handler:(project_id)=> startWiward(project_id)},
  {key:"File visual..",handler:()=> {}},
  {key:"Faq",handler:()=> {}},
]

const [isClicked,setIsclicked] = useState(false)
useEffect(()=> {
  if(isSelected == false) {
    resetActiveProject()
  }
},[])

  return <>
      <div className={`flex-col w-40 h-30`}>
        <div className="orange-shadow relative" onClick={() => {
          setIsclicked(false)
          setActiveProject()
          handleCardClick(p)
          setActiveProject()
        }}>
        <img className="cursor-pointer" src={cardImg} alt="card-img"/>
        {is_fully_configured ? null :<img alt="exclamation" src={OrangeExclamation} className="w-7 absolute top-[5px] right-[0px]"/>}
        </div>
      <div className="flex items-center place-content-start">
        <p className="">{name}</p>
        {isSelected === true ?  <img className="w-6 cursor-pointer"  src="button2.png" alt="icon plus" onClick={()=> {
          setIsclicked(!isClicked)
        }}/>: null}

      </div>


      {isClicked === true && isSelected === true ? 
      <div className={` top-[1px] left-[100px] absolute w-[150px] h-[100px] blue-bg blue-shadow p-[10px] rounded-sm`}>
                    {options.map((val) => (
                         <p key={val.key} onClick={()=> val.handler(project_id)} className="text-white text-[10px] text-left mb-[2px] cursor-pointer hover:text-[15px] transition duration-300">{val.key}</p>
                    ))}
      </div>
     :null}
     
    </div>
  </>
  
}

export default ProjectCard
