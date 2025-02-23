/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AdminNewDashboardCard from "../component/adminNewDashboardCard.jsx";
import { motion } from "framer-motion";
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
    <motion.div
      className={`transition-all duration-500 ease-in-out cursor-pointer 
        ${isSelected ? "scale-110 backdrop-blur-xs shadow-lg" : "scale-90 "}`}
      onClick={onClick}
      whileHover={{scale: 1.1}}
    >
      <AdminNewDashboardCard
        imageSource={imageSource}
        featureTitle={featureTitle}
        description={description}
        route={route}
      />
    </motion.div>
  );
};

const DashboardAdminNewView = () => {
  const [cards, setCards] = useState(initialCards);
  
const handleCardClick = (clickedId) => {
    if (cards[1].id === clickedId) return; // Do nothing if center is clicked

    setCards((prevCards) => {
      if (prevCards[0].id === clickedId) {
        return [prevCards[2], prevCards[0], prevCards[1]]; // Left -> Center, Center -> Right, Right -> Left
      } else {
        return [prevCards[1], prevCards[2], prevCards[0]]; // Right -> Center, Center -> Left, Left -> Right
      }
    });              
  };

  useEffect(()=> {
    //when user reaches here meaning hewas new. we need to tell teh backend now that he isnt new anymore for net time he is directed to the dashboard
    async function fetchData(){
      let user = JSON.parse(localStorage.getItem("user"))
      console.log("in here",user)
      await API.post("/user-status",{user}).then((res) => {
        console.log(res,"in admin new dhasboard")
        user.is_new = res.data.user.is_new
        localStorage.setItem("user",JSON.stringify(user))
      }).catch((err) => {
        console.log(err,"aneeroro occured")
      })
    }

    fetchData()

  },[])

  
  return (
    <div className="flex justify-center items-center h-screen relative">
      {cards.map((card, index) => {
        const variants = {
          initial: {
            opacity: 0,
            scale: 0.5,
          },
          animate: {
            opacity: 1,
            scale: index === 1 ? 1.1 : 0.9,
            x: index === 0 ? -300 : index === 2 ? 300 : 0,
            y: index === 1 ? -40 : 0,
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
            key={card.id}
            className="absolute"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
          >
            <CardBlock
              {...card}
              onClick={() => handleCardClick(card.id)}
              isSelected={index === 1}
            />
          </motion.div>
        );
      })}
    </div>
  );

};

export default DashboardAdminNewView;
