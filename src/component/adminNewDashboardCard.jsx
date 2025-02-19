import RideonButton from "./RideonButton.jsx";

const AdminNewDashboardCard = ({ imageSource, featureTitle, description }) => {
  return (
    <div className="w-full max-w-[552px] p-4 border border-[#D9D9D9] rounded-[10px] flex flex-col">
      <div>
        <img
          src={imageSource}
          alt="image"
          className="w-full max-h-[270px] object-cover rounded-[8px]"
        />
      </div>
      <div className="grid justify-items-start">
        <div className="m-1 font-semibold text-lg md:text-xl">
          <p>{featureTitle}</p>
        </div>
        <div className="m-1 text-left text-[#757575] text-sm md:text-base">
          <p>{description}</p>
        </div>
        <div className="m-1">
          <RideonButton />
        </div>
      </div>
    </div>
  );
};

export default AdminNewDashboardCard;
