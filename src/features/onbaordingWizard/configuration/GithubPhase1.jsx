/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BlueBox from "../../../component/blueBox/blueBox";
import "../style.css"
import { AnimatePresence,motion } from "framer-motion";
import Littleplus from "../../../assets/little-plus.svg"
import { useGlobalVariables } from "../../../context/global";

const testvalues = {
    token:"",
    repo:"rideon-frontend",
    owner:"Nounbiep-stephane-jordan"
}

const COLORS = [{color:'#FFFFFF',description:"Main entry points of the application",classes:`bg-[#FFFFFF] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {color:'#FF8000',description:"Files essential for navigation and routing",classes:`bg-[#FF8000] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {color:'#8EFF2C',description:"Configuration files",classes:`bg-[#8EFF2C] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {color:'#530DF6',description:"Folder essential for adding new features and modules",classes:`bg-[#530DF6] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {color:'#FA1818',description:"Do not edit",classes:`bg-[#FA1818] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`}]


const GithubPhase1 = () => {
    const {githubPhaseConfigData,setGithubPhaseConfigData} = useGlobalVariables()
    const [owner, setOwner] = useState(githubPhaseConfigData.owner || testvalues.owner);
    const [repo, setRepo] = useState(githubPhaseConfigData.repo || testvalues.repo);
    const [token, setToken] = useState(githubPhaseConfigData.token || testvalues.token);
    const [fileTree, setFileTree] = useState(githubPhaseConfigData.fileTree||{});
    const [error, setError] = useState("");
    const [showModal,setShowModal] = useState(false)
    const [selectedFile,setSelectedFile] = useState(false)


    const [fileAnnotations,setFileAnnotations] = useState(githubPhaseConfigData.fileAnnotations ||{})
    const [hoveredFile,setHoveredFile] = useState( githubPhaseConfigData.hoveredFile || null)

    useEffect(()=> {
        setGithubPhaseConfigData((prev) => ({
            ...prev,owner,repo,token,fileAnnotations,fileTree,hoveredFile
        }))
    },[owner,repo,token,fileAnnotations,fileTree,hoveredFile])


    //for colors and descriptions
    const handleFileClick = async(file) => {
      setShowModal(!showModal)
      setSelectedFile(file)
    }


    const handleSelectedColor = async(color) => {
        const currentColors = fileAnnotations[selectedFile.path]?.colors || []
        const newColors = currentColors.includes(color)?currentColors.filter(c => c !== color) : [...currentColors,color]
        
        setFileAnnotations(prev => ({
            ...prev,
            [selectedFile.path]:{
                ...prev[selectedFile.path],
                colors:newColors
            }
        }))
      
         
    }

    // Fetch files from GitHub API
    const fetchRepoFiles = async (path = "") => {
        if (!owner ||  !repo ||  !token) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
                {
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            );
 
            if (!response.ok) throw new Error("Invalid repository or token");

            const data = await response.json();

            setFileTree((prevTree) => ({
                ...prevTree,
                [path]: data, // Store fetched content under its parent path
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle clicking a folder
    const handleFolderClick = (path) => {
        if (fileTree[path]) {
            // If already loaded, remove (collapse)
            setFileTree((prevTree) => {
                const newTree = { ...prevTree };
                delete newTree[path]; // Remove from state
                return newTree;
            });
        } else {
            // Otherwise, fetch contents (expand)
            fetchRepoFiles(path);
        }
    };

    const handleNotesChange = (e) => {
        setFileAnnotations(prev => ({
            ...prev,
            [selectedFile.path]:{
                ...prev[selectedFile.path],
                notes:e.target.value
            }
        }))
    }


    // Recursive Component to Render Folder Structure
    const renderFiles = (files, parentPath = "") => {
        return (
            <ul className="flex flex-col items-start justify-start ml-[10px]">
                {files.filter((f) => f.name!== parentPath).map((file) => {
                    const filePath = parentPath ? `${parentPath}/${file.name}` : file.name;

                    return (
                    <ul key={file.name}>
                                            <li className="cursor-pointer" onClick={(e) => e.stopPropagation()} >
                      <span onClick={() => file.type === "dir" && handleFolderClick(filePath)}>
                      {file.type === "dir"
                          ? fileTree[filePath]
                              ? "📂" // Expanded folder
                              : "📁" // Collapsed folder
                          : ""}{" "}
                      </span>
                      <span 
                        onMouseEnter={()=> setHoveredFile(file)}
                        onMouseLeave={()=> setHoveredFile(null)}
                        onClick={(e) => {
                        e.stopPropagation()
                        handleFileClick(file)
                      }}> {file.name}
                            {hoveredFile?.path === file.path && fileAnnotations[file.path]  &&(
                            <div className="fixed w-80 left-1/2 top-1/2 z-50">
                                <div className="bg-black shadow-lg p-5 rounded-sm">
                                        <h1 className="text-2xl capitalize text-white text-[10px] text-left">{fileAnnotations[file?.path]?.notes}</h1>
                                        <div className="flex flex-row bg-gray mt-2">
                                            {fileAnnotations[file?.path]?.colors?.map(color =>(
                                                <div style={{backgroundColor:color}} key={color} className="w-4 h-4 rounded-full mr-2"></div>
                                            ))}
                                        </div>
                                    </div>
                            </div>
                        )}
                      
                      </span>
                  </li>
                        <li onClick={(e) => {
                            e.stopPropagation()
                            handleFileClick(file)
                        }} key={filePath} className="mt-2 mb-2 cursor-pointer">
                           
                            {fileTree[filePath] && renderFiles(fileTree[filePath], filePath)}
                        </li>

                    </ul>


                    
                    )
                })}
            </ul>
        );
    };

    return (
        <div className="relative">
            <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col">
            <h1>Code base</h1>
            <h2>Step 1</h2>
            <div className="h-80 w-80 blue-shadow-custom relative p-5  mt-[10px]">
                <div className="github-place absolute rounded-full h-10 w-10 orange-shadow flex place-items-center justify-center items-center">
                    <img className="w-8" src="/github-orange.png" alt="github icon" />
                </div>

                {/* Repository Input Fields */}
                <div className="flex flex-col items-start place-items-start mt-5">
                    <div className="flex flex-col items-start mb-5">
                        <span>Repository Owner</span>
                        <input className="input-config w-70" type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />


</div>
                    <div className="flex flex-col items-start mb-5">
                        <span>Repository Name</span>
                        <input className="input-config w-70" type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-start mb-5">
                        <span>Personal Access Token</span>
                        <input className="input-config w-70" type="password" value={token} onChange={(e) => setToken(e.target.value)} />
                    </div>
                </div>

                <div className="cursor-pointer question-mark-place absolute rounded-full h-10 w-10 orange-shadow flex place-items-center justify-center items-center">
                    <img className="w-5" src="/blue-question-mark.png" alt="github icon" />
                    <div className="absolute custom-position">
                        <BlueBox text="This application uses GitHub as a source of data to provide the best onboarding experience. Enter your repository name, and repository owner. If you have any problem or don’t know how to get the personal access token, follow this tutorial....http://linkto.com" />
                    </div>
                </div>

                {/* Fetch Button */}
                <button className="btn-fetch w-[80px] cursor-pointer w-20 bg-[#530DF6] p-[10px] text-xs text-white mt-5 mb-5 " onClick={() => fetchRepoFiles("")}>
                    Fetch Files
                </button>

                {/* Error Handling */}
                {error && (
                    <AnimatePresence mode="wait">
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                        >
                            <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-xl p-6 w-full max-w-sm rounded-sm shadow-[0_4px_4px_rgba(250,24,24,100)]"
                            >
                            <div onClick={() => setError(null)} className="">
                        <img alt="error-image" className="" src="/error.jpg" />
                        <p className="text-left mb-5">{error}</p>
                       </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            </div>



            <div className={`${showModal?'backdrop-blur-sm':''} bg-[#F5F5F5] w-1/2 p-5 shadow`}>
                <h1>Illustrate your code base with color codes</h1>
                
               {showModal == true ? (
                    <div className={`fixed top-[50px] right-[0px] z-[9999999] rounded-sm bg-[#ffffff] shadow  p-5`}>
                      <div className="flex flex-col justify-start items-start">
                        <h2 className=" text-lg font-semibold mb-[2px]">{selectedFile.name}</h2>
                      {COLORS.map((c) => (
                        <div key={c.description} className="flex w-[300px] items-center mb-2">
                        <div onClick={() => handleSelectedColor(c.color)} className={`${c.classes} relative`}>
                            {fileAnnotations[selectedFile.path]?.colors?.includes(c.color) && (
                                <div className="absolute -top-1 -right-1">
                                    <img className="w-[10px]" alt="little plus" src={Littleplus}/>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-left">{c.description}</p>
                      </div>
                      ))}
                      <textarea onChange={handleNotesChange} value={fileAnnotations[selectedFile.path]?.notes || ""} className="p-2 w-[300px] shadow" placeholder="Enter a brief explanation of the meaning of the importance of the folders"></textarea>
                      <div className="flex flex-row justify-center items-center">
                      <button className="cursor-pointer p-[10px] m-2 bg-[#530DF6] text-sm text-white" onClick={() => {
                        setShowModal(false)
                      }} >Save</button>
                      <button className="cursor-pointer p-[10px] m-2 bg-[#FA1818] text-sm text-white" onClick={() => {
                        setShowModal(false)
                      }}>Cancel</button>
                      </div>
                      </div>
                    </div>
                ) : null}
               <div className="file-list overflow-x-scroll custom-scrollbar h-[400px]">{fileTree[""] && renderFiles(fileTree[""])}</div>

             

               </div>



            </div>



        </div>
    );
};

export default GithubPhase1;