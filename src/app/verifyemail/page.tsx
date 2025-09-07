'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


function VerifyEmail() {
    const searchParams = useSearchParams()
    const [token,setToken]=useState("")
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState("")

    const verifyUserEmail = async (token:string)=>{
        try {
            const response = await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
            setError("")
            toast.success("Email verification successfull")
            console.log('here')
        } catch (error:any) {
            setError("Email verification failed")
            console.log(error.response.data)
            toast.error("Email verification failed")
        }
    }
    useEffect(()=>{
        setError("")
        const urltoken = searchParams.get('token') || ''
       

        console.log(urltoken)
        if(urltoken.length>0){
            setToken(urltoken)
            verifyUserEmail(urltoken) 
        }
    },[])
   
  return (
    <div className='flex flex-col justify-center text-center'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h1 className='p-2 bg-orange-100 text-black'>{token?`${token}`:"no token"}</h1>
          {/* ✅ Show success/failure message below */}
            {verified && <p className="text-green-600 font-semibold mt-2">✅ Email verified successfully!</p>}
            {error && !verified && <p className="text-red-600 font-semibold mt-2">❌ {error}</p>}
    </div>
  )
}

export default VerifyEmail