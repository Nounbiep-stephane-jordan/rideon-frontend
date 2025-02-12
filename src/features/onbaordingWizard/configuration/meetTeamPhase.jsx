
import { useState } from "react";
import AddMember from "./addMember";
import "./style.css"
import WizardCard from "../../../component/wizardCard/wizardCard";
const MeetTeamPhase = () => {
     const [shouldShow,setShouldShow] = useState(false)
     const [text,setText] = useState(null)
     const createForm = () => {
          setShouldShow(!shouldShow)
     }

     const getText = (event) => {
          console.log(event.target.innerText,event.target.innerText.length)
          if(event.target.innerText.length === 1 || event.target.innerText.length < 1) {
               setText(null)
          } else {
               setText(event.target.innerText)
          }
          
         
     }

     return (
          <div className="flex flex-auto items-start flex-col place-items-center">
               <h1 contentEditable suppressContentEditableWarning onChange={getText} className="heading-config">{text == null?"Enter the wellcome message...":text}</h1>
               <div className="mt-5">
                    <h1 className="self-start cursor-pointer">Add Team Members</h1>
                    <div className="flex flex-auto flex-row justify-between mt-5 relative">
                         <div className="rounded-full gray-bg h-15 w-15 flex justify-center cursor-pointer" onClick={() => createForm()}>
                              <img className="w-8 items-center self-center" src="/person-orange.png" alt="person image"/>
                         </div>

                        {shouldShow ? <div className="custom-position-add-form absolute"><AddMember/></div> : null}
                    </div>
               </div>

               <div className="mt-5 flex flex-auto flex-row justify-evenly items-center self-center">
                    <div className="mr-5">
                    <WizardCard img={"/stakeholders.jpg"} heading="Stake holders" text="briefly descibe the stake holders..."/>
                    </div>
                    <div className="mr-5">
                    <WizardCard img={"/projectgoal.jpg"} heading="Project goals" text="briefly describe the project goals..."/>
                    </div>
                    <div>
                    <WizardCard img={"/problemsolving.jpg"} heading="What problem it solves" text="briefly describe what problem it solves..."/>
                    </div>
               </div>
          </div>
     )
}

export default MeetTeamPhase;