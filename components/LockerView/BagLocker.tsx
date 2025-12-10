'use client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import LoadingPage from '@/components/loadingPage/loading';
import { motion, AnimatePresence } from "framer-motion";
import { LockerSchema, LockerType } from '@/app/Type/type';
import LockerSearch from './ฺBagLockerCompo/LockerSearch';
import LockerGrid from './ฺBagLockerCompo/LockerGrid';
import LockerDialog from './ฺBagLockerCompo/LockerDialog';
import { useLockerData } from './ฺBagLockerCompo/useLockerData';
import BagShowColorStatus from './ฺBagLockerCompo/BagShowColorStatus';

const BagLocker = () => {
  const { lockers, filtered, search, setSearch, setLockers, isLoading } = useLockerData();
  const [selectedLocker, setSelectedLocker] = useState<LockerType | null>(null);;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof LockerSchema>>({
    resolver: zodResolver(LockerSchema),
  });

  const onSelect = (locker: any) => {
    setSelectedLocker(locker);
    form.reset({
      locker_User_ID: locker.lockerUserData_ID,
      member_ID: locker.member_ID,
      name_Lastname: locker.name_Lastname,
      active_status: locker.active_status,
    });
    setOpen(true);
  };

  const onSubmit = async (values: any) => {
    if (!selectedLocker) return;
    setLoading(true);

    try {
      const res = await fetch("/api/locker/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selectedLocker, ...values }),
      });

      const result = await res.json();
      if (result.success) {
        toast("Saved Successfully!");

        setLockers((prev) =>
          prev.map((i) =>
            i.lockerUserData_ID === selectedLocker.lockerUserData_ID
              ? { ...i, ...values }
              : i
          )
        );
        setOpen(false);
      } else {
        toast("Failed to Save");
      }
    } catch (e) {
      toast("Error Saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-6">Locker View (2D)</h1>

      <LockerSearch value={search} onChange={setSearch} />

      <BagShowColorStatus/>
      
      <AnimatePresence>
        {isLoading ? (
          <motion.div className="flex justify-center"><LoadingPage /></motion.div>
        ) : (
          <LockerGrid lockers={filtered} totalLocker={lockers.length} onSelect={onSelect} />
        )}
      </AnimatePresence>

      <LockerDialog
        open={open}
        setOpen={setOpen}
        form={form}
        loading={loading}
        selectedLocker={selectedLocker}
        onSubmit={onSubmit}
      />
    </div>
    
  );
}

export default BagLocker
