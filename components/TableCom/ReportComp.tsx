'use client';
import { LockerReportType } from '@/app/Type/type';
import React, { useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface RecentReportTableProps {
    reports: LockerReportType[];
}

const ReportComp: React.FC<RecentReportTableProps> = ({reports}) => {
    const [showAll, setShowAll] = useState(false);
    const displayReports = showAll ? reports : reports.slice(0, 5);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [selectedReport, setSelectedReport] = useState<LockerReportType | null>(null);

    useEffect(() => {
    if (tableContainerRef.current) {
      const fullHeight = tableContainerRef.current.scrollHeight;
      if (showAll) setMaxHeight(`${fullHeight}px`);
      else setMaxHeight('300px'); // ความสูงสำหรับแสดง 5 แถว ประมาณ 300px
    }
  }, [showAll, reports]);
  
  return (
    <div>
        {reports && reports.length > 0 ? (
            <div className="space-y-4">
                <div
                ref={tableContainerRef} 
                className="overflow-hidden rounded-md border border-gray-700 transition-all duration-500"
                style={{ maxHeight }}
                >
                    <Table className="min-w-full text-sm text-gray-300">
                    
                        <TableHeader className="sticky top-0 bg-gray-800 z-10">
                            <TableRow>
                                <TableHead className="text-white">Locker Number</TableHead>
                                <TableHead className="text-white">Member ID</TableHead>
                                <TableHead className="text-white">Employee Name</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Corective Action</TableHead>
                                <TableHead className="text-white">Remark</TableHead>
                                <TableHead className="text-white">Inspector</TableHead>
                                <TableHead className="text-white">Date Check</TableHead>
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                            {displayReports.map((r, index) => (
                                <TableRow key={index}
                                    onClick={() => setSelectedReport(r)}
                                    className="cursor-pointer hover:bg-gray-700 transition"
                                >
                                    <TableCell>{r.lockerNumber}</TableCell>
                                    <TableCell>{r.member_ID}</TableCell>
                                    <TableCell>{r.name_Lastname}</TableCell>
                                    <TableCell>
                                        {r.lockerLogResult !== 'NOT PASS' ? (
                                            <Check className="bg-green-600 text-white rounded-sm" />
                                        ) : (
                                            <X className="bg-red-600 text-white rounded-sm" />
                                        )}
                                    </TableCell>
                                    <TableCell>{r.corective_action || 'No Action'}</TableCell>
                                    <TableCell>{r.remark || 'No Remark'}</TableCell>
                                    <TableCell>{r.inspector}</TableCell>
                                    <TableCell>
                                        {r.date_check ? new Date(r.date_check).toLocaleString() : ''}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {reports.length > 5 && (
                    <div className="flex justify-center mt-2">
                        <Button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : `Show All (${reports.length})`}
                        </Button>
                    </div>
                )}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <p className="text-3xl font-medium">No Reports Found</p>
            </div>
        )}

        {/* ✅ Dialog แสดงรายละเอียด */}

        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
            <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-3xl h-3/5 p-6 rounded-2xl shadow-2xl">
                <DialogHeader className="border-b border-gray-700 pb-3">
                <DialogTitle className="font-bold text-xl">Locker Report Detail</DialogTitle>
                <DialogDescription className="text-gray-400">
                    Detailed information about this locker inspection
                </DialogDescription>
                </DialogHeader>

                {selectedReport && (
                    <div className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <p>
                            <span className="font-semibold text-gray-400">Locker Number :</span>{' '}
                            <span className="text-white">{selectedReport.lockerNumber}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Member ID :</span>{' '}
                            <span className="text-white">{selectedReport.member_ID}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Name :</span>{' '}
                            <span className="text-white">{selectedReport.name_Lastname}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Status :</span>{' '}
                            <span
                            className={`font-bold ${
                                selectedReport.lockerLogResult !== 'NOT PASS'
                                ? 'text-green-400'
                                : 'text-red-500'
                            }`}
                            >
                            {selectedReport.lockerLogResult}
                            </span>
                        </p>
                        <p className="sm:col-span-2">
                            <span className="font-semibold text-gray-400">Corrective Action :</span>{' '}
                            <span className="text-white">
                            {selectedReport.corective_action || 'No Action'}
                            </span>
                        </p>
                        <p className="sm:col-span-2">
                            <span className="font-semibold text-gray-400">Remark :</span>{' '}
                            <span className="text-white">{selectedReport.remark || 'No Remark'}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Inspector :</span>{' '}
                            <span className="text-white">{selectedReport.inspector}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Date Check :</span>{' '}
                            <span className="text-white">
                            {selectedReport.date_check
                                ? new Date(selectedReport.date_check).toLocaleString()
                                : 'N/A'}
                            </span>
                        </p>
                    </div>
                </div>
                )}

                <DialogFooter className="mt-6">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
                        onClick={() => setSelectedReport(null)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}

export default ReportComp
