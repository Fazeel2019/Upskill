
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";

export default function PublicHeader() {
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/podcast", label: "Podcast" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Logo className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild className="hover:bg-white/10 text-white hover:text-white">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/signup">Join Now</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10 text-white hover:text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white border-gray-800">
            <div className="grid gap-6 p-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                <Logo className="h-10 w-auto" />
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

    