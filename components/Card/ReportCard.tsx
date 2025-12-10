import React, { useEffect, useState } from 'react'
import { useCompareStore, useReportStore } from '@/app/store/useReportStore'
import StatCard from '../stastCard/StatCard';
import { TbXboxXFilled } from 'react-icons/tb';
import { FaCheckCircle } from 'react-icons/fa';

interface ReportCardComProps {
  onLoaded?: () => void;
}

const ReportCard:React.FC<ReportCardComProps> = ({onLoaded}) => {
  const monthlyCheckedPASS = useCompareStore((s) => s.monthlyCheckedPASS);
  const monthlyCheckedNOTPASS = useCompareStore((s) => s.monthlyCheckedNOTPASS);
  const report = useReportStore((s) => s.reportData);

  const checkedPercent = report?.total ? ((report.checked / report.total) * 100).toFixed(1) : 0;
  const notCheckPercent = report?.total ? ((report.notCheck / report.total) * 100).toFixed(1) : 0;
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    try {
      
    } catch (error) {
      
    }finally{
      if (!hasLoadedOnce) {
          onLoaded?.();
          setHasLoadedOnce(true);
      }
    }
  });

  return (
    <div className='mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-300'>
      
      <StatCard 
        title='LOCKER CHECKED' 
        value={String(report?.checked ?? 0)} 
        icon={<FaCheckCircle/>} 
        bgcolor="bg-amber-300"
        textColor='text-white'
        percent={checkedPercent as string}
      />

      <StatCard 
        title='NOT CHECK' 
        value={String(report?.notCheck ?? 0)} 
        icon={<TbXboxXFilled/>} 
        bgcolor="bg-white"
        textColor='text-red-500'
        percent={notCheckPercent as string}
      />

      <StatCard 
        title='PASS CHECK' 
        value={String(monthlyCheckedPASS ?? 0)} 
        icon={<FaCheckCircle/>} 
        bgcolor="bg-blue-950"
        textColor='text-white'
      />

      <StatCard 
        title='NOT PASS CHECK' 
        value={String(monthlyCheckedNOTPASS ?? 0)} 
        icon={<TbXboxXFilled />} 
        bgcolor="bg-red-600"
        textColor='text-white'
      />
    </div>
  )
}


export default ReportCard
