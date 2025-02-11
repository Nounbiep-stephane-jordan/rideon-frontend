
import './App.css'
import ProgressTracker from './component/progressTracker/progressTracker'
import ProjectCard from './component/ProjectCard/projectCard'
import Steps from './component/steps/steps'
import WhiteContainer from './component/whiteContainer/whiteContainer'
import AddMember from './features/onbaordingWizard/configuration/addMember'
import GithubPhase1 from './features/onbaordingWizard/configuration/GithubPhase1'
import MeetTeamPhase from './features/onbaordingWizard/configuration/meetTeamPhase'

function App() {


  return (
    <>
    <MeetTeamPhase/>
    {/* <AddMember/> */}
    {/* <GithubPhase1/> */}
    {/* <WhiteContainer/> 
    <ProjectCard/>
    <Steps/>
    <ProgressTracker/> */}

    </>
  )
}

export default App
