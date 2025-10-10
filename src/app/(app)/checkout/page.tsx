
'use client';

import React from 'react';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { updateUserProfile } from '@/services/profile';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const { user, reloadProfile } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements || !user) {
            toast({ title: 'An error occurred.', variant: 'destructive', description: "Stripe or user details are not available." });
            setIsLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            toast({ title: 'Card details not found.', variant: 'destructive' });
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create PaymentIntent on the server
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1499 }), // amount in cents
            });

            const { clientSecret, error: backendError } = await response.json();

            if (backendError) {
                throw new Error(backendError);
            }

            // 2. Confirm the payment on the client
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.displayName || 'Anonymous User',
                        email: user.email || undefined,
                    },
                },
            });

            if (stripeError) {
                throw stripeError;
            }

            if (paymentIntent?.status === 'succeeded') {
                // 3. Update user profile in Firestore
                await updateUserProfile(user.uid, { membership: 'winner-circle' });
                await reloadProfile(); 

                toast({
                    title: 'Payment Successful!',
                    description: 'Welcome to the Winner Circle! You now have full access.',
                });
                router.push('/winner-circle');
            } else {
                 throw new Error(paymentIntent?.status || "Payment failed with an unknown status.");
            }

        } catch (error) {
            let errorMessage = "An unexpected error occurred.";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof (error as StripeError).message === 'string') {
                errorMessage = (error as StripeError).message;
            }
             toast({
                title: 'Payment Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
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
    const { user, loading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);
    
    if (loading || !user) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin h-8 w-8" /></div>
    }

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
