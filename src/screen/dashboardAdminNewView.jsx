import { useState } from "react";
import Nav from "../component/nav.jsx";
import AdminNewDashboardCard from "../component/adminNewDashboardCard.jsx";

import cardillustration1 from "../assets/img/adminNewDashboardIllustration1.svg";
import cardillustration2 from "../assets/img/adminNewDashboardIllustration2.svg";
import cardillustration3 from "../assets/img/adminNewDashboardIllustration3.svg";

const initialCards = [
  {
    id: 0,
    imageSource: cardillustration1,
    featureTitle: "Frequently asked questions",
    description: "Boost productivity by avoiding frequent interruptions.",
  },
  {
    id: 1,
    imageSource: cardillustration2,
    featureTitle: "Onboarding Wizard",
    description: "Get your employees productive in days.",
  },
  {
    id: 2,
    imageSource: cardillustration3,
    featureTitle: "File Visualization",
    description: "Preview project files instantly—no downloads needed!",
  },
];

const CardBlock = ({
  imageSource,
  featureTitle,
  description,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out cursor-pointer 
        ${isSelected ? "scale-110 backdrop-blur-xs shadow-lg" : "   scale-90 "}`}
      onClick={onClick}
    >
      <AdminNewDashboardCard
        imageSource={imageSource}
        featureTitle={featureTitle}
        description={description}
      />
    </div>
  );
};

const DashboardAdminNewView = () => {
  const [cards, setCards] = useState(initialCards);

  const handleCardClick = (clickedId) => {
    if (cards[1].id === clickedId) return; // Do nothing if center is clicked

    setCards((prevCards) => {
      if (prevCards[0].id === clickedId) {
        return [prevCards[1], prevCards[0], prevCards[2]]; // Left -> Center, Center -> Right, Right -> Left
      } else {
        return [prevCards[0], prevCards[2], prevCards[1]]; // Right -> Center, Center -> Left, Left -> Right
      }
    });              
  };

  return (
    <div className="flex flex-col p-10">
      <Nav />
      <div className="mt-[200px] relative flex justify-center items-center w-full h-[300px] space-x-6">
        {cards.map((card, index) => {
          const positionClass =
            index === 0
              ? "transform translate-x-1/4 scale-90 z-0"
              : index === 1
              ? "transform  translate-y-1 scale-110 z-10"
              : "transform -translate-x-1/4 scale-90 z-0 ";

          return (
            <div
              key={card.id}
              className={`transition-all duration-500 ease-in-out ${positionClass}`}
            >
              <CardBlock
                {...card}
                onClick={() => handleCardClick(card.id)}
                isSelected={index === 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardAdminNewView;
