/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGlobalVariables } from '../../../context/global';
import API from '../../../api/api';
import { useNavigate } from 'react-router-dom';


const Step1 = ({standards,descriptions,setDescriptions,handleStandardChange}) => {
     return (
          <motion.div
          key="step1"
          initial={{ opacity: 0,  }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0, }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
    
         <div className='flex flex-row items-center justify-between'>
    
         <div>
         <h3 className="text-2xl font-semibold mb-2">Codding standards</h3>
          <div className="">
            <textarea
              className="w-80 p-2 text-lg text-[#757575]"
              value={descriptions[0]}
              onChange={(e) => setDescriptions([e.target.value])}
              placeholder="Enter a brief description of the codding standards you follow..."
            />
          </div>
    
         </div>
         
          <div className='w-80 self-start'>
              <img className='' src={"/standard.jpg"} alt="standard"/>
         </div>
    
         </div>
          
          <div className="space-y-2 flex items-center flex-row justify-evenly p-2 relative">
    
            {standards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-2 mr-5"
              >
                <textarea
                  className="w-60 h-60 p-5 rounded shadow-lg bg-white shadow-[#D9D9D9]"
                  value={standard}
                  onChange={(e) => handleStandardChange(index, e.target.value)}
                  placeholder={`Standard ${index + 1}...`}
                />
              </motion.div>
            ))}
    
    
    
          </div>
        </motion.div>
     )
  }

  const Step2 = ({step2Data,setStep2Data}) => {
     return (
          <motion.div
          key="step2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold">Git workflow</h3>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className=''>
            <h2 className='mt-5'>Bad Commits</h2>
            <textarea
              className="w-1/2 p-2 shadow h-50 w-50 border rounded"
              value={step2Data.left}
              onChange={(e) => setStep2Data(prev => ({ ...prev, left: e.target.value }))}
              placeholder="Enter an exmaple of what a bad commit looks like in your workflow ..."
            />
            </div>
    
            <div className=''>
            <h2 className='mt-5'>Good Commits</h2>
            <textarea
              className="w-1/2 p-2 shadow h-50 w-50 border rounded"
              value={step2Data.right}
              onChange={(e) => setStep2Data(prev => ({ ...prev, right: e.target.value }))}
              placeholder="Enter an exmaple of what a good commit looks like in your workflow ..."
            />
            </div>
    
          </div>
        </motion.div>
     )
  }

  const Step3 =({setStep3Data,step3Data}) => {
     return (
          <motion.div
          key="step3"
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0, }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {[{index:0,heading:"Review process",description:"Enter a brief description of the waht hte review process for code looks like "}, {index:1,heading:"Communication rules",description:"Enter a brief description of the communication rules of the company"}, {index:2,heading:"Support channels",description:"Enter a brief descrition of the support cahnnles avilable in your company..."}].map((val) => (
            <div key={val.heading} className="space-y-2">
              <h3 className="text-2xl font-semibold">{val.heading}</h3>
              <textarea
                className="w-full p-2 border rounded"
                value={step3Data[val.index]}
                onChange={(e) => {
                  const newData = [...step3Data];
                  newData[val.index] = e.target.value;
                  setStep3Data(newData);
                }}
                placeholder={`${val.description}...`}
              />
            </div>
          ))}
        </motion.div>
     )
  }


const saveDataInBackend = (githubPhaseConfigData,meetTheTeamConfigData,installationGuidesConfigData,coddingStandardsConfigData,handleCleanWizardConfig,gotToDashBoard) => {
    //save to backend
    const projectData = {
      title: installationGuidesConfigData.textData.projectName,
      description: installationGuidesConfigData.textData.projectDescription,
      installationGuide:installationGuidesConfigData,
      codingStandards: coddingStandardsConfigData,
      meetTheTeam: meetTheTeamConfigData,
      githubWorkflow: githubPhaseConfigData
    };
    let user = JSON.parse(localStorage.getItem("user"))
             API.post('/wizard-config-save',{userId:user.id,projectData})
          .then((res) =>{
            console.log(res,"good response")
            //only after sucessfully inserting you clean the wizard
            handleCleanWizardConfig()
            gotToDashBoard()

          })
          .catch((err) => console.log(err,"in handle wizard clean config"))
}

