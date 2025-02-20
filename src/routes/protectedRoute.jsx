import {Outlet,Navigate} from "react-router-dom"
 

const ProtectedRoute = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    if(user&&user?.token) {
    if(user?.is_new == "new") {
     return <Navigate to="/new" />
    } else {
     return <Outlet/>
    }
    } else {
     return <Navigate to="/login"/>
    }
    
}

export default ProtectedRoute