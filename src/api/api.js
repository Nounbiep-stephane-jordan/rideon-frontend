import axios from 'axios'

const API = axios.create({
     baseURL:"http://localhost:4000"
})

API.interceptors.request.use((config)=>{
     
     //this part adds the toke nfor all request if there it is,
     const user =JSON.parse( localStorage.getItem("user"))
     if(user?.token){
          config.headers.Authorization = `Bearer ${user.token}`
     }
     return config

     
})


//interecetps when the eror is caused by forbidden or denied acess . redirect authomatically to login
API.interceptors.response.use((response) => response,(err) => {
     if(err.response) {
          if(err.response.status === 403 || err.response.status === 401) {
               console.error("Unauhtorized redirecting")
               localStorage.removeItem("user")

               window.location.href="/login"
          }
     }
     return Promise.reject(err)
})

export default API