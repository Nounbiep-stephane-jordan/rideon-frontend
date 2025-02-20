
const wizardConfigCard = ({title,default:def,imagesource,iconSource}) => {
  return (
    <div>
        <div>{title}</div>
        <div><input placeholder={def}/></div>
        <div>
            <div><img src={imagesource} alt="image"/></div>
            <div><img src={iconSource} alt="icon"/></div>
        </div>
        {(title === "Project Goal" || title === "Project impact")? (<div></div>) : (<div></div>)}
    </div>
  )
}

export default wizardConfigCard