'use client'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupPage() {
    const router = useRouter()
    const [user,setuser] = useState({
        username:"",
        password:"",
        email:""
    })
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [loading,setLoading]=useState(false)

    const onSignUp = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("signup successfull",response.data)
            router.push("/login")
            
        } catch (error:any) {
            console.log("Sign up failed")
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.password.length>0 && user.email.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"Sign Up"}</h1>
            <hr/>
            <label htmlFor="username" >User Name</label>
           <input className="bg-white text-black p-2 border border-gray-500 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
           id="username"
           value={user.username}
           onChange={(e)=>{setuser({...user, username : e.target.value})}}
           placeholder="username"
           type="text"/>

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
         onClick={onSignUp}>
            {buttonDisabled?"Fill the Form" : "Sign Up"}
         </button>
         <Link href="/login">Visit Login Page</Link>
        </div>
    )
}

export default SignupPage