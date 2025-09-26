'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Smartphone, RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'account' | 'sms'>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    smsCode: '',
    captcha: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      phone: '',
      smsCode: '',
      captcha: ''
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 模拟登录加载时间
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 直接跳转到首页，不需要验证任何内容
    router.push('/dashboard');
  };

  const sendSmsCode = () => {
    // 模拟发送短信验证码
    alert('验证码已发送');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            大数据分析平台
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请登录您的账户
          </p>
        </div>
        
        {/* 登录方式切换 */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setLoginType('account')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginType === 'account'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            账号密码
          </button>
          <button
            type="button"
            onClick={() => setLoginType('sms')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginType === 'sms'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            短信登录
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {loginType === 'account' ? (
            <>
              {/* 用户名 */}
              <div>
                <label htmlFor="username" className="sr-only">
                  用户名/手机号/邮箱
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="用户名/手机号/邮箱"
                />
              </div>
              
              {/* 密码 */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="密码"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 手机号 */}
              <div>
                <label htmlFor="phone" className="sr-only">
                  手机号
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="请输入手机号"
                />
              </div>
              
              {/* 短信验证码 */}
              <div className="flex space-x-2">
                <input
                  name="smsCode"
                  type="text"
                  value={formData.smsCode}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="短信验证码"
                />
                <button
                  type="button"
                  onClick={sendSmsCode}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  获取验证码
                </button>
              </div>
            </>
          )}
          
          {/* 验证码 */}
          <div className="flex space-x-2">
            <input
              name="captcha"
              type="text"
              value={formData.captcha}
              onChange={handleInputChange}
              className="flex-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="图形验证码"
            />
            <div className="flex items-center space-x-2">
              <div className="w-20 h-10 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-sm font-mono">
                A8K9
              </div>
              <button type="button" className="text-gray-400 hover:text-gray-600">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 记住我 */}
          {loginType === 'account' && (
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                记住我
              </label>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '登录中...' : '登录'}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              重置
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}