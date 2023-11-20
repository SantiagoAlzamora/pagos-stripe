"use client"
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import styles from './page.module.css'
import ProductList from '@/components/ProductList/ProductList'
import { useProductStore } from '@/store/productStore'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Loader from '@/components/Loader/Loader'

export default function Home() {
  const fetchProducts = useProductStore(state => state.fetchProducts)
  const products = useProductStore((state) => state.products)
  const selectedProduct = useProductStore(state => state.selectedProduct)
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <main className={styles.main}>
      <h1>Elige un producto</h1>
      {products.length > 0
        ?
        <ProductList products={products} />
        :
        <div style={{marginTop:20}}><Loader /></div> 
      }


      {selectedProduct && <CheckoutForm />}
    </main>
  )
}
