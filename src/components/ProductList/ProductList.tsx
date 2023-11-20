import { IProduct } from '@/types/types'
import React from 'react'
import ProductItem from '../ProductItem/ProductItem'
import styles from './styles.module.css'

interface Props{
  products : IProduct[]
  
}

export default function ProductList({products}:Props) {
  
  return (
    <div className={styles.products}>
      {products.map(product=><ProductItem key={product.id} product={product}/>)}
    </div>
  )
}
