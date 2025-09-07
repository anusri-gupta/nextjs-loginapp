"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

function Profilepage() {
  const router = useRouter()
  const [user,setUser]=useState({
    username:"",
    email:"",
  })
const getProfileData = async ()=>{
  try {
      const res = await axios.post("/api/users/me")
      console.log(res.data)
      
     setUser({
  username: res.data.data.username,
  email: res.data.data.email,
});

  } catch (error:any) {
    console.log("problem in data fetching")
    console.log(error.message)
  }


}
const logout = async ()=>{
  try {
      const res = await axios.get("/api/users/logout")
      console.log(res.data)
      toast.success("You have logged out successfully")
      router.push("/login")
  } catch (error:any) {
    console.log("logout un successfull")
    console.log(error.message)
  }
}
useEffect(()=>{
  getProfileData()
},[])

  return (
    <div className='flex flex-col text-center items-center justify-center'>
      <label>Email:{user.email===""?"--":user.email}</label>
      <label>Username:{user.username===""?"--":user.username}</label>
      <Link href={`/profile/${user.username}`}>
      <button className='mt-4 bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 rounded-2xl'
      >Go to user</button>
      </Link>
      
      <button className='mt-4 bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 rounded-2xl'
      onClick={logout}>Logout</button>
    </div>
  )
}

export default Profilepage