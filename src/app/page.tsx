
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, BarChart, BookOpen, Briefcase, Calendar, CheckCircle, ChevronDown, Goal, HeartHandshake, Lock, Mic, PlayCircle, ShieldCheck, Sparkles, Star, Users, Zap, Timer, TrendingUp, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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
    name: "Dr. Sarah Chen",
    title: "Chief Medical Officer, MedTech Innovations",
    quote: "The AI-powered insights helped me identify key leadership gaps and develop a strategic career plan. Within 6 months, I secured my dream CMO position at a Fortune 500 company.",
    image: "https://picsum.photos/seed/testimonial1/100/100",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    title: "Senior Data Scientist, BioAnalytics Corp",
    quote: "The mentorship program connected me with industry leaders who provided invaluable guidance. The networking opportunities alone were worth the investment - I received 5 job offers.",
    image: "https://picsum.photos/seed/testimonial2/100/100",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    title: "Research Director, Genomics Institute",
    quote: "The exclusive events and workshops provided cutting-edge insights into industry trends. I've expanded my network significantly and gained confidence in leadership roles.",
    image: "https://picsum.photos/seed/testimonial3/100/100",
    rating: 5,
  },
   {
    name: "James Park",
    title: "VP of Engineering, HealthTech Solutions",
    quote: "The career tracking tools and goal-setting framework kept me focused and motivated. I achieved my promotion goals 8 months ahead of schedule and doubled my team size.",
    image: "https://picsum.photos/seed/testimonial4/100/100",
    rating: 5,
  },
  {
    name: "Dr. Lisa Thompson",
    title: "Clinical Research Lead, Pharma Dynamics",
    quote: "The community aspect is incredible. Being able to discuss challenges and solutions with peers facing similar situations has been transformative for my career development.",
    image: "https://picsum.photos/seed/testimonial5/100/100",
    rating: 5,
  },
  {
    name: "Alex Kumar",
    title: "Principal Scientist, Biotech Innovations",
    quote: "The skill acceleration programs are top-notch. I gained expertise in emerging technologies that directly contributed to my recent promotion to Principal Scientist level.",
    image: "https://picsum.photos/seed/testimonial6/100/100",
    rating: 5,
  },
  {
    name: "Dr. Rachel Kim",
    title: "Head of Innovation, Digital Health Corp",
    quote: "The platform's comprehensive approach to career development is unmatched. From AI insights to personal mentorship, every tool contributed to my success as Head of Innovation.",
    image: "https://picsum.photos/seed/testimonial7/100/100",
    rating: 5,
  }
];

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      <PublicHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-blue-600 text-foreground overflow-hidden hero-gradient">
           <div className="container relative mx-auto px-4">
              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center md:text-left">
                  <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
                    Premier Community Platform for <span className="text-blue-300">STEM & Healthcare</span> Professionals
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-blue-100/90 max-w-xl mx-auto md:mx-0">
                    Join 10,000+ professionals advancing their careers through expert coaching, exclusive networking, and AI-powered insights.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105 shadow-lg">
                      <Link href="/signup">Start Free Trial Today</Link>
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
                 <div className="relative h-80 md:h-[500px] w-full z-10">
                    <Image src="https://picsum.photos/seed/professionals/1200/800" alt="Diverse group of healthcare and STEM professionals with UI elements" fill style={{objectFit:"cover"}} sizes="(max-width: 768px) 100vw, 50vw" data-ai-hint="diverse professionals community"/>
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
                <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
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
                                <Card key={index} className="group relative w-[380px] h-[420px] shrink-0 m-4 text-left p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500 flex flex-col justify-between overflow-hidden">
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
                    <h3 className="font-headline text-3xl font-bold">Ready to unlock your potential?</h3>
                    <p className="text-muted-foreground mt-2 text-lg">Join a community of driven professionals and get access to the tools you need to succeed.</p>
                     <div className="mt-6 flex justify-center gap-4">
                        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                            <Link href="/signup">Become a Member</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full">
                            <Link href="/login">Book a Demo</Link>
                        </Button>
                    </div>
                </div>
             </div>
        </section>

        {/* Success Stories Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 font-semibold text-purple-600 border-purple-200 bg-purple-50 text-base py-2 px-4">🌟 Success Stories</Badge>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
             Trusted by Leading<br />
             <span className="gradient-text">Healthcare & STEM</span><br />
             Professionals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Join thousands of professionals who have accelerated their careers and achieved remarkable success with our comprehensive platform.
            </p>

            <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                <Card className="p-6 shadow-md aspect-square flex flex-col justify-center items-center text-center transition-colors duration-300 hover:bg-blue-100">
                    <p className="text-6xl">👥</p>
                    <p className="text-4xl font-bold gradient-text mt-2">10,000+</p>
                    <p className="text-muted-foreground mt-1 font-semibold">Active Members</p>
                </Card>
                <Card className="p-6 shadow-md aspect-square flex flex-col justify-center items-center text-center transition-colors duration-300 hover:bg-green-100">
                    <p className="text-6xl">📈</p>
                    <p className="text-4xl font-bold gradient-text mt-2">94%</p>
                    <p className="text-muted-foreground mt-1 font-semibold">Success Rate</p>
                </Card>
                <Card className="p-6 shadow-md aspect-square flex flex-col justify-center items-center text-center transition-colors duration-300 hover:bg-purple-100">
                    <p className="text-6xl">🎯</p>
                    <p className="text-4xl font-bold gradient-text mt-2">500+</p>
                    <p className="text-muted-foreground mt-1 font-semibold">Expert Mentors</p>
                </Card>
                <Card className="p-6 shadow-md aspect-square flex flex-col justify-center items-center text-center transition-colors duration-300 hover:bg-yellow-100">
                    <p className="text-6xl">⭐</p>
                    <p className="text-4xl font-bold gradient-text mt-2">4.9/5</p>
                    <p className="text-muted-foreground mt-1 font-semibold">Average Rating</p>
                </Card>
            </div>

            <div className="scroll-container w-full overflow-hidden">
                <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                      <Card key={index} className="group relative w-[380px] h-[420px] shrink-0 m-4 text-left p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-purple-500 flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex items-center mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                              ))}
                          </div>
                          <p className="font-medium text-foreground mb-4 flex-grow italic">"{testimonial.quote}"</p>
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-4">
                          <div className="flex items-center gap-3">
                            <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute -bottom-1/4 -right-1/4 w-48 h-48 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-red-500/20 rounded-full opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
                      </Card>
                    ))}
                </div>
            </div>
            
            <div className="mt-16 bg-blue-50 rounded-2xl p-12 text-center shadow-lg max-w-4xl mx-auto">
                <h3 className="font-headline text-3xl font-bold">Ready to Join Our Success Stories?</h3>
                <p className="text-muted-foreground mt-2 text-lg">Start your journey today and become the next success story in our community of thriving professionals.</p>
                <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                    <Link href="/signup">Join the Community</Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-gray-900 text-white py-16 md:py-24 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
           <div className="container mx-auto px-4">
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-4 font-semibold text-blue-300 border-blue-500 bg-blue-500/10">Limited Time Offer</Badge>
                    <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Transform Your Career<br/>Starting Today
                    </h2>
                    <p className="mt-4 text-lg text-blue-200/80 max-w-3xl mx-auto">Join the exclusive community of healthcare and STEM leaders. Everything you need to accelerate your career in one comprehensive platform.</p>
                </div>
                
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-px shadow-2xl shadow-blue-500/20">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-purple-500/50 to-transparent rounded-t-2xl"></div>
                   <div className="relative bg-gray-900 rounded-2xl">
                     <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl text-center">
                        <p className="font-semibold">🚀 Most Popular Choice - Join 10,000+ Professionals</p>
                     </div>
                     <div className="grid lg:grid-cols-2 gap-8 p-8">
                       {/* Left Column */}
                       <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                             <div className="bg-blue-600/10 border-2 border-blue-500/50 rounded-lg p-3">
                               <Sparkles className="w-8 h-8 text-blue-300"/>
                             </div>
                             <div>
                                <h3 className="text-2xl font-bold font-headline">Executive Membership</h3>
                                <Badge className="bg-green-500/20 border-green-500 text-green-300 mt-1">Premium Access</Badge>
                             </div>
                          </div>

                          <div>
                             <p className="text-5xl font-bold"><span className="line-through text-gray-500 text-3xl">$297</span> $97<span className="text-lg font-normal text-gray-400">/month</span></p>
                             <p className="text-green-400 font-semibold mt-2">Save $200/month - Limited Time</p>
                             <p className="text-gray-400 text-sm mt-2">Cancel anytime • 30-day money-back guarantee</p>
                          </div>
                          
                          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                            <h4 className="font-semibold flex items-center gap-2"><Star className="text-yellow-400"/>Exclusive Bonuses (Worth $2,800)</h4>
                            <Accordion type="single" collapsible className="w-full mt-4">
                              <AccordionItem value="item-1">
                                <AccordionTrigger>
                                  <div className="flex justify-between w-full pr-4">
                                    <span>Executive Masterclass Series</span>
                                    <span className="text-green-400 font-bold">$2,000</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-gray-400 pl-2">Monthly sessions with Fortune 500 leaders.</p>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-2">
                                <AccordionTrigger>
                                   <div className="flex justify-between w-full pr-4">
                                      <span>Personal Branding Toolkit</span>
                                      <span className="text-green-400 font-bold">$500</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-gray-400 pl-2">Professional templates & LinkedIn optimization.</p>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-3">
                                <AccordionTrigger>
                                   <div className="flex justify-between w-full pr-4">
                                    <span>Career Acceleration Workbook</span>
                                    <span className="text-green-400 font-bold">$300</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-gray-400 pl-2">Step-by-step guide to leadership roles.</p>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>

                           <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-14 rounded-lg shadow-lg shadow-blue-500/20">
                            Start Your Transformation Today <ArrowRight className="ml-2"/>
                           </Button>
                           <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2"><Lock className="w-3 h-3"/>Secure payment • No setup fees • Join in 60 seconds</p>
                       </div>

                       {/* Right Column */}
                       <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                           <h4 className="font-bold text-xl mb-4">Everything You Need to Succeed</h4>
                           <ul className="space-y-3 text-gray-300">
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
                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5"/>
                                <span>{item}</span>
                               </li>
                            ))}
                           </ul>

                            <div className="mt-6 bg-yellow-400/10 border border-yellow-500/30 text-yellow-200 rounded-lg p-4">
                              <p className="font-bold flex items-center gap-2"><Sparkles className="text-yellow-300"/>Success Guarantee</p>
                              <p className="text-sm mt-1">94% of our members achieve their career goals within 6 months, or we'll work with you until you do.</p>
                            </div>
                       </div>
                     </div>
                   </div>
                </div>
                 <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-center text-blue-200/80">
                    <p>• 10,000+ Active Members</p>
                    <p>• 500+ Expert Mentors</p>
                    <p>• 4.9/5 Average Rating</p>
                 </div>
           </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  Ready to Transform <br/>
                  <span className="text-yellow-500">Your Career?</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Join thousands of healthcare and STEM professionals who are already accelerating their careers with AI-powered insights, expert mentorship, and exclusive networking opportunities.</p>
                <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Timer className="w-4 h-4" /> Limited time offer - Save $200/month
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base shadow-lg">
                      <Link href="/signup">Start Your Free Journey <ArrowRight className="ml-2 w-4 h-4"/></Link>
                  </Button>
                   <Button asChild size="lg" variant="outline" className="rounded-full font-semibold text-base">
                      <Link href="/login">Schedule a Demo</Link>
                  </Button>
                </div>
                 <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-foreground">
                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"><Users className="w-8 h-8 text-blue-400" /><p className="text-2xl font-bold">10,000+</p><p className="text-sm font-semibold">Active Members</p></div>
                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"><TrendingUp className="w-8 h-8 text-green-400" /><p className="text-2xl font-bold">94%</p><p className="text-sm font-semibold">Success Rate</p></div>
                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"><Star className="w-8 h-8 text-yellow-400" /><p className="text-2xl font-bold">4.9/5</p><p className="text-sm font-semibold">User Rating</p></div>
                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"><Award className="w-8 h-8 text-purple-400" /><p className="text-2xl font-bold">500+</p><p className="text-sm font-semibold">Expert Mentors</p></div>
                </div>
                 <div className="mt-8 text-xs text-muted-foreground">
                    30-day money-back guarantee • No setup fees • Cancel anytime
                 </div>
                 <div className="mt-12 p-6 rounded-lg bg-primary/10 border border-primary/20 text-primary-foreground max-w-3xl mx-auto">
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


