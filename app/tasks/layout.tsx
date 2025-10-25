import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

export default function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="flex justify-between">
        <Link
          href="/dashboard"
          className={cn("mb-6", buttonVariants({ variant: "outline" }))}
        >
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to Dashboard
        </Link>
        <ModeToggle />
      </div>

      <div className="border rounded-lg shadow-sm p-6">{children}</div>
    </div>
  );
}
