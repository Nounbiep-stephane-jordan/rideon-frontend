 

 
import {useState, useEffect} from "react"
import search from "../../assets/search.svg"
import message from "../../assets/message.svg"
import ops from "../../assets/oops.webp"
import {motion} from "framer-motion"
import API from "../../api/api"
import { useGlobalVariables } from "../../context/global"
const Faq = () => {
  const {activeProject} = useGlobalVariables()
  const [active, setActive] = useState(null)
  const options = ['Environment setup', 'Common issues', 'Api']
  const [answers] = useState([
    {keyword: "API", question: "Where are end points found", answer: "The api are located in the route folder but has recently been moved to the protected route folder."},
    {keyword: "API", question: "Where is the of the user controller", answer: "The api are located in the user route folder but has recently been moved to the protected route folder."},
    {keyword: "Environment setup", question: "How to set up development environment", answer: "To set up the development environment, first install Node.js and then run npm install."},
    {keyword: "Common issues", question: "Fixing dependency errors", answer: "Dependency errors can usually be resolved by deleting node_modules and package-lock.json, then running npm install again."}
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [noresult, setNoresult] = useState(false)

  const [showQuestionModal,setShowQuestionModal] = useState(false)

  const handleSearch = (text) => {
    setSearchTerm(text.toLowerCase())
  }

  const handleCategoryChange = (value) => {
    setActive(value === active ? null : value) // Toggle category selection
  }

  // Filter answers based on active category and search term
  const filteredAnswers = answers.filter((an) => {
    // Filter by category if one is selected
    const categoryMatch = active ? an.keyword.toLowerCase().includes(active.toLowerCase()) : true
    
    // Filter by search term if one exists
    const searchMatch = searchTerm 
      ? (an.keyword.toLowerCase().includes(searchTerm) || 
         an.question.toLowerCase().includes(searchTerm) ||
         an.answer.toLowerCase().includes(searchTerm))
      : true
    
    return categoryMatch && searchMatch
  })

  // Update noresult state whenever filters change
  useEffect(() => {
    // Show no results if:
    // 1. We have an active category or search term (user has tried to filter)
    // AND
    // 2. There are no matching results
    const shouldShowNoResults = (active || searchTerm) && filteredAnswers.length === 0
    setNoresult(shouldShowNoResults)
  }, [filteredAnswers, active, searchTerm])
  

  const [activeQuestionCat,setActiveQuestionCat] = useState("Common issues")

  let user = JSON.parse(localStorage.getItem("user"))
  const saveQuestion = async() => {
    if(!activeProject?.id) return
    let data = {
      keyword:activeQuestionCat,
      question:searchTerm,
      answer:[],
      project_id:activeProject?.id,
      user_id:user.id,
      user_role:user.role
    }

    API.post("/save-question",data).then((res) => {
      console.log(res)
    }).catch(err => {
      console.log(err,"in save qeusiton")
    })
  }


  return (
    <div className="p-5">

          {showQuestionModal ?     <div> 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-[9999999] inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            >
        
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-sm p-6 w-full max-w-lg"
              >
                <div className="flex flex-col items-center justify-between">
                  <div className="self-center">
                  <h1 className="text-2xl">Ask your question.</h1>
                  </div>
                  <textarea  className="bg-[#F7F7F7] p-5 w-full mt-5 mb-5" placeholder="your question in here">
                  
                   </textarea>
                   <div className="flex items-center jusitfy-between">{options.map((op) => <div onClick={() => setActiveQuestionCat(op)} key={op+1} className={`py-2 px-2 ${activeQuestionCat == op? 'text-white bg-[#530DF6]':'text-black bg-[#F7F7F7]}'}`}>{op}</div>)}</div>
                   <div className="flex items-center justify-center mt-5">
                       <button onClick={() => setShowQuestionModal(false)} className="cursor-pointer bg-[#8EFF2C] px-5 py-2 shadow text-white font-semibold">Ok</button>
                   </div>
                </div>
        
              </motion.div>
            </motion.div>
        </div>:null}

      <h2 className="text-2xl">{`Frequently asked questions for project ${activeProject?.name}`}</h2>
      <div className="grid gap-5 grid-cols-3 justify-between content-center bg-white items-center shadow-lg w-1/2 mt-5 mb-5"> 
        {options.map((op) => (
          <div 
            key={op} 
            onClick={() => handleCategoryChange(op)}  
            className={`items-center justify-center py-5 pl-5 text-center cursor-pointer font-semibold ${active === op ? 'bg-[#530DF6] text-white' : "text-black bg-white"}`}
          >
            <h1>{op}</h1>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between items-center">
        <input 
          onChange={(e) => handleSearch(e.target.value)} 
          value={searchTerm}
          className="mt-5 rounded-lg pl-3 py-2 bg-white outline-2 outline-gray-500 w-80" 
          placeholder="Search" 
          type="text" 
          name="search"
        />

        <div className="cursor-pointer bg-[#530DF6] rounded-full h-[50px] w-[50px] flex items-center justify-center">
          <img src={message} className="h-5 w-5" alt="message icon"/>
        </div>
      </div>

      {noresult ? (
        <div className="flex items-center justify-center relative mb-5">
          <img src={ops} className="h-[500px]" alt="no results found"/>
          <button onClick={() => setShowQuestionModal(true)} className="absolute cursor-pointer self-center bottom-20  w-[120px] rounded-sm h-[50px] rounded font-bold text-white bg-[#8EFF2C]">Ask</button>
        </div>
      ) : (
        <div className="outline-2 outline-[#530DF6] mt-5 w-full h-[400px] cursor-pointer overflow-y-auto">
          {filteredAnswers.map((an) => (
            <div key={`${an.question}-${an.keyword}`} className="p-5">
              <h3 className="font-bold text-black">{an.question}</h3>
              <p className="ml-5 mt-5">{an.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Faq