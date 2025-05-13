/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from "react";

const GlobalVariablesContext = createContext();
const defaultGuide = {
  textData: {
    projectName: "Enter project name...",
    projectDescription: "Enter the project description in brief...",
  },
  prerequisites: [{ id: 1, key: "", value: "" }],
  additionalLinks: [{ id: "add1", value: "" }],
  credentials: [
    {
      id: 1,
      title: "",
      pairs: [{ id: 1, key: "", value: "" }],
    },
  ],
  installationGuidesOsText: {
    windows: "",
    ios: "",
    linux: "",
  },
  steps: [],
};

const defaultCod = {
  descriptions: [""],
  standards: [""],
  step2Data: { left: "", right: "" },
  step3Data: [""],
};

const defaultMeet = {
  members: [],
  text: "Enter the welcome message...",
  stepContents: { stepstake: "", stepgoal1: "", stepgoal2: "", stepprob: "" },
};

const defaultGit = {
  token: "",
  repo: "",
  owner: "",
  fileAnotations: {},
  fileTree: {},
  hoveredFile: null,
};

const commitState = {
  message: "",
  selected: undefined,
};

export const GlobalProvider = ({ children }) => {
  const [selectedIcon, setSelectedIcon] = useState("home"); //for nav bar
  const [user, setUser] = useState(null);

  const [coddingStandardsConfigData, setCoddingStandardsConfigData] =
    useState(defaultCod);

  const [meetTheTeamConfigData, setMeetTheTeamConfigData] =
    useState(defaultMeet);

  const [githubPhaseConfigData, setGithubPhaseConfigData] =
    useState(defaultGit);

  const [githubData, setGithubData] = useState(defaultGit);
  const [commitStatus, setCommitStatus] = useState(commitState);

  const [installationGuidesConfigData, setInstallationGuidesConfigData] =
    useState(defaultGuide);

  const [isEditingWizard, setIsEditingWizard] = useState(false);
  const [editingWizardProjectId, setEditingWizardProjectId] = useState(null); //contains the id of hte project edited
  const [activeProject, setActiveProject] = useState({}); // Contains data of the selected project in dashboard

  const [isAppLoading, setIsAppLoading] = useState(false);
  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [wizardStartStage, setWizardStartStage] = useState(0);
 
  const [dependencyMapData, setDependencyMapData] = useState({
    token: "",
    repo: "",
    owner: "",
    commitSha: "",
    fileName: "",
    filePath: "",
  });
 

  const hideLoader = () => {
    setTimeout(() => setIsAppLoading(false), 2000);
  };

  const showLoader = () => {
    setIsAppLoading(true);
  };

  //actaul wizard data
  const [wizardData, setWizardData] = useState({
    installationGuide: defaultGuide,
    coddingStandards: defaultCod,
    meetTheTeam: defaultMeet,
    githubPhase: defaultGit,
    projectId: null,
    projectName: "",
  });

  const handleCleanWizardConfig = () => {
    //clean the wizard
    setCoddingStandardsConfigData(defaultCod);
    setGithubPhaseConfigData(defaultGit);
    setInstallationGuidesConfigData(defaultGuide);
    setMeetTheTeamConfigData(defaultMeet);
  };

  //for auth

  useEffect(() => {
    //verify if already logggedin
    const loggedin = getUser();
    if (loggedin) {
      setUser(loggedin);
    }
  }, []);

  const logIn = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getUser = async () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const logOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <GlobalVariablesContext.Provider
      value={{
        user,
        setUser,
        logIn,
        logOut,
        getUser,
        selectedIcon,
        setSelectedIcon,
        coddingStandardsConfigData,
        setCoddingStandardsConfigData,
        githubPhaseConfigData,
        setGithubPhaseConfigData,
        meetTheTeamConfigData,
        setMeetTheTeamConfigData,
        installationGuidesConfigData,
        setInstallationGuidesConfigData,
        githubData,
        setGithubData,
        commitStatus,
        setCommitStatus,
        handleCleanWizardConfig,
        activeProject,
        setActiveProject,

        //actaul data
        wizardData,
        setWizardData,

        isEditingWizard,
        setIsEditingWizard,
        editingWizardProjectId,
        setEditingWizardProjectId,

        showLoader,
        hideLoader,
        isAppLoading,
        messageToDisplay,
        setMessageToDisplay,

        wizardStartStage,
        setWizardStartStage,
        dependencyMapData,
 
        setDependencyMapData,
 
      }}
    >
      {children}
    </GlobalVariablesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalVariables = () => useContext(GlobalVariablesContext);
