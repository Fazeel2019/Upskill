
'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            toast({ title: 'Stripe is not loaded.', variant: 'destructive' });
            setIsLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            toast({ title: 'Card details not found.', variant: 'destructive' });
            setIsLoading(false);
            return;
        }

        toast({
            title: 'Processing Payment...',
            description: 'This is a demo. No payment will be processed.',
        });

        // In a real application, you would create a PaymentMethod and then
        // send the ID to your server to create a PaymentIntent.
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: cardElement,
        //     billing_details: {
        //         name: user?.displayName || 'Guest',
        //         email: user?.email || '',
        //     },
        // });

        // if (error) {
        //     toast({ title: error.message, variant: 'destructive' });
        // } else {
        //     console.log('[PaymentMethod]', paymentMethod);
        //     // Send paymentMethod.id to your server
        //     toast({ title: 'Payment Successful!', description: 'Welcome to the Winner Circle!'});
        // }

        setTimeout(() => {
             setIsLoading(false);
        }, 2000);
    };

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: 'hsl(var(--foreground))',
            fontFamily: 'inherit',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: 'hsl(var(--muted-foreground))',
            },
          },
          invalid: {
            color: 'hsl(var(--destructive))',
            iconColor: 'hsl(var(--destructive))',
          },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="card-element">Credit or debit card</Label>
                <div className="mt-2 p-3 border rounded-md bg-background">
                    <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>

            <Button type="submit" disabled={!stripe || isLoading} className="w-full text-lg h-12">
                {isLoading ? <Loader2 className="animate-spin" /> : `Pay $14.99`}
            </Button>
        </form>
    );
};

const CheckoutPage = () => {
    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Checkout</CardTitle>
                        <CardDescription>You're joining the Winner Circle. Welcome!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 p-4 bg-muted rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Winner Circle Membership</p>
                                <p className="text-sm text-muted-foreground">Billed monthly</p>
                            </div>
                            <p className="font-bold text-xl">$14.99</p>
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                         <p className="text-xs text-muted-foreground text-center mt-4">
                            By clicking Pay, you agree to our <Link href="#" className="underline">Terms</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                         </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CheckoutPage;
