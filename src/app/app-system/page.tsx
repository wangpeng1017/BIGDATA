'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Plus, Edit, Trash2, Monitor, Settings, CheckCircle, AlertTriangle, XCircle, Filter, RefreshCw, Activity } from 'lucide-react';

interface AppSystem {
  id: string;
  name: string;
  code: string;
  version: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  health: 'healthy' | 'warning' | 'critical';
  description: string;
  url: string;
  apiUrl: string;
  owner: string;
  department: string;
  registeredAt: string;
  lastHeartbeat: string;
  requestCount: number;
  errorRate: number;
}

export default function AppSystemPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [systems, setSystems] = useState<AppSystem[]>([
    {
      id: '1',
      name: '用户管理系统',
      code: 'USER_MGMT',
      version: '1.2.3',
      status: 'online',
      health: 'healthy',
      description: '负责用户注册、登录、权限管理等功能',
      url: 'https://user.example.com',
      apiUrl: 'https://api.example.com/user',
      owner: '张三',
      department: '产品部',
      registeredAt: '2024-01-15 10:00:00',
      lastHeartbeat: '2024-03-25 14:30:25',
      requestCount: 125400,
      errorRate: 0.05
    },
    {
      id: '2',
      name: '订单处理系统',
      code: 'ORDER_PROC',
      version: '2.1.0',
      status: 'online',
      health: 'warning',
      description: '处理订单创建、支付、发货等业务流程',
      url: 'https://order.example.com',
      apiUrl: 'https://api.example.com/order',
      owner: '李四',
      department: '运营部',
      registeredAt: '2024-02-01 09:30:00',
      lastHeartbeat: '2024-03-25 14:28:10',
      requestCount: 89560,
      errorRate: 2.1
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      online: 'bg-green-100 text-green-800',
      offline: 'bg-gray-100 text-gray-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    const labels = {
      online: '在线',
      offline: '离线',
      maintenance: '维护中',
      error: '异常'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getHealthBadge = (health: string) => {
    const styles = {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800'
    };
    const icons = {
      healthy: <CheckCircle className="w-3 h-3 mr-1" />,
      warning: <AlertTriangle className="w-3 h-3 mr-1" />,
      critical: <XCircle className="w-3 h-3 mr-1" />
    };
    const labels = {
      healthy: '健康',
      warning: '警告',
      critical: '严重'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full flex items-center ${styles[health as keyof typeof styles]}`}>
        {icons[health as keyof typeof icons]}
        {labels[health as keyof typeof labels]}
      </span>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Monitor className="mr-2 text-blue-600" />
                应用系统管理
              </h1>
              <p className="text-gray-600 mt-1">注册和监控应用系统状态</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <RefreshCw className="mr-2 w-4 h-4" />
                刷新状态
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <Plus className="mr-2 w-4 h-4" />
                注册应用
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{systems.length}</div>
              <div className="text-sm text-gray-600">总应用数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{systems.filter(s => s.status === 'online').length}</div>
              <div className="text-sm text-gray-600">在线应用</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{systems.filter(s => s.health === 'warning').length}</div>
              <div className="text-sm text-gray-600">告警应用</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{systems.filter(s => s.health === 'critical').length}</div>
              <div className="text-sm text-gray-600">异常应用</div>
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
                  placeholder="搜索应用名称或编码..."
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
                <option value="online">在线</option>
                <option value="offline">离线</option>
                <option value="maintenance">维护中</option>
                <option value="error">异常</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">应用信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">版本</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">健康状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求数</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误率</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">心跳时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systems.map((system) => (
                <tr key={system.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{system.name}</div>
                      <div className="text-sm text-gray-500">{system.code}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{system.version}</td>
                  <td className="px-4 py-4">{getStatusBadge(system.status)}</td>
                  <td className="px-4 py-4">{getHealthBadge(system.health)}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{system.owner}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{system.requestCount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{system.errorRate}%</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{system.lastHeartbeat}</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800">
                        <Activity className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
  );
}