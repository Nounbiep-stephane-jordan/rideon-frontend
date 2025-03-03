
import { useEffect, useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import Littleplus from "../../../assets/little-plus.svg"
import { useGlobalVariables } from "../../../context/global";
import BlueBox from "../../../component/blueBox/blueBox";
import fileviz from "../../../assets/file-viz.webp"
import API from "../../../api/api"
import {MAX_CONTENT_LENGTH_FILE} from "../../../utils/constants"
 

const testvalues = {
    token:"",
    repo:"",
    owner:""
}

const COLORS = [{id:"color-1",color:'#FFFFFF',description:"Main entry points of the application",classes:`bg-[#FFFFFF] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {id:"color-2",color:'#FF8000',description:"Files essential for navigation and routing",classes:`bg-[#FF8000] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {id:"color-3",color:'#8EFF2C',description:"Configuration files",classes:`bg-[#8EFF2C] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {id:"color-4",color:'#530DF6',description:"Folder essential for adding new features and modules",classes:`bg-[#530DF6] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`},
    {id:"color-5",color:'#FA1818',description:"Do not edit",classes:`bg-[#FA1818] w-[15px] h-[15px] rounded-full shadow mr-5 cursor-pointer`}]

const imageExtensions = ["jpg","jpeg","svg","gif","webp","bmp","png"]

const isImageFile = (filename) => {
    console.log(filename)
    const extension = filename.split(".").pop().toLowerCase()
    return imageExtensions.includes(extension)
}

const FileVisualization = () => {
    const {wizardData,showLoader,hideLoader} = useGlobalVariables()
    const [owner, setOwner] = useState(wizardData?.githubPhase?.owner || testvalues.owner);
    const [repo, setRepo] = useState(wizardData?.githubPhase?.repo || testvalues.repo);
    const [token, setToken] = useState(wizardData?.githubPhase?.token || testvalues.token);
    const [fileTree, setFileTree] = useState(wizardData?.githubPhase?.fileTree||{});
    const [error, setError] = useState("");
    const [selectedFile,setSelectedFile] = useState(false)
    const [showLittlebox,setShowLittleBox] = useState(false)
    const [fileContent ,setFileContent] = useState(null)

    const [imageurl,setImageUrl] = useState(null)
    const [message,setMessage] = useState("")
    const [fileAnnotations,setFileAnnotations] = useState(wizardData?.githubPhase?.fileAnnotations ||{})
    const [hoveredFile,setHoveredFile] = useState( wizardData?.githubPhase?.hoveredFile || null)

    
    useEffect(()=> {
        fetchRepoFiles()
    },[])


 


    const fetchFileContent = async(file) => {
        if(!file.download_url) return
        try{

            if(isImageFile(file?.name)) {
                setFileContent(null)
                setImageUrl(file.download_url)

                return
            } else {
            showLoader()
            const response = await API.post("/file-content",{repo,owner,path:file.path,token,download_url:file.download_url})
            if(!response.data) throw new Error("Failed to fetch file content")
            let text = ""
           if(typeof response.data  !== "string") text = JSON.stringify(response.data,null,2)
            else  text = response.data

            if(text.length > MAX_CONTENT_LENGTH_FILE) {
                setMessage(`Content too large rendering teh first ${MAX_CONTENT_LENGTH_FILE} characters`)
                setTimeout(() => {
                    setMessage(null)
                }, 3000);
                text = text.slice(0,MAX_CONTENT_LENGTH_FILE) +"......"
            }
            setImageUrl(null)
            setFileContent(text)
            hideLoader()

            return
        }

        } catch(err) {
            console.log(err)
            setError(err.message)
            hideLoader()
        }
    }

    //for colors and descriptions
    const handleFileClick = async(file) => {
      setSelectedFile(file)
      await fetchFileContent(file)
    }


  

    // Fetch files from GitHub API
    const fetchRepoFiles = async (path = "") => {
        if (!owner ||  !repo ||  !token) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        try {
            showLoader()
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
            hideLoader()
        } catch (err) {
            setError(err.message);
            hideLoader()
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



 
    // Recursive Component to Render Folder Structure
    const renderFiles = (files, parentPath = "") => {

        return (
            <ul className="flex flex-col items-start justify-start ml-10 mt-5">
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
                        if(file.type === "dir") {
                            setImageUrl(null)
                            setFileContent(null)
                        }

                        handleFileClick(file)
                      }}> {file.name}
                            {hoveredFile?.path === file.path && fileAnnotations[file.path] &&(
                            <div className="fixed w-120 h-1/2 right-1/2 top-50 z-50">
                                <div className="bg-black/50 shadow-lg p-5 rounded-sm">
                                        <h1 className="text-[20px] capitalize text-white text-[10px] text-left">{fileAnnotations[file?.path]?.notes}</h1>
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
        <div className="relative p-5">
         {message ? <p className="self-center text-green-800">{message}</p>:null}
          <h1 className="mb-2">Code base</h1>
            <div className="flex flex-row justify-between items-start">
               
            <div className={`bg-[#F5F5F5] mr-2 w-1/2 relative bg-white shadow-lg border-[2px] border-[#D9D9D9]`}>

 
               <div className="file-list overflow-x-scroll custom-scrollbar h-[380px]">{fileTree[""] && renderFiles(fileTree[""])}</div>

               <div  className="cursor-pointer w-50 rounded-sm absolute bg-white bottom-5 right-5 p-5 shadow-lg"> 
               {COLORS.map((c) => (
                    <div onClick={()=> setShowLittleBox(true)} key={c.description}  className=" z-[50]">
                    <div className="flex items-center mb-1">
                         <div className={`h-2 shadow-lg w-2 rounded-full bg-[${c.color}] mr-2`}></div>
                        <p className="text-[5px] text-left">{c.description}</p>
                      </div>
                    </div>
                      ))}

                      {showLittlebox == true ? <div  onClick={()=>{
               console.log("clicked")
               setShowLittleBox(false)
          }}>
                          <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[50] backdrop-blur-sm flex items-center justify-end"
    >

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-sm p-6 w-full max-w-lg ml-10"
      >
          <div >
          {COLORS.map((c) => (
                    <div  key={c.id}  className=" z-[50]">
                    <div className="flex items-center mb-1">
                         <div className={`h-5 shadow-lg w-5 rounded-full bg-[${c.color}] mr-2`}></div>
                        <p className="text-[15px] text-left">{c.description}</p>
                      </div>
                    </div>
                      ))}

          </div>

      </motion.div>
    </motion.div>
          </div>
:null}

               </div>
             

               </div>




           <div className={`bg-[#F5F5F5] w-1/2 relative bg-white shadow-lg border-[2px] border-[#D9D9D9] z-[5]`}>

               <div className="file-list h-[380px] overflow-x-scroll custom-scrollbar">
                {selectedFile?.name && fileContent !== null ? <div className="p-5">
                    <h2 className="font-semibold text-2xl text-left">{selectedFile.name}</h2>
                    <pre className="">
                        <code>{fileContent}</code>
                    </pre>
                </div>: imageurl !== null ?                <div className="flex flex-col items-center justify-center self-center" >
                <h2 className="font-semibold text-2xl text-left">{selectedFile.name}</h2>
                <img className="h-70 " src={imageurl} alt="image"/>
               </div>: <div>
                                    <div className="h-70" style={{backgroundImage:`url(${fileviz})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
                                    </div>
                                    <h2 className="text-left p-5 h-20">
                                    Navigating th code base is one of the greatest challnges of picking up form an exsiting project. Dive into the proejct eforrltelslsy.
                                    </h2>
                </div>}
               </div>

             

               </div>


            </div>



        </div>
    );
};

export default FileVisualization;

