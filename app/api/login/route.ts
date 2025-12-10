import { NextResponse } from "next/server";
import Tokens from "csrf";

const tokens = new Tokens();
const API_URL = process.env.API_URL as string;

export async function  POST(req: Request) {
    try {
        const body = await req.json();
        const { csrfToken, ...loginData } = body;

        const res = await fetch(API_URL,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                action: "login",
                ...loginData,
            }),
        });

        const result = await res.json();

        if (result.success) {
            // ✅ สร้าง cookie เก็บ user
            const response = NextResponse.json({
                success: true,
                message: "Login Successful",
                name: result.name,
                email: result.email,
                permission: result.permission,
            });

            response.cookies.set(
                "user",
                JSON.stringify({
                    email: result.email,
                    name: result.name,
                    permission: result.permission,
                }),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/", // ✅ ต้องเป็น root เพื่อให้ใช้ได้ทุกหน้า
                    maxAge: 60 * 60 * 24, // 1 วัน
                }
            );
                return response;
            }
            return NextResponse.json(result);
    } catch (error :any) {
        console.error("Error in API Route: ", error);
        return NextResponse.json({success: false, error: error.message});
    }
    
}