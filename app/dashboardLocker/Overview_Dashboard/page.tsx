'use client';

import React, { useState } from 'react'
import LoadingPage from '@/components/loadingPage/loading';
import PieChartCom from '@/components/Chart/PieChartCom';
import CompareChartCom from '@/components/Chart/CompareChartCom';
import DataCheckReport from '@/components/TableCom/DataCheckReport';
import StatCardComp from '@/components/Card/StatCardComp';
import BarChartCom from '@/components/Chart/BarChartCom';
import EmployeeCard from '@/components/Card/EmployeeCard';
import ReportCard from '@/components/Card/ReportCard';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

const page = () => {
  const [isloading,setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  const now = new Date();
  const currentYear = now.getFullYear();

  const handleStatCardLoaded = () => setStep(1);
  const handleBarChartLoaded = () => setStep(2);
  const handlePieChartLoaded = () => setStep(3);
  const handleReportCardLoaded = () => setStep(4);
  const handleCompareChartLoaded = () => setStep(5);
  const handleEmployeeCardLoaded = () => setStep(6);
  

  const monthName = now.toLocaleString('en-US', { month: 'long' });

  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      {isloading ? (
        <div className='flex flex-1 justify-center'>
          <LoadingPage overlay/>
        </div>
      ) : (
        <div>
          <div className='flex flex-col'>
            <div className='text-3xl font-bold mb-3'>
              Dashboard
            </div>
            <div className='w-full flex justify-between font-bold text-md mb-3'>
              <div>
                <Breadcrumb/>
              </div>
              <div>
                {monthName} {currentYear}
              </div>
            </div>
          </div>

          <StatCardComp onLoaded={handleStatCardLoaded} />

          <div className='mt-10 flex flex-col lg:flex-row justify-between bg-gray-800 p-6 rounded-lg gap-3 transition-all duration-300'>
            <div className='w-full lg:w-2/3 bg-gray-900 p-6 rounded-lg'>
              {step >= 1 && <BarChartCom onLoaded={handleBarChartLoaded} /> }
            </div>
            <div className='w-full lg:w-1/3 bg-gray-900 p-6 rounded-lg'>
              <h2 className='text-xl font-bold mb-4'>Result Check %</h2>
              {step >= 2 && <PieChartCom onLoaded={handlePieChartLoaded}/>}
            </div>
          </div>

          {step >= 3 && <ReportCard onLoaded={handleReportCardLoaded}/>}

          <div className='mt-10 flex flex-col lg:flex-row sm:flex-1 bg-gray-800 p-6 rounded-lg gap-3 transition-all duration-300'>
            <div className='w-full lg:w-2/3 bg-gray-900 rounded-lg'>
              {step >= 4 && <CompareChartCom onLoaded={handleCompareChartLoaded}/>}
            </div>
            <div className='min-h-[400px] w-full lg:w-1/3 bg-gray-900 rounded-lg'>
              {step >= 5 && <EmployeeCard onLoaded={handleEmployeeCardLoaded}/>}
            </div>
          </div>
          
          <div className='mt-10 h-xl bg-gray-800 p-6 rounded-lg'>
              <DataCheckReport />
          </div>
        </div>
      )}
    </div>
  )
}

export default page
