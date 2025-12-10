const API_URL = process.env.API_URL as string;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {month,year} = body;
    
        const res = await fetch(API_URL,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                action: "getLockerReport",
                month,
                year,
            }),
        });

        const data = await res.json();
        console.log(data);
        return Response.json(data);
    } catch (error:any) {
        console.log("Error fetching Report :",error );
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}