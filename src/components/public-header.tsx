
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
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/podcast", label: "Podcast" },
    { href: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-white/10" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white">
          <Logo className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-white/80 transition-colors hover:text-white group",
                pathname === link.href && "text-white"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center",
                pathname === link.href ? "scale-x-100" : "scale-x-0"
              )}/>
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/signup">Join Now</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background text-white border-r-0">
            <div className="grid gap-6 p-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                <Logo className="h-10 w-auto text-white" />
              </Link>
              <nav className="grid gap-4 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="grid gap-4 mt-8">
                <Button asChild className="bg-white text-black hover:bg-white/90">
                  <Link href="/signup">Join Now</Link>
                </Button>
                <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black">
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
