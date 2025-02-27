/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MaxLength, MAXSMALL } from "../../../utils/constants";
import StepModal from "./installationGuideModal";
import { useGlobalVariables } from "../../../context/global";


const cardVariants = {
  front: {
    y: 0,
    x: 0,
    scale: 1,
    zIndex: 10,
    transition: {type:"spring",stiffness:300,damping:20}
  },
  back: {
    y: 60,
    x: 40,
    scale: 0.9,
    opacity:0.8,
    zIndex: 0,
    transition: {type:"spring",stiffness:300,damping:20}

  }
};

const backCardVariants = {
  front: {
    rotateX: -30,
    y: -40,
    scale: 0.9,
    zIndex: 5,
    opacity:1,
    transition: {type:"spring",stiffness:300,damping:20}

  },
  back: {
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 10,
    transition: {type:"spring",stiffness:300,damping:20}

  }
};


const defaultTextOS = [
  {window:"Enter a brief description of the instalation guides for windows"},
  {ios:"Enter a brief description of the instalation guides for ios"},
  {linux:"Enter a brief description of the instalation guides for linux"}
]

const defaultText = {
  projectName:"Enter project name...",
  projectDescription:"Enter the project description in brief..."
}


const InstallationGuideConfig = () => {
     const {installationGuidesConfigData,setInstallationGuidesConfigData} = useGlobalVariables() // get the wizaad data if it had it


     const [isOpen, setIsOpen] = useState(false);
    const [error,setError] = useState(null)
     const [textData,setTextData] = useState( installationGuidesConfigData.textData ||defaultText)

     const [prerequisites,setPrerequisites] = useState(installationGuidesConfigData.prerequisites || [{id:1,key:"",value:""}])
     const [additionalLinks,setAdditionalLinks] = useState(installationGuidesConfigData.additionalLinks || [{id:"add1",value:""}])
     const [activeOS,setActiveOS] = useState("windows")
     const [installationGuidesOsText,setInstallationGuidesOsText] = useState(installationGuidesConfigData.installationGuidesOsText || {
      windows:"",
      ios:"",
      linux:""
 })
     const [credentials,setCredentials] = useState(installationGuidesConfigData.credentials || [{
      id:1,
      title:"",
      pairs:[{id:1,key:"",value:""}]
 }])
 
     const [isFlipped, setIsFlipped] = useState(false);


        useEffect(()=> {
          setInstallationGuidesConfigData((prev)=>({
              ...prev,textData,prerequisites,credentials,installationGuidesOsText,additionalLinks
          }))
           
        },[textData,prerequisites,credentials,installationGuidesOsText,additionalLinks])





     const addPrerequisite= () => {
          if(prerequisites.length === MAXSMALL + 2) {
               setError(`Cannot exceed more than ${MAXSMALL + 2} items`)
               setTimeout(()=>setError(null),2000)
          } else {
               setPrerequisites([...prerequisites,{
                    id:prerequisites.length+1,
                    key:"",
                    value:""
               }])
          }
     }

     const addAditionalLink = () => {
          if(additionalLinks.length >= MAXSMALL + 2 ) {
               setError(`Cannot exceed more than ${MAXSMALL + 2} items`)
               setTimeout(()=>setError(null),2000)
          } else {
               setAdditionalLinks([...additionalLinks,{
                    id:`add${additionalLinks.length+1}`,
                    value:""
               }])
          }
     }

     const addCredentialSection = () => {
          if(credentials.length >= MAXSMALL) {
               setError(`Cannot exceed more than ${MAXSMALL} items`)
               setTimeout(()=>setError(null),2000)
          }else {
               setCredentials([...credentials,{
                    id:credentials.length+1,
                    title:"",
                    pairs:[{id:1,key:"",value:""}]
               }])
          }

     }

     const addCredentialPair = (sectionId) => {
     setCredentials(credentials.map((section)=>{
               if(section.id === sectionId) {

                    if(section.pairs?.length>=MAXSMALL) {
                     setError(`Cannot exceed more than ${MAXSMALL} items`)
                     setTimeout(()=>setError(null),2000)
                     return section
                    } else {
                         return {
                              ...section,
                              pairs:[...section.pairs,{
                                   id:section.pairs.length+1,
                                   key:"",
                                   value:""
                              }]
                         }
                    }

          }

          return section
     }))

     }

     const handleBlur = (field) => {
     setTextData((prev)=>({
          ...prev,[field]:prev[field].trim() === ""?defaultText[field]:prev[field]
     }))
     }

     const handleFocus = (field) => {
          if( textData[field] === defaultText[field]) setTextData((prev) => ({...prev,[field]:""}))

     }


     
     return (
          <div className="p-[20px] flex flex-col justify-between">
              {isOpen ? (
                <StepModal key={"modal-pop-up"} isOpen={isOpen} onClose={() => setIsOpen(false)} />
               ) : null}
               {error && <p className="text-red-700">{error}</p>}
               <textarea
               value={textData.projectName}
               onChange={(e) => {
                    
                    if(e.target.value.length>MaxLength) {
                         setError(`max length of words excited please reduced the letter count to ${MaxLength}`) 
                         setTimeout(()=> setError(null),3000)
                     }else {
                         setTextData((prev) => ({...prev,projectName:e.target.value}))
                     }
                    
                    
               }}
               onFocus={()=>handleFocus("projectName")}
               onBlur={()=>handleBlur("projectName")}
                
               className="heading-config bg-transparent focus:outline-none resize-none w-[900px]"
               />

            <textarea
            value={textData.projectDescription}
               
               onChange={(e) => {
                     
                         if(e.target.value.length>MaxLength) {
                              setError(`max length of words excited please reduced the letter count to ${MaxLength}`) 
                              setTimeout(()=> setError(null),3000)
                          } else {
                              setTextData((prev) => ({...prev,projectDescription:e.target.value}))

                          }
               }}
               onFocus={()=>handleFocus("projectDescription")}
               onBlur={() => handleBlur("projectDescription")}
                
               className="heading-config bg-transparent focus:outline-none resize-none w-[900px]"
               />



          <>
          <div className="align-center justify-evenly flex flex-row">

          <div className="p-[15px] h-[300px] w-[300px] blue-shadow bg-white overflow-x-scroll custom-scrollbar">
               <h1 className="text-left font-medium">Prerequisite</h1>

               <div className="flex flex-row justify-between items-center mt-[2px]">
              
              <div className="flex flex-col justify-evenly items-start ">
              {prerequisites.map((pair, index) => (
                 
                 <div key={pair.id} className="flex flex-row justify-between items-centers mt-[5px]">
                 <div  className="mt-[2px] flex flex-row justify-between items-centers">
                      <input
                        className="text-sm w-1/2 mr-2 p-1 rounded border"
                        placeholder="Property"
                        value={pair.key}
                        onChange={(e) => {
                          const newPairs = [...prerequisites];
                          newPairs[index].key = e.target.value;
                          setPrerequisites(newPairs);
                        }}
                      />
                      <input
                        className="text-sm w-1/2 mr-2 p-1 rounded border"
                        placeholder="Value"
                        value={pair.value}
                        onChange={(e) => {
                          const newPairs = [...prerequisites];
                          newPairs[index].value = e.target.value;
                          setPrerequisites(newPairs);
                        }}
                      />
                    </div>

                    <div className="cursor-pointer self-center">
                    <img onClick={addPrerequisite} className="w-7" alt="plus" src="/icons-plus.png" />
                </div>
                 </div>

                
                  ))}    
              </div>
            

 
               </div>




               <div className="mt-5">
               <h1 className="text-left font-medium">Installation guides</h1>
               <div className="flex flex-row items-center justify-between">
               {Object.keys(installationGuidesOsText).map((os) => (
                    <button
                      key={os}
                      className={`text-[15px] cursor-pointer ${
                        activeOS === os ? "underline" : ""
                      }`}
                      onClick={() => setActiveOS(os)}
                    >
                      {os.charAt(0).toUpperCase() + os.slice(1)}
                    </button>
                  ))}
               </div>
               </div>

 
                <textarea
                  value={installationGuidesOsText[activeOS]}
                  onChange={(e) => setInstallationGuidesOsText({
                    ...installationGuidesOsText,
                    [activeOS]: e.target.value
                  })}
                  placeholder={defaultTextOS[activeOS]}

                  onFocus={() => {
                    if( installationGuidesOsText[activeOS] === defaultTextOS[activeOS]) {
                      setInstallationGuidesOsText((prev)=>({
                              ...prev,[activeOS]:""
                         }))
                    }

                  }}

                  onBlur={() => {
                    setInstallationGuidesOsText((prev)=>({
                         ...prev,[activeOS]:installationGuidesOsText[activeOS].trim() === ""?defaultTextOS[activeOS]:prev[activeOS]
                    }))
                  }}
                  className="p-1 rounded border text-[12px] mt-[5px] text-[#757575] bg-transparent focus:outline-none resize-none w-[250px]"
                />

               <div onClick={() => setIsOpen(true)} className="flex flex-row items-center justify-between">
               <p className="text-[12px]">Add a custom installation guide</p>
               <img alt="plus image " className="w-5 cursor-pointer" src="/icons-plus.png"/>
               </div>



              </div>

      <div className={`relative right-1/20 z-[5]`}>
            <motion.div
            className="absolute left-[20px]"
            variants={cardVariants}
            animate={isFlipped ? "back" : "front"}
            
            >
              
              <div className="p-[15px] h-[300px] w-[300px] blue-shadow bg-white overflow-x-scroll custom-scrollbar">
               <h1 className="text-left font-medium cursor-pointer" onClick={() => !isFlipped && setIsFlipped(true)}>Project credentials</h1>
               <div className="mt-[10px]">
          {/* Credentials Content */}
          {credentials.map((section, sectionIndex) => (
            <div key={`${section?.id}-${sectionIndex}`} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <input
                  className="font-medium p-1 text-sm border rounded h-[25px]"
                  placeholder="Subsection title"
                  value={section?.title}
                  onChange={(e) => {
                    const newSections = [...credentials];
                    newSections[sectionIndex].title = e.target.value;
                    setCredentials(newSections);
                  }}
                />
                <button className="cursor-pointer" onClick={() => addCredentialPair(section?.id)}>
                  <img className="w-5" alt="plus" src="/icons-plus.png" />
                </button>
              </div>
              
              <div className="">
              {section?.pairs.map((pair, pairIndex) => (
                <div key={`${pair.id}-${pairIndex}`} className="flex gap-2 mb-2">
                  <input
                    className="w-full p-1 text-sm border rounded h-[25px]"
                    placeholder="Key"
                    value={pair.key}
                    onChange={(e) => {
                      const newSections = [...credentials];
                      newSections[sectionIndex].pairs[pairIndex].key = e.target.value;
                      setCredentials(newSections);
                    }}
                  />
                  <input
                    className="w-full p-1 text-sm border rounded h-[25px]"
                    placeholder="Value"
                    value={pair.value}
                    onChange={(e) => {
                      const newSections = [...credentials];
                      newSections[sectionIndex].pairs[pairIndex].value = e.target.value;
                      setCredentials(newSections);
                    }}
                  />
                </div>
              ))}
               </div>

            </div>
          ))}
          <button 
            className="mt-2 flex items-center gap-1 cursor-pointer"
            onClick={addCredentialSection}
          >
            <img className="w-5" alt="plus" src="/icons-plus.png" />
            <span className="text-sm">Add Subsection</span>
          </button>
          </div>
                
              </div>
            </motion.div>
          
        

        {/* Back Card */}
        <motion.div
          className="absolute"
          variants={backCardVariants}
          animate={isFlipped ? "back" : "front"}
          
        >
          <div className="p-[15px] h-[280px] w-[300px] blue-shadow bg-white">
          <h1 className="text-left font-medium cursor-pointer" onClick={() => isFlipped && setIsFlipped(false)}>Additional links</h1>

          <div className="flex flex-row justify-between items-center mt-[2px]">
              
              <div className="flex flex-col justify-evenly items-start ">
              {additionalLinks.map((pair, index) => (
                 <div key={pair.id} className="flex flex-row justify-between items-centers mt-[5px]">
                 <div  className="mt-[2px] flex flex-row justify-between items-centers">
                      <input
                        className="text-sm mr-2 p-1 rounded border"
                        placeholder="Link"
                        value={pair.value}
                        onChange={(e) => {
                          const newPairs = [...additionalLinks];
                          newPairs[index].value = e.target.value;
                          setAdditionalLinks(newPairs);
                        }}
                      />
  
                    </div>

                    <div className="cursor-pointer self-center">
                    <img onClick={addAditionalLink} className="w-7" alt="plus" src="/icons-plus.png" />
                </div>
                 </div>
                  ))}    
              </div>
            

 
               </div>

          </div>
        </motion.div>
      </div>


    </div>
          </>

          </div>
     )
}

export default InstallationGuideConfig;