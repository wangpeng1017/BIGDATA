'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, LogIn, MapPin, CheckCircle, XCircle, AlertTriangle, Calendar, Shield, Globe } from 'lucide-react';

interface LoginLog {
  id: string;
  userId: string;
  userName: string;
  email: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  os: string;
  status: 'success' | 'failed' | 'blocked';
  failReason?: string;
  loginTime: string;
  sessionDuration?: string;
  isNewDevice: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function LoginLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const [logs, setLogs] = useState<LoginLog[]>([
    {
      id: '1',
      userId: 'u001',
      userName: '张三',
      email: 'zhang@example.com',
      ip: '192.168.1.100',
      location: '北京市 朝阳区',
      device: 'Windows PC',
      browser: 'Chrome 120.0',
      os: 'Windows 10',
      status: 'success',
      loginTime: '2024-03-25 14:30:25',
      sessionDuration: '2小时45分钟',
      isNewDevice: false,
      riskLevel: 'low'
    },
    {
      id: '2',
      userId: 'u002',
      userName: '李四',
      email: 'li@example.com',
      ip: '203.156.89.45',
      location: '上海市 黄浦区',
      device: 'iPhone 14',
      browser: 'Safari 16.0',
      os: 'iOS 16.3',
      status: 'success',
      loginTime: '2024-03-25 14:25:10',
      sessionDuration: '1小时20分钟',
      isNewDevice: true,
      riskLevel: 'medium'
    },
    {
      id: '3',
      userId: 'u003',
      userName: '王五',
      email: 'wang@example.com',
      ip: '45.123.67.89',
      location: '美国 加利福尼亚州',
      device: 'Unknown',
      browser: 'Unknown',
      os: 'Unknown',
      status: 'failed',
      failReason: '密码错误',
      loginTime: '2024-03-25 14:20:45',
      isNewDevice: true,
      riskLevel: 'high'
    },
    {
      id: '4',
      userId: 'u004',
      userName: '赵六',
      email: 'zhao@example.com',
      ip: '10.0.0.50',
      location: '广州市 天河区',
      device: 'MacBook Pro',
      browser: 'Firefox 118.0',
      os: 'macOS 13.0',
      status: 'blocked',
      failReason: 'IP被禁止',
      loginTime: '2024-03-25 14:15:30',
      isNewDevice: false,
      riskLevel: 'high'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      blocked: 'bg-gray-100 text-gray-800'
    };
    const icons = {
      success: <CheckCircle className="w-3 h-3 mr-1" />,
      failed: <XCircle className="w-3 h-3 mr-1" />,
      blocked: <Shield className="w-3 h-3 mr-1" />
    };
    const labels = {
      success: '成功',
      failed: '失败',
      blocked: '被阻止'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full flex items-center ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getRiskBadge = (level: string) => {
    const styles = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    const labels = {
      low: '低',
      medium: '中',
      high: '高'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[level as keyof typeof styles]}`}>
        {labels[level as keyof typeof labels]}
      </span>
    );
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ip.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || log.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <LogIn className="mr-2 text-blue-600" />
                登录日志管理
              </h1>
              <p className="text-gray-600 mt-1">监控用户登录活动和安全威胁</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Download className="mr-2 w-4 h-4" />
                导出日志
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <Shield className="mr-2 w-4 h-4" />
                安全分析
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{logs.length}</div>
              <div className="text-sm text-gray-600">登录总数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{logs.filter(l => l.status === 'success').length}</div>
              <div className="text-sm text-gray-600">成功登录</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{logs.filter(l => l.status === 'failed').length}</div>
              <div className="text-sm text-gray-600">失败次数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{logs.filter(l => l.isNewDevice).length}</div>
              <div className="text-sm text-gray-600">新设备</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{logs.filter(l => l.riskLevel === 'high').length}</div>
              <div className="text-sm text-gray-600">高风险</div>
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
                  placeholder="搜索用户名、邮箱或IP..."
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
                <option value="success">成功</option>
                <option value="failed">失败</option>
                <option value="blocked">被阻止</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="all">全部风险</option>
                <option value="low">低风险</option>
                <option value="medium">中风险</option>
                <option value="high">高风险</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">登录时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">风险等级</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会话时长</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        {log.userName}
                        {log.isNewDevice && (
                          <span className="ml-2 px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                            新设备
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{log.email}</div>
                      <div className="text-xs text-gray-400">{log.userId}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{log.loginTime}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 font-mono">{log.ip}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                      {log.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{log.device}</div>
                    <div className="text-xs text-gray-500">{log.browser}</div>
                    <div className="text-xs text-gray-400">{log.os}</div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(log.status)}
                    {log.failReason && (
                      <div className="text-xs text-red-600 mt-1">{log.failReason}</div>
                    )}
                  </td>
                  <td className="px-4 py-4">{getRiskBadge(log.riskLevel)}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{log.sessionDuration || '-'}</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="查看详情">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800" title="安全分析">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            显示 {filteredLogs.length} 条结果，共 {logs.length} 条登录记录
          </div>
        </div>
      </div>
    </div>
  );
}
