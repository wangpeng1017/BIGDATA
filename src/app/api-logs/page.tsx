'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, XCircle, Clock, BarChart3, RefreshCw, Calendar } from 'lucide-react';

interface ApiLog {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTime: number;
  userId?: string;
  userName?: string;
  ip: string;
  userAgent: string;
  requestSize: number;
  responseSize: number;
  error?: string;
}

interface ApiStats {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  errorCount: number;
  todayRequests: number;
  topEndpoints: Array<{endpoint: string; count: number}>;
}

export default function ApiLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('today');
  const [showStats, setShowStats] = useState(true);

  // 模拟API日志数据
  const [logs, setLogs] = useState<ApiLog[]>([
    {
      id: '1',
      timestamp: '2024-03-25 14:30:25',
      method: 'GET',
      endpoint: '/api/users',
      statusCode: 200,
      responseTime: 120,
      userId: 'u1',
      userName: '张三',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      requestSize: 1024,
      responseSize: 2048
    },
    {
      id: '2',
      timestamp: '2024-03-25 14:35:10',
      method: 'POST',
      endpoint: '/api/data/export',
      statusCode: 500,
      responseTime: 5000,
      userId: 'u2',
      userName: '李四',
      ip: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      requestSize: 512,
      responseSize: 256,
      error: '数据库连接超时'
    },
    {
      id: '3',
      timestamp: '2024-03-25 14:28:45',
      method: 'PUT',
      endpoint: '/api/system/config',
      statusCode: 401,
      responseTime: 50,
      userId: 'u3',
      userName: '王五',
      ip: '192.168.1.102',
      userAgent: 'Chrome/91.0.4472.124',
      requestSize: 256,
      responseSize: 128,
      error: '未授权访问'
    },
    {
      id: '4',
      timestamp: '2024-03-25 14:32:15',
      method: 'DELETE',
      endpoint: '/api/users/123',
      statusCode: 204,
      responseTime: 80,
      userId: 'u1',
      userName: '张三',
      ip: '192.168.1.100',
      userAgent: 'Postman/7.36.1',
      requestSize: 0,
      responseSize: 0
    }
  ]);

  // 模拟API统计数据
  const [stats, setStats] = useState<ApiStats>({
    totalRequests: 15420,
    successRate: 87.5,
    avgResponseTime: 245,
    errorCount: 127,
    todayRequests: 1250,
    topEndpoints: [
      { endpoint: '/api/users', count: 5420 },
      { endpoint: '/api/data/export', count: 2150 },
      { endpoint: '/api/system/config', count: 1890 },
      { endpoint: '/api/auth/login', count: 1680 },
      { endpoint: '/api/dashboard/stats', count: 1520 }
    ]
  });

  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center"><CheckCircle className="w-3 h-3 mr-1"/>{statusCode}</span>;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/>{statusCode}</span>;
    } else if (statusCode >= 500) {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center"><XCircle className="w-3 h-3 mr-1"/>{statusCode}</span>;
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{statusCode}</span>;
  };

  const getMethodBadge = (method: string) => {
    const styles = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded ${styles[method as keyof typeof styles]}`}>
        {method}
      </span>
    );
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 200) return 'text-green-600';
    if (time < 1000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.userName && log.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'success' && log.statusCode >= 200 && log.statusCode < 300) ||
                         (statusFilter === 'error' && log.statusCode >= 400);
    const matchesMethod = methodFilter === 'all' || log.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* 头部与统计 */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <BarChart3 className="mr-2 text-blue-600" />
                  API日志管理
                </h1>
                <p className="text-gray-600 mt-1">查看和分析API调用日志和性能指标</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowStats(!showStats)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <BarChart3 className="mr-2 w-4 h-4" />
                  {showStats ? '隐藏统计' : '显示统计'}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  <RefreshCw className="mr-2 w-4 h-4" />
                  刷新
                </button>
              </div>
            </div>
          </div>

          {/* 统计卡片 */}
          {showStats && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">总请求数</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.totalRequests.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">成功率</p>
                      <p className="text-2xl font-bold text-green-900">{stats.successRate}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">平均响应时间</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats.avgResponseTime}ms</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-medium">错误数</p>
                      <p className="text-2xl font-bold text-red-900">{stats.errorCount}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">今日请求</p>
                      <p className="text-2xl font-bold text-purple-900">{stats.todayRequests}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* 热门接口 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">热门API接口</h3>
                <div className="space-y-2">
                  {stats.topEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                          {index + 1}
                        </span>
                        <code className="text-sm bg-white px-2 py-1 rounded">{endpoint.endpoint}</code>
                      </div>
                      <div className="text-sm text-gray-600">
                        {endpoint.count.toLocaleString()} 次调用
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 日志列表 */}
        <div className="bg-white rounded-lg shadow">
          {/* 搜索和筛选 */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索API路径或用户名..."
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
                  <option value="success">成功 (2xx)</option>
                  <option value="error">失败 (4xx/5xx)</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                >
                  <option value="all">全部方法</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">今天</option>
                  <option value="week">本周</option>
                  <option value="month">本月</option>
                </select>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Download className="mr-2 w-4 h-4" />
                导出
              </button>
            </div>
          </div>

          {/* 日志表格 */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">接口</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">响应时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数据大小</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-900">{log.timestamp}</td>
                      <td className="px-4 py-4">{getMethodBadge(log.method)}</td>
                      <td className="px-4 py-4">
                        <code className="text-sm text-gray-900">{log.endpoint}</code>
                        {log.error && <div className="text-xs text-red-600 mt-1">{log.error}</div>}
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(log.statusCode)}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {log.userName ? (
                          <div>
                            <div>{log.userName}</div>
                            <div className="text-xs text-gray-500">{log.userId}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">匹名</span>
                        )}
                      </td>
                      <td className={`px-4 py-4 text-sm font-mono ${getResponseTimeColor(log.responseTime)}`}>
                        {log.responseTime}ms
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{log.ip}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div>请求: {formatBytes(log.requestSize)}</div>
                        <div>响应: {formatBytes(log.responseSize)}</div>
                      </td>
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
      </div>
    </div>
  );
}
