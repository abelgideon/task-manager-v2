import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex flex-col space-y-6 min-h-screen justify-center items-center">
        <div className="flex space-x-5">
          <Link className={buttonVariants({ variant: "outline" })} href="/">
            <ArrowLeft className="size-4" /> Go Back
          </Link>
          <ModeToggle />
        </div>
        <h1 className="font-bold text-3xl">Tido</h1>
        {children}
      </div>
    </div>
  );
}
