import { MAXMEMBERS } from "../../utils/constants";
import memberAvatar from "../../assets/img/memberAvatar.svg";

const Member = () => {
  return (
    <div className="rounded-full overflow-hidden w-12 h-12 flex-shrink-0">
      <img
        src={memberAvatar}
        alt="member"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const TeamMembers = () => {
  return (
    <div className="w-full max-w-[400px] overflow-x-auto flex space-x-3 py-2 custom-scrollbar">
      {[...Array(MAXMEMBERS)].map((_, index) => (
        <Member key={index} />
      ))}
    </div>
  );
};

export default TeamMembers;
