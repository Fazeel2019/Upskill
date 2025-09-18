
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode; }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground transition-colors hover:text-primary"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-foreground">
                <Logo className="h-10 w-auto" />
            </Link>
             <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              Premier community for STEM, Healthcare, and Public Health professionals.
            </p>
             <div className="flex space-x-4 mt-6">
              <SocialIcon href="#"><Linkedin className="w-5 h-5"/></SocialIcon>
              <SocialIcon href="#"><Twitter className="w-5 h-5"/></SocialIcon>
              <SocialIcon href="#"><Instagram className="w-5 h-5"/></SocialIcon>
              <SocialIcon href="#"><Youtube className="w-5 h-5"/></SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-foreground">Community</Link></li>
              <li><Link href="/podcast" className="text-muted-foreground hover:text-foreground">Podcast</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Workshops</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Partnerships</Link></li>
               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Upskill Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
