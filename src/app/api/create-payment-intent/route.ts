
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const { amount, courseTitle, courseId, userId, isDonation } = await request.json();

    // General validation for amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return NextResponse.json({ error: 'A valid amount is required.' }, { status: 400 });
    }

    let metadata: Stripe.MetadataParam = {};
    let description: string;

    if (isDonation) {
        description = 'Donation to Upskill Global Impact';
        metadata = {
            donation: 'true',
            amount: (amount / 100).toFixed(2)
        };
    } else if (courseId) {
        if (!courseTitle || !userId) {
            return NextResponse.json({ error: 'Invalid course purchase data provided.' }, { status: 400 });
        }
        metadata = { courseId, courseTitle, userId };
        description = `Purchase of course: ${courseTitle}`;
    } else { // It's a membership purchase
        if (!userId) {
             return NextResponse.json({ error: 'User ID is required for membership purchase.' }, { status: 400 });
        }
        metadata = { userId, membership: 'winner-circle' };
        description = 'Winner Circle Membership';
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      description,
      metadata,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
