import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  return (
    <div className="text-center space-y-3 mt-45 px-4">
      <h1 className="text-5xl font-bold md:text-8xl">
        Task managing <span className="block text-primary">organized</span>
      </h1>
      <p className="text-muted-foreground md:text-2xl line-clamp-2">
        Manage your tasks, track progress, and boost productivity
      </p>
      {session ? (
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/signup"
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        >
          Get Started
        </Link>
      )}
    </div>
  );
}
