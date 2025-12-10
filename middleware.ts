import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    
    const rateMap = new Map<string, number[]>();

    const ip =  req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const now = Date.now();
    const windowMs = 60000; // 1 นาที
    const limit = 60;       // 60 requests

    const timestamps: number[] = rateMap.get(ip) || [];
    const recent = timestamps.filter(t => now - t < windowMs);

    if (recent.length >= limit) {
        return new NextResponse("Too many requests", { status: 429 });
    }

    recent.push(now);
    rateMap.set(ip, recent);

    const cookie = req.cookies.get("user");

    if(!cookie && !req.nextUrl.pathname.startsWith("/LoginPage")){
        const loginUrl = new URL("/LoginPage",req.url);
        return NextResponse.redirect(new URL("/LoginPage", req.url));
    }

    /*if(cookie && req.nextUrl.pathname.startsWith("/LoginPage")){
        const homeUrl = new URL("/dashboardLocker/Locker_section",req.url);
        return NextResponse.redirect(homeUrl);
    }*/
    return NextResponse.next();
}

export const config = {
    matcher:["/((?!_next|static|api|favicon.ico).*)"],
};