/* eslint-disable react-hooks/exhaustive-deps */
 
import { useEffect, useState } from "react";
import AddMember from "./addMember";
import {motion} from "framer-motion"
import "./style.css"
import WizardCard from "../../../component/wizardCard/wizardCard";
import { MaxLength, MAXMEMBERS } from "../../../utils/constants";
import { useGlobalVariables } from "../../../context/global";
 

const MeetTeamPhaseConfig = () => {
     const {meetTheTeamConfigData,setMeetTheTeamConfigData} = useGlobalVariables() // get the wizaad data if it had it
     const [shouldShow,setShouldShow] = useState(false)
     const defaultText = "Enter the wellcome message..."
     const [text,setText] = useState(meetTheTeamConfigData.text || defaultText)
     const [error,setError] = useState(null)
     const [memberLengthError,setMembersLengthError] = useState(null)
     const [members,setMembers] = useState(meetTheTeamConfigData.members||[])

   useEffect(()=> {
     setMeetTheTeamConfigData((prev)=>({
         ...prev,text,members
     }))
      
   },[text,members])

     const cards = [
     {img:"/projectgoal.jpg",stepsId:[{index:"projectgoal1",barIndex:"projectgoal1bar"},{index:"projectgoal2",barIndex:"projectgoal2bar"}],text:"briefly describe the project goals...",heading:"Project goals",numberOfSteps:2,ids:["stepgoal1","stepgoal2"],subcard:[{img:"/projectgoal.jpg",text:"briefly describe the project goals...",heading:"Project goals",},{img:"/projectimpact.jpg",text:"briefly describe the project impact...",heading:"Project impact",}]},
     {img:"/stakeholders.jpg",stepsId:[{index:"stakeholders1",barIndex:"stakeholders1bar"}],text:"briefly descibe the stake holders...",heading:"Stake holders",numberOfSteps:1,ids:["stepstake"]},
     {img:"/problemsolving.jpg",stepsId:[{index:"problemsolving1",barIndex:"problemsolving1bar"}],text:"briefly describe what problem it solves...",heading:"What problem it solves",numberOfSteps:1,ids:["stepprob"]}
    ]
     const [activeIndex,setActiveIndex] = useState(0)
     const getCardPosition = (index) => {
          if(index === activeIndex) return "center"
          if(index === (activeIndex+1)%3) return "right"
          return "left"
     }

     const [formdata,setFormData] = useState({
          username:"",
          email:"",
          access:"",
          password:""
     })
     

     const createForm = () => {
          setShouldShow(!shouldShow)
     }

     const getText = (value) => {
          if(value.length>MaxLength) {
              setError(`max length of words excited please reduced the letter count to ${MaxLength}`) 
              setTimeout(()=> setError(null),3000)
          }  else setText(value)    
     }
     const handleBlur = () => {
          if(text.trim() === "") setText(()=>defaultText)
          
     }

     const handleFocus = () => {
          if(text==defaultText) setText(() => '')
           setError(null)
     }

     return (
          <div className="flex flex-auto items-start flex-col place-items-center p-[20px]">
               {error ? <p className="text-red-700">{error}</p>: null}
               <motion.div 
              
               >
               <textarea
               value={text}
               onChange={(e) => getText(e.target.value)}
               onFocus={handleFocus}
               onBlur={handleBlur}
                
               className="heading-config bg-transparent focus:outline-none resize-none w-[900px]"
               />
               </motion.div>
              
               <div className="text-left">
                    <h1 className="self-start cursor-pointer">Add Team Members</h1>
                    {memberLengthError ? <p className="text-red-700">{`The number of members should not exceed a maximum of ${MAXMEMBERS}`}</p>:null}
                    <div className="flex flex-auto flex-row justify-between mt-2 relative">
                         {members.map((m)=>(
                          
                          <div key={m.username+m.email+m.password} className="mr-2 rounded-full gray-bg h-[50px] w-[50px] flex justify-center cursor-pointer items-center">
                               <p className="font-medium uppercase text-center text-sm">{m?.username?.slice(0,1)}</p>
                          </div>
                     
                          ))}
                         <div className="rounded-full gray-bg h-[50px] w-[50px] flex justify-center cursor-pointer" onClick={() => createForm()}>
                              <img className="w-[20px] items-center self-center" src="/person-orange.png" alt="person image"/>
                         </div>

                        {shouldShow ? <div className="custom-position-add-form absolute"><AddMember setError={setError} setMembersLengthError={setMembersLengthError} formdata={formdata} members={members} setMembers={setMembers} setFormData={setFormData} setShouldShow={setShouldShow}/></div> : null}
                    </div>
               </div>



                    <div className="relative h-[300px] w-[500px] flex justify-center flex flex-auto flex-row items-center self-center">
                    {cards.map((card,index) =>{
                         const position = getCardPosition(index)
                         return(
                              <motion.div key={card.heading}
                              layout
                              className={`absolute cursor-pointer ${position ==='center'?'z-10':'z-0'} ${position ==='left'?'h-64 w-64':'h-72 w-72'}`}
                              initial={false}
                              animate={{
                                   x:position==='left'?-300:position==="right"?300:0,
                                   scale:position === 'center'?1:0.9,
                                   rotate:position === "left" ? -5:position === "right"?5:0,
                                   rotateY:position === "left" ? 20:position === "right"?-20:0,
                                   filter:position==='center'?'none':'blur(1px)',
                                   opacity:position=== 'center' ? 1:0.8
                              }}
                              transition={{
                                   type:"spring",
                                   stiffness:260,
                                   damping:20
                              }}

                              onClick={()=>setActiveIndex(index)}
                              >
                                   <WizardCard ids={card.ids} key={card.text} stepsId={card.stepsId} numberOfSteps={card.numberOfSteps}  img={card.img} heading={card.heading} text={card.text} subcards={card.subcard}/>
                              </motion.div>
                         )
                    })}
                    </div>



                 
 
          </div>
     )
}

export default MeetTeamPhaseConfig;