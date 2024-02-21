import { IProduct } from "@/types/types"
import styles from './styles.module.css'
import Image from "next/image"
import { useProductStore } from "@/store/productStore"

interface Props {
  product: IProduct
}

export default function ProductItem({ product }: Props) {
  const selectedProduct = useProductStore(state => state.selectedProduct)
  const onSelectProduct = useProductStore(state =>state.onSelectProduct)
  const { images, name, price, id } = product
  
  const isSelected = selectedProduct?.id === id
  return (
    <article onClick={()=>onSelectProduct(product)} className={isSelected ? styles.productContainerSelected : styles.productContainer}>
      <div className={styles.imgContainer}>
        {images && <Image className={styles.images} src={images[0]} width={150} height={150} alt={name} />}

        <div className={styles.priceContainer}>
          <p >{price}</p>
        </div>
      </div>
      <p className={styles.productName}>{name}</p>
      {isSelected && <p className={styles.selectedText}>Producto seleccionado</p>}
    </article>
  )
}
