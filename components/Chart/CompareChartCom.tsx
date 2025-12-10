'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Legend,
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { monthsMALL } from '@/app/Type/constant';
import LoadingPage from '../loadingPage/loading';
import * as htmlToImage from 'html-to-image';
import { Button } from '../ui/button';

interface CompareChartComProps {
  onLoaded?: () => void;
}

const CompareChartCom: React.FC<CompareChartComProps> = ({ onLoaded }) => {
  
  const [chartCompareData, setChartCompareData] = useState<{ month: string; pass: number; notpass: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'pass' | 'notpass'>('all');
  
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadBarChartCompare = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/get_BarChartCompare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'getGraphCompareYear',
            year: selectedYear ? Number(selectedYear) : null,
          }),
        });
        const data = await res.json();
        const passArr = data.monthlyCheckedPASS || [];
        const notpassArr = data.monthlyCheckedNOTPASS || [];

        if (data.success) {
          const compareData = monthsMALL.map((m, i) => ({
            month: m,
            pass: passArr[i] || 0,
            notpass: notpassArr[i] || 0,
          }));

          setChartCompareData(compareData);
        } else {
          setChartCompareData([]);
          toast('Locker Check Monthly Data Not Found');
        }
      } catch (error) {
        toast('Error : ' + error);
      } finally {
        setIsLoading(false);
        if (!hasLoadedOnce) {
          onLoaded?.();
          setHasLoadedOnce(true);
        }
      }
    };

    loadBarChartCompare();
  }, [selectedYear]);

  // ✅ คำนวณค่าเฉลี่ยไว้ใช้ ReferenceLine
  const allValues = chartCompareData.flatMap((d) => [d.pass, d.notpass]);
  const avgValue =
    allValues.length > 0 ? allValues.reduce((a, b) => a + b, 0) / allValues.length : 0;
  
  const handleExportChart = () => {
    if (!chartRef.current) {
    toast('Chart is not ready for export');
    return;
  }

  import('html-to-image').then((htmlToImage) => {
    htmlToImage.toPng(chartRef.current!)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `LockerCheck_${selectedYear}.png`;
        link.click();
      })
      .catch((err) => toast('Export Failed: ' + err));
  });
  }

  return (
    <div className="m-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4 text-white">Locker Check Monthly</h2>

        <div className="flex gap-2 items-center mb-4">
          {/* 🔘 Filter Toggle */}
          <Select
            onValueChange={(v) => setViewMode(v as 'all' | 'pass' | 'notpass')}
            value={viewMode}
          >
            <SelectTrigger className="w-[130px] bg-gray-800 text-white border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="all">Total</SelectItem>
              <SelectItem value="pass">Pass</SelectItem>
              <SelectItem value="notpass">Not Pass</SelectItem>
            </SelectContent>
          </Select>

          {/* 📅 Year Select */}
          <Select
            onValueChange={(v) => setSelectedYear(v ? Number(v) : '')}
            value={selectedYear ? String(selectedYear) : ''}
          >
            <SelectTrigger className="w-[110px] bg-gray-800 text-white border-gray-600">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleExportChart}
            className={"bg-green-600 hover:bg-green-700 text-white"}
          >
            Export Graph
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="justify-items-center">
          <LoadingPage />
        </div>
      ) : chartCompareData.length === 0 ||
        chartCompareData.every((d) => d.pass === 0 && d.notpass === 0) ? (
        <div className="text-gray-400 text-center mt-10">
          Data Not Found For {selectedYear}
        </div>
      ) : (
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
          <div ref={chartRef} className='min-w-[800px]'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartCompareData}
                    margin={{ top: 30, right: 30, left: 10, bottom: 5 }}
                    barCategoryGap="20%"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" tick={{ fill: '#fff' }} />
                    <YAxis tick={{ fill: '#fff' }} />
                    <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number, name: string, props: any) => {
                        const total = props.payload.pass + props.payload.notpass;
                        const percent = total ? ((value / total) * 100).toFixed(1) + '%' : '-';
                        return [`${value} (${percent})`, name === 'pass' ? 'Pass' : 'Not Pass'];
                    }}
                    />
                    <Legend wrapperStyle={{ color: '#fff' }} />

                    {viewMode !== 'notpass' && (
                    <Bar dataKey="pass" fill="#22c55e" name="PASS" barSize={35}>
                        <LabelList
                        position="top"
                        fill="#fff"
                        fontSize={12}
                        fontWeight="bold"
                        formatter={(label) => (typeof label === 'number' && label > 0 ? label : '')}
                        />
                    </Bar>
                    )}
                    {viewMode !== 'pass' && (
                    <Bar dataKey="notpass" fill="#ef4444" name="NOT PASS" barSize={35}>
                        <LabelList
                        position="top"
                        fill="#fff"
                        fontSize={12}
                        fontWeight="bold"
                        formatter={(label) => (typeof label === 'number' && label > 0 ? label : '')}
                        />
                    </Bar>
                    )}

                    <ReferenceLine
                    y={avgValue}
                    stroke="#3b82f6"
                    strokeDasharray="4 4"
                    label={{ value: 'Average', fill: '#3b82f6', position: 'top' }}
                    />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default CompareChartCom;
