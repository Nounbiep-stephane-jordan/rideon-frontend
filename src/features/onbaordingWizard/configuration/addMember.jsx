/* eslint-disable react/prop-types */

import { useState } from "react";
import "../style.css"
import { MAXMEMBERS } from "../../../utils/constants";




 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AddMember = ({editingIndex,isEditingMember,setIsEditingMember,formdata,setError,members,setMembers,setFormData,setShouldShow,setMembersLengthError}) => {
     const [acessLevel,setAcessLevel] = useState("")

     const handleSave  = () => {
          console.log(formdata)
     if(formdata.username == "" || formdata.email == "" ||formdata.access ==="" || formdata.password === "") {
          setError("Please fill in the form")
          setTimeout(()=>setError(null),3000)
          return
     } 

     if(!emailRegex.test(formdata.email)){
          setError("Please enter a valid email address")
          setTimeout(()=>setError(null),3000)
          return
     }
     
     if(isEditingMember) {
          const updatedMembers = [...members]
          updatedMembers[editingIndex] = formdata
          setMembers(updatedMembers)
     } else {
          if(members.length>=MAXMEMBERS) {
               setMembersLengthError(true)
               return
          } 
          setMembers([...members,formdata])
     }
     

     setFormData({
          username:"",
          email:"",
          access:"",
          password:""
     })
     setShouldShow(false)
     setIsEditingMember(false)
     
  

     }

     const cancelSave = () => {
          setFormData({
               username:"",
               email:"",
               access:"",
               password:""
          })
          setShouldShow(false)
          setMembersLengthError(null)

     }

     return (
          <div className="h-90 w-80 shadow p-5">
          <div className="flex flex-col items-start place-items-start  ">
               <div className="flex flex-col items-start mb-2"> 
                    <span className="">User Name </span>
                    <input value={formdata.username} className="input-config w-70" type="text"   onChange={(e) => setFormData({...formdata,username:e.target.value})} />
               </div>
               <div className="flex flex-col items-start mb-2"> 
                    <span>Email</span>
                    <input value={formdata.email} className="input-config w-70" type="email"  onChange={(e) => setFormData({...formdata,email:e.target.value})} />
               </div>
               <div className="flex flex-col items-start mb-2"> 
                    <span>Acess level</span>
                    <div className="flex flex-initial flex-row items-center justify-between mt-2">
                         <button className={`${acessLevel=="admin"?"blue-bg":"gray-bg"} w-30 p-2 text-white mr-5 cursor-pointer`} onClick={() =>{
                              setFormData({...formdata,access:"admin"})
                              setAcessLevel("admin")
                              }}>Manager</button>
                         <button className={`${acessLevel=="member"?"blue-bg":"gray-bg"} w-30 p-2 text-white cursor-pointer`} onClick={() =>{
                              setFormData({...formdata,access:"member"})
                              setAcessLevel("member")
                         }}>User</button>
                    </div>
               </div>

               <div className="flex flex-col items-start mb-2"> 
                    <span>Password</span>
                    <input value={formdata.password} className="input-config w-70 shadow" type="text" onChange={(e) => setFormData({...formdata,password:e.target.value})}/>
               </div>
          </div>

          <div className="flex flex-row justify-between items-center">
          <button className="cursor-pointer p-[10px] m-2 bg-[#530DF6] text-sm text-white" onClick={()=> handleSave()} >Save</button>
          <button className="cursor-pointer p-[10px] m-2 bg-[#FA1818] text-sm text-white" onClick={()=> cancelSave()} >Cancel</button>
          </div>
          </div>
     )
}


export default AddMember;