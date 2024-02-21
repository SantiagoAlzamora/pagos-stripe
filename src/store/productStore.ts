import { IProduct } from '@/types/types';
import axios from 'axios'
import { create } from 'zustand';

interface State{
  products :[IProduct]|[],
  selectedProduct: IProduct|null,
  fetchProducts:()=>void,
  onSelectProduct:(product: IProduct)=>void
}

export const useProductStore = create<State>((set)=>{
  return{
    products:[],
    selectedProduct:null,
    fetchProducts: async()=>{        
      const {data} =  await axios.get("http://localhost:3000/api/products")
      
      set({
        products:data
      })
    },
    onSelectProduct:(product)=>{
      set({
        selectedProduct:product
      })
    }
  }
})

