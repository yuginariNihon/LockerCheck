'use client'
import { useEffect, useState } from "react";
import { LockerShoesDataType } from "@/app/Type/type";
import { toast } from "sonner";

export function useLockerShoesData() {
  
  const [filtered, setFiltered] = useState<LockerShoesDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lockerShoesData, setLockerShoesData] = useState<LockerShoesDataType[]>([]);

  useEffect(() => {
  
      const loadlockerShoes = async () => {
            try {
              setIsLoading(true);
              const res = await fetch('/api/get_LockerShoesData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  action: 'getLockerShoesData',
                }),
              });
              const data = await res.json();
      
              if (data.success) {
                const formattedData: LockerShoesDataType[] = data.reports.map((item: any) => ({
                  shoeLockerId: item['SHOELOCKER ID'] || '',
                  shoesLockerNumber: item['SHOESLOCKERNUMBER'] || '',
                  memberIdFirst: item['MEMBER ID FIRST'] || '',
                  nameLastNameFirst: item['NAME-LASTNAME FIRST'] || '',
                  memberIdSecound: item['MEMBER ID SECOUND'] || '',
                  nameLastNameSecound: item['NAME-LASTNAME SECOUND'] || '',
                  shoestatus: item['STATUS'],
                }));
  
                setLockerShoesData(formattedData);
                
              } else {
               
                toast('Locker Check Monthly Data Not Found');
              }
            } catch (error) {
              toast('Error : ' + error);
            } finally {
              setIsLoading(false);
            }
          };
      
          loadlockerShoes();
    },[]);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      lockerShoesData.filter(
        (i) =>
          i.shoesLockerNumber?.toLowerCase().includes(lower) ||
          i.memberIdFirst?.toLowerCase().includes(lower) ||
          i.nameLastNameFirst?.toString().includes(lower) ||
          i.memberIdSecound?.toString().includes(lower) ||
          i.nameLastNameSecound?.toString().includes(lower)
      )
    );
  }, [search, lockerShoesData]);

  return { lockerShoesData, filtered, search, setSearch, setLockerShoesData, isLoading };
}
