
// eslint-disable-next-line react/prop-types
const BlueBox = ({text,h=50,w=50}) => {

     return (
          <div className={`blue-bg shadow-lg p-5 rounded-sm h-${h} w-${w}`}>
               <p className="text-white text-[10px] text-left">{text}</p>
          </div>
     )
}

export default BlueBox