'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, XCircle, Clock, Code, FileText, Bell, TrendingUp, Activity } from 'lucide-react';

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'fatal';
  service: string;
  module: string;
  message: string;
  stackTrace: string;
  userId?: string;
  userName?: string;
  ip?: string;
  userAgent?: string;
  url?: string;
  errorCode?: string;
  count: number;
  firstOccurred: string;
  lastOccurred: string;
  resolved: boolean;
  assignee?: string;
}

export default function ErrorLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [resolvedFilter, setResolvedFilter] = useState<string>('all');
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [logs, setLogs] = useState<ErrorLog[]>([
    {
      id: '1',
      timestamp: '2024-03-25 14:30:25',
      level: 'error',
      service: '用户管理服务',
      module: 'UserController',
      message: 'Failed to connect to database',
      stackTrace: 'java.sql.SQLException: Connection timeout\n\tat com.example.db.ConnectionPool.getConnection(ConnectionPool.java:45)',
      userId: 'u001',
      userName: '张三',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      url: '/api/user/profile',
      errorCode: 'DB_CONNECTION_TIMEOUT',
      count: 12,
      firstOccurred: '2024-03-25 14:15:00',
      lastOccurred: '2024-03-25 14:30:25',
      resolved: false
    },
    {
      id: '2',
      timestamp: '2024-03-25 14:25:10',
      level: 'warn',
      service: '订单处理服务',
      module: 'PaymentService',
      message: 'Payment gateway response time exceeded threshold',
      stackTrace: 'Slow response detected: 3500ms > 3000ms threshold',
      userId: 'u002',
      userName: '李四',
      ip: '192.168.1.101',
      url: '/api/payment/process',
      errorCode: 'PAYMENT_SLOW_RESPONSE',
      count: 5,
      firstOccurred: '2024-03-25 14:20:00',
      lastOccurred: '2024-03-25 14:25:10',
      resolved: true,
      assignee: '王五'
    },
    {
      id: '3',
      timestamp: '2024-03-25 14:20:45',
      level: 'fatal',
      service: '数据处理服务',
      module: 'DataProcessor',
      message: 'Out of memory error during data processing',
      stackTrace: 'java.lang.OutOfMemoryError: Java heap space\n\tat com.example.processor.DataProcessor.process(DataProcessor.java:123)',
      errorCode: 'OUT_OF_MEMORY',
      count: 1,
      firstOccurred: '2024-03-25 14:20:45',
      lastOccurred: '2024-03-25 14:20:45',
      resolved: false
    },
    {
      id: '4',
      timestamp: '2024-03-25 14:18:30',
      level: 'error',
      service: 'API网关',
      module: 'AuthMiddleware',
      message: 'Invalid JWT token format',
      stackTrace: 'io.jsonwebtoken.MalformedJwtException: Invalid JWT format\n\tat com.example.auth.JwtValidator.validate(JwtValidator.java:67)',
      userId: 'u003',
      userName: '王五',
      ip: '192.168.1.102',
      url: '/api/secure/data',
      errorCode: 'INVALID_JWT_TOKEN',
      count: 8,
      firstOccurred: '2024-03-25 14:10:00',
      lastOccurred: '2024-03-25 14:18:30',
      resolved: false
    }
  ]);

  const getLevelBadge = (level: string) => {
    const styles = {
      error: 'bg-red-100 text-red-800',
      warn: 'bg-yellow-100 text-yellow-800',
      fatal: 'bg-purple-100 text-purple-800'
    };
    const icons = {
      error: <XCircle className="w-3 h-3 mr-1" />,
      warn: <AlertTriangle className="w-3 h-3 mr-1" />,
      fatal: <Activity className="w-3 h-3 mr-1" />
    };
    const labels = {
      error: 'ERROR',
      warn: 'WARN',
      fatal: 'FATAL'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full flex items-center font-mono ${styles[level as keyof typeof styles]}`}>
        {icons[level as keyof typeof icons]}
        {labels[level as keyof typeof labels]}
      </span>
    );
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesService = serviceFilter === 'all' || log.service === serviceFilter;
    const matchesResolved = resolvedFilter === 'all' || 
                           (resolvedFilter === 'resolved' && log.resolved) ||
                           (resolvedFilter === 'unresolved' && !log.resolved);
    return matchesSearch && matchesLevel && matchesService && matchesResolved;
  });

  const services = [...new Set(logs.map(log => log.service))];

  const handleResolve = (logId: string) => {
    setLogs(prev => prev.map(log => 
      log.id === logId ? { ...log, resolved: true, assignee: '管理员' } : log
    ));
  };

  const handleViewDetails = (log: ErrorLog) => {
    setSelectedError(log);
    setShowDetails(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <AlertTriangle className="mr-2 text-red-600" />
                异常日志管理
              </h1>
              <p className="text-gray-600 mt-1">监控和分析系统异常和错误</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Download className="mr-2 w-4 h-4" />
                导出日志
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                <Bell className="mr-2 w-4 h-4" />
                配置告警
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{logs.length}</div>
              <div className="text-sm text-gray-600">异常总数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{logs.filter(l => l.level === 'error').length}</div>
              <div className="text-sm text-gray-600">错误</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{logs.filter(l => l.level === 'fatal').length}</div>
              <div className="text-sm text-gray-600">致命错误</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{logs.filter(l => l.resolved).length}</div>
              <div className="text-sm text-gray-600">已解决</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{logs.filter(l => !l.resolved).length}</div>
              <div className="text-sm text-gray-600">待处理</div>
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
                  placeholder="搜索错误信息、服务或模块..."
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
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">全部级别</option>
                <option value="error">错误</option>
                <option value="warn">警告</option>
                <option value="fatal">致命</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="all">全部服务</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={resolvedFilter}
                onChange={(e) => setResolvedFilter(e.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="resolved">已解决</option>
                <option value="unresolved">待处理</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务/模块</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">次数</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-500">{log.timestamp}</td>
                  <td className="px-4 py-4">{getLevelBadge(log.level)}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{log.service}</div>
                    <div className="text-xs text-gray-500">{log.module}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{log.message}</div>
                    {log.errorCode && (
                      <div className="text-xs text-gray-500 mt-1">
                        <code className="bg-gray-100 px-1 rounded">{log.errorCode}</code>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {log.userName ? (
                      <div>
                        <div>{log.userName}</div>
                        <div className="text-xs text-gray-500">{log.userId}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">系统</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      log.count > 10 ? 'bg-red-100 text-red-800' : 
                      log.count > 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {log.count}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {log.resolved ? (
                      <div>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">已解决</span>
                        {log.assignee && (
                          <div className="text-xs text-gray-500 mt-1">{log.assignee}</div>
                        )}
                      </div>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">待处理</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(log)}
                        className="text-blue-600 hover:text-blue-800" 
                        title="查看详情"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {!log.resolved && (
                        <button
                          onClick={() => handleResolve(log.id)}
                          className="text-green-600 hover:text-green-800" 
                          title="标记已解决"
                        >
                          <Code className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-orange-600 hover:text-orange-800" title="分配处理">
                        <TrendingUp className="w-4 h-4" />
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
            显示 {filteredLogs.length} 条结果，共 {logs.length} 条异常记录
          </div>
        </div>
      </div>

      {/* 详情模态框 */}
      {showDetails && selectedError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">异常详情 - {selectedError.errorCode}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">基本信息</h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">级别:</dt>
                        <dd>{getLevelBadge(selectedError.level)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">服务:</dt>
                        <dd className="text-gray-900">{selectedError.service}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">模块:</dt>
                        <dd className="text-gray-900">{selectedError.module}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">发生次数:</dt>
                        <dd className="text-gray-900">{selectedError.count}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">时间信息</h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">首次发生:</dt>
                        <dd className="text-gray-900">{selectedError.firstOccurred}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">最后发生:</dt>
                        <dd className="text-gray-900">{selectedError.lastOccurred}</dd>
                      </div>
                      {selectedError.url && (
                        <div className="flex justify-between">
                          <dt className="text-gray-500">URL:</dt>
                          <dd className="text-gray-900 font-mono text-xs">{selectedError.url}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">错误信息</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm text-gray-800">
                    {selectedError.message}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">堆栈跟踪</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                    <pre>{selectedError.stackTrace}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
