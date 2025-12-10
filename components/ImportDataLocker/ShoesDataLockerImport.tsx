'use client';
import { REQUIRED_HEADER_SHOE } from '@/app/Type/constant';
import LoadingPage from '@/components/loadingPage/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

const ShoesDataLockerImport = () => {
    const [fileName,setFileName] = useState('');
    const [previewData,setPreviewData] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result;
            const workbook = XLSX.read(data,{type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet,{defval: ""});

            const fileHeader = Object.keys(jsonData[0] || {});
            const missingHeaders = REQUIRED_HEADER_SHOE.filter(h => !fileHeader.includes(h));
            const extraHeaders = fileHeader.filter(h => !REQUIRED_HEADER_SHOE.includes(h));

            if(missingHeaders.length > 0 || extraHeaders.length >0){
                toast.error(
                    `Header Not Match Template`+
                    (missingHeaders.length > 0 ? `\n- Miss : ${missingHeaders.join(",")}` : "") +"\n"+
                    (extraHeaders.length > 0 ? `\n- Over: ${extraHeaders.join(",")}`: "")
                );
                return;
            }

            setPreviewData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleClear = () => {
        setFileName('');
        setPreviewData([]);
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    };

    const handleImport = async () => {
        if(previewData.length === 0) {
            toast.error("No Data Import");
            return;
        }

        setIsUploading(true);
        try {
            
            const res = await fetch('/api/importDataShoe',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: previewData}),
            });

            const result = await res.json();
            if(result.success){
                toast.success('Import Data Success');
                setPreviewData([]);
                setFileName('');
            }else {
                toast.error('Import Data Failed');
            }
        } catch (error) {
            toast.error(" Error Message"+ error);
        }finally{
            setIsUploading(false);
            handleClear();
        }
    }

  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      <Card className='bg-gray-800 border-gray-700 text-white'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold'>
                Locker Shoes Data Import
            </CardTitle>
            <CardContent>
                <div className='space-y-4 mt-3'>
                    <div className='flex flex-col sm:flex-row sm:items-center items-center gap-3'>
                        <div className='flex-1'>
                            <Input
                                ref={fileInputRef}
                                type='file'
                                accept='.xlsx,.xls,.csv'
                                onChange={handleFileUpload}
                                className='w-full bg-gray-700 text-white border-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:justify-center file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer'
                            />
                        </div>
                        {/*fileName && <span className='text-sm text-gray-400'>{fileName}</span>*/}
                        {fileName && (
                            <Button
                                onClick={handleClear}
                                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                    {isUploading ? (
                        <div className='flex justify-center items-center w-full min-h-[300px]'>
                            <LoadingPage/>
                        </div>
                        
                    ) : previewData.length > 0 && (
                        <div className='flex flex-col w-full max-w-6xl border border-gray-700 rounded-lg mt-4 overflow-hidden'>
                            <div className='overflow-x-auto overflow-y-auto max-h-[380px] rounded-t-lg'>
                                <Table className='min-w-full table-auto border-collapse'>
                                    <TableHeader className='sticky top-0 bg-gray-800 z-20 shadow-md'>
                                        <TableRow>
                                            {Object.keys(previewData[0]).map((key) => (
                                                <TableHead key={key} className='text-white whitespace-nowrap px-3 py-2 text-sm border-b border-gray-700'>
                                                    {key}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {previewData.slice(0,10).map((row,i) => (
                                        <TableRow key={i}>
                                            {Object.values(row).map((val,j) => (
                                                <TableCell key={j} className='text-gray-300 whitespace-nowrap px-3 py-2 text-sm border-b border-gray-800'>
                                                    {String(val)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <p className='text-xs text-gray-500 mt-2 px-2'>
                                Show Data 10 From {previewData.length} Row
                            </p>
                        </div>
                    )}
                    <div className={`flex justify-end ${isUploading ? ("hidden" ) : ('')}`}>
                        <Button
                            onClick={handleImport}
                            disabled={isUploading || previewData.length === 0}
                            className='bg-green-600 hover:bg-green-700 text-white'
                        >
                            {isUploading ? "Importing" : "Import to Database"}
                        </Button>
                    </div> 
                </div>
            </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ShoesDataLockerImport
