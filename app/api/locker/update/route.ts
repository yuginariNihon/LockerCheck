import { NextResponse } from "next/server";
import { LockerReportType, LockerType } from "../../../Type/type";

const API_URL = process.env.API_URL as string;

export async function fetchReportLockers(): Promise<LockerReportType[]> {
  try {
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    console.log(data);

    return data.map((item: any) => ({
      lockerNumber: item["LOCKER NUMBER"] || "",
      member_ID: item["MEMBER ID"] || "",
      name_Lastname: item["EMPLOYEE NAME"] || "",
      lockerLogResult: item["LOCKERLOG RESULT"] || "",
      corective_action: item["CORECTIVE ACTION"] || "",
      remark: item["REMARK"] || "",
      inspector: item["INSPECTOR"] || "",
      data_check: item["DATE CHECK"] || "",
    }));
    
  } catch (error) {
    console.error("Error fetching lockers:", error);
    return [];
  }
}

/*export async function fetchLockers(): Promise<LockerType[]> {

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    console.log(data);

    return data.map((item: any) => ({
      lockerUserData_ID: item["LOCKERUSERDATA ID"] || "",
      locker_ID: item["LOCKER ID"] || "",
      locker_Number: item["LOCKER NUMBER"] || "",
      member_ID: item["MEMBER ID"] || "",
      name_Lastname: item["NAME-LASTNAME"] || "",
      active_status:
        item["ACTIVE LOKCER STATUS"] === true ||
        item["ACTIVE LOKCER STATUS"] === "true",
    }));

  } catch (err) {
    console.error("Error fetching lockers:", err);
    return [];
  }
}*/

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