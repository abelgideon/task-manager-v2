"use client";

import { signUpAction } from "@/app/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResponse } from "@/lib/zodSchemas";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: "",
};

export default function SignUpPage() {
  const router = useRouter();
  const [state, formAction, isLoading] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUpAction(formData);

      if (result.success) {
        toast.success("Signed up successfully");
        router.replace("/dashboard");
      }
      return result;
    } catch (e) {
      return {
        success: false,
        error: "An error occurred",
      };
    }
  }, initialState);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>
          Enter your email and password below to create your account
        </CardDescription>
        <CardAction>
          <Link href="/signin" className={buttonVariants({ variant: "link" })}>
            Log in
          </Link>
        </CardAction>
      </CardHeader>
      <form action={formAction} className="space-y-5">
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
          </div>
        </CardContent>
        {state?.error && (
          <p className="text-red-500 text-[.9rem] text-center">
            {state?.error}
          </p>
        )}
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
