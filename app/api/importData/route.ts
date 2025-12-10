import { NextResponse } from "next/server";

const API_URL = process.env.API_URL as string;

export async function POST(req: Request) {

  try {
    const body = await req.json();
    if(!body || !body.data || !Array.isArray(body.data)){
        return NextResponse.json(
            {success: false, error:"Invalid request body or missing 'data' array"},
            {status: 400}
        );
    }

    if(!API_URL) return NextResponse.json(
        {success: false, error:"Missing API"},
        {status: 500}
    );

    const res = await fetch(API_URL,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "importData",
        data: body.data,
      }),
    });

    if(!res.ok){
        const text = await res.text();
        return NextResponse.json(
            {success:false, error: `External API failed: ${text}`}
        );
    }
    
    const data = await res.json();

    return NextResponse.json({
        success: true,
        message: "Data Upload Successfully",
        data,
    });

  } catch (error: any) {
    console.error("Error in API Route: ", error);
    return NextResponse.json({success: false, error: error.message || "Unkwon Server Error"},
        {status:500}
    );
  }
}