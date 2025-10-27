
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Crown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WinnerCirclePage() {
    return (
        <div className="p-4 md:p-8">
            <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 text-white">
                <CardContent className="p-8 md:p-12 text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <Award className="w-20 h-20 mx-auto text-yellow-300" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mt-4">
                        Join the Winner Circle
                    </h1>
                    <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                        Unlock your full potential by upgrading to our premium membership. Get exclusive access to everything you need to accelerate your career.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                        <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                            <h3 className="font-semibold text-xl mb-4">Winner Circle Benefits:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1"/><span>Unlimited access to all courses and learning paths</span></li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1"/><span>AI-powered career insights & personalized recommendations</span></li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1"/><span>Exclusive group coaching sessions with C-suite executives</span></li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1"/><span>Priority access to networking events and leadership summits</span></li>
                            </ul>
                        </div>
                         <div className="bg-white/10 p-6 rounded-lg border border-white/20 flex flex-col justify-center items-center">
                            <p className="text-5xl font-bold">$1.99</p>
                            <p className="text-blue-200">one-time introductory offer</p>
                             <Button asChild size="lg" className="w-full mt-6 bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500">
                                <Link href="/checkout">Upgrade Now</Link>
                            </Button>
                            <p className="text-xs text-blue-200 mt-2">30-day money-back guarantee</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
