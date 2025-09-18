
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, UsersIcon, BarChart, Zap, Star, ShieldCheck, Trophy, Group, Briefcase, Calendar, Verified, BrainCircuit, Users, HeartHandshake, Goal, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
    { title: "AI-Powered Career Insights", icon: BrainCircuit },
    { title: "Expert Mentorship Network", icon: Users },
    { title: "Exclusive Leadership Events", icon: Trophy },
    { title: "Advanced Career Analytics", icon: BarChart },
    { title: "Verified Professional Network", icon: Verified },
    { title: "Accelerated Skill Development", icon: Zap },
    { title: "Strategic Goal Framework", icon: Goal },
    { title: "Industry Recognition Program", icon: Award },
    { title: "Elite Community Forums", icon: HeartHandshake },
];

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    title: "CMO, MedTech Innovations",
    quote: "Secured my CMO role in just 6 months, leading to a 150% salary increase.",
    image: "https://picsum.photos/seed/testimonial1/100/100",
    result: "+150% Salary Increase"
  },
  {
    name: "Marcus Rodriguez",
    title: "Sr. Data Scientist, BioAnalytics Corp",
    quote: "I received 5 job offers from top-tier companies thanks to the C-suite networking opportunities.",
    image: "https://picsum.photos/seed/testimonial2/100/100",
    result: "5 Job Offers"
  },
  {
    name: "Dr. Emily Watson",
    title: "Research Director, Genomics Institute",
    quote: "Gaining over 200 new, meaningful connections has dramatically expanded my leadership.",
    image: "https://picsum.photos/seed/testimonial3/100/100",
    result: "200+ New Connections"
  },
  {
    name: "James Park",
    title: "VP Engineering, HealthTech Solutions",
    quote: "The leadership coaching helped me get promoted 8 months ahead of schedule and double my team's size.",
    image: "https://picsum.photos/seed/testimonial4/100/100",
    result: "Promoted 8 Months Early"
  },
  {
    name: "Dr. Lisa Thompson",
    title: "Clinical Research Lead, Pharma Dynamics",
    quote: "The peer support was incredible. I won three leadership awards this year alone.",
    image: "https://picsum.photos/seed/testimonial5/100/100",
    result: "3 Leadership Awards"
  },
  {
    name: "Alex Kumar",
    title: "Principal Scientist, Biotech Innovations",
    quote: "Learning cutting-edge skills here was directly responsible for my promotion to Principal Scientist.",
    image: "https://picsum.photos/seed/testimonial6/100/100",
    result: "Promotion to Principal"
  },
  {
    name: "Dr. Rachel Kim",
    title: "Head of Innovation, Digital Health Corp",
    quote: "The career growth framework helped me chart a path to my current Head of Innovation role.",
    image: "https://picsum.photos/seed/testimonial7/100/100",
    result: "New Leadership Role"
  },
  {
    name: "Michael Torres",
    title: "Senior Scientist, Pharmaceutical Research Inc",
    quote: "The exceptional networking led to two breakthrough collaborations and a promotion.",
    image: "https://picsum.photos/seed/testimonial8/100/100",
    result: "Breakthrough Collaborations"
  },
];


export default function Home() {
  const duplicatedFeatures = [...features, ...features];
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      <PublicHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden">
           <div className="absolute inset-0 hero-gradient"></div>
           <div className="container relative mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-white">
                  Premier Community Platform for STEM & Healthcare Professionals
                </h1>
                <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                  Join 10,000+ professionals advancing their careers through expert coaching, exclusive networking, and AI-powered insights.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-lg shadow-primary/20">
                    <Link href="/signup">Join Now For Free</Link>
                  </Button>
                </div>
              </motion.div>
           </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 relative">
             <div className="container mx-auto px-4 text-center mb-12">
                <Badge variant="outline" className="mb-4 font-semibold text-primary border-primary/50 bg-primary/10">Platform Features</Badge>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                 Everything You Need to Accelerate Your Career
                </h2>
             </div>
             <div className="relative overflow-hidden group">
                <div className="flex animate-scroll-x group-hover:[animation-play-state:paused] w-max gap-6 py-4">
                  {duplicatedFeatures.map((feature, index) => (
                    <div key={index} className="glass-card gradient-border p-6 w-72 h-48 flex flex-col justify-center items-center text-center transition-transform duration-300 hover:-translate-y-2">
                       <feature.icon className="w-8 h-8 text-primary mb-3" />
                       <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                    </div>
                  ))}
                </div>
             </div>
        </section>

        {/* Success Stories Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 font-semibold text-primary border-primary/50 bg-primary/10">Success Stories</Badge>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
             Trusted by Leading Healthcare & STEM Professionals
            </h2>

            <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="glass-card p-4"><p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">10,000+</p><p className="text-muted-foreground mt-1">Active Members</p></div>
              <div className="glass-card p-4"><p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">94%</p><p className="text-muted-foreground mt-1">Success Rate</p></div>
              <div className="glass-card p-4"><p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">500+</p><p className="text-muted-foreground mt-1">Expert Mentors</p></div>
              <div className="glass-card p-4"><p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">4.9/5</p><p className="text-muted-foreground mt-1">Average Rating</p></div>
            </div>

            <div className="relative overflow-hidden group mt-16">
              <div className="flex animate-scroll-x-reverse group-hover:[animation-play-state:paused] w-max gap-6 py-4">
                  {duplicatedTestimonials.map((testimonial, index) => (
                    <div key={index} className="glass-card p-6 w-[350px] text-left flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                        <p className="font-medium text-foreground mb-4">"{testimonial.quote}"</p>
                        <div className="flex items-center justify-between gap-3 mt-4">
                          <div className="flex items-center gap-3">
                            <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap">{testimonial.result}</Badge>
                        </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24">
           <div className="container mx-auto px-4 text-center">
             <div className="max-w-2xl mx-auto glass-card gradient-border p-8 md:p-12 relative">
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">Most Popular Choice</Badge>
                <h3 className="font-headline text-3xl font-bold">Executive Membership</h3>
                <div className="my-6">
                    <span className="text-5xl font-bold text-white">$97</span>
                    <span className="text-muted-foreground">/month</span>
                    <p className="text-muted-foreground line-through mt-1">$297</p>
                </div>
                <p className="font-semibold text-lg text-primary glow-sm">Save $200 per month</p>
                
                <ul className="text-left space-y-3 my-8">
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Executive Masterclass Series ($2,000 Value)</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Personal Branding Toolkit ($500 Value)</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Career Strategy Workbook ($300 Value)</li>
                </ul>

                <Button asChild size="lg" className="w-full rounded-full bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-lg shadow-primary/20">
                    <Link href="/signup">Start Your Free Trial</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Cancel anytime. 30-day money-back guarantee.</p>

                <div className="mt-8 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300">
                    <p className="font-bold">✨ Success Guarantee</p>
                    <p className="text-sm">94% of members achieve career goals in 6 months—or we provide continued support until you do.</p>
                </div>
             </div>
           </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center relative overflow-hidden">
            <div className="absolute inset-0 hero-gradient"></div>
            <div className="container mx-auto px-4 relative">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white">Ready to Transform Your Career?</h2>
                <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Join thousands of professionals who are already leveling up. Your next opportunity awaits.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold">
                      <Link href="/signup">Join Now For Free</Link>
                  </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
