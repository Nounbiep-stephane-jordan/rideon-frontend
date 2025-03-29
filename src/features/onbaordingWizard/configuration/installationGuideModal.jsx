/* eslint-disable react-hooks/exhaustive-deps */


import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import fleft from "../../../assets/fleft-orange.webp"
import fright from "../../../assets/fright-orange.webp"
import { useGlobalVariables } from '../../../context/global';
import API from '../../../api/api';

const StepModal = ({onClose}) => {
      const {installationGuidesConfigData,setInstallationGuidesConfigData} = useGlobalVariables() // get the wizaad data if it had it
 


  const [files,setFiles] = useState(null)
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState( installationGuidesConfigData.steps || []);
  const [newStep, setNewStep] = useState({
    name: '',
    description: '',
    image: null,
  });


         useEffect(()=> {
           setInstallationGuidesConfigData((prev)=>({
               ...prev,steps
           }))
            
         },[steps])
 



  const handleAddStep = async() => {
    if (steps.length >= 6) return;

    if (newStep.description || newStep.image || newStep.name) {
      let newtobeaddedstep = { ...newStep, id: Date.now() }
      
      let exist =  steps.some((step) => step.image === newtobeaddedstep.image)
      if(exist) setNewStep({ name: '', description: '', image: null });
      else {
        let user = await JSON.parse(localStorage.getItem("user"))
        await API.post("/upload",{images:files,username:user?.user_name},{
           headers:{"Content-Type":"multipart/form-data"}
         }).then((res) => {
           console.log(res)
           setSteps([...steps, { ...newStep, id: Date.now() }]);
         }).catch((err) => {
           console.log(err)
         })
      }
     }
     
     setNewStep({ name: '', description: '', image: null });
 

  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStep({ ...newStep, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavigation = (direction) => {
     const updatedSteps = [...steps]
     updatedSteps[currentStep] = {...newStep}
     setNewStep(updatedSteps)
     const newStepIndex = Math.max(0, Math.min(steps.length - 1, currentStep + direction))
     setCurrentStep(newStepIndex)
     if(steps[newStepIndex]){
          setNewStep({...steps[newStepIndex]})
     } else {
          setNewStep({name:'',description:'',image:null,})
     }

  };

  return (
    <div>


      <AnimatePresence>
  
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[99999]"
          >
     
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg"
            >
               <h1 className='text-left'>Add Steps</h1>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Step name"
                  value={newStep.name}
                  onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Step description"
                  value={newStep.description}
                  onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                  className="w-full p-2 border rounded h-24"
                />
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded cursor-pointer"
                  >
                    {newStep.image ? (
                      <img src={newStep.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                         <div className="cursor-pointer self-center">
                         <img className="w-7" alt="plus" src="/icons-plus.png" />
                     </div>
                    )}
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handleAddStep}
                    disabled={steps.length >= 6}
                    className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                  >
                    Add Step ({steps.length}/6)
                  </button>

                  {steps.length > 0 && (
                    <div className="flex items-center gap-2">
                      <img 
                        src={fleft}
                        onClick={() => handleNavigation(-1)}
                        className="w-5 cursor-pointer"
                        alt="left"
                      />
                      <span>{currentStep + 1} / {steps.length}</span>
                      <img
                        src={fright} 
                        onClick={() => handleNavigation(1)}
                        className="w-5 cursor-pointer"
                        alt="right"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onClose()}
                  className="w-full py-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  Save and Close
                </button>
              </div>
            </motion.div>
          </motion.div>
          
    
      </AnimatePresence>
    </div>
  );
};

export default StepModal;