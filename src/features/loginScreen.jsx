/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useGlobalVariables } from "../context/global"
import circleUp from "../assets/circle-up.svg"
import circleDown from "../assets/circle-down.svg"
import wizardbtn from "../assets/wizard-btn.svg"
import illustration from "../assets/computer_Ride_on.jpg"
import API from "../api/api"
import {useNavigate} from "react-router-dom"
 

const LoginScreen = () => {
     const navigate = useNavigate()
     const [email,setEmail] = useState("")
     const [password,setPassword] = useState("")
     const [error,setError] = useState(null)
     const {setSelectedIcon,setUser,logIn,showLoader,hideLoader} = useGlobalVariables()
     useEffect(()=>{
          //by default there should be no active icon here
          setSelectedIcon("")
     },[])

     const submitData = async() => {
          showLoader()
         await API.post('/login',{email,password}).then((res) => {
               console.log("resposne after login",res)
               setSelectedIcon("home")
               logIn(res.data.user)
               setUser(res.data.user)
               navigate("/")
          }).catch((err) => {
               console.log(err,"an erroroccured")
               hideLoader()
               setError(err?.response?.data?.error || err?.message)
          })
     }

     return (
          <div className="flex flex-col justify-center items-center relative">
               <img alt="circle up" className="w-50 fixed top-0 self-end" src={circleUp}/>
               <div className="top-30 absolute flex flex-col justify-center">
               {error && <p className="text-lg text-red-800">{error}</p>}
               <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back!</h2>
               <div className="flex flex-col jsutify-between items-center">
                
               <div className="relative w-[300px] ">
               <label className="text-xs">Email</label>
               <input onFocus={() => setError(null)} value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="n" className="p-2 bg-black/10 mb-5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm" />
               </div>

               <div className="relative w-[300px]">
               <label className="text-xs">Password</label>
               <input onFocus={() => setError(null)} value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="n" className="p-2 bg-black/10 mb-5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm" />
               </div>
               
               
               </div>
               <img alt="button" className="w-10 self-center mt-5 mb-5 cursor-pointer" src={wizardbtn} onClick={() => submitData()}/>
               <p className="text-sm cursor-pointer">Register instead <span className="underline" onClick={()=> navigate("/register")}>GO</span></p>
               </div>
               <img alt="ilsutraiton" className="z-[999] w-70 fixed bottom-10 right-40 self-end" src={illustration}/>
               <img alt="circle down" className="w-50 fixed bottom-0 self-start" src={circleDown}/>

          </div>
     )
}


export default LoginScreen