
const text = "Ride on";

const RideonButton = () => {
  return (
    <button className="bg-[#530DF6] rounded-l-full w-[108px] h-[40px] text-white font-semibold">
      <span className="text-transparent ">R</span>
      {text}
    </button>
  );
}

export default RideonButton