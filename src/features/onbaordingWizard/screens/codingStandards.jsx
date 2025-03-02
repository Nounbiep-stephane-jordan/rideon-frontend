import { motion } from "framer-motion";
import { useState } from "react";
import standardimg from "../../../assets/standard.jpg"

const MAXVIEWS = 3;
const standards = [
  {
    id: 1,
    data: [
      {
        good: "def calculate_total_price(price,tax): return price + tax",
        bad: "def calc(price,tax):         return price + tax",
      },
    ],
  },
  {
    id: 2,
    data: [
      {
        good: "# Calculate total price def calculate_total_price(price,tax): return price + tax",
        bad: "# This fxn calculate the total price def calc(price,tax): return price + tax",
      },
    ],
  },
  {
    id: 3,
    data: [
      {
        good: "# Calculate total price def calculate_total_price(price,tax): return price + tax",
        bad: "# This fxn calculate the total price def calc(price,tax): return price + tax",
      },
    ],
  },
];

const Step1 = ({ good, bad }) => {
  return (
    <motion.div
      view="step3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full max-w-[650px] h-full max-h-[350px] "
    >
      <div className="flex flex-row items-center gap-25 h-[130px]">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Codding standards</h3>
          <div className="">
            <p>Here are some illustrations of our coding practices</p>
          </div>
        </div>

        <div className="w-full max-w-[170px] float-left">
          <img className="" src={standardimg} alt="standard" />
        </div>
      </div>

      <div className="space-y-2 flex items-center flex-row justify-evenly p-2 relative  w-[630px] custom-scroll-x">
        {standards.map((standard, index) => (
          <motion.div
            key={standard.id}
            good={standard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 mr-5"
          >
            <div className=" pl-[7px] pr-[7px] grid grid-cols-1 w-[285px] h-[180px] rounded-[15px] border-[2px] border-[#D9D9D9] items-center ">
              <div className="flex flex-row">
                <p className="text-[13px] overflow-hidden terx-ellipsis">
                  # Calculate total price def
                  calculate_total_price(price,tax): return price + tax
                </p>

                <img
                  src="/correctIcon.svg"
                  alt="icon"
                  className="size-[20px]"
                />
              </div>
              <div className="flex gap-10">
                <p className="text-[13px]">
                  # This fxn calculate the total price def calc(price,tax):
                  return price + tax
                </p>
                <img src="/wrongIcon.svg" alt="icon" className="size-[20px]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Step2 = () => {
  return (
    <motion.div
      view="step3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 w-full max-w-[650px] h-full max-h-[350px] "
    >
      <h3 className="text-2xl font-semibold">Git workflow</h3>
      <p>
        we primarily use gituhub for version control and racking of the
        softwarre changes here are some example of how to comit your changes for
        easy racking by others
      </p>
      <div className="flex flex-row items-center justify-evenly ">
        <div className="">
          <h2 className="mt-5">Bad Commits</h2>
          <div className=" flex flex-row  p-3 shadow-sm w-[250px] h-[150px] border-[#D9D9D9]  rounded">
            <p>let today = “day” Updates of today</p>
            <img src="/wrongIcon.svg" alt="icon" className="size-[20px]" />
          </div>
        </div>

        <div className="">
          <h2 className="mt-5">Good Commits</h2>
          <div className=" flex flex-row  p-3 shadow-sm w-[250px] h-[150px] border-[#D9D9D9]  rounded">
            <p>let today = “day” Created a variable today </p>
            <img src="/correctIcon.svg" alt="icon" className="size-[20px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Step3 = () => {
  return (
    <motion.div
      view="step3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {[
        {
          index: 0,
          heading: "Review process",
          description:
            "code revview usaly takes a day and is done by a senior developer wiht whom you are working. make sure to respect the codding standards of the project",
        },
        {
          index: 1,
          heading: "Communication rules",
          description:
            "communiacaiton in this project is primarily done through the emails and mircosoft teams. MAke sure to create your accounts. communication through any other means is prohibited and will severlay be santioned. ",
        },
        {
          index: 2,
          heading: "Support channels",
          description:
            "In case you couldn finde any usefu contacts or need more sepcfic answer you can contact. the mangers through this ...eamil. mange@gmail.com",
        },
      ].map((val) => (
        <div
          key={val.heading}
          className="space-y-2 w-full max-w-[650px] h-full max-h-[350px]"
        >
          <h3 className="text-[16px] font-semibold">{val.heading}</h3>
          <p className=" text-[13px] w-full p-2 border-[#D9D9D9] rounded">
            {val.description}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

// eslint-disable-next-line react/prop-types
const CardSelector = ({ isClicked, onClick }) => {
  return (
    <div>
      <motion.div
        transition={{ type: "spring", stiffness: 50, damping: 2 }}
        className={` w-[20px] h-[20px] mr-[50px] rounded-full text-center  
    ${
      isClicked
        ? "border-white border-2 outline-2 outline-blue-500 bg-blue-500    "
        : "bg-gray-300"
    }`}
        onClick={onClick}
      >
        <span className="text-transparent">B</span>
      </motion.div>
    </div>
  );
};

const CompanyStandards = () => {
  const [selectedView, setSelectedView] = useState(1);

  return (
    <div className="mt-[50px] flex flex-col items-center justify-between outline-black/10 outline-2 shadow-lg w-[700px] h-[455px] rounded-[15px] p-5">
      {/* Content takes full available space */}
      <div className="flex-grow flex items-center justify-center w-full">
        {selectedView === 1 ? (
          <Step1 />
        ) : selectedView === 2 ? (
          <Step2 />
        ) : (
          <Step3 />
        )}
      </div>

      {/* CardSelector is always at the bottom */}
      <div className="flex justify-center items-center mt-auto">
        {[...Array(MAXVIEWS)].map((_, index) => {
          return (
            <motion.div key={index}>
              <CardSelector
                isClicked={selectedView === index + 1}
                onClick={() => setSelectedView(index + 1)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


const Standards = () => {
  return (
    <div className="flex items-center justify-center">
      <CompanyStandards />
    </div>
  );
}



export default Standards;
