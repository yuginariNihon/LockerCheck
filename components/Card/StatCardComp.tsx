import React, { useEffect, useState } from 'react'
import StatCard from '../stastCard/StatCard'
import { LockerStats } from '@/app/Type/type';
import { SiVirustotal } from 'react-icons/si';
import { PiBatteryEmptyBold, PiLockersFill } from 'react-icons/pi';
import { TbShoe } from "react-icons/tb";
import { toast } from 'sonner';
import LoadingPage from '../loadingPage/loading';
import { useCompareStore, useReportStore } from '@/app/store/useReportStore';

interface StatSectionProps  {
  onLoaded?: () => void;
}

const StatCardComp:React.FC<StatSectionProps> = ({onLoaded}) => {

  const [stats,setStats] = useState<LockerStats | null>(null);
  const [isloading,setIsLoading] = useState(false);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number | ''>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);
  const setReportData = useReportStore((s) => s.setReportData);
  const setMonthlyCheckedPASS = useCompareStore((s) => s.setMonthlyCheckedPASS);
  const setMonthlyCheckedNOTPASS = useCompareStore((s) => s.setMonthlyCheckedNOTPASS);

  useEffect(() => {
    const loadCardData = async () => {

      setIsLoading(true);

      try {
        const res = await fetch("/api/get_dataDashboard",{
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
            action: "getDATADashboard",
            month: selectedMonth ? Number(selectedMonth) : null,
            year: selectedYear ? Number(selectedYear) : null,
          })
        });

        const data = await res.json();

        if(data.success){
          setStats({
            total: data.totalLocker,
            used: data.used,
            free: data.free,
            checked: data.checked,
            notCheck: data.notCheck,
            totalShoe : data.totalLockerShoe,
            useShoe: data.usedShoe,
            freeShoe: data.freeShoe
          });

          setReportData({
            total: data.totalLocker,
            used: data.used,
            free: data.free,
            checked: data.checked,
            notCheck: data.notCheck,
            totalShoe : data.totalLockerShoe,
            useShoe: data.usedShoe,
            freeShoe: data.freeShoe
          });

          setMonthlyCheckedPASS(data.monthlyCheckedPASS || 0);
          setMonthlyCheckedNOTPASS(data.monthlyCheckedNOTPASS || 0);

        }else{
          toast.error("load Data Fail");
        }
        
      } catch (error) {
        toast("Error : " +error);
      }finally{
        setIsLoading(false);
        onLoaded?.();
      }
    }

    loadCardData();

  },[selectedMonth,selectedYear]);

  const usedPercent = stats?.total ? ((stats.used / stats.total) * 100).toFixed(1) : 0;
  const freePercent = stats?.total ? ((stats.free / stats.total) * 100).toFixed(1) : 0;
  const usedShoePercent = stats?.totalShoe ? ((stats.useShoe / stats.totalShoe) * 100).toFixed(1) : 0;
  const freeShoePercent = stats?.totalShoe ? ((stats.freeShoe / stats.totalShoe) * 100).toFixed(1) : 0;

  return (
    <div>
        {isloading ? (
          <div className='justify-items-center'>
            <LoadingPage/>
          </div>
        ) : (
          <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300'>
            <StatCard 
              title='TOTAL LOCKERS BAGGAGE' 
              value={String(stats?.total ?? 0)} 
              icon={<SiVirustotal/>} 
              bgcolor="bg-blue-950"
              textColor='text-white'
            />

            <StatCard 
              title='USED LOCKERS BAGGAGE' 
              value={String(stats?.used ?? 0)} 
              icon={<PiLockersFill/>} 
              bgcolor="bg-white"
              textColor='text-amber-500'
              percent={usedPercent as string}
            />

            <StatCard 
              title='FREE LOCKERS BAGGAGE' 
              value={String(stats?.free ?? 0)} 
              icon={<PiBatteryEmptyBold/>} 
              bgcolor="bg-white"
              textColor='text-green-600'
              percent={freePercent as string}
            />

            {/**Shoe Locker */}
            <StatCard 
              title='TOTAL LOCKERS SHOES' 
              value={String(stats?.totalShoe ?? 0)} 
              icon={<TbShoe/>} 
              bgcolor="bg-amber-500"
              textColor='text-white'
            />

            <StatCard 
              title='USED LOCKERS SHOES' 
              value={String(stats?.useShoe ?? 0)} 
              icon={<PiLockersFill/>} 
              bgcolor="bg-white"
              textColor='text-blue-500'
              percent={usedShoePercent as string}
            />

            <StatCard 
              title='FREE LOCKERS SHOES' 
              value={String(stats?.freeShoe ?? 0)} 
              icon={<PiBatteryEmptyBold/>} 
              bgcolor="bg-white"
              textColor='text-yellow-500'
              percent={freeShoePercent as string}
            />
          </div>
        )}
        
    </div>
  )
}

export default StatCardComp
