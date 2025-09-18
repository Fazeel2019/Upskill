
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode; }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
             <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white">
                <Logo className="h-8 w-auto bg-transparent border border-white/20" />
                 <span className="font-headline font-bold text-2xl">Upskill</span>
            </Link>
             <p className="text-gray-400 text-sm mt-4 max-w-xs">
              Empowering healthcare and STEM professionals to accelerate their careers through AI-powered insights, expert mentorship, and exclusive networking.
            </p>
             <div className="flex space-x-4 mt-6">
              <SocialIcon href="#"><Linkedin className="w-5 h-5"/></SocialIcon>
              <SocialIcon href="#"><Twitter className="w-5 h-5"/></SocialIcon>
              <SocialIcon href="#"><Instagram className="w-5 h-5"/></SocialIcon>
              <SocialIcon href="#"><Youtube className="w-5 h-5"/></SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Success Stories</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
         <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Upskill. All rights reserved.</p>
                 <p className="mt-1">Made with ❤️ for professionals</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-gray-400">
               <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500"></span>All systems operational</p>
            </div>
        </div>
      </div>
    </footer>
  );
}
