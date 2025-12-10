'use client';
import { LockerReportType } from '@/app/Type/type';
import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { months } from '@/app/Type/constant';
import LoadingPage from '@/components/loadingPage/loading';
import ReportComp from '@/components/TableCom/ReportComp';

const DataCheckReport = () => {

  const [reports, setReports] = useState<LockerReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number | ''>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);

  // ✅ ฟังก์ชันดึงข้อมูลจาก API ตามเดือน/ปี
  const getReport = async (month?: number, year?: number) => {

    try {
      setIsLoading(true);
      const res = await fetch("/api/locker/get_LockerReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: month || '',
          year: year || ''
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.reports)) {
        setReports(
          data.reports.map((r: any) => ({
            lockerNumber: r["LOCKER NUMBER"] ?? "",
            member_ID: r["MEMBER ID"] ?? "",
            name_Lastname: r["EMPLOYEE NAME"] ?? "",
            lockerLogResult: r["LOCKERLOG RESULT"] ?? "",
            corective_action: r["CORECTIVE ACTION"] ?? "",
            remark: r["REMARK"] ?? "",
            inspector: r["INSPECTOR"] ?? "",
            date_check: r["DATE CHECK"] ? new Date(r["DATE CHECK"]) : null,
          }))
        );
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ โหลดข้อมูลเริ่มต้น
  useEffect(() => {
    getReport(selectedMonth as number, selectedYear as number);
  }, []);

  // ✅ เมื่อเปลี่ยนเดือนหรือปี ให้โหลดข้อมูลใหม่จาก Server
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      getReport(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  const exportToExcel = () => {
    if (!reports || reports.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      reports.map((r) => ({
        "Locker Number": r.lockerNumber,
        "Member ID": r.member_ID,
        "Employee Name": r.name_Lastname,
        "Status": r.lockerLogResult,
        "Corective Action": r.corective_action,
        "Remark": r.remark,
        "Inspector": r.inspector,
        "Date Check": r.date_check
          ? new Date(r.date_check).toLocaleString()
          : "",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Locker Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Locker_Report_${selectedMonth}_${selectedYear}.xlsx`);
  };

  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className='px-4 md:px-6 lg:px-8 pt-6 md:pt-8'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Locker Check Report</h1>

        <div className='flex flex-wrap gap-3 items-center'>
          <Select
            onValueChange={(value) => setSelectedMonth(value ? Number(value) : '')}
            value={selectedMonth ? String(selectedMonth) : ""}
          >
            <SelectTrigger className='w-[160px] bg-gray-800 text-white border-gray-600'>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className='bg-gray-800 text-white'>
              {months.map((m, i) => (
                <SelectItem key={i} value={String(i + 1)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

          <Button
            onClick={exportToExcel}
            disabled={reports.length === 0}
            className={
              reports.length === 0
                ? "bg-gray-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }
          >
            Export Excel
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="justify-items-center space-y-4">
          <LoadingPage />
        </div>
      ) : (
        <ReportComp reports={reports}/>
      )}
    </div>
  );
};

export default DataCheckReport;
