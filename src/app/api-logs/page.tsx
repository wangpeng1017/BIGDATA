'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter } from 'lucide-react';

type Log = { id: string; time: string; method: string; path: string; status: number };

const ApiLogsPage: React.FC = () => {
  const [q, setQ] = useState('');
  const [logs] = useState<Log[]>([
    { id: '1', time: '2024-03-25 14:30:25', method: 'GET', path: '/api/users', status: 200 },
    { id: '2', time: '2024-03-25 14:35:10', method: 'POST', path: '/api/data/export', status: 500 },
    { id: '3', time: '2024-03-25 14:28:45', method: 'PUT', path: '/api/system/config', status: 401 },
    { id: '4', time: '2024-03-25 14:32:15', method: 'DELETE', path: '/api/users/123', status: 204 }
  ]);

  const filtered = logs.filter(l => l.path.toLowerCase().includes(q.toLowerCase()) || l.method.toLowerCase().includes(q.toLowerCase()));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">API日志管理</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="搜索API路径或方法..."
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select className="px-3 py-2 border border-gray-300 rounded-md">
                <option>全部状态</option>
                <option>成功(2xx)</option>
                <option>失败(4xx/5xx)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">接口</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{row.time}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.method}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.path}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiLogsPage;
