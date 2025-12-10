'use client';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/app/Type/type';
import { toast } from 'sonner';

const loginPage = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: "", password: ""},
    });

    useEffect(() => {
        // ดึง CSRF token จาก server
        fetch("/api/csrf-token")
            .then(res => res.json())
            .then(data => setCsrfToken(data.csrfToken));
    }, []);

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...values,
                    csrfToken
                }),
            });

            const result = await res.json();
            if(result.success){
                toast(`Login Success Welcome ${result.name}`);
                //alert(`Welcome ${result.email}`);
                router.replace("/dashboardLocker/Overview_Dashboard");
                //console.log("Login Result:", result);
            }else {
                toast(result.message + "HAHAHAHAHA");
                //alert(result.message);
            }
        } catch (error) {
            console.error(error);
            toast("Login failed");
            //alert("Login failed");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
        <Card className='w-full max-w-md bg-gray-800 border-gray-700'>
            <CardHeader>
                <CardTitle className='text-center text-2xl font-bold text-white'>
                    <div className='flex-shrink-0 flex justify-center items-center text-indigo-500 text-4xl font-bold transition-all'>
                        <span className='text-6xl'>L</span>ocker
                        <span className='text-6xl pl-2 text-white'>L</span>
                        <p className='text-white'>og in</p>
                        
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <Label className='text-white'>Email</Label>
                                    <FormControl>
                                        <Input type='email' placeholder='Enter your email' {...field} className='bg-white'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <Label className='text-white'>Password</Label>
                                    <FormControl>
                                        <Input type='password' placeholder='Enter your password' {...field} className='bg-white'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <a href='#' className='flex justify-end text-white text-sm'>Forgot Password?</a>
                        <Button type='submit' disabled={loading} className='w-full bg-blue-500 text-white hover:bg-blue-800 mt-1'>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default loginPage
