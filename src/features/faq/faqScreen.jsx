import {useState} from "react"
import search from "../../assets/search.svg"
import message from "../../assets/message.svg"
import ops from "../../assets/oops.webp"


 const Faq = () => {
   const [active,setActive] = useState(null)
   const options = ['Environment setup','Common issues','Api']
   const answers = [
    {keyword:"API",question:"Where are end points found",answer:"The api are located in the route folder but has recently been moved to the protected route folder."},
    {keyword:"API",question:"Where is the of the user controller",answer:"The api are located in the user route folder but has recently been moved to the protected route folder."}
   ]

   const [noresult,setNoresult] = useState("")
   
   return (<div  className="p-5">
     <h2 className="text-2xl ">Frequently asked questions </h2>
     <div className="grid gap-5 grid-cols-3 justify-between content-center bg-white items-center shadow-lg w-1/2 mt-5 mb-5"> 
         {options.map((op) => {
          return  <div key={op} onClick={() => setActive(op)}  className={`items-center justify-center py-5 pl-5 text-center cursor-pointer font-semibold ${active == op ?'bg-[#530DF6] text-white':"text-black bg-white"}`}><h1 >{op}</h1></div>
         })}
     </div>


     <div className="flex flex-row justify-between items-center">
     <input className="mt-5 rounded-lg pl-3 py-2 bg-white outline-2 outline-gray-500 w-80" placeholder="Search" type="text" name="search"/>

     <div className="cursor-pointer bg-[#530DF6] rounded-full h-[50px] w-[50px] flex items-center justify-center">
      <img src={message} className="h-5 w-5"/>
     </div>

     </div>

     {/* <div className="flex items-center justify-center">
     <img src={ops} className="h-[500px]"/>
     <button className="absolute cursor-pointer self-center bottom-10  w-[120px] rounded-sm h-[50px] rounded font-bold text-white bg-[#8EFF2C]">Ask</button>
     </div> */}

     <div  className="outline-2 outline-[#530DF6] mt-5 w-full h-[400px] cursor-pointer">
   
 
      {answers.map((an) => {
        return <div className="p-5">
          <h3 className="font-bold text-black">Where are <span className="text-[#530DF6]">{an.keyword}</span> end points found</h3>
          <p className="ml-5 mt-5">{an.answer}</p>
        </div>
      })}
     </div>
    

</div>)
}

export default Faq



