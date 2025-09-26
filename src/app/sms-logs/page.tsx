'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, MessageCircle, Calendar, Phone, CheckCircle, XCircle, Clock, BarChart3, RefreshCw } from 'lucide-react';

interface SmsLog {
  id: string;
  phone: string;
  content: string;
  templateName: string;
  status: 'sent' | 'failed' | 'pending' | 'delivered';
  sentAt: string;
  deliveredAt?: string;
  errorMessage?: string;
  provider: string;
  cost: number;
  userId?: string;
  userName?: string;
}

export default function SmsLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('today');

  const [logs, setLogs] = useState<SmsLog[]>([
    {
      id: '1',
      phone: '138****8888',
      content: '您的登录验证码是：123456，有效期5分钟。',
      templateName: '登录验证码',
      status: 'delivered',
      sentAt: '2024-03-25 14:30:25',
      deliveredAt: '2024-03-25 14:30:28',
      provider: '阿里云',
      cost: 0.045,
      userId: 'u1',
      userName: '张三'
    },
    {
      id: '2',
      phone: '139****9999',
      content: '您的订单已支付成功，我们将尽快处理。',
      templateName: '支付成功通知',
      status: 'sent',
      sentAt: '2024-03-25 14:25:10',
      provider: '腾讯云',
      cost: 0.050,
      userId: 'u2',
      userName: '李四'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      sent: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      sent: '已发送',
      delivered: '已送达',
      failed: '失败',
      pending: '发送中'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <MessageCircle className="mr-2 text-blue-600" />
                短信日志管理
              </h1>
              <p className="text-gray-600 mt-1">查看短信发送记录和统计分析</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Download className="mr-2 w-4 h-4" />
                导出
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <RefreshCw className="mr-2 w-4 h-4" />
                刷新
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{logs.length}</div>
              <div className="text-sm text-gray-600">总发送数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{logs.filter(l => l.status === 'delivered').length}</div>
              <div className="text-sm text-gray-600">成功送达</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{logs.filter(l => l.status === 'failed').length}</div>
              <div className="text-sm text-gray-600">发送失败</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">95.2%</div>
              <div className="text-sm text-gray-600">成功率</div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索手机号或内容..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="delivered">已送达</option>
                <option value="sent">已发送</option>
                <option value="failed">失败</option>
                <option value="pending">发送中</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">手机号</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">内容</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">模版</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发送时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">费用</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">{log.phone}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">{log.content}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{log.templateName}</td>
                  <td className="px-4 py-4">{getStatusBadge(log.status)}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{log.sentAt}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{log.userName || '-'}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">¥{log.cost.toFixed(3)}</td>
                  <td className="px-4 py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}