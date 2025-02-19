import {Line} from "rc-progress"


const ProgressTracker = () => {
  const paths = [{value:75,img:"/Ellipse 7.png",color:"#530DF6"},{value:65,img:"/Ellipse 10.png",color:"rgba(246,150,54,1)"},{value:25,img:"/Ellipse 9.png",color:"#530DF6"},{value:65,img:"/Ellipse 10.png",color:"rgba(246,150,54,1)"}]
  return (
    <div className="">
     <h1 className="flex flex-start place-items-start second-text">Onbaording Progression</h1>
     <div className="relative custom-scrollbar h-[200px] w-[500px] box-border p-4">
     <div className="absolute inset-0 pointer-events-none border-4 border-transparent bg-gradient-to-b-from-transparent to-white"></div>

    <div className="h-full px-4 pb-10 overflow-y-scroll custom-scrollbar">
    {paths.map((p,index) => 
          <>
          <div key={index} className="flex flex-row mt-5">
               <div className="">
                 <img className="w-8" src={p.img} alt="" />
               </div> 
               <div className="ml-5">
                 <p className="text-start">John doe {p.value}%</p>
                 <div className="w-70">
                 <Line percent={p.value} strokeLinecap="butt" trailColor="#F5F5F5" trailWidth={6} strokeWidth={6} strokeColor={p.color} className="tracker"/>
                 </div>
               </div>
            </div>
          </>
      )}
    </div>


     </div>
    </div>
  )
}

export default ProgressTracker
