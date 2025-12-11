import { NextResponse } from "next/server";

const API_URL = process.env.API_URL as string;

export async function POST(req: Request) {

  try {
    const body = await req.json();

    if(!API_URL) return NextResponse.json({success: false, error:"Missing API"});

    const res = await fetch(API_URL,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateLocker",
        ...body,
      }),
    });

    const data = await res.json();
    return NextResponse.json({success: true,data});

  } catch (error: any) {
    console.error("Error in API Route: ", error);
    return NextResponse.json({success: false, error: error.message});
  }
}
