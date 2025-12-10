import { NextResponse } from "next/server";


export async function POST() {
    const response = NextResponse.json({success:true, message:"Logged out"});
    const paths = ["/LoginPage",];
    response.cookies.set("user","",{
        httpOnly: true,
        secure: true,
        path: "/LoginPage",
        sameSite: "strict",
        expires: new Date(0),
    });

    return response;
    
}