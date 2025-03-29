/* eslint-disable react/prop-types */
/** Here is the implementation of the navigation bar component**/

import { motion } from "framer-motion";

/* importing all necessary icons used in the nav bar*/
import home from "../../assets/home.svg";
import homeSelected from "../../assets/home_selected.svg";
import onboardingWizard from "../../assets/onboarding_wizard.svg";
import onboardingWizardSelected from "../../assets/onboarding_wizard_selected.svg";
import fileVisualisation from "../../assets/file_visualisation.svg";
import fileVisualisationSelected from "../../assets/file_visualisation_Selected.svg";
import faq from "../../assets/faq.svg";
import faqSelected from "../../assets/faq_selected.svg";
import logedUser from "../../assets/loged_user.svg";
import { useNavigate } from "react-router-dom";
import { useGlobalVariables } from "../../context/global";
import { useContext, useState } from "react";
import { WizardProgressContext } from "../../context/wizardProgressContext";
import API from "../../api/api";

const Icon = ({ source, onClick }) => { // 1-Unselected nav bar icon
  return (
    // layout and animating transitions
    <motion.div
      className="w-4 ml-1 mr-3 cursor-pointer focus:outline-none"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      <motion.img
        className="size-8"
        src={source}
        alt="icon"
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const IconSelected = ({ source, onClick,type }) => { // 2-selected nav bar icon 
  const {newQuestionArrived} = useGlobalVariables()
  return (
    // layout and animating transitions
    <motion.div
      className="bg-white grid place-items-center w-8 h-8 ml-1 mr-3 relative top-[-10px] rounded-full cursor-pointer focus:outline-none"
      onClick={onClick}
      initial={false}
      animate={{ scale: 1}}
      transition={{ type: "smooth", stiffness: 250, damping: 15 }}
    >
      <motion.img className="size-4" src={source} alt="icon" />
     {newQuestionArrived && type=="faq" ?  <div className="border-none absolute top-5 left-5 h-4 w-4 rounded-full bg-[#FF8000] flex items-center justify-center"><p className="text-white text-[8px]">1</p></div>: null}
    </motion.div> 
  );
};

const LogedUser = ({ source,navigate }) => { // 3-Authenticated user avatar
  return (
    <img
    onClick={()=>navigate("/login")}
      src={source}
      alt="icon"
      className=" size-8 outline-white outline-4 rounded-full"
    />
  );
};

const Nav = () => { // 4-nav bar component

  const navigate = useNavigate()
  /* Seperated the nav bar elements into 4 main components */

 const [showModal,setShowModal] = useState(false)
 const {selectedIcon,setSelectedIcon,activeProject,setWizardData,setWizardStartStage} = useGlobalVariables()
  const {setWizardProgressSaved} = useContext(WizardProgressContext)

   const startWizard = async(project_id) => {
    await API.post("/start-wizard",{project_id}).then((res) => {
       setWizardData({...res.data,project_id,projectName:res.data.installationGuide.textData.projectName})
       setWizardProgressSaved(false)
       setWizardStartStage(0)
       setSelectedIcon("onboardingWizard")
       navigate("/wizard")
     }).catch(err => {
       console.log(err,"in start wizard")
     })
   
   }
 
  return (
   <div>
    {showModal ?     <div> 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-[9999999] inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      >
  
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white rounded-sm p-6 w-full max-w-lg"
        >
          <div className="flex flex-col items-center justify-between">
            <div className="self-center">
            <img alt="select" className="h-50 w-50" src="/select.svg"/>
            </div>
            <p className="w-1/2 m-auto text-center">Please do select a project on the dashbaord first before launching it wizard. </p>
             <div className="flex items-center justify-center mt-5">
                 <button onClick={() => setShowModal(false)} className="cursor-pointer bg-[#8EFF2C] px-5 py-2 shadow text-white font-semibold">Ok</button>
             </div>
          </div>
  
        </motion.div>
      </motion.div>
  </div>:null}
    {/* // managing various states based on the selected icon variable name */}
    <div
      className="mt-5 relative bg-[#530DF6] rounded-r-sm flex justify-between h-[35px] w-[230px] shadow-md focus:outline-none overflow-visible"
      tabIndex={-1}
    >


      <div className="flex flex-row justify-between ml-3 focus:outline-none">
        {selectedIcon === "home" ? (
          <IconSelected
          type={selectedIcon}
            source={homeSelected}
            onClick={() => setSelectedIcon("home")}
          />
        ) : (
          <Icon type={selectedIcon} source={home} onClick={() => {
            setSelectedIcon("home")
            navigate("/")
          }} />
        )}
        {selectedIcon === "onboardingWizard" ? (
          <IconSelected
          type={selectedIcon}
            source={onboardingWizardSelected}
            onClick={() => setSelectedIcon("onboardingWizard")}
          />
        ) : (
          <Icon
            source={onboardingWizard}
            type={selectedIcon}
            onClick={() => {
              console.log(activeProject)
              if(activeProject?.id) {
                startWizard(activeProject?.id)
              } else {
                setShowModal(true)
              }
             
            }}
          />
        )}

        {selectedIcon === "fileVisualisation" ? (
          <IconSelected
          type={selectedIcon}
            source={fileVisualisationSelected}
            onClick={() => setSelectedIcon("fileVisualisation")}
          />
        ) : (
          <Icon
          type={selectedIcon}
            source={fileVisualisation}
            onClick={() => {
              setSelectedIcon("fileVisualisation") 
              navigate("/file-visualisation")
            }}
            
          />
        )}
        {selectedIcon === "faq" ? (
          <IconSelected
            source={faqSelected}
            type={selectedIcon}
            onClick={() =>{ 
              setSelectedIcon("faq")
              navigate("/faq")

              
            }}
          />
        ) : (
          <Icon type={selectedIcon} source={faq} onClick={() => {
            setSelectedIcon("faq")
            navigate("/faq")

          }} />
        )}
      </div>

      <div className="mr-4 absolute top-[-8px] right-0 focus:outline-none">
        <LogedUser navigate={navigate} source={logedUser} />
      </div>
    </div>

    </div>
  );
};

export default Nav;
