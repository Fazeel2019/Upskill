
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart, BookOpen, Briefcase, Calendar, CheckCircle, ChevronDown, Goal, HeartHandshake, Mic, PlayCircle, ShieldCheck, Star, Users, Zap } from "lucide-react";
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
    title: "CMO, MedTech Innovations",
    quote: "Secured my CMO role in just 6 months, leading to a 150% salary increase.",
    image: "https://picsum.photos/seed/testimonial1/100/100",
    result: "+150% Salary Increase",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    title: "Sr. Data Scientist, BioAnalytics Corp",
    quote: "The C-suite mentorship was invaluable. I received 5 job offers from top-tier companies.",
    image: "https://picsum.photos/seed/testimonial2/100/100",
    result: "5 Job Offers",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    title: "Research Director, Genomics Institute",
    quote: "Gaining over 200 new, meaningful connections has dramatically expanded my leadership and collaborative projects.",
    image: "https://picsum.photos/seed/testimonial3/100/100",
    result: "200+ New Connections",
    rating: 5,
  },
   {
    name: "James Park",
    title: "VP Engineering, HealthTech Solutions",
    quote: "The leadership coaching helped me get promoted 8 months ahead of schedule and double my team's size.",
    image: "https://picsum.photos/seed/testimonial4/100/100",
    result: "Promoted 8 Months Early",
    rating: 5,
  },
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
                    <Image src="https://storage.googleapis.com/aifirebase-79ed2.appspot.com/dev/0a53fd5c-20bd-477c-a496-0370425a1ab0.png" alt="Diverse group of healthcare and STEM professionals with UI elements" fill style={{objectFit:"cover"}} sizes="(max-width: 768px) 100vw, 50vw" data-ai-hint="diverse professionals community"/>
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
        <section className="py-16 md:py-24 bg-white">
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

                <div className="mt-16 bg-blue-50/50 rounded-2xl p-8 text-center">
                    <h3 className="font-headline text-2xl font-bold">Ready to unlock your potential?</h3>
                    <p className="text-muted-foreground mt-2">Join a community of driven professionals and get access to the tools you need to succeed.</p>
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
            <Badge variant="outline" className="mb-4 font-semibold text-purple-600 border-purple-200 bg-purple-50">Success Stories</Badge>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
             Trusted by Leading <span className="gradient-text">Healthcare & STEM</span> Professionals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">We've helped thousands of professionals land their dream jobs, secure promotions, and expand their networks.</p>

            <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
                <Card className="p-6 shadow-md"><p className="text-4xl font-bold gradient-text">10,000+</p><p className="text-muted-foreground mt-1 font-semibold">Active Members</p></Card>
                <Card className="p-6 shadow-md"><p className="text-4xl font-bold gradient-text">94%</p><p className="text-muted-foreground mt-1 font-semibold">Success Rate</p></Card>
                <Card className="p-6 shadow-md"><p className="text-4xl font-bold gradient-text">500+</p><p className="text-muted-foreground mt-1 font-semibold">Expert Mentors</p></Card>
                <Card className="p-6 shadow-md"><p className="text-4xl font-bold gradient-text">4.9/5</p><p className="text-muted-foreground mt-1 font-semibold">Average Rating</p></Card>
            </div>

            <Carousel opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full p-px">
                      <Card className="h-full p-6 text-left flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <p className="font-medium text-foreground mb-4 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center justify-between gap-3 mt-4">
                          <div className="flex items-center gap-3">
                            <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>

                                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            <div className="mt-16 bg-blue-50/50 rounded-2xl p-8 text-center">
                <h3 className="font-headline text-2xl font-bold">Ready to Join Our Success Stories?</h3>
                <p className="text-muted-foreground mt-2">Become part of a community that is dedicated to your success.</p>
                <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                    <Link href="/signup">Join Community</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 text-white py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800">
           <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 font-semibold text-blue-300 border-blue-500 bg-blue-500/10">Take Control</Badge>
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Transform Your Career Starting Today</h2>
                    <p className="mt-4 text-lg text-blue-200/80 max-w-3xl mx-auto">Gain a competitive edge with our AI-driven platform and expert guidance. Track your progress, identify growth areas, and achieve your professional goals faster.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
                        <Image src="https://picsum.photos/seed/uiproduct/600/800" alt="Platform UI" width={600} height={800} className="rounded-lg" data-ai-hint="dashboard ui" />
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="w-8 h-8 text-green-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-lg">AI-Powered Goal Setting</h4>
                                <p className="text-blue-200/80">Our platform analyzes your profile to suggest personalized career goals and milestones.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="w-8 h-8 text-green-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-lg">1-on-1 Mentorship</h4>
                                <p className="text-blue-200/80">Connect with industry veterans for personalized advice and guidance.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="w-8 h-8 text-green-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-lg">Skill Gap Analysis</h4>
                                <p className="text-blue-200/80">Identify the exact skills you need to land your next role, with curated learning paths.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="w-8 h-8 text-green-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-lg">Progress Tracking</h4>
                                <p className="text-blue-200/80">Visualize your career journey with our advanced analytics and progress reports.</p>
                            </div>
                        </div>
                         <div className="mt-8 p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-200">
                            <p><span className="font-bold">✨ Early Access Bonus:</span> Sign up today and receive a complimentary 1-hour session with a C-suite career coach.</p>
                         </div>
                    </div>
                </div>
           </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="container mx-auto px-4 relative">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white">Ready to Transform Your Career?</h2>
                <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">Join a thriving community of ambitious professionals, access world-class resources, and take control of your career trajectory today. Your next big opportunity is just a click away.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full font-semibold text-base shadow-lg">
                      <Link href="/signup">Join Now For Free</Link>
                  </Button>
                   <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white rounded-full font-semibold text-base">
                      <Link href="/login">Book a Demo</Link>
                  </Button>
                </div>
                 <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                    <div className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg"><Users className="w-5 h-5" /> Networking</div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg"><BookOpen className="w-5 h-5" /> Courses</div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg"><Mic className="w-5 h-5" /> Workshops</div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg"><Goal className="w-5 h-5" /> Mentorship</div>
                </div>
                 <div className="mt-12 p-4 rounded-lg bg-white/10 border border-white/20 text-white/80 max-w-2xl mx-auto text-sm">
                    <p><span className="font-bold">✨ Success Guarantee:</span> 94% of members achieve their primary career goal within 6 months, or we provide continued premium support free of charge until they do.</p>
                 </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
