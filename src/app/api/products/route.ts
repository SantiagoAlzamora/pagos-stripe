import { IProduct } from '@/types/types';
import axios from 'axios';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.SECRET_KEY as string)

interface IProductStripeResponse{
  id: string
  object: string
  active: boolean
  attributes: any[]
  created: number
  default_price: string
  description: any
  features: any[]
  images: any[]
  livemode: boolean
  metadata: Metadata
  name: string
  package_dimensions: any
  shippable: any
  statement_descriptor: any
  tax_code: any
  type: string
  unit_label: any
  updated: number
  url: any
}

export interface Metadata {}

interface IPrecioStripeResponse{
  object: string
  data: Daum[]
  has_more: boolean
  url: string
}

export interface Daum {
  id: string
  object: string
  active: boolean
  billing_scheme: string
  created: number
  currency: string
  custom_unit_amount: any
  livemode: boolean
  lookup_key: any
  metadata: Metadata
  nickname: any
  product: string
  recurring: any
  tax_behavior: string
  tiers_mode: any
  transform_quantity: any
  type: string
  unit_amount: number
  unit_amount_decimal: string
}

export interface Metadata {}


export async function GET(request: Request) {
  try {
    // const products = await stripe.products.list({ active: true }, )

    
    
    // const productsWithPrice = await Promise.all(
    //   products.data.map(async product => {
       
    //     const price = await stripe.prices.retrieve(product.default_price as string)
    // Obtener la lista de productos
    // return { ...product, price: Number(price.unit_amount) / 100 }
    //   })
    // )
    const productosResponse = await axios.get(`https://api.stripe.com/v1/products`, {
      headers: {
        'Authorization': `Bearer ${process.env.SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    
    const productos : IProduct[] = productosResponse.data.data;
    
    // Obtener los precios de los productos de forma concurrente
    const preciosPromises = productos.map((producto) => {
      return axios.get(`https://api.stripe.com/v1/prices?product=${producto.id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });
    });

    
    

    const preciosResponses : any[] = await Promise.all(preciosPromises);
    
    // Procesar los resultados de las solicitudes de precios
    const productosConPrecio : IProduct[] = [];
    for (let i = 0; i < preciosResponses.length; i++) {
      
      const precioResponse = preciosResponses[i];
      const precio = precioResponse.data.data;
      
      productosConPrecio.push({...productos[i], price: precio[0].unit_amount/100 });
    }
        
        

    return NextResponse.json( productosConPrecio, {
      status: 200
    });
  } catch (error :any) {
    return NextResponse.json({ message:error.message }, {
      status: 500
    });
  }

}