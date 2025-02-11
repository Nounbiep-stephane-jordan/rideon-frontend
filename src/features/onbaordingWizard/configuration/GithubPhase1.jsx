
import BlueBox from "../../../component/blueBox/blueBox";
import "./style.css"
const GithubPhase1 = () => {

     let content = "This applications uses github as source of data to provode the best onbaording expereice. Enter yourrepository name , and repository owner. If you have any probelm or dont know how to get the ersonal acess token follow this link tutorial....http://linkto.com"
     return (
          <>
     
     <div className="h-80 w-80 blue-shadow-custom relative p-5">

          <div className="github-place absolute rounded-full h-10 w-10 orange-shadow flex place-items-center justify-center items-center">
          <img className="w-8" src="/github-orange.png" alt="github icon"/>
          </div>
          <div className="flex flex-col items-start place-items-start mt-5 ">
               <div className="flex flex-col items-start mb-5"> 
                    <span className="">Repository Owner</span>
                    <input className="input-config w-70" type="text" />
               </div>
               <div className="flex flex-col items-start mb-5"> 
                    <span>Repository name</span>
                    <input className="input-config w-70" type="text" />
               </div>
               <div className="flex flex-col items-start mb-5"> 
                    <span>Personal access token</span>
                    <input className="input-config w-70" type="text" />
               </div>
          </div>
          <div className="cursor-pointer question-mark-place absolute rounded-full h-10 w-10 orange-shadow flex place-items-center justify-center items-center">
          <img className="w-5" src="/blue-question-mark.png" alt="github icon"/>
          <div className="absolute custom-position">
          <BlueBox text={content}/>
          </div>
          </div>
     </div>
          </>
     )
}

export default GithubPhase1;