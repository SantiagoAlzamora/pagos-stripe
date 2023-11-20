import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.SECRET_KEY as string)

export async function POST(req : Request, res:any) {
  try {
    const {price_id } = await req.json();
    
    const session = await stripe.checkout.sessions.create({
      line_items:[
        
        {
          price:price_id,
          quantity:1
        }
      ],
      mode:"payment",
      payment_method_types:['card'],
      success_url:`${req.headers.get("origin")}/payment?success=true`,
      cancel_url:`${req.headers.get("origin")}/payment?canceled=true`
      
     })
    
    return NextResponse.json({ url:session.url})
  } catch (error) {
    return NextResponse.json({ message:error.message }, {
      status: error.statusCode || 500
    });
  }

}