import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>You are not authorized</CardTitle>
          <CardDescription>
            Make sure you have logged in to your account
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex-col gap-2">
          <Link
            href="/"
            type="submit"
            className={cn(buttonVariants(), "w-full")}
          >
            Go back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
