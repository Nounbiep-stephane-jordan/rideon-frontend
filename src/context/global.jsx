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
     additionalLinks:[{id:"add1",key:"",value:""}],
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
     text:"Enter the wellcome message...",
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
     const [user,setUser] = useState({

     })
     const [coddingStandardsConfigData,setCoddingStandardsConfigData] = useState(defaultCod)

      const [meetTheTeamConfigData,setMeetTheTeamConfigData] = useState(defaultMeet)

      const [githubPhaseConfigData,setGithubPhaseConfigData] = useState(defaultGit)

     const [installationGuidesConfigData,setInstallationGuidesConfigData] = useState(defaultGuide)


      const handleCleanWizardConfig = () => {
          //clean the wizard
          setCoddingStandardsConfigData(defaultCod)
          setGithubPhaseConfigData(defaultGit)
          setInstallationGuidesConfigData(defaultGuide)
          setMeetTheTeamConfigData(defaultMeet)
      }


      //for auth

      useEffect(()=>{
          //verify if alrady logggedin
          const token = localStorage.getItem("token")
          if(token){
               setUser({...user,token})
          }
      },[])

      const logIn = (user) => {
          localStorage.setItem("token",user.token)
          setUser({...user})
      }

     const logOut = () => {
          localStorage.removeItem("token")
          setUser({...user,token:null})
     }


     return (
          <GlobalVariablesContext.Provider value={{
          user,setUser,logIn,logOut,
          selectedIcon,setSelectedIcon,
          coddingStandardsConfigData,setCoddingStandardsConfigData,
          githubPhaseConfigData,setGithubPhaseConfigData,
          meetTheTeamConfigData,setMeetTheTeamConfigData,
          installationGuidesConfigData,setInstallationGuidesConfigData,
          handleCleanWizardConfig
          }}> 
               {children}
          </GlobalVariablesContext.Provider>
     )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalVariables = () => useContext(GlobalVariablesContext)