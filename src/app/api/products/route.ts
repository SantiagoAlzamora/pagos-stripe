import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.SECRET_KEY as string)

export async function GET() {
  try {
    const products = await stripe.products.list({ active: true })
    const productsWithPrice = await Promise.all(
      products.data.map(async product => {
       
        const price = await stripe.prices.retrieve(product.default_price as string)
        
        
        return { ...product, price: Number(price.unit_amount) / 100 }
      })
    )

    return NextResponse.json( productsWithPrice, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ message:error.message }, {
      status: 500
    });
  }

}