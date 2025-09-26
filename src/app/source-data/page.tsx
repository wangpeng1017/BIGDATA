'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, Download, Eye, RefreshCw, FileText, Database, Clock, AlertTriangle } from 'lucide-react';

const SourceData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const dataSources = [
    {
      id: 1,
      name: '用户信息表',
      source: '用户管理系统',
      schema: 'user_db',
      table: 'users',
      type: 'MySQL',
      lastUpdate: '2024-01-15 14:30:25',
      recordCount: 125420,
      dataSize: '256.8 MB',
      status: '同步中',
      syncFreq: '实时',
      description: '存储用户基本信息，包括用户ID、姓名、邮箱等'
    },
    {
      id: 2,
      name: '订单数据表',
      source: '订单管理系统',
      schema: 'order_db',
      table: 'orders',
      type: 'Oracle',
      lastUpdate: '2024-01-15 12:00:00',
      recordCount: 89760,
      dataSize: '512.3 MB',
      status: '已完成',
      syncFreq: '每日',
      description: '包含订单详细信息，订单号、商品、价格等'
    },
    {
      id: 3,
      name: '商品信息表',
      source: '商品管理系统',
      schema: 'product_db',
      table: 'products',
      type: 'MySQL',
      lastUpdate: '2024-01-15 10:15:30',
      recordCount: 45680,
      dataSize: '128.7 MB',
      status: '已完成',
      syncFreq: '每小时',
      description: '商品基础信息，包括商品ID、名称、分类、价格等'
    },
    {
      id: 4,
      name: '日志数据',
      source: 'Web服务器',
      schema: 'logs',
      table: 'access_logs',
      type: 'Log File',
      lastUpdate: '2024-01-15 14:25:10',
      recordCount: 2456780,
      dataSize: '1.2 GB',
      status: '异常',
      syncFreq: '实时',
      description: '网站访问日志，包含访问时间、IP、页面路径等信息'
    }
  ];

  const sampleData = {
    1: {
      columns: ['user_id', 'username', 'email', 'create_time', 'status'],
      rows: [
        ['1001', 'zhangsan', 'zhangsan@email.com', '2024-01-01 10:00:00', '1'],
        ['1002', 'lisi', 'lisi@email.com', '2024-01-01 11:30:00', '1'],
        ['1003', 'wangwu', 'wangwu@email.com', '2024-01-01 14:20:00', '0']
      ]
    },
    2: {
      columns: ['order_id', 'user_id', 'product_id', 'amount', 'order_time'],
      rows: [
        ['ORD001', '1001', 'P001', '299.00', '2024-01-15 09:30:00'],
        ['ORD002', '1002', 'P002', '599.00', '2024-01-15 10:15:00'],
        ['ORD003', '1001', 'P003', '199.00', '2024-01-15 11:45:00']
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '同步中':
        return 'bg-blue-100 text-blue-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '异常':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '同步中':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case '已完成':
        return <Database className="w-4 h-4 text-green-600" />;
      case '异常':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === '' || source.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const uniqueSources = [...new Set(dataSources.map(item => item.source))];

  const handlePreview = (source: any) => {
    setPreviewData({
      source,
      data: sampleData[source.id as keyof typeof sampleData] || { columns: [], rows: [] }
    });
    setShowPreview(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">贴源数据</h1>
          <p className="mt-1 text-sm text-gray-600">
            查看和管理从各数据源同步的原始数据
          </p>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">数据表总数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{dataSources.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总记录数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {dataSources.reduce((sum, s) => sum + s.recordCount, 0).toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <RefreshCw className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">同步中</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {dataSources.filter(s => s.status === '同步中').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">异常表</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {dataSources.filter(s => s.status === '异常').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索数据表名称或来源系统..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">所有数据源</option>
                {uniqueSources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="w-4 h-4 mr-2" />
              更多筛选
            </button>
          </div>
        </div>

        {/* 数据源列表 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              数据源列表 ({filteredSources.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数据表信息
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      来源系统
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数据统计
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      同步信息
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSources.map((source) => (
                    <tr key={source.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{source.name}</div>
                          <div className="text-sm text-gray-500">{source.schema}.{source.table}</div>
                          <div className="text-xs text-gray-400 mt-1">{source.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{source.source}</div>
                        <div className="text-sm text-gray-500">{source.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>记录数：{source.recordCount.toLocaleString()}</div>
                        <div>大小：{source.dataSize}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>频率：{source.syncFreq}</div>
                        <div>最近更新：{source.lastUpdate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(source.status)}
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(source.status)}`}>
                            {source.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handlePreview(source)}
                          className="text-blue-600 hover:text-blue-900"
                          title="预览数据"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="下载数据"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="text-orange-600 hover:text-orange-900"
                          title="刷新数据"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 数据预览模态框 */}
        {showPreview && previewData && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-[90%] max-w-6xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">数据预览</h3>
                    <p className="text-sm text-gray-600">
                      {previewData.source.name} - {previewData.source.source}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">关闭</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">表名：</span>
                      <span className="text-gray-900">{previewData.source.schema}.{previewData.source.table}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">记录数：</span>
                      <span className="text-gray-900">{previewData.source.recordCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">数据大小：</span>
                      <span className="text-gray-900">{previewData.source.dataSize}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">最后更新：</span>
                      <span className="text-gray-900">{previewData.source.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-96">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {previewData.data.columns.map((column: string, index: number) => (
                          <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.data.rows.map((row: string[], rowIndex: number) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {row.map((cell: string, cellIndex: number) => (
                            <td
                              key={cellIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  显示前 {previewData.data.rows.length} 条记录，共 {previewData.source.recordCount.toLocaleString()} 条记录
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    关闭
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SourceData;