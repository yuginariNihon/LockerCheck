'use client';
import React, { useEffect, useState } from 'react';
import { PieChart, Legend, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import LoadingPage from '../loadingPage/loading';

interface PieChartComProps {
  onLoaded?: () => void;
}

const COLORS = ['#4ade80', '#f87171'];

const PieChartCom: React.FC<PieChartComProps> = ({ onLoaded }) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth] = useState<number>(currentMonth);
  const [selectedYear] = useState<number>(currentYear);

  const [currentPassCount, setCurrentPassCount] = useState<number>(0);
  const [currentNotPassCount, setCurrentNotPassCount] = useState<number>(0);

  useEffect(() => {
    const loadPieChart = async () => {
      setIsLoading(true);

      try {
        const res = await fetch('/api/get_dataDashboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'getPieChart',
            month: selectedMonth,
            year: selectedYear,
          }),
        });

        const data = await res.json();

        if (data.success) {
          const pass = data.monthlyCheckedPASS || 0;
          const notPass = data.monthlyCheckedNOTPASS || 0;

          setCurrentPassCount(pass);
          setCurrentNotPassCount(notPass);

          console.log("API PASS", pass);
          console.log("API NOTPASS", notPass);
        } else {
          toast.error('load Data Fail');
        }
      } catch (error) {
        toast("Error : " + error);
      } finally {
        setIsLoading(false);
        onLoaded?.();
      }
    };

    loadPieChart();
  }, [selectedMonth, selectedYear]);

  const isAllZero = currentPassCount === 0 && currentNotPassCount === 0;

  return (
    <div className="w-full h-[300px]">
      {isLoading ? (
        <LoadingPage/>
      ) : isAllZero ? (
        <div className='flex items-center justify-center h-full py-10'>
          <p className="text-center text-lg text-white">
            No data available for this month
          </p>
        </div>
        
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Pass', value: currentPassCount },
                { name: 'Not Pass', value: currentNotPassCount },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
            >
              <Cell fill={COLORS[0]} />
              <Cell fill={COLORS[1]} />
            </Pie>

            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#fff' }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartCom;
