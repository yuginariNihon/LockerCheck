'use client';

import BreadcrumbHeader from '@/components/Breadcrumb/BreadcrumbHeader';
import BagDataLockerImport from '@/components/ImportDataLocker/BagDataLockerImport';
import ShoesDataLockerImport from '@/components/ImportDataLocker/ShoesDataLockerImport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const page = () => {
    const [activeTab, setActiveTab] = useState("baggage");
    
  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      <BreadcrumbHeader name='Import Locker Data'/>
      <Tabs defaultValue="baggage" value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 h-[80px]">
          <TabsTrigger className="data-[state=active]:bg-gray-900 font-bold text-white text-2xl" value="baggage">
            Locker Baggage
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-gray-900 font-bold text-white text-2xl" value="shoe">
              Locker Shoes
            </TabsTrigger>
        </TabsList>

        <TabsContent value="baggage" className="mt-4">
          {/* ----- ส่วนแสดงข้อมูล Locker สัมภาระ ----- */}
          <div className="p-4 rounded-xl bg-gray-800 text-white"
            key={activeTab === "baggage" ? "bag-active" : "bag-inactive"}
          >
            <BagDataLockerImport />
            {/* component หรือ table ของคุณ */}
          </div>
        </TabsContent>

        <TabsContent value="shoe" className="mt-4">
          {/* ----- ส่วนแสดงข้อมูล Locker รองเท้า ----- */}
          <div className="p-4 rounded-xl bg-gray-800 text-white"
            key={activeTab === "shoe" ? "shoe-active" : "shoe-inactive"}
          >
           
            {/* component หรือ table ของคุณ */}
            <ShoesDataLockerImport/>
          </div>
        </TabsContent>
      </Tabs>  
    </div>
  );
}

export default page
