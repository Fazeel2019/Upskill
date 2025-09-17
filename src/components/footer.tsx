
import { Logo } from "@/components/logo";
import Link from "next/link";

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode; }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground transition-colors hover:text-white"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-white">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                <Logo className="h-10 w-auto" />
            </Link>
             <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              Premier community for STEM, Healthcare, and Public Health professionals.
            </p>
             <div className="flex space-x-4 mt-6">
              <SocialIcon href="#">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                <span className="sr-only">LinkedIn</span>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span className="sr-only">Twitter/X</span>
              </SocialIcon>
              <SocialIcon href="#">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.316 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.06-1.064.049-1.805.218-2.227.415-.562.254-.965.498-1.383.916-.417.417-.662.82-.916 1.383-.197.422-.366 1.163-.415 2.227-.048 1.023-.06 1.351-.06 3.807s.012 2.784.06 3.807c.049 1.064.218 1.805.415 2.227.254.562.498.965.916 1.383.417.417.82.662 1.383.916.422.197 1.163.366 2.227.415 1.023.048 1.351.06 3.807.06h.468c2.456 0 2.784-.011 3.807-.06 1.064-.049 1.805-.218 2.227-.415.562-.254.965-.498 1.383-.916.417-.417.662-.82.916-1.383.197-.422.366-1.163.415-2.227.048-1.023.06-1.351.06-3.807s-.012-2.784-.06-3.807c-.049-1.064-.218-1.805-.415-2.227-.254-.562-.498-.965-.916-1.383-.417-.417-.82-.662-1.383-.916-.422-.197-1.163-.366-2.227-.415-1.023-.048-1.351-.06-3.807-.06z M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" /></svg>
                <span className="sr-only">Instagram</span>
              </SocialIcon>
               <SocialIcon href="#">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                <span className="sr-only">YouTube</span>
              </SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-white">Home</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-white">Dashboard</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-white">Community</Link></li>
              <li><Link href="/podcast" className="text-muted-foreground hover:text-white">Podcast</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-white">Blog</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-white">Events</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white">Guides</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white">Workshops</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white">Partnerships</Link></li>
               <li><Link href="#" className="text-muted-foreground hover:text-white">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold mb-4 tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Upskill Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

    