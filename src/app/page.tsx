
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, MedalIcon, SparklesIcon, UsersIcon, BarChart, Zap, Star, ShieldCheck, Trophy, Group } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { motion } from "framer-motion";

const features = [
    {
        title: "AI-Powered Career Insights",
        description: "Get personalized career recommendations and skill gap analysis powered by advanced AI algorithms.",
        icon: Zap,
    },
    {
        title: "Expert Mentorship Network",
        description: "Connect with C-suite executives and industry leaders for transformative small group coaching.",
        icon: UsersIcon,
    },
    {
        title: "Exclusive Leadership Events",
        description: "Access monthly leadership summits, workshops, and networking events.",
        icon: Star,
    },
    {
        title: "Advanced Career Analytics",
        description: "Monitor growth with detailed analytics, milestone tracking, and predictive insights.",
        icon: BarChart,
    },
    {
        title: "Verified Professional Network",
        description: "Connect with trusted healthcare and STEM professionals.",
        icon: ShieldCheck,
    },
    {
        title: "Accelerated Skill Development",
        description: "Curated courses, projects, and training programs.",
        icon: SparklesIcon,
    },
    {
        title: "Strategic Goal Framework",
        description: "Achieve ambitious milestones with proven frameworks.",
        icon: MedalIcon,
    },
    {
        title: "Industry Recognition Program",
        description: "Earn certificates and badges recognized by top companies.",
        icon: Trophy,
    },
    {
        title: "Elite Community Forums",
        description: "Peer discussions and thought leadership exchange.",
        icon: Group,
    },
];

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    title: "CMO, MedTech Innovations",
    quote: "Secured CMO role in 6 months, +150% salary increase.",
    image: "https://picsum.photos/seed/testimonial1/100/100",
  },
  {
    name: "Marcus Rodriguez",
    title: "Sr. Data Scientist, BioAnalytics Corp",
    quote: "5 job offers from C-suite networking.",
    image: "https://picsum.photos/seed/testimonial2/100/100",
  },
    {
    name: "Dr. Emily Watson",
    title: "Research Director, Genomics Institute",
    quote: "200+ new connections, expanded leadership.",
    image: "https://picsum.photos/seed/testimonial3/100/100",
  },
  {
    name: "James Park",
    title: "VP Engineering, HealthTech Solutions",
    quote: "Promoted 8 months early, doubled team size.",
    image: "https://picsum.photos/seed/testimonial4/100/100",
  },
  {
    name: "Dr. Lisa Thompson",
    title: "Clinical Research Lead, Pharma Dynamics",
    quote: "Peer support, 3 leadership awards.",
    image: "https://picsum.photos/seed/testimonial5/100/100",
  },
  {
    name: "Alex Kumar",
    title: "Principal Scientist, Biotech Innovations",
    quote: "Cutting-edge skills → promotion.",
    image: "https://picsum.photos/seed/testimonial6/100/100",
  },
  {
    name: "Dr. Rachel Kim",
    title: "Head of Innovation, Digital Health Corp",
    quote: "Career growth → Head of Innovation.",
    image: "https://picsum.photos/seed/testimonial7/100/100",
  },
    {
    name: "Michael Torres",
    title: "Senior Scientist, Pharmaceutical Research Inc",
    quote: "Exceptional networking → breakthrough collaborations.",
    image: "https://picsum.photos/seed/testimonial8/100/100",
  },
];

