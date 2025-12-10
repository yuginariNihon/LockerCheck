'use client'
import { useEffect, useState } from "react";
import { LockerType } from "@/app/Type/type";
//import { fetchLockers } from "@/app/api/locker/update/route";
import { toast } from "sonner";

export function useLockerData() {
  const [lockers, setLockers] = useState<LockerType[]>([]);
  const [filtered, setFiltered] = useState<LockerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/get_LockerData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    action: 'getLockerData',
                }),
            });
              const data = await res.json();
            
              if (data.success) {
                  const formattedData: LockerType[] = data.reports.map((item: any) => ({
                    lockerUserData_ID: item["LOCKERUSERDATA ID"] || "",
                    locker_ID: item["LOCKER ID"] || "",
                    locker_Number: item["LOCKER NUMBER"] || "",
                    member_ID: item["MEMBER ID"] || "",
                    name_Lastname: item["NAME-LASTNAME"] || "",
                    active_status:
                      item["ACTIVE LOKCER STATUS"] === true ||
                      item["ACTIVE LOKCER STATUS"] === "true",
                  }));
        
                  setLockers(formattedData);
                      
              } 
              else {
                toast('Locker Check Monthly Data Not Found');
              }
          } catch (error) {
            toast('Error : ' + error);
          } finally {
            setIsLoading(false);
          }
        };
    load();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      lockers.filter(
        (i) =>
          i.member_ID?.toLowerCase().includes(lower) ||
          i.name_Lastname?.toLowerCase().includes(lower) ||
          i.locker_Number?.toString().includes(lower)
      )
    );
  }, [search, lockers]);

  return { lockers, filtered, search, setSearch, setLockers, isLoading };
}
