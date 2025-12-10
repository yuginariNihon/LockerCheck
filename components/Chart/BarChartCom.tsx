import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { monthsMALL } from '@/app/Type/constant';
import { toast } from 'sonner';
import LoadingPage from '../loadingPage/loading';

interface BarChartComPrompt{
  onLoaded?: () => void;
}

const BarChartCom:React.FC<BarChartComPrompt> = ({onLoaded}) => {
  const [isloading,setIsLoading] = useState(false);
  const [chartData,setChartData] = useState<{month:string,checked:number}[]>([]);
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  
  // sequential load parent step (ครั้งแรกเท่านั้น)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    const loadBarChartCheck = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/get_BarChartCheck",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            action: "getGraphTotalCheck",
            year: selectedYear ? Number(selectedYear) : null,
          })
        });
        const data = await res.json();
        if(data.success){
          const monthly = Array.isArray(data.monthlyChecked) ? data.monthlyChecked : [];
          
          const formattedcharData = monthly.map((count:number, index:number) => ({
            month: monthsMALL[index],
            checked: count ?? 0,
          }));

          const hasChecked = formattedcharData.some((d:{ month: string; checked: number }) => d.checked > 0);
          if(!hasChecked) toast("There is no Inspection Data This Year.");
          setChartData(formattedcharData);
          
        }else{
          setChartData([]);
          toast("Data Not Found");
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
    }

    loadBarChartCheck();
  },[selectedYear]);

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold mb-4'>Total Check Locker {/*currentYear*/}</h2>
        <div className='text-xl mb-4'>
          <Select
            onValueChange={(value) => setSelectedYear(value ? Number(value) : '')}
            value={selectedYear ? String(selectedYear) : ""}
          >
            <SelectTrigger className='w-[130px] bg-gray-800 text-white border-gray-600'>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className='bg-gray-800 text-white'>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isloading ? (
        <div className='justify-items-center'>
          <LoadingPage />
        </div>
        
      ) : chartData.length === 0 || chartData.every(d => d.checked === 0) ? (
        <div className='text-gray-400 text-center mt-10'>
          Data Not Found For {selectedYear}
        </div>
      ) : (
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
          <div className='min-w-[800px]'>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} className="text-white">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#fff" }}
                  label={{ position: "insideBottom", offset: -5, fill: "#fff" }}
                />
                <YAxis
                  tick={{ fill: "#fff" }}
                  label={{ position: "insideLeft", angle: -90, fill: "#fff" }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#ffffff" }}
                  itemStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#ffffff" }}
                />
                <Bar dataKey="checked" fill="#f59e0b" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default BarChartCom
