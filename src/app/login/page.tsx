'use client'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Login() {
    const router = useRouter()
    const [user,setuser] = useState({
        email:"",
        password:""
        
    })
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [loading,setLoading]=useState(false)

    const onLogin = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user)
            console.log("Login successfull",response.data)
            router.push("/profile")
            
        } catch (error:any) {
            console.log("Login failed")
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.password.length>0 && user.email.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"Login"}</h1>
            <hr/>
           

            <label htmlFor="email">Email</label>
           <input className="bg-white text-black p-2 border border-gray-500 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
           id='email'
           value={user.email}
           onChange={(e)=>{setuser({...user, email : e.target.value})}}
           placeholder="email"
           type='text'/>

            <label htmlFor="password">Password</label>
           <input className="bg-white text-black p-2 border border-gray-500 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
           id='password'
           value={user.password}
           onChange={(e)=>{setuser({...user, password : e.target.value})}}
           placeholder="password"
           type='password'/>
         <button className="p-2 mt-2 border border-gray-500 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
         onClick={onLogin}>
            {buttonDisabled?"Fill the Form" : "Login"}
         </button>
         <Link href="/signup">Visit Sign UP Page</Link>
        </div>
    )
}

export default Login