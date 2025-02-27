/* eslint-disable react-hooks/exhaustive-deps */
 
import { useEffect, useState } from "react";
import {motion} from "framer-motion"
import { useGlobalVariables } from "../../../context/global";
import WizardCardComplete from "../../../component/wizardCard/wizardCardComplete";
 

const MeetTeamPhase = () => {
     const {meetTheTeamConfigData,setMeetTheTeamConfigData} = useGlobalVariables() // get the wizaad data if it had it

   
     const defaultText = "Enter the wellcome message..."
     const [text,setText] = useState(defaultText)


     const [members,setMembers] = useState([{
          username:"Jordan",
          email:"j@email.com",
          access:"admin",
          password:"pass",
          image:"/guide-top.jpg"
     }])



  
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
          password:"",
          image:""
     })
     

 

  
   

  

     return (
          <div className="flex flex-auto items-start flex-col place-items-center p-[20px]">
            
 
               <h1 className="text-2xl bg-transparent w-[900px] mb-5">Welcome from the Team</h1>
                
              
               <div className="text-left">
                    <h1 className="self-start cursor-pointer">Team Members</h1>
                     
                    <div className="flex flex-auto flex-row justify-between mt-2 relative">
                         {members.map((m)=>{
                                                         
                           return <>
                           {m?.image != null ? (  <div key={m.username+m.email+m.password} className={`mr-2 rounded-full h-[50px] shadow w-[50px] cursor-pointer`} style={{backgroundImage:`url(${m.image})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}>
                                
                         </div>):                         ( <div key={m.username+m.email+m.password} className="mr-2 rounded-full shadow bg-white h-[50px] w-[50px] flex justify-center cursor-pointer items-center">
                         <p className="font-medium uppercase text-center text-sm">{m?.username?.slice(0,1)}</p>
                    </div>)}
                           </>
                         }
                     
                          )}
 

                        
                    </div>
               </div>



                    <div className="relative h-[300px] w-[500px] flex justify-center flex flex-auto flex-row items-center self-center">
                    {cards.map((card,index) =>{
                         const position = getCardPosition(index)
                         return(
                              <motion.div key={card.heading}
                              initial={false}
                              className={`absolute cursor-pointer ${position ==='center'?'z-10':'z-0'} ${position ==='left'?'h-64 w-64':'h-72 w-72'}`}
                              animate={{
                                   x:position==='left'?-300:position==="right"?300:0,
                                   scale:position === 'center'?1:0.9,
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
                                   <WizardCardComplete ids={card.ids} key={card.text} stepsId={card.stepsId} numberOfSteps={card.numberOfSteps}  img={card.img} heading={card.heading} text={card.text} subcards={card.subcard}/>
                              </motion.div>
                         )
                    })}
                    </div>



                 
 
          </div>
     )
}

export default MeetTeamPhase;