import Steps from "../steps/steps";
import "./style.css"
// eslint-disable-next-line react/prop-types
const WizardCard = ({img,text,heading}) => {
     return (
          <div className="w-80 h-80 flex flex-auto flex-col custom-wizard-config-shadow p-5">
               <h1 className="text-sm self-start cursor-pointer">{heading}</h1>
               <p className="text-custom-gray text-left text-sm mt-2">{text}</p>
               <div className="cursor-pointer relative mt-2 slef-center place-items-center flex justify-center">
                    <img className="w-40 self-center" src={img} alt="goal image"/>
                    <img className="absolute w-8 custom-blue-plus-position" src="/plus-image-blue.png" alt="blue add image"/>
               </div>

               <div className="flex items-center justify-center place-items-center">
               <Steps/>
               </div>
 
          </div>
     )
}


export default WizardCard;