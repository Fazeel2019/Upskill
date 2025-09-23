
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
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
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
      isScrolled ? "bg-white/80 backdrop-blur-lg border-b" : "bg-transparent"
  );
  
  const linkClasses = (isActive: boolean) => cn(
      "transition-colors font-medium",
      isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white",
      isActive && (isScrolled ? "text-blue-600" : "text-white")
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Logo className={cn("h-8 w-auto text-foreground")} />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(pathname === link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
           <p className={cn("text-sm font-medium", isScrolled ? "text-gray-600" : "text-white/80")}>Join 10,000+ already advancing 🚀</p>
          <Button variant="ghost" asChild className={linkClasses(false)}>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 shadow-md">
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={cn("md:hidden", isScrolled ? "text-gray-900" : "text-white", "hover:bg-black/10")}>
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
                <Button asChild className="bg-blue-600 text-white">
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
