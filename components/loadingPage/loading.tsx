'use client';
import React from 'react'


interface LoadingOvelayProps {
    message?: string;
    overlay? : boolean;
}

const LoadingPage: React.FC<LoadingOvelayProps> = ({ message = 'Loading...',overlay = false }) => {
  const wrapperClass = overlay
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center py-10';

  return (
    <div className={wrapperClass}>
      {/* กล่องรวมวงกลมทั้งหมด */}
        <div className="relative flex items-center justify-center w-40 h-40 sm:w-64 sm:h-64">
            <div className="absolute inset-0 rounded-full border-[10px] border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
            <div className="absolute inset-3 rounded-full border-[10px] border-t-blue-800 border-r-transparent border-b-transparent border-l-transparent animate-spin-reverse"></div>
            <div className="absolute inset-6 rounded-full border-[10px] border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent animate-spin-fast"></div>
            <div className="absolute inset-9 rounded-full border-[10px] border-t-yellow-100 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
            <div className="absolute inset-12 rounded-full border-[8px] border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-reverse-fast"></div>
            <div className="absolute inset-16 rounded-full border-[8px] border-t-green-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-slower"></div>
            <div className="absolute inset-20 rounded-full border-[10px] border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-fast"></div>
            <div className="absolute inset-25 rounded-full border-[10px] border-t-red-200 border-r-transparent border-b-transparent border-l-transparent animate-spin-reverse"></div>
        </div>

        {/* ข้อความ Loading ด้านล่าง */}
        <div className='flex-shrink-0 flex items-center text-indigo-500 text-5xl font-bold transition-all'>
            <span className='text-8xl'>L</span>ocker <span className='ml-3 text-5xl text-white font-semibold animate-blink'>Loading...</span>
        </div>
        
    </div>
  );
}

export default LoadingPage
