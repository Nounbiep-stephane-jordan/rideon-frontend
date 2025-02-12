import "./style.css"
// eslint-disable-next-line react/prop-types
const BlueBox = ({text}) => {

     return (
          <div className="w-50 h-50 blue-bg shadow-lg p-5 rounded-sm">
               <p className="text-white text-small text-left">{text}</p>
          </div>
     )
}

export default BlueBox