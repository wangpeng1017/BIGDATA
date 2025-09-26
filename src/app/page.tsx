'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到登录页
    router.push('/login');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">重庆数据平台</h1>
        <p className="text-gray-600 mt-2">正在跳转到登录页...</p>
      </div>
    </div>
  );
}
