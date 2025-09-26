'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Edit, Trash2, Eye, Globe, Shield, CheckCircle, AlertTriangle, Clock, Users } from 'lucide-react';

const ApiCatalog = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApi, setSelectedApi] = useState<any>(null);

  const apis = [
    {
      id: 1,
      name: '用户信息查询API',
      path: '/api/v1/users',
      method: 'GET',
      category: '用户服务',
      version: 'v1.0',
      status: '已发布',
      description: '根据用户ID查询用户基本信息',
      provider: '用户管理系统',
      callCount: 15420,
      avgResponseTime: 120,
      successRate: 99.5,
      lastUpdate: '2024-01-15 14:30:00'
    },
    {
      id: 2,
      name: '订单创建API',
      path: '/api/v1/orders',
      method: 'POST',
      category: '订单服务',
      version: 'v1.2',
      status: '已发布',
      description: '创建新订单，支持多商品订单',
      provider: '订单管理系统',
      callCount: 8960,
      avgResponseTime: 250,
      successRate: 98.8,
      lastUpdate: '2024-01-14 16:20:00'
    },
    {
      id: 3,
      name: '支付状态查询API',
      path: '/api/v1/payments/status',
      method: 'GET',
      category: '支付服务',
      version: 'v2.0',
      status: '测试中',
      description: '查询订单支付状态和支付详情',
      provider: '支付系统',
      callCount: 0,
      avgResponseTime: 0,
      successRate: 0,
      lastUpdate: '2024-01-10 11:15:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已发布':
        return 'bg-green-100 text-green-800';
      case '测试中':
        return 'bg-yellow-100 text-yellow-800';
      case '已下线':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'POST':
        return 'bg-green-100 text-green-800';
      case 'PUT':
        return 'bg-orange-100 text-orange-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">API目录管理</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理和展示平台提供的API服务目录
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增API
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总API数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{apis.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">已发布</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {apis.filter(a => a.status === '已发布').length}
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
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总调用量</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {apis.reduce((sum, a) => sum + a.callCount, 0).toLocaleString()}
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
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">平均响应时间</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {Math.round(apis.filter(a => a.avgResponseTime > 0).reduce((sum, a) => sum + a.avgResponseTime, 0) / apis.filter(a => a.avgResponseTime > 0).length)}ms
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">API列表</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      API信息
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      接口路径
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      版本状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      性能指标
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apis.map((api) => (
                    <tr key={api.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{api.name}</div>
                          <div className="text-sm text-gray-500">{api.description}</div>
                          <div className="text-xs text-gray-400 mt-1">提供方：{api.provider}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{api.path}</div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMethodColor(api.method)}`}>
                          {api.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{api.version}</div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(api.status)}`}>
                          {api.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>调用量：{api.callCount.toLocaleString()}</div>
                        <div>响应时间：{api.avgResponseTime}ms</div>
                        <div>成功率：{api.successRate}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 模态框代码省略，与其他页面类似 */}
      </div>
    </Layout>
  );
};

export default ApiCatalog;