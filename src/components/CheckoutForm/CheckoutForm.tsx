import styles from './styles.module.css'
import { useProductStore } from '@/store/productStore'
import axios from 'axios'
import { FormEvent } from 'react'

export default function CheckoutForm() {
  const selectedProduct = useProductStore(state => state.selectedProduct)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const {data} = await axios.post(`https://pagos-stripe.vercel.app/api/checkout`, {
      price_id: selectedProduct?.default_price
    }, {
      headers: {
        "Content-Type": "Application/json"
      }
    })
    
    
    window.location.href = data.url
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className={styles.button}>Pagar</button>
    </form>
  )
}
