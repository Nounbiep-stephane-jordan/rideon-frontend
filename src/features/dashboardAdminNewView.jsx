/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AdminNewDashboardCard from "../component/adminNewDashboardCard.jsx";

import cardillustration1 from "../assets/img/adminNewDashboardIllustration1.svg";
import cardillustration2 from "../assets/img/adminNewDashboardIllustration2.svg";
import cardillustration3 from "../assets/img/adminNewDashboardIllustration3.svg";
import API from "../api/api.js";

const initialCards = [
  {
    id: 0,
    imageSource: cardillustration1,
    featureTitle: "Frequently asked questions",
    description: "Boost productivity by avoiding frequent interruptions.",
    route:"/faq"
  },
  {
    id: 1,
    imageSource: cardillustration2,
    featureTitle: "Onboarding Wizard",
    description: "Get your employees productive in days.",
    route:"/wizard-config-1"

  },
  {
    id: 2,
    imageSource: cardillustration3,
    featureTitle: "File Visualization",
    description: "Preview project files instantly—no downloads needed!",
    route:"/file-vizualisation"

  },
];

const CardBlock = ({
  route,
  imageSource,
  featureTitle,
  description,
  onClick,
  isSelected,
}) => {

  return (
    <div
      className={`transition-all duration-500 ease-in-out cursor-pointer 
        ${isSelected ? "scale-110 backdrop-blur-xs shadow-lg" : "scale-90 "}`}
      onClick={onClick}
    >
      <AdminNewDashboardCard
        imageSource={imageSource}
        featureTitle={featureTitle}
        description={description}
        route={route}
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

  useEffect(()=> {
    //when user reaches here meaning hewas new. we need to tell teh backend now that he isnt new anymore for net time he is directed to the dashboard
    let user = JSON.parse(localStorage.getItem("user"))
    API.post("/user-status",{user}).then((res) => {
      console.log(res,"in admin new dhasboard")
      user.is_new = res.data.user.is_new
      localStorage.setItem("user",JSON.stringify(user))
    }).catch((err) => {
      console.log(err,"aneeroro occured")
    })

  },[])

  
  return (
    <div className="flex flex-col p-10">
      <div className="mt-[20px] relative flex justify-center items-center w-full h-[300px] space-x-6">
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
