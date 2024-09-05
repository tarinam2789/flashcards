import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Adjust the API version as needed
})

const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100)
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    if (!session_id) {
      throw new Error('Session ID is required')
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    return NextResponse.json(checkoutSession)
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}

export async function POST(req) {
  const { subscriptionType } = await req.json(); // Expecting a JSON body with subscriptionType

  try {
    // Define prices based on subscription type
    let unitAmount;
    switch (subscriptionType) {
      case 'basic':
        unitAmount = formatAmountForStripe(5, 'usd'); // $5.00 in cents
        break;
      case 'pro':
        unitAmount = formatAmountForStripe(10, 'usd'); // $10.00 in cents
        break;
      default:
        throw new Error('Invalid subscription type');
    }

    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${subscriptionType.charAt(0).toUpperCase() + subscriptionType.slice(1)} subscription`,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkoutSession = await stripe.checkout.sessions.create(params)

    return NextResponse.json(checkoutSession, {
      status: 200,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}