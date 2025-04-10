import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./../../api/api";
import { useGlobalVariables } from "../../context/global";
 
 

const COLORS = [
  {
    color: "#FFFFFF",
    description: "Main entry points of the application",
    classes: `bg-[#FFFFFF] w-[15px] h-[15px] rounded-full shadow cursor-pointer`,
  },
  {
    color: "#FF8000",
    description: "Files essential for navigation and routing",
    classes: `bg-[#FF8000] w-[15px] h-[15px] rounded-full shadow cursor-pointer`,
  },
  {
    color: "#8EFF2C",
    description: "Configuration files",
    classes: `bg-[#8EFF2C] w-[15px] h-[15px] rounded-full shadow cursor-pointer`,
  },
  {
    color: "#530DF6",
    description: "Folder essential for adding new features and modules",
    classes: `bg-[#530DF6] w-[15px] h-[15px] rounded-full shadow cursor-pointer`,
  },
  {
    color: "#FA1818",
    description: "Do not edit",
    classes: `bg-[#FA1818] w-[15px] h-[15px] rounded-full shadow cursor-pointer`,
  },
];

const DependencyMapButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute flex z-[1] items-center justify-center bg-[#530DF6] rounded-full w-[50px] h-[50px]"
  >
    <img
      src="/dependencymapbtn.svg"
      alt="dependency map"
      className="size-[29px]"
    />
  </div>
);

/* const ColorDescription = ({ setIsClicked, isClicked }) => {
  
  return(
  
)}; */

