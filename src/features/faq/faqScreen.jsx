import { useState, useEffect } from "react";
import search from "../../assets/search.svg";
import message from "../../assets/message.svg";
import ops from "../../assets/oops.webp";
import { motion } from "framer-motion";
import API from "../../api/api";
import { useGlobalVariables } from "../../context/global";
import { Question_LIMIT } from "../../utils/constants";
import { div } from "framer-motion/client";
const Faq = () => {
  const { activeProject, hideLoader, showLoader, setSelectedIcon } = useGlobalVariables();
  const [active, setActive] = useState(null);
  const options = ["Environment setup", "Common issues", "Api"];
  const [selectedOperation, setSelectedOperation] = useState({
    operation: null,
    Qid: 0,
    requiredData: null,
  });
  const [activeMessage, setActiveMessage] = useState("");
  const [answers, setAnswers] = useState([
    {
      keyword: "API",
      question: "Where are end points found",
      answer: [
        "The api are located in the route folder but has recently been moved to the protected route folder.",
      ],
    },
    {
      keyword: "API",
      question: "Where is the of the user controller",
      answer: [
        "The api are located in the user route folder but has recently been moved to the protected route folder.",
      ],
    },
    {
      keyword: "Environment setup",
      question: "How to set up development environment",
      answer: [
        "To set up the development environment, first install Node.js and then run npm install.",
      ],
    },
    {
      keyword: "Common issues",
      question: "Fixing dependency errors",
      answer: [
        "Dependency errors can usually be resolved by deleting node_modules and package-lock.json, then running npm install again.",
      ],
    },
  ]);

  const btnList = [
    {
      name: "add",
      imgSrc: "/addBtn.png",
      message: "Suggest an Answer to the question",
    },
    {
      name: "update",
      imgSrc: "/modify.svg",
      message: "Modify your Questiion",
    },
    {
      name: "delete",
      imgSrc: "/delete.svg",
      message: "Are you sure to Delete",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [noresult, setNoresult] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showOperationModal, setShowOperationModal] = useState(false);

  const handleQuestionInput = (e) => {
    setNewQuestion(e.target.value);
  };
  const handleSearch = (text) => {
    setSearchTerm(text.toLowerCase());
  };

  const handleCategoryChange = (value) => {
    setActive(value === active ? null : value); // Toggle category selection
  };

  // Filter answers based on active category and search term
  const filteredAnswers = answers.filter((an) => {
    // Filter by category if one is selected
    const categoryMatch = active
      ? an.keyword.toLowerCase().includes(active.toLowerCase())
      : true;

    // Filter by search term if one exists
    const searchMatch = searchTerm
      ? an.keyword.toLowerCase().includes(searchTerm) ||
        an.question.toLowerCase().includes(searchTerm) ||
        an.answer.some((ans) => {
          ans.toLowerCase().includes(searchTerm);
        })
      : true;

    return categoryMatch && searchMatch;
  });

  // Update noresult state whenever filters change
  useEffect(() => {
    // Show no results if:
    // 1. We have an active category or search term (user has tried to filter)
    // AND
    // 2. There are no matching results
    const shouldShowNoResults =
      (active || searchTerm) && filteredAnswers.length === 0;
    setNoresult(shouldShowNoResults);
  }, [filteredAnswers, active, searchTerm]);

  useEffect(() => {
    setSelectedIcon("faq")
  }, [])

  const [activeQuestionCat, setActiveQuestionCat] = useState("Common issues");

  let user = JSON.parse(localStorage.getItem("user"));

  const saveQuestion = async () => {
    console.log("I am in save");
    if (!activeProject?.id) return;
    setShowQuestionModal(false);
    setSearchTerm("");
    showLoader();
    let data = {
      keyword: activeQuestionCat,
      question: newQuestion,
      answer: [],
      project_id: activeProject?.id,
      user_id: user.id,
      user_role: user.role,
    };

    await API.post("/save-question", data)
      .then((res) => {
        console.log(res);
        console.log(res);
        hideLoader();
      })
      .catch((err) => {
        console.log(err, "in save qeusiton");
        hideLoader();
      });
  };

  const [offset, setOffSet] = useState(0);

  const loadData = async () => {
    console.log("I am in load");
    if (!activeProject?.id) return;
    showLoader();
    let data = {
      project_id: activeProject?.id,
      user_id: user.id,
      user_role: user.role,
      offset,
      limit: Question_LIMIT,
    };

    await API.post("/load-faq", data)
      .then((res) => {
        console.log("Load result:", res);

        if (res?.data?.faqs.length > 0) {
          setAnswers(res.data.faqs);
          setOffSet(offset + res.data?.faqs.length);
        }
        console.log("Q & A: ", res.data.faqs);
        console.log("Q & A in setAnswers:", answers);
        hideLoader();
      })
      .catch((err) => {
        console.log(err, "in load qeusiton");
        hideLoader();
      });
  };

  useEffect(() => {
    loadData();
  }, [activeProject?.id, offset]);

  const handleInput = (e) => {
    setSelectedOperation({
      operation: selectedOperation.operation,
      Qid: selectedOperation.Qid,
      requiredData: e.target.value,
    });
    console.log("Selected operation when inputing: ", selectedOperation);
  };

  const performOperation = async () => {
    console.log("I am in operation");
    if (!activeProject?.id) return;
    setShowOperationModal(false);
    showLoader();
    await API.post("/faq-operations", selectedOperation)
      .then((res) => {
        console.log(res);
        if (res.statusText != "ok")
          console.log(`Error during ${selectedOperation.operation}`);
        setOffSet(0);
        hideLoader();
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
      });
  };

  // useEffect(() => {
  //   performOperation()
  // },[selectedOperation])

  return (
    <div className="p-5">
      {showQuestionModal ? (
        <div>
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
                <textarea
                  className="bg-[#F7F7F7] p-5 w-full mt-5 mb-5"
                  placeholder="your question in here"
                  value={newQuestion}
                  onChange={handleQuestionInput}
                ></textarea>
                <div className="flex items-center jusitfy-between">
                  {options.map((op) => (
                    <div
                      onClick={() => setActiveQuestionCat(op)}
                      key={op + 1}
                      className={`py-2 px-2 ${
                        activeQuestionCat == op
                          ? "text-white bg-[#530DF6]"
                          : "text-black bg-[#F7F7F7]}"
                      }`}
                    >
                      {op}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center mt-5">
                  <button
                    onClick={() => saveQuestion()}
                    className="cursor-pointer bg-[#8EFF2C] px-5 py-2 shadow text-white font-semibold"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ) : null}

      {showOperationModal ? (
        <div>
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
                  <h1 className="text-2xl">{activeMessage}</h1>
                </div>
                {selectedOperation.operation !== "delete" ? (
                  <>
                    <textarea
                      className="bg-[#F7F7F7] p-5 w-full mt-5 mb-5"
                      placeholder=""
                      value={selectedOperation.requiredData}
                      onChange={handleInput}
                    ></textarea>
                  </>
                ) : null}

                <div className="flex items-center justify-center mt-5 gap-3">
                  <button
                    onClick={() => performOperation()}
                    className="cursor-pointer bg-[#8EFF2C] px-5 py-2 shadow text-white font-semibold"
                  >
                    Ok
                  </button>
                  <button
                    onClick={() => setShowOperationModal(false)}
                    className="cursor-pointer bg-[#FF0000] px-5 py-2 shadow text-white font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ) : null}

      <h2 className="text-2xl">{`Frequently asked questions for project ${activeProject?.name}`}</h2>
      <div className="grid gap-5 grid-cols-3 justify-between content-center bg-white items-center shadow-lg w-1/2 mt-5 mb-5">
        {options.map((op) => (
          <div
            key={op}
            onClick={() => handleCategoryChange(op)}
            className={`items-center justify-center py-5 pl-5 text-center cursor-pointer font-semibold ${
              active === op ? "bg-[#530DF6] text-white" : "text-black bg-white"
            }`}
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
          <img src={message} className="h-5 w-5" alt="message icon" />
        </div>
      </div>

      {noresult ? (
        <div className="flex items-center justify-center relative mb-5">
          <img src={ops} className="h-[500px]" alt="no results found" />
          <button
            onClick={() => setShowQuestionModal(true)}
            className="absolute cursor-pointer self-center bottom-20  w-[120px] rounded-sm h-[50px] rounded font-bold text-white bg-[#8EFF2C]"
          >
            Ask
          </button>
        </div>
      ) : (
        <div className="outline-2 outline-[#530DF6] mt-5 w-full h-[400px]  overflow-y-auto">
          {filteredAnswers.map((an) => (
            <div key={`${an.question}-${an.keyword}`} className="p-5">
              {
                <div className="flex gap-[150px]">
                  <h3 className="font-bold text-black">{an.question}</h3>
                  <div>
                    <ul className="flex">
                      {btnList.map((btn) => (
                        <li
                          key={btn.name}
                          className={` ${
                            btn.name === "add" ? "" : (an.user_id === user.id)? " " : "hidden"
                          } m-1 p-1 w-[25px] h-[25px]  bg-[#FF8000] flex justify-center items-center rounded-full cursor-pointer `}
                          onClick={() => {
                            setShowOperationModal(true);
                            setActiveMessage(btn.message);
                            setSelectedOperation({
                              operation: btn.name,
                              Qid: an?.id,
                            });
                          }}
                        >
                          <img src={btn.imgSrc} alt="" className="" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
              <ul>
                {an.answer?.map((ans) => (
                  <li key={ans} className="ml-5 mt-5">
                    {ans}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            onClick={() => loadData()}
            className="btn items-center justify-center bg-[#530DF6] text-white px-2 cursor-pointer"
          >
            show more
          </button>
        </div>
      )}
    </div>
  );
};

export default Faq;
