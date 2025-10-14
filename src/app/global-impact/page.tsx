
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const presetAmounts = [10, 25, 50, 100, 250, 500];

const DonationForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('');

    const handleAmountSelect = (selectedAmount: number) => {
        setAmount(selectedAmount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (Number(value) > 0) {
            setAmount(Number(value));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            toast({ title: 'An error occurred.', variant: 'destructive', description: "Stripe is not available." });
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
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: Math.round(amount * 100), // amount in cents
                    isDonation: true,
                }),
            });

            const { clientSecret, error: backendError } = await response.json();

            if (backendError) throw new Error(backendError);

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (stripeError) throw stripeError;

            if (paymentIntent?.status === 'succeeded') {
                toast({
                    title: 'Thank You for Your Donation!',
                    description: `Your generous gift of $${amount.toFixed(2)} will make a difference.`,
                });
                 setCustomAmount('');
                 setAmount(50);
                 cardElement.clear();
            } else {
                throw new Error(paymentIntent?.status || "Payment failed with an unknown status.");
            }

        } catch (error) {
            let errorMessage = "An unexpected error occurred.";
            if (error instanceof Error) errorMessage = error.message;
            else if (typeof (error as StripeError).message === 'string') errorMessage = (error as StripeError).message;
            toast({ title: 'Payment Failed', description: errorMessage, variant: 'destructive' });
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
            '::placeholder': { color: 'hsl(var(--muted-foreground))' },
          },
          invalid: {
            color: 'hsl(var(--destructive))',
            iconColor: 'hsl(var(--destructive))',
          },
        },
    };

    return (
        <Card className="max-w-lg mx-auto shadow-2xl">
            <CardHeader>
                <CardTitle>Your gift changes, one life at a time.</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-muted-foreground">
                        Your contribution today will provide education, training and inspire the next generation of health and STEM professionals in underserved global communities. Together, we can build a healthier, more equitable world. Make your gift today!
                    </p>
                    <div>
                        <label className="text-sm font-medium">Donation Amount *</label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {presetAmounts.map(preset => (
                                <Button
                                    key={preset}
                                    type="button"
                                    variant={amount === preset && customAmount === '' ? 'default' : 'outline'}
                                    onClick={() => handleAmountSelect(preset)}
                                >
                                    ${preset.toFixed(2)}
                                </Button>
                            ))}
                        </div>
                         <Input
                            type="number"
                            placeholder="Enter custom amount"
                            className="mt-2"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            min="1"
                        />
                    </div>
                     <div className="p-3 border rounded-md bg-background">
                       <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
                     </div>
                    <Button type="submit" disabled={!stripe || isLoading} className="w-full text-lg h-12">
                        {isLoading ? <Loader2 className="animate-spin" /> : `Donate now`}
                         <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" /> 100% Secure Donation
                    </p>
                </form>
            </CardContent>
        </Card>
    );
};

export default function GlobalImpactPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <PublicHeader />
            <main className="flex-grow">
                 <motion.section
                    className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image src="https://picsum.photos/seed/flags/1200/400" alt="International flags" fill className="object-cover" data-ai-hint="international flags"/>
                    <div className="absolute inset-0 bg-black/50"></div>
                     <div className="container relative mx-auto px-4">
                        <motion.h1 
                          className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-white"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Global Impact
                        </motion.h1>
                    </div>
                </motion.section>

                <section className="-mt-20 relative z-10 pb-16 md:pb-24">
                     <div className="container mx-auto px-4">
                        <Elements stripe={stripePromise}>
                            <DonationForm />
                        </Elements>
                    </div>
                </section>
                
                <motion.section 
                  className="py-16 md:py-24 bg-muted/30"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Join Our Global Movement</h2>
                        <div className="mt-8 max-w-2xl mx-auto space-y-4">
                             <Button variant="outline" size="lg" className="w-full h-16 text-xl justify-between hover:bg-primary hover:text-primary-foreground">
                                UPSKILL Africa <ArrowRight/>
                             </Button>
                             <Button variant="outline" size="lg" className="w-full h-16 text-xl justify-between hover:bg-primary hover:text-primary-foreground">
                                UPSKILL Asia-Pacific <ArrowRight/>
                             </Button>
                             <Button variant="outline" size="lg" className="w-full h-16 text-xl justify-between hover:bg-primary hover:text-primary-foreground">
                                UPSKILL South America <ArrowRight/>
                             </Button>
                        </div>
                    </div>
                </motion.section>
            </main>
            <Footer />
        </div>
    );
}

