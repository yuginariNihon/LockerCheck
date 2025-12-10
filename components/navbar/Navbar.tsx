'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input';
import { Bell, Search, User, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


const Navbar = () => {
    //const [menuOpen,setMenuOpen] = useState(false);
    const [profileOpen,SetProfileOpen] = useState(false);
    const [scrolled,setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const [name,setName] = useState<string | null>(null);
    const [email,setEmail] = useState<String | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/get_user");
            const data = await res.json();
            if(data.user?.name){
                setName(data.user.name);
                setEmail(data.user.email);
            }
        }
        fetchUser();
    },[]);

    useEffect(() => {
        function handleClickOurside(event: MouseEvent) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                SetProfileOpen(false);   
            }
        }
        document.addEventListener("mousedown",handleClickOurside);
        return () => document.removeEventListener("mousedown",handleClickOurside);
    },[]);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 10){
                setScrolled(true);
            }else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll',handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    },[]);

    const handleLogout = async () => {
        await fetch("/api/logout",{method: "POST"});
        router.push("/LoginPage");
    };

  return (
    <nav className={`
            fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
                scrolled
                    ? 'bg-white backdrop-blur-sm shadow-sm border-gray-200'
                    : 'bg-white/95 backdrop-blur-sm border-transparent'
            }
        `
    }>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16 items-center'>
                <div className='flex items-center'>
                    <a href='/dashboardLocker/Overview_Dashboard' className='sm:ml-10 flex-shrink-0 flex items-center text-indigo-500 text-3xl font-bold transition-all'>
                        <span className='text-5xl'>L</span>ocker
                    </a>
                </div>

                <div className='flex items-center space-x-4 relative'>
                    <div className='relative hidden sm:block'>
                        <Input
                            type='text'
                            placeholder='Search'
                            className='bg-white pl-8 pr-3 py-1.5 rounded-md border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <Search className='absolute left-2.5 top-1.5 text-gray-400 w-4 h-4'/>
                    </div>
                    <Bell className='text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600'/>

                    <div className='relative' ref={dropdownRef}>
                        <Button
                            onClick={() => SetProfileOpen(!profileOpen)}
                            className='flex items-center space-x-1 focus:outline-none w-10 h-10 rounded-full'
                        >
                            {/*<Image
                                src="https://i.pravatar.cc/40"
                                alt="profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />*/}
                            <User className='bg-white text-black rounded-full'/>
                            {/*<ChevronDown className='w-4 h-4 text-gray-500'/>*/}
                        </Button>

                        {profileOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md py-2 z-50'>
                                <div className='px-4 py-2 border-b'>
                                    <p className='text-sm font-semibold text-gray-800'>
                                        {name}
                                    </p>
                                    <p className='text-xs text-gray-500'>{email}</p>
                                </div>
                                <a href="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Setting
                                </a>
                                <a onClick={handleLogout} href="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
