import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL as string;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}