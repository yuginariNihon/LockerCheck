'use client';
import { LockerShoesDataType, LockerShoesSchema } from '@/app/Type/type';
import React, { useState } from 'react'
import { useLockerShoesData } from './ShoesLockerCompo/useLockerShoeData';
import LockerShoesSearch from './ShoesLockerCompo/LockerShoesSearch';
import LoadingPage from '../loadingPage/loading';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import LockerShoesGrid from './ShoesLockerCompo/LockerShoesGrid';
import LockerShoeDialog from './ShoesLockerCompo/LockerShoeDialog';
import { toast } from 'sonner';
import ShoesShowColorStatus from './ShoesLockerCompo/ShoesShowColorStatus';

const ShoesLocker = () => {
  
  const { lockerShoesData, filtered, search, setSearch, setLockerShoesData, isLoading } = useLockerShoesData();
  const [loading, setLoading] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState<LockerShoesDataType | null>(null);;
  const [open, setOpen] = useState(false);

  const formShoe = useForm<z.infer<typeof LockerShoesSchema>>({
      resolver: zodResolver(LockerShoesSchema),
  });

  const onSelect = (lockerShoes: any) => {
    setSelectedLocker(lockerShoes);
    formShoe.reset({
      shoeLocker_Id: lockerShoes.shoeLockerId,
      shoesLocker_Number: lockerShoes.shoesLockerNumber,
      member_IdFirst: lockerShoes.memberIdFirst,
      nameLastNameFirst: lockerShoes.nameLastNameFirst,
      member_IdSecound: lockerShoes.memberIdSecound,
      nameLastNameSecound: lockerShoes.nameLastNameSecound,
      shoe_status: lockerShoes.shoestatus,
    });
    setOpen(true);
  };

  const onSubmit = async (values: any) => {
    if (!selectedLocker) return;
    setLoading(true);

    try {
      const res = await fetch("/api/locker/updateShoeLocker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selectedLocker, ...values }),
      });

      const result = await res.json();
      if (result.success) {
        toast("Saved Successfully!");

        setLockerShoesData((prev) =>
          prev.map((i) =>
            i.shoeLockerId === selectedLocker.shoeLockerId
              ? { ...i,
                  shoeLockerId: values.shoeLocker_Id,
                  shoesLockerNumber: values.shoesLocker_Number,
                  memberIdFirst: values.member_IdFirst,
                  nameLastNameFirst: values.nameLastNameFirst,
                  memberIdSecound: values.member_IdSecound,
                  nameLastNameSecound: values.nameLastNameSecound,
                  shoestatus: values.shoe_status, 
                }
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
    <div>
        <h1 className="text-2xl font-bold text-center mb-6">Locker Shoes View (2D)</h1>
        <LockerShoesSearch value={search} onChange={setSearch} />
        <ShoesShowColorStatus/>
        <AnimatePresence>
          {isLoading ? (
            <motion.div className="flex justify-center">
              <LoadingPage />
            </motion.div>
          ) : (
            <LockerShoesGrid lockersShoes={filtered} totallockershoe={lockerShoesData.length} onSelect={onSelect} />
          )}
        </AnimatePresence>

        <LockerShoeDialog
          open={open}
          setOpen={setOpen}
          formShoe={formShoe}
          loading={loading}
          selectedLockerShoe={selectedLocker}
          onSubmit={onSubmit}
        />
    </div>
  );
}

export default ShoesLocker
