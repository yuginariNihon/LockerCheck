import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const userCookie = (await cookieStore).get("user");

    let user = null;
    if(userCookie?.value){
        user = JSON.parse(userCookie.value);
    }

    return new Response(JSON.stringify({user}));
}