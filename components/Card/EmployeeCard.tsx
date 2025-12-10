import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';
import { FaCheckCircle } from 'react-icons/fa';
import { TbXboxXFilled } from 'react-icons/tb';
import LoadingPage from '../loadingPage/loading';

interface EmployeeCardCom{
    onLoaded?: () => void;
}

interface EmployeeDataCard {
    lockerNumber: string;
    employeeName: string;
    status: boolean | string;
}

const EmployeeCard:React.FC<EmployeeCardCom> = ({onLoaded}) => {

    // sequential load parent step (ครั้งแรกเท่านั้น)
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    const [isloading,setIsLoading] = useState(false);
    const [data,setData] = useState<EmployeeDataCard[]>([]);

    useEffect(() => {
        const loadLockerEmployee = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/get_BarChartCompare",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        action: "getLockerEmployee5",
                    })
                });

                const result = await res.json();

                if(result.success){
                    setData(result.data);
                }else {
                    toast('Fetch failed:', result.error);
                }

            } catch (error) {
                toast("Error : " +error);
            }finally{
                setIsLoading(false);
                if(!hasLoadedOnce){
                    onLoaded?.();
                    setHasLoadedOnce(true);
                }
            }
        };

        loadLockerEmployee();
    },[]);

  return (
    <div>
        {isloading ? (
            <LoadingPage/>
        ) : (
            <div>
                <div className='h-8 flex flex-col m-3'>
                    <p className='text-xl font-bold'>Locker Employee</p>
                </div>
                <div className='h-[350px] flex flex-col gap-3 overflow-y-auto scrollbar-hide p-4 bg-gray-900 rounded-lg'>
                    {data.map((item,index) => (
                        <Card key={index}>
                            <CardContent className='flex flex-row gap-5'>
                                {item.status ? (
                                    <FaCheckCircle className='text-2xl text-amber-300'/>
                                ) : (
                                    <TbXboxXFilled className='text-2xl text-red-500'/>
                                )}
                                <span className='text-sm font-bold'>{item.lockerNumber}</span>
                                <span className='text-sm font-bold'>{item.employeeName !== "" ? (item.employeeName) : "No Use"}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
}

export default EmployeeCard
