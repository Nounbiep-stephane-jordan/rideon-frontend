/* eslint-disable react/prop-types */
import {useState} from 'react'
import { motion } from 'framer-motion';
import CardContent from './cardContent.jsx'
import "../wizardCard/style.css";


const cardElements = [
  {
    id: 0,
    viewsNo: 1,
    views: [
      {
        view: "view1",
        title: "Stake Holders",
        description:
          "The goal of this project is to develop an app that facilitates the trading and buying of stocks with AI.",
        imageSource: "/stakeholders.jpg",
      },
    ],
  },
  {
    id: 1,
    viewsNo: 2,
    views: [
      {
        view: "view1",
        title: "Project Goal",
        description:
          "The goal of this project is to develop an app that facilitates the trading and buying of stocks with AI.",
        imageSource: "/projectgoal.jpg",
      },
      {
        view: "view2",
        title: "Project Impact",
        description:
          "The goal of this project is to develop an app that facilitates the trading and buying of stocks with AI.",
        imageSource: "/projectimpact.jpg",
      },
    ],
  },
  {
    id: 2,
    viewsNo: 1,
    views: [
      {
        view: "view1",
        title: "What problem it solves",
        description:
          "The goal of this project is to develop an app that facilitates the trading and buying of stocks with AI.",
        imageSource: "/problemsolving.jpg",
      },
    ],
  },
];

const CardSelector = ({isClicked,onClick}) => {
 
  return (
    <div
      className={`self-center w-full max-w-[15px] h-full max-h-[15px] rounded-full text-center transition-all duration-200 ease-in-out 
    ${isClicked ? "bg-[#FF8000]" : "bg-[#D9D9D9]"}`}
      onClick={onClick}
    >
      <span className="text-transparent">B</span>
    </div>
  );
};


export const CardBlock = ({viewsNo, views, isSelected, onClick}) => {
const [selectedView, setSelectedView] = useState("view1"); 

const handleViewSelection = (view) => {
  if(selectedView === view)
   return;
  setSelectedView(view);
}

const activeView = views.find((v) => v.view === selectedView) ;
  return (
    <motion.div
      className={`grid gap-3 relative p-[20px] w-full max-w-[240px] rounded border-[2px] border-[#D9D9D9] h-full max-h-[240px]   
        ${
          isSelected
            ? "scale-110 backdrop-blur-xs shadow-lg"
            : " blur-[1px] scale-90 "
        }`}
      onClick={onClick}
    >
      <div className="mb-[10px]">
        <CardContent
          title={activeView.title}
          description={activeView.description}
          imageSource={activeView.imageSource}
        />
      </div>
      <div className="flex flex-auto flex-row justify-center items-center gap-2 transition-all duration-500 ease-in-out">
        {[...Array(viewsNo)].map((_, index) => (
          <>
            <CardSelector
              key={index}
              isClicked={selectedView === `view${index + 1}`}
              onClick={() => handleViewSelection(views[index].view)}
            />
            {index < viewsNo - 1 && (
              <div className="w-[20px] h-[1px] bg-[#D9D9D9]" />
            )}
          </>
        ))}
      </div>
    </motion.div>
  );
}



const WizardPhase1Cards = () => {
  const [cards, setCards] = useState(cardElements);

  const handleCardSelection = (clickedId) => {
    if (cards[1].id === clickedId) return;

    setCards((prevCards) => {
      const clickedIndex = prevCards.findIndex((card) => card.id === clickedId);

      if (clickedIndex === 0) {
        return [prevCards[2], prevCards[0], prevCards[1]];
      } else if (clickedIndex === 2) {
        return [prevCards[1], prevCards[2], prevCards[0]];
      }
      return prevCards;
    });
  };

  return (
    <div className="flex justify-center items-center  ">
      {cards.map((element, index) => {
        const variants = {
          initial: {
            opacity: 0,
            scale: 0.5,
            
          },
          animate: {
            opacity: 1,
            scale: index === 1 ? 1.1 : 0.9,
            x: index === 0 ? -200 : index === 2 ? 200 : 0,
            y: index === 1 ? -40: 0,
            zIndex: index === 1 ? 10 : 0,
            transition: {
              type: "spring",
              stiffness: 150,
              damping: 25,
            },
          },
          exit: {
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.5 },
          },
        };

        return (
          <motion.div
            key={element.id}
            className="absolute"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
          >
            <CardBlock
              id={element.id}
              viewsNo={element.viewsNo}
              views={element.views}
              onClick={() => handleCardSelection(element.id)}
              isSelected={index === 1}
            />
          </motion.div>
        );
      })}
    </div>
  );
};


export default WizardPhase1Cards