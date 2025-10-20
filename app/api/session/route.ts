import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return Response.json({ email: null }, { status: 401 });
  }
  try {
    const { payload } = await jwtVerify(token, secret);
    return Response.json({ email: payload.email || null });
  } catch {
    return Response.json({ email: null }, { status: 401 });
  }
}
