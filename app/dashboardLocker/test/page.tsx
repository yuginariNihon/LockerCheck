'use client';

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LockerTabs() {
  return (
    <Tabs defaultValue="baggage" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="baggage">Locker สัมภาระ</TabsTrigger>
        <TabsTrigger value="shoe">Locker รองเท้า</TabsTrigger>
      </TabsList>

      <TabsContent value="baggage" className="mt-4">
        {/* ----- ส่วนแสดงข้อมูล Locker สัมภาระ ----- */}
        <div className="p-4 rounded-xl bg-gray-800 text-white">
          <h2 className="text-xl font-bold mb-2">Locker สัมภาระ</h2>
          {/* component หรือ table ของคุณ */}
        </div>
      </TabsContent>

      <TabsContent value="shoe" className="mt-4">
        {/* ----- ส่วนแสดงข้อมูล Locker รองเท้า ----- */}
        <div className="p-4 rounded-xl bg-gray-800 text-white">
          <h2 className="text-xl font-bold mb-2">Locker รองเท้า</h2>
          {/* component หรือ table ของคุณ */}
        </div>
      </TabsContent>
    </Tabs>
  );
}
