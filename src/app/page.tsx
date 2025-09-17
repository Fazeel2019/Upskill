
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, MedalIcon, SparklesIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Professional Network",
    description: "Grow your network and connect with verified professionals from around the world in a curated, exclusive community.",
    icon: UsersIcon,
  },
  {
    title: "Accelerated Skill Development",
    description: "Access exclusive events, hands-on workshops, and expert-led training sessions to stay at the forefront of your field.",
    icon: SparklesIcon,
  },
  {
    title: "Career Growth Opportunities",
    description: "Find mentorship, showcase your achievements, and discover new career paths with top organizations.",
    icon: MedalIcon,
  },
];

const testimonials = [
  {
    name: "Dr. Evelyn Reed",
    title: "Clinical Researcher, AstraZeneca",
    quote: "Upskill Community has been a game-changer for my career. The connections I've made have led to two international research collaborations.",
    image: "https://picsum.photos/seed/testimonial1/100/100",
  },
  {
    name: "Javier Rodriguez",
    title: "Lead Software Engineer, Medtronic",
    quote: "The workshops on AI in medical devices were incredibly insightful. It's the best platform for staying current in a fast-moving industry.",
    image: "https://picsum.photos/seed/testimonial2/100/100",
  },
    {
    name: "Dr. Kenji Tanaka",
    title: "Public Health Director, WHO",
    quote: "The ability to collaborate with STEM and healthcare pros on this platform is unparalleled. We are solving real-world problems together.",
    image: "https://picsum.photos/seed/testimonial3/100/100",
  },
];

export default function Home() {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <PublicHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center md:text-left overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 animate-gradient-x bg-300%"></div>
           <div className="absolute inset-0 bg-black/40"></div>
          <div className="container relative mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  Premier Community Platform for STEM & Healthcare Professionals
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
                  Join a global network of innovators, researchers, and clinicians dedicated to advancing science and health.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Button asChild size="lg" className="rounded-2xl bg-gradient-to-r from-purple-500 to-red-500 hover:shadow-lg hover:shadow-red-500/50 transition-shadow transform hover:-translate-y-1">
                    <Link href="/signup">Start Free Trial</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-2xl border-white text-white hover:bg-white hover:text-black transition-colors">
                    <Link href="#">Book a Demo</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div 
                className="relative hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <Image
                  src="https://picsum.photos/seed/professionals/600/600"
                  alt="Diverse professionals"
                  width={600}
                  height={600}
                  className="rounded-full shadow-2xl shadow-black/50"
                  data-ai-hint="diverse professionals team"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Floating Stat Pills */}
        <motion.div 
          className="container mx-auto px-4 -mt-12 relative z-10"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div variants={cardVariants} className="glass-card p-4"><UsersIcon className="w-6 h-6 text-primary" /><div><p className="font-bold text-lg">10,000+</p><p className="text-sm text-muted-foreground">Members</p></div></motion.div>
            <motion.div variants={cardVariants} className="glass-card p-4"><SparklesIcon className="w-6 h-6 text-primary" /><div><p className="font-bold text-lg">94%</p><p className="text-sm text-muted-foreground">Success Rate</p></div></motion.div>
            <motion.div variants={cardVariants} className="glass-card p-4"><MedalIcon className="w-6 h-6 text-primary" /><div><p className="font-bold text-lg">500+</p><p className="text-sm text-muted-foreground">Organizations</p></div></motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
              Everything You Need to <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">Accelerate Your Career</span>
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={cardVariants}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-card h-full text-left p-6 group hover:scale-105 hover:shadow-xl hover:border-purple-500/50 transition-all duration-300">
                    <div className="mb-4 bg-primary/10 rounded-lg p-3 w-fit">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-white">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Professionals Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              <span className="bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">Trusted by Leading</span> Healthcare & STEM Professionals
            </h2>
            <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div><p className="text-4xl font-bold text-primary">10,000+</p><p className="text-muted-foreground">Active Members</p></div>
              <div><p className="text-4xl font-bold text-primary">94%</p><p className="text-muted-foreground">Success Satisfaction</p></div>
              <div><p className="text-4xl font-bold text-primary">500+</p><p className="text-muted-foreground">Partner Organizations</p></div>
              <div><p className="text-4xl font-bold text-primary">4.9/5</p><p className="text-muted-foreground">Community Rating</p></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={cardVariants}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="h-full text-left p-6 glass-card">
                    <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <Image src={testimonial.image} alt={testimonial.name} width={50} height={50} className="rounded-full" data-ai-hint="person portrait" />
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Pricing Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-background"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="container mx-auto px-4 relative text-center text-white">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Card className="max-w-md mx-auto bg-black/30 backdrop-blur-lg border-purple-500/50 shadow-2xl shadow-purple-500/20 rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold font-headline mb-2">Executive Membership</h3>
                  <p className="text-5xl font-bold mb-4">$97<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                  <ul className="space-y-3 text-left my-8">
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Full Network Access</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Unlimited Event Registrations</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Priority Mentorship Matching</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Advanced Career Tools</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Showcase Projects & Achievements</li>
                  </ul>
                  <Button size="lg" className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow">Start Your Free Trial Today</Button>
                  <div className="mt-6 p-3 bg-yellow-400/10 border border-yellow-400/50 rounded-lg text-yellow-300 text-sm">
                    Save 25% with a yearly subscription
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-red-500/80 via-purple-600/80 to-blue-600/80 animate-gradient-x bg-300%"></div>
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4 relative">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white">Ready to Transform Your Career?</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Join thousands of professionals who are already leveling up. Your next opportunity awaits.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow">
                      <Link href="/signup">Start Your Free Journey</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-2xl border-primary text-primary bg-background/50 hover:bg-background">
                      <Link href="#">Book a Demo</Link>
                  </Button>
                </div>
                 <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    <div><p className="text-3xl font-bold">10,000+</p><p className="text-muted-foreground">Members</p></div>
                    <div><p className="text-3xl font-bold">94%</p><p className="text-muted-foreground">Success Rate</p></div>
                    <div><p className="text-3xl font-bold">500+</p><p className="text-muted-foreground">Organizations</p></div>
                    <div><p className="text-3xl font-bold">4.9/5</p><p className="text-muted-foreground">Rating</p></div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
