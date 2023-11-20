"use client"
import Countdown from '@/components/Countdown/Countdown'
import Loader from '@/components/Loader/Loader'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function page() {
  const [status, setStatus] = useState<"success" | "canceled">()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get("success")) setStatus("success")
    if (query.get("canceled")) setStatus("canceled")
  }, [])

  const options = {
    success: {
      icon: "/Success.svg",
      text: "Pago realizado exitosamente",
      color: "#29bf81"
    },
    canceled: {
      icon: "/Error.svg",
      text: "Hubo un problema al realizar el pago",
      color: "#da4439"
    }
  }

  return (
    <main className={styles.main}>
      {status && (
        <div style={{backgroundColor:options[status].color}} className={styles.paymentContainer}>
          <img className={styles.paymentImg} src={options[status].icon} />
          <span className={styles.paymentText}>{options[status].text}</span>
        </div>
      )}
      <Loader />
      <span>
        Redirigiendo en <Countdown time={5} redirect='/' /> segundos...
      </span>
    </main>
  )
}
