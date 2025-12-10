'use client';
import BreadcrumbHeader from '@/components/Breadcrumb/BreadcrumbHeader';
import DataCheckReport from '@/components/TableCom/DataCheckReport';

const LockerReport = () => {

  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      <BreadcrumbHeader name='Locker Report'/>
      <div className='bg-gray-800 rounded-md'>
        <DataCheckReport />
      </div>
    </div>
  );
};

export default LockerReport;
