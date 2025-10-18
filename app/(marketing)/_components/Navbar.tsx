import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Features", href: "/features" },
  { id: 3, name: "Faq", href: "/faq" },
];

export async function Navbar() {
  const session = await getSession();
  return (
    <nav className="flex justify-between p-4">
      <div className="flex gap-10 justify-center items-center">
        <h1 className="font-bold text-3xl">Tido</h1>
        {navLinks.map((link) => (
          <Link className="hover:text-primary" key={link.id} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>

      <div className="md:flex md:gap-4 hidden">
        <ModeToggle />
        {session ? (
          <Link href="/dashboard" className={buttonVariants()}>
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/signin"
              className={buttonVariants({ variant: "outline" })}
            >
              Sign in
            </Link>
            <Link href="/signup" className={buttonVariants()}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
