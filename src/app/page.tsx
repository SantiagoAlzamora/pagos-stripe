"use client"
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import styles from './page.module.css'
import ProductList from '@/components/ProductList/ProductList'
import { useProductStore } from '@/store/productStore'
import Loader from '@/components/Loader/Loader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IProduct } from "@/types/types"

export default function Home() {
  const fetchProducts = useProductStore(state => state.fetchProducts)
  // const [products, setProducts] = useState<IProduct[]>([])
  const products = useProductStore((state) => state.products)
  const selectedProduct = useProductStore(state => state.selectedProduct)
  useEffect(()=>{
    // const fetchProducts= async()=>{        
    //     const productosResponse = await axios.get(`https://api.stripe.com/v1/products`, {
    //     headers: {
    //       'Authorization': `Bearer sk_test_51OC0qkGwtvH3PnHDyWTPHM12CfIkzI8j7Q5FFWjl1oZu6ACnNI89oCl3D1Lknacb3Q6qlCZvUlwvg53q95JyQnKT00HwAcUVkf`,
    //       'Content-Type': 'application/json'
    //     }
    //   });
      
      
    //   const productos : IProduct[] = productosResponse.data.data;
      
    //   // Obtener los precios de los productos de forma concurrente
    //   const preciosPromises = productos.map((producto) => {
    //     return axios.get(`https://api.stripe.com/v1/prices?product=${producto.id}`, {
    //       headers: {
    //         'Authorization': `Bearer sk_test_51OC0qkGwtvH3PnHDyWTPHM12CfIkzI8j7Q5FFWjl1oZu6ACnNI89oCl3D1Lknacb3Q6qlCZvUlwvg53q95JyQnKT00HwAcUVkf`,
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //   });
  
    //   const preciosResponses : any[] = await Promise.all(preciosPromises);
      
    //   // Procesar los resultados de las solicitudes de precios
    //   const productosConPrecio : IProduct[] = [];
    //   for (let i = 0; i < preciosResponses.length; i++) {
        
    //     const precioResponse = preciosResponses[i];
    //     const precio = precioResponse.data.data;
        
    //     productosConPrecio.push({...productos[i], price: precio[0].unit_amount/100 });
    //   }
    //   setProducts(productosConPrecio)
    // }
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
