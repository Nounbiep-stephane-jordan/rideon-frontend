/* eslint-disable react/prop-types */

import spin from "../../assets/spinner-2.gif"
const Spinner = ({text}) => {
     return (
          <div className="flex flex-col items-center fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-[99999999]">
               <img src={spin} alt="spinner"/>
               <h2 className="text-2xl">{text}</h2>
          </div>
     )
}

export default Spinner;