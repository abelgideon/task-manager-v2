import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "./zodSchemas";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { cache } from "react";
import { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return compare(password, hashedPassword);
}

export async function createSession(userId: string) {
  try {
    const token = await encrypt({ userId });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    console.error("Error creating session:", error);
    return false;
  }
}

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;
    const payload = await decrypt(token);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("During prerendering, `cookies()` rejects")
    ) {
      console.log(
        "Cookies not available during prerendering, returning null session"
      );
      return null;
    }

    console.error("Error getting session:", error);
    return null;
  }
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function getSessionFromMiddleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) return null;

  try {
    const payload = await decrypt(token);
    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    console.error("Error verifying session token:", error);
    return null;
  }
}
