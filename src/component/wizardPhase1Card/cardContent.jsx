

const cardContent = ({ title, description, imageSource }) => {
  return (
    <div className="flex flex-col">
      <div className="m-1 font-semibold text-[10px] ">
        <p>{title}</p>
      </div>
      <div className="m-1 text-left text-[#757575] text-[9px]">
        <p>{description}</p>
      </div>
      <div className="flex justify-center">
        <img
          src={imageSource}
          alt="image"
          className=" w-full max-w-25 h-full max-h-30"
        />
      </div>
    </div>
  );
};

export default cardContent