'use client'
import { RegisterForm } from "@/components/registerForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';

export default function Login() {
  const {token} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/');
      return;
    }
  });



  return (
    <div className="flex min-h-screen w-full items-center justify-center align-middle p-6 md:p-10 max-w-7xl mx-auto">
      <div className="w-full max-w-sm flex justify-center"> {/* Add flex and justify-center here */}
        <RegisterForm />
      </div>
    </div>
  );
}