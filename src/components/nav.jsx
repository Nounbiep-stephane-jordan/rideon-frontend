/** Here is the implementation of the navigation bar component**/
import { useState } from "react";
import { motion } from "framer-motion";

/* importing all necessary icons used in the nav bar*/
import home from "../assets/home.svg";
import homeSelected from "../assets/home_selected.svg";
import onboardingWizard from "../assets/onboarding_wizard.svg";
import onboardingWizardSelected from "../assets/onboarding_wizard_selected.svg";
import fileVisualisation from "../assets/file_visualisation.svg";
import fileVisualisationSelected from "../assets/file_visualisation_Selected.svg";
import faq from "../assets/faq.svg";
import faqSelected from "../assets/faq_selected.svg";
import logedUser from "../assets/loged_user.svg";

/* Seperated the nav bar elements into 4 main components */

const Icon = ({ source, onClick }) => { // 1-Unselected nav bar icon
  return (
    // layout and animating transitions
    <motion.div
      className="w-4 ml-1 mr-3 cursor-pointer focus:outline-none"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      <motion.img
        className="size-7"
        src={source}
        alt="icon"
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const IconSelected = ({ source, onClick }) => { // 2-selected nav bar icon 
  return (
    // layout and animating transitions
    <motion.div
      className="bg-white grid place-items-center w-7 ml-1 mr-3 relative top-[-10px] rounded-full cursor-pointer focus:outline-none"
      onClick={onClick}
      layout
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "smooth", stiffness: 250, damping: 15 }}
    >
      <motion.img className="size-4" src={source} alt="icon" />
    </motion.div>
  );
};

const LogedUser = ({ source }) => { // 3-Authenticated user avatar
  return (
    <img
      src={source}
      alt="icon"
      className=" size-6 outline-white outline-4 rounded-full"
    />
  );
};

const nav = () => { // 4-nav bar component
  const [selectedIcon, setSelectedIcon] = useState("home");
  return (
    // managing various states based on the selected icon variable name
    <div
      className="relative bg-[#530DF6] rounded-r-2xl flex justify-between  w-[230px] overflow-visible shadow-md focus:outline-none"
      tabIndex={-1}
    >
      <div className="flex flex-row justify-between ml-3 focus:outline-none">
        {selectedIcon === "home" ? (
          <IconSelected
            source={homeSelected}
            onClick={() => setSelectedIcon("home")}
          />
        ) : (
          <Icon source={home} onClick={() => setSelectedIcon("home")} />
        )}
        {selectedIcon === "onboardingWizard" ? (
          <IconSelected
            source={onboardingWizardSelected}
            onClick={() => setSelectedIcon("onboardingWizard")}
          />
        ) : (
          <Icon
            source={onboardingWizard}
            onClick={() => setSelectedIcon("onboardingWizard")}
          />
        )}

        {selectedIcon === "fileVisualisation" ? (
          <IconSelected
            source={fileVisualisationSelected}
            onClick={() => setSelectedIcon("fileVisualisation")}
          />
        ) : (
          <Icon
            source={fileVisualisation}
            onClick={() => setSelectedIcon("fileVisualisation")}
          />
        )}
        {selectedIcon === "faq" ? (
          <IconSelected
            source={faqSelected}
            onClick={() => setSelectedIcon("faq")}
          />
        ) : (
          <Icon source={faq} onClick={() => setSelectedIcon("faq")} />
        )}
      </div>

      <div className="mr-4 absolute top-[-8px] right-0 focus:outline-none">
        <LogedUser source={logedUser} />
      </div>
    </div>
  );
};

export default nav;
