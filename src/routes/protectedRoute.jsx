import {Outlet,Navigate} from "react-router-dom"
import Nav from "../component/nav/nav"
 

const ProtectedRoute = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    if(user&&user?.token) {
    if(user?.is_new == "new") {
     return <Navigate to="/new" />
    } else {
     return <>
     <Nav/>
     <Outlet/>
     </>
    }
    } else {
     return <Navigate to="/login"/>
    }
    
}

export default ProtectedRoute