const highlights = [
    { text: "C-suite mentors", icon: UsersIcon },
    { text: "Monthly exclusives", icon: Star },
    { text: "AI-powered insights", icon: Zap },
    { text: "AI Assistant", icon: SparklesIcon },
    { text: "Live Coaching (Weekly sessions)", icon: Group },
    { text: "94% Career progress", icon: MedalIcon },
]

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => (
    <Card className="w-[350px] flex-shrink-0 text-left p-6 group transition-all duration-300 mx-4">
        <div className="mb-4 bg-primary/10 rounded-lg p-3 w-fit">
            <feature.icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold text-xl mb-2 text-foreground">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
    </Card>
);

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center md:text-left overflow-hidden">
           <div className="absolute inset-0 static-gradient"></div>
           <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-white">
                  Premier Community Platform for STEM & Healthcare Professionals
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
                  Join 10,000+ professionals advancing their careers through expert coaching, exclusive networking, and AI-powered insights.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Button asChild size="lg" className="rounded-2xl bg-gradient-to-r from-purple-500 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/50 transition-shadow transform hover:-translate-y-1">
                    <Link href="/signup">Join Now For Free</Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-2xl bg-white text-black hover:bg-white/90 transition-colors">
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
          transition={{ staggerChildren: 0.1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-foreground">
            {highlights.map((highlight, i) => (
              <motion.div key={i} variants={cardVariants} className="glass-card p-4 flex items-center gap-3">
                <highlight.icon className="w-5 h-5 text-primary shrink-0" />
                <p className="font-semibold text-sm">{highlight.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
             ✨ Platform Features — <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">Everything You Need to Accelerate Your Career</span>
            </h2>
          </div>
          <div className="relative mt-12 group flex gap-8 overflow-hidden">
            <div className="flex shrink-0 animate-marquee group-hover:paused">
                {[...features, ...features].map((feature, index) => (
                    <FeatureCard key={`${feature.title}-${index}`} feature={feature} />
                ))}
            </div>
             <div aria-hidden="true" className="flex shrink-0 animate-marquee group-hover:paused">
                {[...features, ...features].map((feature, index) => (
                    <FeatureCard key={`${feature.title}-dup-${index}`} feature={feature} />
                ))}
            </div>
          </div>
        </section>

        {/* Trusted By Professionals Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
             🌟 Success Stories — <span className="bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">Trusted by Leading</span> Healthcare & STEM Professionals
            </h2>
            <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div><p className="text-4xl font-bold text-primary">10,000+</p><p className="text-muted-foreground">Active Members</p></div>
              <div><p className="text-4xl font-bold text-primary">94%</p><p className="text-muted-foreground">Success Rate</p></div>
              <div><p className="text-4xl font-bold text-primary">500+</p><p className="text-muted-foreground">Expert Mentors</p></div>
              <div><p className="text-4xl font-bold text-primary">4.9/5</p><p className="text-muted-foreground">Average Rating</p></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={cardVariants}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full text-left p-6">
                     <div className="flex items-center gap-4 mb-4">
                      <Image src={testimonial.image} alt={testimonial.name} width={50} height={50} className="rounded-full" data-ai-hint="person portrait" />
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-foreground">"{testimonial.quote}"</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Pricing Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
          <div className="container mx-auto px-4 relative text-center text-foreground">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Card className="max-w-md mx-auto border-purple-500/50 shadow-2xl shadow-purple-500/20 rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-primary text-primary-foreground font-semibold rounded-full px-4 py-1 inline-block mb-4 text-sm">Most Popular Choice</div>
                  <h3 className="text-2xl font-bold font-headline mb-2">Executive Membership</h3>
                  <p className="text-5xl font-bold mb-2"><span className="text-2xl text-muted-foreground line-through">$297</span> $97<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                  <p className="text-green-600 font-semibold mb-4">Save $200</p>
                  <ul className="space-y-3 text-left my-8">
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Executive Masterclass Series ($2,000 value)</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Personal Branding Toolkit ($500 value)</li>
                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Career Workbook ($300 value)</li>
                  </ul>
                  <Button size="lg" className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-shadow">Start Your Free Trial Today</Button>
                  <p className="text-sm text-muted-foreground mt-4">Cancel anytime, 30-day money-back guarantee.</p>
                  <div className="mt-6 p-3 bg-yellow-400/10 border border-yellow-400/50 rounded-lg text-yellow-500 text-sm">
                    <b>Success Guarantee:</b> 94% of members achieve goals within 6 months — otherwise continued support until success.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center relative overflow-hidden">
             <div className="absolute inset-0 static-gradient"></div>
            <div className="container mx-auto px-4 relative">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white">Ready to Transform Your Career?</h2>
                <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Join thousands of professionals who are already leveling up. Your next opportunity awaits.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-shadow">
                      <Link href="/signup">Join Now For Free</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-2xl border-white text-white bg-transparent hover:bg-white hover:text-black">
                      <Link href="#">Book a Demo</Link>
                  </Button>
                </div>
                 <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    <div><p className="text-3xl font-bold">10,000+</p><p className="text-white/70">Active Members</p></div>
                    <div><p className="text-3xl font-bold">94%</p><p className="text-white/70">Success Rate</p></div>
                    <div><p className="text-3xl font-bold">500+</p><p className="text-white/70">Expert Mentors</p></div>
                    <div><p className="text-3xl font-bold">4.9/5</p><p className="text-white/70">Average Rating</p></div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
