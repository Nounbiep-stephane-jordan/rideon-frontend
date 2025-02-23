/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

 

const AdminNewDashboardCard = ({ imageSource, featureTitle, description,route }) => {
  const navigate = useNavigate()
 
  return (
    <div className="w-full max-w-[450px] h-full max-h-[400px] p-4 border border-[#D9D9D9] rounded-[10px] flex flex-col ">
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
          <button
            onClick={() => navigate(route)}
            className="bg-[#530DF6] cursor-pointer rounded-l-full w-[108px] h-[40px] text-white font-semibold"
          >
            <span className="text-transparent ">R</span>
            Ride on
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNewDashboardCard;
