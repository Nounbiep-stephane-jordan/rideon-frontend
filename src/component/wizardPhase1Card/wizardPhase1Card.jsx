/* eslint-disable react/prop-types */
import {useState} from 'react'
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
      className={`rounded-full w-full max-w-[20px] h-full max-h-[20px] text-center transition-all duration-500 ease-in-out 
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
    <div
      className={`p-[4px] custom-wizard-config-shadow w-full max-w-[280px] outline-2 outline-[#FF8000] h-full max-h-[280px] transition-all duration-500 ease-in-out  
        ${isSelected ? "scale-110 bg-white" : " scale-90 "}`}
      onClick={onClick}
    >
      <CardContent
        title={activeView.title}
        description={activeView.description}
        imageSource={activeView.imageSource}
      />
      <div className="relative justify-center flex flex-row items-center gap-2">
        {[...Array(viewsNo)].map((_, index) => (
          <>
            <CardSelector
              key={index}
              isClicked={selectedView === `view${index + 1}`}
              onClick={() => handleViewSelection(views[index].view)}
            />
            {index < viewsNo - 1 && (
              <div className="w-[20px] h-[2px] bg-[#D9D9D9]" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}



const WizardPhase1Cards = () => {
  const [cards, setCards] = useState(cardElements);

  const handleCardSelection = (clickedId) => {
    if (cards[1].id === clickedId) return;

    setCards((prevCards) => {
      const clickedIndex = prevCards.findIndex((card) => card.id === clickedId);

      if (clickedIndex === 0) {
        return [prevCards[1], prevCards[0], prevCards[2]];
      } else if (clickedIndex === 2) {
        return [prevCards[0], prevCards[2], prevCards[1]];
      }
      return prevCards;
    });
  };

  return (
    <div className="flex">
      {cards.map((element, index) => {
        const positionClass =
          index === 0
            ? "transform translate-x-1/4 scale-90 z-0"
            : index === 1
            ? "transform -translate-y-[20px] scale-110 z-10"
            : "transform -translate-x-1/4 scale-90 z-0 ";

        return (
          <div
            key={element.id}
            className={`transition-all duration-500 ease-in-out ${positionClass}`}
          >
            <CardBlock
              id={element.id}
              viewsNo={element.viewsNo}
              views={element.views}
              onClick={() => handleCardSelection(element.id)}
              isSelected={index === 1}
            />
          </div>
        );
      })}
    </div>
  );
};


export default WizardPhase1Cards