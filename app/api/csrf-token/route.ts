import { NextResponse } from "next/server";
import Tokens from "csrf";

const tokens = new Tokens();

export async function GET(req: Request) {
  // ตรวจ cookie ว่ามี secret หรือยัง
  const cookieSecret = req.headers.get("cookie")?.match(/csrfSecret=([^;]+)/)?.[1];

  let secret = cookieSecret || tokens.secretSync();

  const csrfToken = tokens.create(secret);

  const response = NextResponse.json({ csrfToken });

  // เก็บ secret ใน cookie httpOnly (per user)
  if (!cookieSecret) {
    response.cookies.set("csrfSecret", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ชั่วโมง
    });
  }

  return response;
}
