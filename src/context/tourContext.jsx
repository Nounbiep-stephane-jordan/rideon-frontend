


import { createContext, useContext, useState } from 'react';



const TourContext = createContext({
  isTourActive: false,
  stepIndex: -1,
  startTour: (steps) => {},
  stopTour: () => {},
  setStepComplete: (complete) => {},
  hasCompletedTour: false
});

export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourSteps, setTourSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);

  const startTour = (steps) => {
    setTourSteps(steps);
    setIsTourActive(true);
    setHasCompletedTour(false);
  };

  const stopTour = () => {
    setIsTourActive(false);
    setTourSteps([]);
    setStepIndex(0);
  };

  const setStepComplete = (complete) => {
    setHasCompletedTour(complete);
  };

  return (
    <TourContext.Provider value={{ 
      isTourActive,
      stepIndex,
      startTour,
      stopTour,
      setStepComplete,
      hasCompletedTour
    }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);