import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface CountdownProps{
  time:number,
  redirect:string
}

export default function Countdown({time,redirect}:CountdownProps) {
  const[countdown, setCountdown]= useState(time)
  const router = useRouter()
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(countdown > 0) {
        setCountdown(prevState=>prevState-1)
      }else{
        clearInterval(interval)
        router.push(redirect)
      }
    },1000)

    return ()=> clearInterval(interval)
  },[countdown,router,redirect])
  return (
    <b>{countdown}</b>
  )
}
