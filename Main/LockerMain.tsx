'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const LockerMain = () => {
  const router = useRouter();
  
    const handLocker_Section1 = () =>{
      router.push("/Locker_section");
    };
    
    return (
     <div className="grid grid-cols-4 gap-0 h-screen">
        <div className='flex flex-col col-span-2 items-center justify-center bg-amber-400'>
          <Button className='text-xl font-medium w-100 h-30'
           onClick={handLocker_Section1}
          >
            Locker Section
          </Button>
        </div>
     </div>
    );
}

export default LockerMain
