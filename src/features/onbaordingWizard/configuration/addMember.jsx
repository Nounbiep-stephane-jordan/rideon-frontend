
import "./style.css"
const AddMember = () => {
     return (
          <div className="h-90 w-80 shadow p-5">
          <div className="flex flex-col items-start place-items-start  ">
               <div className="flex flex-col items-start mb-5"> 
                    <span className="">User Name </span>
                    <input className="input-config w-70" type="text" />
               </div>
               <div className="flex flex-col items-start mb-5"> 
                    <span>Email</span>
                    <input className="input-config w-70" type="text" />
               </div>
               <div className="flex flex-col items-start mb-5"> 
                    <span>Acess level</span>
                    <div className="flex flex-initial flex-row items-center justify-between mt-2">
                         <button className="w-30 p-2 blue-bg text-white mr-5 cursor-pointer">Manager</button>
                         <button className="w-30 p-2 gray-bg  text-white cursor-pointer">User</button>
                    </div>
               </div>

               <div className="flex flex-col items-start mb-5"> 
                    <span>Password</span>
                    <input className="input-config w-70 shadow" type="text" />
               </div>
          </div>
          </div>
     )
}


export default AddMember;