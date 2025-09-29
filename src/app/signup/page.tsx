
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, AuthProvider as FirebaseAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSignUp = async (provider?: FirebaseAuthProvider) => {
        setIsLoading(true);
        try {
            if (provider) {
                // For social sign-up, we assume agreement by proceeding.
                await signInWithPopup(auth, provider);
            } else {
                // For email sign-up, explicitly check the box.
                if (!agreedToTerms) {
                    toast({
                        title: "Agreement Required",
                        description: "You must agree to the Terms of Service and Privacy Policy.",
                        variant: "destructive",
                    });
                    setIsLoading(false);
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: `${firstName} ${lastName}`
                });
            }
            router.push('/dashboard');
        } catch (error: any) {
            toast({
                title: "Sign-up Failed",
                description: error.code === 'auth/unauthorized-domain' 
                    ? "This domain is not authorized for authentication. Please check your Firebase console settings."
                    : error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const GoogleIcon = () => (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5_29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
    );

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold">
                        <Logo />
                    </Link>
                </div>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                        <CardDescription>
                            Join a global community of professionals.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className="space-y-4">
                            <div className="space-y-4">
                               <Button variant="outline" className="w-full" type="button" onClick={() => handleSignUp(googleProvider)} disabled={isLoading}>
                                <GoogleIcon />
                                <span className="ml-2">Sign up with Google</span>
                              </Button>
                              <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                  <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                  <span className="bg-card px-2 text-muted-foreground">
                                    Or sign up with email
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="first-name">First Name</Label>
                                  <Input id="first-name" placeholder="Ada" required value={firstName} onChange={e => setFirstName(e.target.value)} disabled={isLoading}/>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="last-name">Last Name</Label>
                                  <Input id="last-name" placeholder="Lovelace" required value={lastName} onChange={e => setLastName(e.target.value)} disabled={isLoading}/>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading}/>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading}/>
                              </div>
                               <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} />
                                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                                    I agree to the <Link href="#" className="underline text-primary">Terms of Service</Link> and <Link href="#" className="underline text-primary">Privacy Policy</Link>.
                                </Label>
                               </div>
                              <Button type="submit" className="w-full" disabled={isLoading || !agreedToTerms}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                              </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center text-sm">
                        <p className="text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