const CoddingStandardsConfig = () => {
  const {coddingStandardsConfigData,setCoddingStandardsConfigData,handleCleanWizardConfig,githubPhaseConfigData,meetTheTeamConfigData,installationGuidesConfigData} = useGlobalVariables()
  const navigate = useNavigate()
  const [active, setActive] = useState({
     value:"step1",
     key:"1-cod-nav"
  });
  const [descriptions, setDescriptions] = useState( coddingStandardsConfigData.descriptions||['']);
  const [standards, setStandards] = useState(coddingStandardsConfigData.standards||['']);
  const [step2Data, setStep2Data] = useState( coddingStandardsConfigData.step2Data || { left: '', right: '' });
  const [step3Data, setStep3Data] = useState(coddingStandardsConfigData.step3Data ||['', '', '']);

  useEffect(()=> {
    setCoddingStandardsConfigData((prev) => ({
      ...prev,descriptions,standards,step2Data,step3Data
    }))
  },[descriptions,standards,step2Data,step3Data])
  

  const handleAddStandard = useCallback(() => {
    setStandards(prev => [...prev, '']);
  }, []);

  const handleStandardChange = useCallback((index, value) => {
    setStandards(prev => {
      const newStandards = [...prev];
      newStandards[index] = value;
  
     return  newStandards.filter(standard => standard.trim() !== '');
    });
  }, []);



  const StepsArray = [{index:0,key:"cod-step0",name:"step1"}, {index:1,key:"cod-step1",name:"step2"}, {index:2,key:"cod-step2",name:"step3"}]
 const allSteps = { 
    step1: <Step1 key={"step-oneunique"} setDescriptions={setDescriptions} descriptions={descriptions} handleStandardChange={handleStandardChange} standards={standards} />,
    step2:<Step2 key={"step-twounique"} step2Data={step2Data} setStep2Data={setStep2Data}/>,
  step3: <Step3 key={"step-threeunique"} setStep3Data={setStep3Data} step3Data={step3Data} />
}
return (
    <div className="flex justify-center mt-5">
     <div className="p-10 w-[800px] bg-white shadow-lg border-[2px] border-[#D9D9D9] rounded-tl-lg rounded-bl-lg">

     <div className="relative h-70 overflow-x-scroll custom-scrollbar">
          {allSteps[active.value]}  
      </div>

      {active.value === "step1" &&  <div className="flex items-center">
      <p className=''> Schroll down and click to add a standard</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1"
            onClick={handleAddStandard}
          >
  
             <img alt="plus image " className="w-5 cursor-pointer" src="/icons-plus.png"/>
          </motion.button>
        </div>
}
      <div className="flex justify-center mt-6 space-x-4">
        {StepsArray.map((step) => (
          <motion.button
            key={step.key}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2"
            onClick={(e) => {
               e.stopPropagation()
               setActive({value:step.name,key:step.key})
            }}
          >
            <div className={`w-8 h-8 rounded-full ${active.value === step.name ? 'bg-blue-500' : 'bg-gray-300'}`} />
            {active.value === step.name && (
              <motion.div
                className="absolute inset-0 border-2 border-blue-500 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

     </div>

     <button onClick={() => {
     saveDataInBackend(githubPhaseConfigData,meetTheTeamConfigData,installationGuidesConfigData,coddingStandardsConfigData,handleCleanWizardConfig,() => navigate("/"))
     }} className='blue-bg text-white 2xl p-[10px] cursor-pointer rounded-tr-lg rounded-br-lg'>Finish</button>
    </div>
  );
};

export default CoddingStandardsConfig;