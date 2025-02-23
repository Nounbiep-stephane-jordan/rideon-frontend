

const cardContent = ({ title, description, imageSource }) => {
  return (
    <div className="flex flex-col">
      <div className="m-1 font-semibold text-lg md:text-xl">
        <p>{title}</p>
      </div>
      <div className="m-1 text-left text-[#757575] text-sm md:text-base">
        <p>{description}</p>
      </div>
      <div className="flex justify-center">
        <img
          src={imageSource}
          alt="image"
          className="w-full max-w-[150px] h-full max-h-[125px]"
        />
      </div>
    </div>
  );
};

export default cardContent