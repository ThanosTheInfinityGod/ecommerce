import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.price || !body.image_url) {
    return NextResponse.json({ error: 'Missing product data' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: body.name,
              description: body.description,
              images: [body.image_url],
            },
            unit_amount: body.price * 100, // price in paisa
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('🔥 Stripe error:', err);
    return NextResponse.json({ error: 'Stripe checkout failed' }, { status: 500 });
  }
}
