'use client'
import { useEffect, } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext';



export default function Home() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }



  });




  return (
  <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 max-w-7xl mx-auto">
    <div className="w-full max-w-sm flex justify-center"> {/* Add flex and justify-center here */}
      <Button variant="outline" onClick={logout}>Logout</Button>
    </div>
  </div>
  );
}
