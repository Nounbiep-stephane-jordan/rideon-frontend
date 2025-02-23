import TeamMembers from "../../../component/teamMembers/teamMembers";
import WizardPhase1Cards from "../../../component/wizardPhase1Card/wizardPhase1Card";


const WelcomeMessage = "Welcome from the entire team, John";

const MeetTheTeam = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen mt-5">
      <div className="relative -top-10 left-10">
        <div>
          <p className="font-semibold text-2xl mb-[10px]">{WelcomeMessage}</p>
        </div>
        <div className="mb-[10px]">
          <p>Meet Team Members</p>
        </div>
        <div className="relative left-11">
          <TeamMembers />
        </div>
      </div>

      <div className="flex justify-center m-[50px]">
        <WizardPhase1Cards/>
      </div>

    </div>
  );
};

export default MeetTheTeam;
