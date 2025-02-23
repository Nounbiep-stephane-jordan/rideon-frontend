import { MEETTEAMMEMBERS } from "../../../../utils/constants";
import WizardPhase1Card from "../../../../component/wizardPhase1Card/wizardPhase1Card.jsx";
import TeamMembers from "../../../../component/teamMembers/teamMembers.jsx";
import WizardButton from "../../../../component/wizardbutton/wizardButton.jsx";


const WelcomeMessage = "Welcome from the entire team, John";

const onboardingPhase1 = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen  ">
      <div className="relative -top-10 left-10">
        <div>
          <p className="font-none mb-[10px]">{WelcomeMessage}</p>
        </div>
        <div className="mb-[10px]">
          <p>{MEETTEAMMEMBERS}</p>
        </div>
        <div className="relative left-11">
          <TeamMembers />
        </div>
      </div>

      <div className="flex justify-center m-[50px]">
        <WizardPhase1Card />
      </div>
      <div className="flex justify-center">
        <WizardButton />
      </div>
    </div>
  );
};

export default onboardingPhase1;
