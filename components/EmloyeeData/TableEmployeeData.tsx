'use client';
import BreadcrumbHeader from '@/components/Breadcrumb/BreadcrumbHeader'
import LoadingPage from '@/components/loadingPage/loading';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface LockerMergePropt {
  memberID: string;
  nameLastname: string;
  lockerNumber: string;
  shoesLockerNumber: string;
}

const TableEmployeeData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState<LockerMergePropt[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () =>{
      setIsLoading(true);
      try {
        const res = await fetch("/api/get_MergeLocker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: 'getLockeruserShoesAndLocker',
          }),
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.result)) {
          const rows = data.result;

          const mapped: LockerMergePropt[] = rows.slice(1).map((row: any[]) => ({
            memberID: row[0] || "",
            nameLastname: row[1] || "",
            lockerNumber: row[2] || "",
            shoesLockerNumber: row[3] || "",
          }));

          setDataList(mapped);
        } else {
          toast("Can not Load Data");
        }
        
      } catch (error) {
        toast('Error : ' + error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔍 ฟิลเตอร์จาก search bar
  const filtered = dataList.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.memberID.toLowerCase().includes(text) ||
      item.nameLastname.toLowerCase().includes(text) ||
      item.lockerNumber.toLowerCase().includes(text) ||
      item.shoesLockerNumber.toLowerCase().includes(text)
    );
  });

  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      <BreadcrumbHeader name='Employee Data'/>

      {/* Search Bar */}
      <div className="mt-3 max-w-md">
        <input
          type="text"
          placeholder="Search by Member ID, Name, Locker, Shoes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="w-full">

            {/* Desktop Table */}
            <div className="md:block overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 px-4 py-2 text-left">Member ID</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">Name Lastname</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">Locker Number</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">Shoes Locker</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="border border-gray-700 px-4 py-2">{item.memberID}</td>
                      <td className="border border-gray-700 px-4 py-2">{item.nameLastname}</td>
                      <td className="border border-gray-700 px-4 py-2">{item.lockerNumber}</td>
                      <td className="border border-gray-700 px-4 py-2">{item.shoesLockerNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default TableEmployeeData
