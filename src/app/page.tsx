
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, BarChart, BookOpen, Briefcase, Calendar, CheckCircle, ChevronDown, Goal, HeartHandshake, Lock, Mic, PlayCircle, ShieldCheck, Sparkles, Star, Users, Zap, Timer, TrendingUp, Award, BrainCircuit, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import React from "react";


const features = [
    { title: "AI-Powered Career Insights", description: "Get personalized career recommendations and skill gap analysis powered by advanced AI algorithms that understand your unique professional journey.", icon: Goal, tag: "AI-Driven", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
    { title: "Expert Mentorship Network", description: "Connect with C-suite executives and industry leaders for transformative Small group coaching sessions that accelerate your career growth.", icon: Users, tag: "Premium", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
    { title: "Exclusive Leadership Events", description: "Access monthly leadership summits, workshops, and networking events with top professionals in healthcare and STEM industries.", icon: Calendar, tag: "Members Only", iconBg: "bg-red-100", iconColor: "text-red-600" },
    { title: "Advanced Career Analytics", description: "Monitor your professional growth with detailed analytics, milestone tracking, and predictive insights for strategic career planning.", icon: BarChart, tag: "Analytics", iconBg: "bg-green-100", iconColor: "text-green-600" },
    { title: "Verified Professional Network", description: "Connect with verified healthcare and STEM professionals in a trusted, secure environment designed for serious career advancement.", icon: ShieldCheck, tag: "Verified", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
    { title: "Accelerated Skill Development", description: "Fast-track your learning with curated courses, hands-on projects, and cutting-edge training programs tailored to your career goals.", icon: Zap, tag: "Fast Track", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
];

const testimonials = [
  {
    name: "Lisa Howard, MBA",
    role: "Healthcare Administrator",
    quote: "\"Having a mentor through Upskill gave me the clarity and confidence to transition into healthcare administration. I was overwhelmed about making the pivot, but my mentor broke it down into manageable steps, offered industry insights, and helped me map out a career I now feel excited about.\"",
    image: "/1.jpg",
    imageHint: "professional woman"
  },
  {
    name: "Karen Mitchell, DNP",
    role: "Nurse Practitioner & Emerging Health Entrepreneur",
    quote: "\"As a Nurse Practitioner, I always thought my career would stay at the bedside. But the Bedside to Business course opened my eyes to how my clinical expertise could translate into entrepreneurship and leadership.\"",
    image: "/2.png",
    imageHint: "female professional"
  },
  {
    name: "Dr. Samuel Adeyemi, MD",
    role: "Internal Medicine Specialist",
    quote: "\"Upskill's workshops have been transformative. As a physician, I've always been focused on patient care, but I realized I also needed to invest in my career growth. The sessions on leadership and digital skills gave me practical tools and mentor junior doctors with greater confidence.\"",
    image: "/3.png",
    imageHint: "male doctor"
  },
  {
    name: "Dr. Samuel Adeyemi, MD",
    role: "Internal Medicine Specialist",
    quote: "\"Upskill's workshops have been transformative. As a physician, I've always been focused on patient care, but I realized I also needed to invest in my career growth. The sessions on leadership and digital skills gave me practical tools and mentor junior doctors with greater confidence.\"",
    image: "/4.png",
    imageHint: "male doctor"
  },
  {
    name: "Dr. Samuel Adeyemi, MD",
    role: "Internal Medicine Specialist",
    quote: "\"Upskill's workshops have been transformative. As a physician, I've always been focused on patient care, but I realized I also needed to invest in my career growth. The sessions on leadership and digital skills gave me practical tools and mentor junior doctors with greater confidence.\"",
    image: "/5.jpg",
    imageHint: "male doctor"
  },
  {
    name: "Dr. Samuel Adeyemi, MD",
    role: "Internal Medicine Specialist",
    quote: "\"Upskill's workshops have been transformative. As a physician, I've always been focused on patient care, but I realized I also needed to invest in my career growth. The sessions on leadership and digital skills gave me practical tools and mentor junior doctors with greater confidence.\"",
    image: "/6.png",
    imageHint: "male doctor"
  }
];

const AnimatedTag = ({ children, className, animation }: { children: React.ReactNode, className?: string, animation: any }) => (
  <motion.div
    className={cn("absolute bg-card p-4 rounded-xl shadow-lg border hidden md:block", className)}
    variants={animation.variants}
    initial="initial"
    animate="animate"
    transition={animation.transition}
  >
    {children}
  </motion.div>
);

export default function Home() {
    const floatingAnimation = (delay = 0, duration = 5) => ({
      variants: {
        initial: { y: 0 },
        animate: { y: [0, -10, 0] },
      },
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      },
    });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      <PublicHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center text-foreground pt-24 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-red-600" />

           <div className="container relative mx-auto px-4 pt-16 md:pt-0">
              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center md:text-left order-2 md:order-1">
                  <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
                    Premier Community Platform for <span className="text-blue-300">STEM & Healthcare</span> Professionals
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-blue-100/90 max-w-xl mx-auto md:mx-0">
                    Join 10,000+ professionals advancing their careers through expert coaching, exclusive networking, and AI-powered insights.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105 shadow-lg">
                      <Link href="/login">Start Free Trial Today</Link>
                    </Button>
                  </div>
                   <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center md:text-left">
                    <div className="bg-white/10 border border-white/20 p-4 rounded-lg">
                      <p className="font-semibold text-white">Expert Coaching</p>
                      <p className="text-sm text-blue-200">C-suite mentors</p>
                    </div>
                     <div className="bg-white/10 border border-white/20 p-4 rounded-lg">
                      <p className="font-semibold text-white">Leadership Summits</p>
                      <p className="text-sm text-blue-200">Monthly exclusives</p>
                    </div>
                     <div className="bg-white/10 border border-white/20 p-4 rounded-lg">
                      <p className="font-semibold text-white">AI Insights</p>
                      <p className="text-sm text-blue-200">AI-powered insights</p>
                    </div>
                  </div>
                </div>
                 <div className="relative h-80 md:h-[500px] w-full order-1 md:order-2">
                    <div className="relative z-0 h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzNmOG80eXR6NXRmanFxZXIwaG10NzR1aGc1MnR5MHJ1czB1cnFidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gr0FZsazDgg3NzkHc8/giphy.gif" alt="Diverse group of healthcare and STEM professionals with UI elements" fill style={{objectFit:"contain"}} sizes="(max-width: 768px) 100vw, 50vw" data-ai-hint="diverse professionals community" unoptimized className="rounded-2xl"/>
                    </div>
                    <AnimatedTag className="top-0 left-[-20px] hidden md:block" animation={floatingAnimation(0, 6)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg"><BrainCircuit className="w-5 h-5 text-blue-500" /></div>
                        <div>
                          <p className="font-bold">AI Assistant</p>
                          <p className="text-sm text-muted-foreground">Career insights</p>
                        </div>
                      </div>
                    </AnimatedTag>
                    <AnimatedTag className="bottom-0 left-[-30px] hidden md:block" animation={floatingAnimation(1, 5)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg"><Calendar className="w-5 h-5 text-red-500" /></div>
                        <div>
                          <p className="font-bold">Live Coaching</p>
                          <p className="text-sm text-muted-foreground">Weekly sessions</p>
                        </div>
                      </div>
                    </AnimatedTag>
                    <AnimatedTag className="bottom-8 right-[-20px] w-64 hidden md:block" animation={floatingAnimation(0.5, 7)}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-bold">Leadership Index</p>
                            <span className="font-bold text-green-500">94%</span>
                        </div>
                        <Progress value={94} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
                      </div>
                    </AnimatedTag>
                </div>
              </motion.div>
           </div>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1 text-white/80"
                >
                    <span className="text-xs">Scroll for more</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
             <div className="container mx-auto px-4 text-center">
                <Badge variant="outline" className="mb-4 font-semibold text-blue-600 border-blue-200 bg-blue-50">Platform Features</Badge>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                 ✨ Everything You Need to <span className="gradient-text">Accelerate Your Career</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Our comprehensive platform combines cutting-edge technology with human expertise to provide unparalleled career development opportunities for ambitious professionals.</p>

                <div className="mt-12 relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center gap-4 py-2 px-6 rounded-lg bg-muted/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex space-x-1.5">
                                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                <span className="h-2 w-2 rounded-full bg-red-400"></span>
                            </div>
                            <h3 className="font-semibold text-foreground">Explore Our Features</h3>
                             <div className="flex space-x-1.5">
                                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                <span className="h-2 w-2 rounded-full bg-red-400"></span>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-container w-full overflow-hidden">
                        <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
                            {[...features, ...features].map((feature, index) => (
                                <Card key={index} className="group relative w-[320px] md:w-[380px] h-[420px] shrink-0 m-4 text-left p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500 flex flex-col justify-between overflow-hidden">
                                  <div>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={cn("p-3 rounded-lg transition-transform duration-300 group-hover:rotate-[-15deg]", feature.iconBg)}>
                                            <feature.icon className={cn("w-7 h-7", feature.iconColor)} />
                                        </div>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 transition-transform duration-300 group-hover:rotate-[10deg]">{feature.tag}</Badge>
                                    </div>
                                    <h3 className="font-semibold text-xl text-foreground font-headline">{feature.title}</h3>
                                    <p className="text-muted-foreground mt-2">{feature.description}</p>
                                  </div>
                                  <div className="absolute -bottom-1/4 -right-1/4 w-48 h-48 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-red-500/20 rounded-full opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center shadow-lg max-w-4xl mx-auto">
                    <h3 className="font-headline text-2xl md:text-3xl font-bold">Ready to unlock your potential?</h3>
                    <p className="text-muted-foreground mt-2 text-base md:text-lg">Join a community of driven professionals and get access to the tools you need to succeed.</p>
                     <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                            <Link href="/login">Become a Member</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full">
                            <Link href="/login">Book a Demo</Link>
                        </Button>
                    </div>
                </div>
             </div>
        </section>

        {/* Community Feedback Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
             <div className="inline-block px-6 py-3 mb-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-white">
                  COMMUNITY FEEDBACK
                </h2>
             </div>
            
            <div className="scroll-container w-full overflow-hidden">
                <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div key={index} className="shrink-0 w-[320px] md:w-[380px] m-4">
                      <div className="relative flex flex-col items-center p-6">
                        <div className="relative mb-4 h-32 w-32">
                          <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-white shadow-md object-cover h-32 w-32"
                            data-ai-hint={testimonial.imageHint}
                          />
                        </div>
                        <div className="text-center max-w-xs mx-auto">
                          <blockquote className="text-foreground/80 italic leading-relaxed">
                            {testimonial.quote}
                          </blockquote>
                          <h3 className="font-bold text-lg text-foreground mt-4">{testimonial.name}</h3>
                          <p className="font-semibold text-muted-foreground text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section id="pricing" className="py-16 md:py-24 bg-gray-900 text-white">
           <div className="container mx-auto px-4">
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-4 font-semibold text-blue-300 border-blue-700 bg-blue-900/50">Limited Time Offer</Badge>
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
                        Transform Your Career<br/>Starting Today
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">Join the exclusive community of healthcare and STEM leaders. Everything you need to accelerate your career in one comprehensive platform.</p>
                </div>
                
                <div className="relative bg-background text-foreground border rounded-2xl p-px shadow-2xl shadow-blue-500/20">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-purple-500/20 to-transparent rounded-t-2xl"></div>
                   <div className="relative bg-muted/20 rounded-2xl">
                     <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl text-center text-white">
                        <p className="font-semibold">🚀 Most Popular Choice - Join 10,000+ Professionals</p>
                     </div>
                     <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                       {/* Left Column */}
                       <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                             <div className="bg-blue-600/10 border-2 border-blue-500/50 rounded-lg p-3">
                               <Sparkles className="w-8 h-8 text-blue-400"/>
                             </div>
                             <div>
                                <h3 className="text-2xl font-bold font-headline">Winner Circle</h3>
                                <Badge className="bg-green-500/20 border-green-500 text-green-400 mt-1">Premium Access</Badge>
                             </div>
                          </div>

                          <div>
                             <p className="text-4xl md:text-5xl font-bold">$14.99<span className="text-lg font-normal text-muted-foreground"> / month</span></p>
                             <p className="text-muted-foreground text-sm mt-2">Cancel anytime • 30-day money-back guarantee</p>
                          </div>
                          
                          <div className="bg-background/50 border rounded-lg p-6">
                            <h4 className="font-semibold flex items-center gap-2"><Star className="text-yellow-400"/>Premium Features Included</h4>
                            <ul className="space-y-4 mt-4">
                                <li className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">AI-Powered Career Insights</p>
                                        <p className="text-sm text-muted-foreground">Personalized recommendations & skill analysis</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Premium</Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">Expert Mentorship Access</p>
                                        <p className="text-sm text-muted-foreground">Connect with industry leaders and mentors</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Premium</Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">Exclusive Networking Events</p>
                                        <p className="text-sm text-muted-foreground">Monthly leadership summits & workshops</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Premium</Badge>
                                </li>
                            </ul>
                          </div>

                           <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-14 rounded-lg shadow-lg shadow-blue-500/20">
                             <Link href="/login">Start Your Transformation Today <ArrowRight className="ml-2"/></Link>
                           </Button>
                           <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2"><Lock className="w-3 h-3"/>Secure payment • No setup fees • Join in 60 seconds</p>
                       </div>

                       {/* Right Column */}
                       <div className="bg-background/50 border rounded-lg p-6">
                           <h4 className="font-bold text-xl mb-4">Everything You Need to Succeed</h4>
                           <ul className="space-y-3 text-muted-foreground">
                            {[
                                "AI-powered career insights & recommendations",
                                "Unlimited Group sessions with C-suite executives",
                                "Access to exclusive leadership summits & networking events",
                                "Advanced career tracking & goal-setting tools",
                                "Priority community support & expert guidance",
                                "Industry trend reports & skill gap analysis",
                                "Personal brand development & executive coaching",
                                "Direct job placement assistance & interview prep",
                                "Custom career roadmaps & strategic planning",
                                "White-glove onboarding & dedicated success manager"
                            ].map(item => (
                               <li key={item} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5"/>
                                <span>{item}</span>
                               </li>
                            ))}
                           </ul>

                            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 rounded-lg p-4">
                              <p className="font-bold flex items-center gap-2 text-yellow-700"><Sparkles className="text-yellow-500"/>Success Guarantee</p>
                              <p className="text-sm mt-1">94% of our members achieve their career goals within 6 months, or we'll work with you until you do.</p>
                            </div>
                       </div>
                     </div>
                   </div>
                </div>
                 <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-center text-gray-400">
                    <p>• 10,000+ Active Members</p>
                    <p>• 500+ Expert Mentors</p>
                    <p>• 4.9/5 Average Rating</p>
                 </div>
           </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden bg-background py-20 text-center md:py-32">
            <div className="container relative mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                  Ready to Transform <br/>
                  <span className="text-yellow-500">Your Career?</span>
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                    Join thousands of healthcare and STEM professionals who are already accelerating their careers with AI-powered insights, expert mentorship, and exclusive networking opportunities.
                </p>
                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Timer className="w-4 h-4" /> Limited time offer - Save $200/month
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full bg-blue-600 font-semibold text-white shadow-lg hover:bg-blue-700">
                      <Link href="/login">Start Your Free Journey <ArrowRight className="ml-2 w-4 h-4"/></Link>
                  </Button>
                   <Button asChild size="lg" variant="outline" className="rounded-full font-semibold">
                      <Link href="/login">Schedule a Demo</Link>
                  </Button>
                </div>
                 <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-foreground">
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-background/5 p-4 backdrop-blur-sm"><Users className="w-8 h-8 text-blue-500" /><p className="text-2xl font-bold">10,000+</p><p className="text-sm font-semibold text-muted-foreground">Active Members</p></div>
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-background/5 p-4 backdrop-blur-sm"><TrendingUp className="w-8 h-8 text-green-500" /><p className="text-2xl font-bold">94%</p><p className="text-sm font-semibold text-muted-foreground">Success Rate</p></div>
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-background/5 p-4 backdrop-blur-sm"><Star className="w-8 h-8 text-yellow-500" /><p className="text-2xl font-bold">4.9/5</p><p className="text-sm font-semibold text-muted-foreground">User Rating</p></div>
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-background/5 p-4 backdrop-blur-sm"><Award className="w-8 h-8 text-purple-500" /><p className="text-2xl font-bold">500+</p><p className="text-sm font-semibold text-muted-foreground">Expert Mentors</p></div>
                </div>
                 <div className="mt-8 text-xs text-muted-foreground">
                    30-day money-back guarantee • No setup fees • Cancel anytime
                 </div>
                 <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-primary/20 bg-primary/10 p-6 text-primary-foreground">
                    <p className="font-semibold text-foreground"><span className="text-primary">✨ Success Guarantee:</span> 94% of our members achieve their career goals within 6 months. If you don't see measurable progress, we'll work with you personally until you do.</p>
                 </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
    

    




    

    
































