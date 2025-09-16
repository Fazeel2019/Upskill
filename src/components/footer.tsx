import { Mountain } from "lucide-react";
import Link from "next/link";

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-foreground"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg">Upskill</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The global hub for healthcare, STEM, and public health professionals to connect, learn, and grow.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link href="/podcast" className="text-muted-foreground hover:text-foreground">Podcast</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/community" className="text-muted-foreground hover:text-foreground">Community Feed</Link></li>
              <li><Link href="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-foreground">Member Login</Link></li>
              <li><Link href="/signup" className="text-muted-foreground hover:text-foreground">Join Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <SocialIcon href="https://twitter.com">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5.52 4.5 10.01 10 10.01s10-4.49 10-10.01c0-5.53-4.5-10.02-10-10.02zm-3.23 12.35h-1.61v-5.41h1.61v5.41zm-.8-6.2c-.93 0-1.51-.62-1.51-1.39 0-.78.59-1.4 1.52-1.4.93 0 1.5.62 1.5 1.4 0 .77-.57 1.39-1.51 1.39zm8.53 6.2h-1.6v-2.61c0-.62-.22-1.05-.77-1.05-.42 0-.88.29-.88.94v2.72h-1.61v-5.41h1.61v.74c.23-.44.77-.9 1.45-.9 1.55 0 2 1.02 2 2.33v3.24z"/></svg>
                <span className="sr-only">LinkedIn</span>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span className="sr-only">Twitter / X</span>
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Upskill Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
