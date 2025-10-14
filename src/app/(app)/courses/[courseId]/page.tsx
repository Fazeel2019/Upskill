
"use client";

import { useEffect, useState, useMemo } from "react";
import { notFound, useRouter, useParams } from "next/navigation";
import { getCourse } from "@/services/courses";
import type { Course, Section, Lecture } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { enrollInCourse } from "@/services/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle, Lock, PlayCircle, BookOpen, Clock, Award, Loader2, ShoppingCart, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


function CheckoutForm({ course, onSuccessfulPayment }: { course: Course, onSuccessfulPayment: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements || !user || !course) {
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
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: Math.round(course.price * 100), // amount in cents
                    courseId: course.id,
                    courseTitle: course.title,
                    userId: user.uid,
                 }),
            });

            const { clientSecret, error: backendError } = await response.json();

            if (backendError) throw new Error(backendError);

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.displayName || 'Anonymous User',
                        email: user.email || undefined,
                    },
                },
            });

            if (stripeError) throw stripeError;

            if (paymentIntent?.status === 'succeeded') {
                await enrollInCourse(user.uid, course);
                onSuccessfulPayment();
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
            <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>
                <p className="font-bold text-xl">${course.price}</p>
            </div>
            <div>
                <p className="text-sm font-medium mb-2">Payment Information</p>
                <div className="p-3 border rounded-md bg-background">
                    <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>
            <Button type="submit" disabled={!stripe || isLoading} className="w-full text-lg h-12">
                {isLoading ? <Loader2 className="animate-spin" /> : `Pay $${course.price}`}
            </Button>
        </form>
    );
}

function CoursePageSkeleton() {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-48" />
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
}


export default function PaidCoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const { user, profile, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const courseData = await getCourse(courseId);
            if (!courseData) {
                notFound();
                return;
            }
            setCourse(courseData);
            setLoading(false);
        };
        fetchData();
    }, [courseId]);
    
    const handleSuccessfulPayment = () => {
        toast({
            title: "Payment Successful!",
            description: "You have been enrolled in the course.",
        });
        setIsCheckoutOpen(false);
        router.push(`/learning/course/${courseId}`);
    };
    
    if (authLoading || loading) return <CoursePageSkeleton />;

    if (!course) {
        notFound();
        return null;
    }

    return (
        <div className="space-y-8">
            <Button variant="ghost" asChild>
                <Link href="/courses"><ArrowLeft className="mr-2 h-4 w-4" />Back to All Courses</Link>
            </Button>
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <p className="text-sm font-semibold text-primary">{course.category.toUpperCase()}</p>
                        <h1 className="text-4xl font-bold font-headline tracking-tight">{course.title}</h1>
                        <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
                    </div>
                    
                    <Card>
                        <CardHeader><CardTitle>What You'll Learn</CardTitle></CardHeader>
                        <CardContent>
                             <ul className="grid grid-cols-2 gap-4 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Master key concepts</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Apply practical skills</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Advance your career</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Get certified</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                        <Accordion type="single" collapsible defaultValue={course.sections[0]?.id}>
                            {course.sections.map((section, index) => (
                                <AccordionItem value={section.id} key={section.id}>
                                    <AccordionTrigger className="font-semibold text-lg">Section {index + 1}: {section.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-4">
                                            {section.lectures.map(lecture => (
                                                <li key={lecture.id} className="flex items-center gap-3 text-muted-foreground">
                                                    <PlayCircle className="w-5 h-5 text-primary/50" />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-foreground/90">{lecture.title}</p>
                                                        <p className="text-xs">{lecture.duration} mins</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
                <div className="md:col-span-1 md:sticky md:top-24">
                     <Card className="overflow-hidden">
                        <div className="relative h-56 w-full">
                           <Image 
                                src={course.thumbnailUrl}
                                alt={course.title} 
                                fill
                                style={{objectFit: "cover"}}
                                data-ai-hint={course.imageHint || "course thumbnail"}
                            />
                        </div>
                        <CardContent className="p-6 space-y-4">
                             <div className="text-center">
                                <p className="text-4xl font-bold">${course.price}</p>
                                <p className="text-sm text-muted-foreground">One-time purchase</p>
                            </div>
                            <Button size="lg" className="w-full" onClick={() => setIsCheckoutOpen(true)}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Buy Now
                            </Button>
                            <ul className="text-xs text-muted-foreground space-y-2">
                                <li className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Full lifetime access</li>
                                <li className="flex items-center gap-2"><Award className="w-4 h-4" /> Certificate of completion</li>
                            </ul>
                        </CardContent>
                     </Card>
                </div>
            </div>
            
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="sm:max-w-lg">
                     <DialogHeader>
                        <DialogTitle>Complete Your Purchase</DialogTitle>
                        <DialogDescription>Enter your payment details to enroll in the course.</DialogDescription>
                    </DialogHeader>
                    <Elements stripe={stripePromise}>
                       <CheckoutForm course={course} onSuccessfulPayment={handleSuccessfulPayment} />
                    </Elements>
                </DialogContent>
            </Dialog>
        </div>
    );
}
