
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function PublicHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/blog", label: "Blog" },
    { href: "/podcast", label: "Podcast" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
  );
  
  const linkClasses = cn(
      "transition-colors font-medium",
      "text-white/70 hover:text-white"
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Logo className={cn("h-8 w-auto")} />
           <span className={cn("font-headline font-bold text-2xl text-white")}>Upskill</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(linkClasses, pathname === link.href && "text-white font-semibold")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild className={linkClasses}>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90">
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={cn("md:hidden text-white hover:bg-white/10 hover:text-white")}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background text-foreground border-r">
            <div className="grid gap-6 p-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                <Logo className="h-10 w-auto text-foreground" />
              </Link>
              <nav className="grid gap-4 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="grid gap-4 mt-8">
                <Button asChild className="bg-primary text-primary-foreground">
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
