'use client';
import { menuItems } from '@/app/Type/constant';
import Link from 'next/link';
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

  return (
    <>
        <aside className='hidden md:flex flex-col mt-16 w-64 h-screen fixed top-0 left-0 border-r bg-gray-800 backdrop-blur-sm'>
            <nav className='flex-1 px-4 py-6 space-y-1'>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return(
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-white hover:bg-white hover:text-indigo-600'
                            }`}
                        >
                            <Icon className='w-5 h-5'/>
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>

        {/**Mobile Sidebar */}
        <div className='md:hidden fixed top-4 left-4 z-50'>
            <Sheet>
                <SheetTitle>
                    
                </SheetTitle>
                <SheetTrigger asChild>
                    <Button className='p-2 rounded-md border bg-white'>
                        <Menu className='w-6 h-6 text-gray-700'/>
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='p-0 w-64 bg-gray-800'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0 flex space-x-3 px-3 py-2 items-center text-indigo-500 text-3xl font-bold transition-all'>
                            <span className='text-5xl'>L</span>ocker
                        </div>
                    </div>
                    <nav className='px-4 py-6 space-y-1'>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return(
                                <Link 
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-white hover:bg-gray-100 hover:text-indigo-600"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </>
  );
}

export default Sidebar
