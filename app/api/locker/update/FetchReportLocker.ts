import { LockerReportType } from "@/app/Type/type";

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
