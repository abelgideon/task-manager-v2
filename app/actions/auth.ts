"use server";

import { ActionResponse, userSchema } from "@/lib/zodSchemas";
import { createUser } from "../data/user/create-user";
import {
  comparePassword,
  createSession,
  deleteSession,
  hashPassword,
} from "@/lib/auth";
import z from "zod";
import { getUserByEmail } from "../data/user/get-user-by-email";
import { redirect } from "next/navigation";

export async function signInAction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = userSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation Error",
        errors: z.flattenError(validationResult.error).fieldErrors,
      };
    }

    const user = await getUserByEmail(validationResult.data.email);

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const passwordValid = await comparePassword(
      validationResult.data.password,
      user.password
    );

    if (!passwordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    await createSession(user.id, user.email);

    return {
      success: true,
      message: "Logged in Successfully",
    };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Error Logging in" };
  }
}

export async function signUpAction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = userSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation Error",
        errors: z.flattenError(validationResult.error).fieldErrors,
      };
    }

    const existingUser = await getUserByEmail(validationResult.data.email);
    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists",
      };
    }

    const hashedPassword = await hashPassword(validationResult.data.password);

    const hashedData = {
      ...validationResult.data,
      password: hashedPassword,
    };

    const user = await createUser(hashedData);

    if (!user) {
      return {
        success: false,
        error: "Failed creating user",
      };
    }

    await createSession(user.id, user.email);

    return {
      success: true,
      message: "Account Created Successfully",
    };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Error creating account" };
  }
}

export async function signOut(): Promise<void> {
  try {
    await deleteSession();
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error("Failed to sign out");
  } finally {
    redirect("/");
  }
}