const FileTree = ({ token, repo, owner, fileAnnotations, handleFileClick }) => {
  const [error, setError] = useState("");
  const [expandedFolders, setExpandedFolders] = useState({});
  const [fileTree, setFileTree] = useState([]);
  const { commitStatus } = useGlobalVariables();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState({hovered: false, filePath: ""});


  useEffect(() => {
    if (owner && repo && token) {
      fetchRepoFiles();
    }
  }, [owner, repo, token]);

  const fetchRepoFiles = async (path = "") => {
    if (!owner || !repo || !token) {
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
      if (path === "") {
        setFileTree(data);
      } else {
        setExpandedFolders((prev) => ({ ...prev, [path]: data }));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFolderClick = (path) => {
    if (expandedFolders[path]) {
      setExpandedFolders((prev) => {
        const newFolders = { ...prev };
        delete newFolders[path];
        return newFolders;
      });
    } else {
      fetchRepoFiles(path);
    }
  };

  const renderFiles = (files, parentPath = "") => {
    return (
      <ul className="flex flex-col items-start justify-start ml-[1px]">
        {Array.isArray(files) &&
          files.map((file) => {
            const filePath = parentPath
              ? `${parentPath}/${file.name}`
              : file.name;

            const annotations = fileAnnotations[`${filePath}`]?.colors || [];

            return (
              <div className="flex justify-center items-center" key={filePath}>
                <div
                  className={`flex flex-col justify-around items-center ${
                    isHovered?.hovered &&
                    isHovered?.filePath === filePath &&
                    fileAnnotations[`${isHovered.filePath}`]
                      ? "w-[100px] h-[40px] bg-[#F9F9F9] rounded-[10px] shadow-sm  absolute left-1/4 top-1/3"
                      : "hidden"
                  }`}
                >
                  <p className="text-[11px]">{isHovered?.filePath}</p>
                  <div className="flex">

                  {annotations.map((colors, index) => (
                    <div
                      className={` w-[10px] h-[10px] m-1 bg-[${colors}] rounded-full shadow`}
                      key={index}
                    />
                  ))}
                  </div>
                </div>
                <li
                  className={`m-1`}
                  key={filePath}
                  onMouseEnter={() =>
                    setIsHovered({ hovered: true, filePath: filePath })
                  }
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span
                    onClick={() =>
                      file.type === "dir"
                        ? handleFolderClick(filePath)
                        : handleFileClick(filePath)
                    }
                  >
                    {file.type === "dir"
                      ? expandedFolders[filePath]
                        ? "📂"
                        : "📁"
                      : "📄"}{" "}
                    {file.name}
                  </span>
                  {expandedFolders[filePath] && (
                    <ul>{renderFiles(expandedFolders[filePath], filePath)}</ul>
                  )}
                </li>
              </div>
            );
          })}
      </ul>
    );
  };

  return (
    <div className="grid">
      {commitStatus.selected ? (
        <div className=" shadow-lg top-45 ml-30 z-10 absolute p-[10px] flex flex-col gap-2 w-[250px] h-[200px] rounded-[15px] shadow-sm bg-[#F5F5F5]">
          <p>Commit message</p>
          <p>{commitStatus.message}</p>
        </div>
      ) : (
        ""
      )}

      <div
        className={`${
          commitStatus.selected ? "blur-xs z-[-2] " : ""
        } grid grid-cols-2 gap-10 p-[15px] w-[500px] h-[500px] shadow bg-white rounded`}
      >
        <div
          className={` ${
            isClicked ? "blur-xs" : ""
          } p-1 w-[200px] h-[400px] overflow-scroll  hide-scrollbar`}
        >
          {renderFiles(fileTree)}
        </div>

        <div
          onClick={() => {
            setIsClicked(!isClicked);
          }}
          className={`  p-[5px] flex flex-col gap-2 justify-center  rounded-[15px] shadow-sm  cursor-pointer transition delay-150 duration-300 ease-out ${
            isClicked
              ? "z-10 absolute self-center backdrop-blur-xs shadow-xl  w-[350px] h-[250px]"
              : "self-end w-[220px] h-[150px] bg-[#F5F5F5]"
          } `}
        >
          {COLORS.map((c, index) => (
            <div
              key={index}
              className=" transition-all delay-150 duration-300 flex flex-row gap-2"
            >
              <div className={`${c.classes} `} />
              <p
                className={` ${
                  isClicked ? "text-[13px]" : "text-[8px]"
                }  text-left`}
              >
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FileDescription = ({ selectedFile, token, repo, owner }) => {
  const navigate = useNavigate();
  const [commits, setCommits] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [commitClick, setCommitClick] = useState(false);
  const { commitStatus, setCommitStatus } = useGlobalVariables();

  const handleCommitStatus = (message, selected) => {
    setCommitStatus({ message: message || "", selected: selected });
  };

  console.log("Selected file for description: ", selectedFile);
  useEffect(() => {
    if (!selectedFile) return;
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits?path=${selectedFile}&per_page=10`,
          {
            headers: { Authorization: `token ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch commits");
        const data = await response.json();
        console.log("Commit data :", data);
        setCommits(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCommits();
  }, [selectedFile]);

  const fetchFileContent = async (commit) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${selectedFile}?ref=${commit.sha}`,
        {
          headers: { Authorization: `token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch file content");
      const data = await response.json();
      console.log("File Content Data:", data);

      // Decode Base64 content
      const decodedContent = atob(data.content).replace(/\r?\n/g, "\n");
      setFileContent(decodedContent);
      console.log("Content: ", fileContent);
    } catch (err) {
      console.error(err);
      setFileContent("Failed to load file content.");
    }
  };
  const nonEmpty = fileContent != null;
  return (
    <div className="grid p-[20px] w-[500px] h-[500px] rounded shadow bg-white">
      {selectedFile ? (
        <div className="grid">
          <div className="flex flex-row justify-between">
            <p className="underline underline-offset-8 decoration-[#530DF6] decoration-[5px]">
              {selectedFile || "Select a file"}
            </p>
            {commitClick ? (
              <span
                onClick={() => {
                  setCommitClick(false);
                  handleCommitStatus("", false);
                }}
                className="w-[20px] h-[20px] rounded-full bg-[#530DF6]"
              >
                <img src="/return.png" alt="icon" />
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="p-2 w-full h-[400px]  overflow-scroll hide-scrollbar">
            {commitClick ? (
              nonEmpty ? (
                <p className="whitespace-pre-wrap font-mono text-sm">
                  {fileContent}
                </p>
              ) : (
                <p>File is Empty</p>
              )
            ) : (
              <ul>
                {commits.map((commit) => (
                  <li
                    key={commit.sha}
                    className="cursor-pointer"
                    onClick={() => {
                      fetchFileContent(commit);
                      setCommitClick(true);
                      handleCommitStatus(commit.commit.message, true);
                    }}
                  >
                    <img
                      src={commit.committer?.avatar_url}
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{commit.committer.login}</span>
                    <span>
                      {new Date(
                        commit.commit.committer.date
                      ).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <p>Select the file to see commit history</p>
      )}

      <div className="grid justify-items-end self-end ">
        <DependencyMapButton
          onClick={() =>
            navigate(`/dependency-map/`, { token, repo, owner, selectedFile })
          }
        />
      </div>
    </div>
  );
};

const FileVisualisationPhase1 = () => {
 
  const { activeProject, githubData, setGithubData, showLoader, hideLoader } =
    useGlobalVariables();
 
  const { token, repo, owner, fileAnnotations } = githubData;
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("Git hub data: ", githubData);

  const fetchGitHistory = async () => {
    const { id } = activeProject;
    console.log("Active Poject", activeProject);
    showLoader()
    await API.post(`/git-history`, { id })

      .then((res) => {
        let generalData = res.data?.projects;
        const gitdata = JSON.parse(generalData[0]?.description);
        setGithubData(gitdata);
        // Get the description string

        hideLoader();
        console.log("General data in desription ", generalData);

        console.log("Git History: ", githubData);

        console.log("Active project data", activeProject);
      })
      .catch((err) => {
        console.log(err, err?.status);
      });
  };

  useEffect(() => {
    fetchGitHistory();
  }, [activeProject]);

  return (
    <div className="h-screen w-screen ">
      <div className="absolute inset-0 bg-[url('/filevisualisationBg.svg')]  bg-[auto_450px] bg-bottom bg-no-repeat z-[-2]"></div>
      <div className="mt-10 flex justify-around items-center">
        <FileTree
          token={token}
          repo={repo}
          owner={owner}
          fileAnnotations={fileAnnotations}
          handleFileClick={setSelectedFile}
        />
        <FileDescription
          token={token}
          repo={repo}
          owner={owner}
          selectedFile={selectedFile}
        />
      </div>
    </div>
  );
};

export default FileVisualisationPhase1;
