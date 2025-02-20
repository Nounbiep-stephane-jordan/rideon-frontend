/* eslint-disable react/prop-types */
 
import OrangeExclamation from "../../assets/orange-exclamation.png"
import { useState } from "react"

const ProjectCard = ({name,isSelected,handleCardClick,p,isFullySetup}) => {

const options = ["Start wizard","Edit wizard","File visual..","Faq","Delete"]
const [isClicked,setIsclicked] = useState(false)


  return <>
      <div className="flex-col w-40">
        <div className="orange-shadow relative" onClick={() => {
          setIsclicked(false)
          handleCardClick(p)
        }}>
        <img className="" src="/card.jpg"alt="card-img"/>
        {isFullySetup ? null :<img alt="exclamation" src={OrangeExclamation} className="w-7 absolute top-[5px] right-[0px]"/>}
        </div>
      <div className="flex items-center place-content-start">
        <p className="">{name}</p>
        <img className="w-6 cursor-pointer"  src="button2.png" alt="icon plus" onClick={()=> {
          setIsclicked(!isClicked)
        }}/>
      </div>


      {isClicked === true && isSelected === true ? 
      <div className={`z-[99999] top-[1px] left-[120px] absolute w-[150px] h-[100px] blue-bg blue-shadow p-[10px] rounded-sm`}>
                    {options.map((val) => (
                         <p key={val} className="text-white text-[10px] text-left mb-[2px] cursor-pointer hover:text-[15px] transition duration-300">{val}</p>
                    ))}
      </div>
      
     :null}
    </div>
  </>
  
}

export default ProjectCard
