/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useContext, useEffect, useState } from "react";



const GlobalVariablesContext = createContext()
const defaultGuide  = {
     textData:{
          projectName:"Enter project name...",
          projectDescription:"Enter the project description in brief..."
     },
     prerequisites:[{id:1,key:"",value:""}],
     additionalLinks:[{id:"add1",value:""}],
     credentials:[{
          id:1,
          title:"",
          pairs:[{id:1,key:"",value:""}]
     }],
     installationGuidesOsText:{
          windows:"",
          ios:"",
          linux:""
     },
     steps:[],
 }

const defaultCod = {
     descriptions:[''],
     standards:[''],
     step2Data:{left:'',right:''},
     step3Data:[''],
 }


 const defaultMeet = {
     members:[],
     text:"Enter the welcome message...",
     stepContents:{}

 }

 const defaultGit = {
     token:"",
     repo:"",
     owner:"",
     fileAnotations:{},
     fileTree:{},
     hoveredFile:null
 }


export const GlobalProvider = ({children}) => {
     const [selectedIcon, setSelectedIcon] = useState("home"); //for nav bar
     const [user,setUser] = useState(null)

     const [coddingStandardsConfigData,setCoddingStandardsConfigData] = useState(defaultCod)

      const [meetTheTeamConfigData,setMeetTheTeamConfigData] = useState(defaultMeet)

      const [githubPhaseConfigData,setGithubPhaseConfigData] = useState(defaultGit)

     const [installationGuidesConfigData,setInstallationGuidesConfigData] = useState(defaultGuide)

     const [isEditingWizard,setIsEditingWizard] = useState(true)
     const [editingWizardProjectId,setEditingWizardProjectId] = useState(null) //contains the id of hte project edited

     //actaul wizard data
     const [wizardData,setWizardData] = useState({
          coddingStandardsData:defaultCod,
          meetTheTeamData:defaultMeet,
          githubPhaseData:defaultGit,
          installationGuidesData:defaultGuide
     })

 
 

 
 


      const handleCleanWizardConfig = () => {
          //clean the wizard
          setCoddingStandardsConfigData(defaultCod)
          setGithubPhaseConfigData(defaultGit)
          setInstallationGuidesConfigData(defaultGuide)
          setMeetTheTeamConfigData(defaultMeet)
      }


      //for auth

      useEffect(()=>{
          //verify if already logggedin
          const loggedin = getUser()
          if(loggedin){
               setUser(loggedin)
          }
      },[])

      const logIn = async(user) => {
          localStorage.setItem("user",JSON.stringify(user))
          setUser(user)
      }

      const getUser = async() => {
          return JSON.parse(localStorage.getItem("user"))
      }

     const logOut = async() => {
          localStorage.removeItem("user")
          setUser(null)
     }


     return (
          <GlobalVariablesContext.Provider value={{
          user,setUser,logIn,logOut,getUser,
          selectedIcon,setSelectedIcon,
          coddingStandardsConfigData,setCoddingStandardsConfigData,
          githubPhaseConfigData,setGithubPhaseConfigData,
          meetTheTeamConfigData,setMeetTheTeamConfigData,
          installationGuidesConfigData,setInstallationGuidesConfigData,
          handleCleanWizardConfig,

          //actaul data
          wizardData,setWizardData,


          isEditingWizard,setIsEditingWizard, editingWizardProjectId,setEditingWizardProjectId



          }}> 
               {children}
          </GlobalVariablesContext.Provider>
     )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalVariables = () => useContext(GlobalVariablesContext)