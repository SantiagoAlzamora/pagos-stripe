"use client"
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import styles from './page.module.css'
import ProductList from '@/components/ProductList/ProductList'
import { useProductStore } from '@/store/productStore'
import Loader from '@/components/Loader/Loader'
import { useEffect } from 'react'

export default function Home() {
  //const fetchProducts = useProductStore(state => state.fetchProducts)
  const [products, setProducts] = useState([])
  //const products = useProductStore((state) => state.products)
  const selectedProduct = useProductStore(state => state.selectedProduct)
  useEffect(()=>{
    const fetchProducts= async()=>{        
      const {data} =  await axios.get("https://pagos-stripe.vercel.app/api/products")
      setProducts(data)
      console.log(data)
    }
    fetchProducts()
    
  },[])
  

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
