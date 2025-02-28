/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalVariables } from "../context/global"
import API from "../api/api"
import wizardbtn from "../assets/wizard-btn.svg"

const RegisterScreen = () => {
     const {logIn,showLoader,hideLoader} = useGlobalVariables()
     const navigate = useNavigate()
     const [activeSubsccription,setActiveSubscription] = useState("")
     const [data,setData] = useState({
          name:"",
          industry:"",
          password:"",
          email:"",
          subscriptionType:""
     })
     
     const [error,setError] = useState(null)
     const {setSelectedIcon} = useGlobalVariables()
     useEffect(()=>{
          //by default there should be no active icon here
          setSelectedIcon("")
     },[])


     const submitData = async() => {
          if(data.email =="" || data.password == "" || data.industry == "" || data.name =="" ||data.subscriptionType == "") {
               setError("No empty inputs allowed. please fill in the form")
               return
          }

         showLoader()
         await API.post('/register',{enterprise:data}).then((res) => {
               console.log("resposne after register",res)
               logIn(res.data.user)
               setSelectedIcon("home")
               navigate("/new")
          }).catch((err) => {
               console.log(err.response.data.error,err.message,"an erroroccured")
               setError(err?.response?.data?.error || err?.message)
               hideLoader()
          })
     }

     const cards = [
          {heading:"Custom",paragraphs:[{key:"custom-p1",value:"Complete feature. wiht full asisiatnece from the team"},{key:"cusotm-p2",value:"Get to productivity immidiately"}]},
          {heading:"Pro",paragraphs:[{key:"pro-p1",value:"Complete feature. and many more"},{key:"pro-p2",value:"Get to productivity immidiately"}]},
          {heading:"Basic",paragraphs:[{key:"basic-p1",value:"Complete feature."},{key:"basic-p2",value:"Get to productivity immidiately"}]},
     ]

     return (
          <div className="flex flex-col justify-center items-center relative">
               <div className="mt-5 flex flex-col justify-center w-[400px]">
               {error && <p className="text-lg text-red-800 fixed top-10 w-1/2">{error}</p>}
               <h2 className="text-2xl font-semibold mb-2 text-center">Wellcome!</h2>
               <div className="flex flex-col jsutify-between items-center custom-scrollbar h-[400px] p-5">

               <div className="relative w-full">
               <label className="text-xs">Name</label>
               <input onFocus={() => setError(null)} value={data.name} onChange={(e) => setData((prev)=> ({...prev,name:e.target.value}))} type="text" name="n" className="p-2 bg-black/10 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm" />
               </div>

               <div className="relative w-full">
               <label className="text-xs">Industry</label>
               <input onFocus={() => setError(null)} value={data.industry} onChange={(e) => setData((prev)=> ({...prev,industry:e.target.value}))} type="text" name="n" className="p-2 bg-black/10 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm" />
               </div>

          
               <div className="relative w-full">
               <label className="text-xs">Email</label>
               <input onFocus={() => setError(null)} value={data.email} onChange={(e) => setData((prev)=> ({...prev,email:e.target.value}))} type="text" name="n" className="p-2 bg-black/10 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm" />
               </div>

          
               <div className="relative w-full">
               <label className="text-xs">password</label>
               <input onFocus={() => setError(null)} value={data.password} onChange={(e) => setData((prev)=> ({...prev,password:e.target.value}))} type="text" name="n" className="p-2 mb-2 bg-black/10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm" />
               </div>

                <div className="self-start">
                    <label>Subscription type</label>
                    <div className="flex flex-row justify-between items-center relative">
                    {
                     cards.map((card) => (
                         <div key={card.heading} onClick={()=>{
                              setActiveSubscription(card.heading)
                              setData((prev)=>({...prev,subscriptionType:card.heading}))
                         }} className={`${activeSubsccription == card.heading? "border-blue":"border-[#F5F5F5]"} z-[50] solid border-5 bg-white rounded-lg h-50 w-50 cursor-pointer p-5 mb-2`}>
                              <h1 className="font-semibold">{card.heading}</h1>
                              {card.paragraphs.map((p) => (
                                <p key={p.key} className="text-left text-xs mb-2">{p.value}</p>
                              ))}
                              <p className="text-[#530DF6] font-semibold mb-2">Ride on</p>
                         </div>
                     ))    
                    }


                    </div>
                    
                </div>
                
                
               </div>
               <img alt="button" className="w-10 self-center mt-5 mb-5 cursor-pointer" src={wizardbtn} onClick={() => submitData()}/>
               <p className="text-sm cursor-pointer fixed bottom-10">Login instead <span className="underline" onClick={()=> navigate("/login")}>GO</span></p>
               </div>

               <img alt="ilustration-register" className="w-80 self-start fixed" src="./illustration-register.jpg" />
          </div>
     )
}


export default RegisterScreen