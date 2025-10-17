import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div>
      <h1>Stay Organized. Get Things Done.</h1>
      <p>
        Manage your tasks, track progress, and boost productivity — all in one
        place.
      </p>
      <Link href="/signup" className={buttonVariants()}>
        Get Started
      </Link>
    </div>
  );
}
