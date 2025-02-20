// import {Line} from "rc-progress"
import "./style.css"

const ProgressTracker = () => {
  const paths = [{value:75,img:"/Ellipse 7.png",color:"#530DF6"},{value:65,img:"/Ellipse 10.png",color:"rgba(246,150,54,1)"},{value:25,img:"/Ellipse 9.png",color:"#530DF6"},{value:65,img:"/Ellipse 10.png",color:"rgba(246,150,54,1)"}]
  return (
    <div className="">
     <h1 className="flex flex-start place-items-start mt-10 main-text">Onbaording Progression</h1>
     <div className="custom-scrollbar">
      {paths.map((p,index) => 
          <>
          <div key={index} className="flex flex-row mt-5">
               <div className="">
                 <img className="w-10" src={p.img} alt="" />
               </div> 
               <div className="ml-5">
                 <p className="text-start">John doe {p.value}%</p>
                 <div className="w-80">
                 <Line percent={p.value} strokeLinecap="butt" trailColor="#F5F5F5" trailWidth={6} strokeWidth={6} strokeColor={p.color} className="tracker"/>
                 </div>
               </div>
            </div>
          </>
      )}

     </div>
    </div>
  )
}

export default ProgressTracker
