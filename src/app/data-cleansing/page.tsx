'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Edit, Trash2, Eye, Play, Pause, Settings, Filter, CheckCircle, AlertTriangle, Clock, Zap } from 'lucide-react';

const DataCleansing = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('rules');

  const cleansingRules = [
    {
      id: 1,
      name: '手机号格式清洗',
      type: '格式清洗',
      targetField: 'mobile',
      table: 'users',
      status: '启用',
      rule: '统一手机号格式为11位数字，去除分隔符',
      priority: '高',
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-15 14:30:00',
      executionCount: 1250,
      successRate: 98.5
    },
    {
      id: 2,
      name: '邮箱地址去重',
      type: '重复清洗',
      targetField: 'email',
      table: 'users',
      status: '启用',
      rule: '删除重复的邮箱地址，保留最新记录',
      priority: '中',
      createTime: '2024-01-02 11:30:00',
      updateTime: '2024-01-14 16:20:00',
      executionCount: 890,
      successRate: 99.2
    },
    {
      id: 3,
      name: '订单金额异常处理',
      type: '异常清洗',
      targetField: 'amount',
      table: 'orders',
      status: '暂停',
      rule: '处理订单金额为负数或超大值的异常情况',
      priority: '高',
      createTime: '2024-01-05 09:15:00',
      updateTime: '2024-01-12 10:45:00',
      executionCount: 2340,
      successRate: 96.8
    },
    {
      id: 4,
      name: '地址信息标准化',
      type: '标准化',
      targetField: 'address',
      table: 'customers',
      status: '启用',
      rule: '统一地址格式，补全省市区信息',
      priority: '中',
      createTime: '2024-01-08 14:20:00',
      updateTime: '2024-01-13 11:10:00',
      executionCount: 567,
      successRate: 94.3
    }
  ];

  const executionHistory = [
    {
      id: 1,
      ruleName: '手机号格式清洗',
      startTime: '2024-01-15 14:30:00',
      endTime: '2024-01-15 14:32:15',
      status: '成功',
      processedCount: 1500,
      cleanedCount: 1487,
      errorCount: 13,
      duration: '2分15秒'
    },
    {
      id: 2,
      ruleName: '邮箱地址去重',
      startTime: '2024-01-15 12:00:00',
      endTime: '2024-01-15 12:01:30',
      status: '成功',
      processedCount: 2340,
      cleanedCount: 156,
      errorCount: 0,
      duration: '1分30秒'
    },
    {
      id: 3,
      ruleName: '订单金额异常处理',
      startTime: '2024-01-15 10:15:30',
      endTime: '2024-01-15 10:18:45',
      status: '部分失败',
      processedCount: 890,
      cleanedCount: 23,
      errorCount: 5,
      duration: '3分15秒'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '启用':
        return 'bg-green-100 text-green-800';
      case '暂停':
        return 'bg-yellow-100 text-yellow-800';
      case '禁用':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '启用':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case '暂停':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      case '禁用':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-yellow-100 text-yellow-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddRule = () => {
    setSelectedRule(null);
    setShowModal(true);
  };

  const handleEditRule = (rule: any) => {
    setSelectedRule(rule);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">数据清洗</h1>
            <p className="mt-1 text-sm text-gray-600">
              配置和管理数据清洗规则，确保数据质量和一致性
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Play className="w-4 h-4 mr-2" />
              批量执行
            </button>
            <button
              onClick={handleAddRule}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增规则
            </button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总规则数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{cleansingRules.length}</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">启用规则</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {cleansingRules.filter(r => r.status === '启用').length}
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
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">今日执行</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {cleansingRules.reduce((sum, r) => sum + r.executionCount, 0)}
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
                  <Filter className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">平均成功率</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {Math.round(cleansingRules.reduce((sum, r) => sum + r.successRate, 0) / cleansingRules.length)}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 选项卡 */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('rules')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rules'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                清洗规则
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                执行历史
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'rules' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        规则信息
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        目标字段
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        规则类型
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        优先级
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        执行统计
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cleansingRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{rule.rule}</div>
                            <div className="text-xs text-gray-400 mt-1">创建时间：{rule.createTime}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{rule.table}</div>
                          <div className="text-sm text-gray-500">{rule.targetField}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            {rule.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(rule.priority)}`}>
                            {rule.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(rule.status)}
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                              {rule.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>执行：{rule.executionCount} 次</div>
                          <div>成功率：{rule.successRate}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="执行规则"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditRule(rule)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="编辑规则"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="查看详情"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="删除规则"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        规则名称
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        执行时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        执行结果
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        处理统计
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        耗时
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {executionHistory.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.ruleName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{record.startTime}</div>
                          <div>至 {record.endTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === '成功' 
                              ? 'bg-green-100 text-green-800' 
                              : record.status === '部分失败'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>处理：{record.processedCount.toLocaleString()} 条</div>
                          <div className="text-green-600">清洗：{record.cleanedCount.toLocaleString()} 条</div>
                          <div className="text-red-600">错误：{record.errorCount} 条</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* 新增/编辑规则模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedRule ? '编辑清洗规则' : '新增清洗规则'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">规则名称</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.name || ''}
                      placeholder="请输入规则名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">规则类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.type || ''}
                    >
                      <option value="">请选择规则类型</option>
                      <option value="格式清洗">格式清洗</option>
                      <option value="重复清洗">重复清洗</option>
                      <option value="异常清洗">异常清洗</option>
                      <option value="标准化">标准化</option>
                      <option value="补全">补全</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">优先级</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.priority || ''}
                    >
                      <option value="">请选择优先级</option>
                      <option value="高">高</option>
                      <option value="中">中</option>
                      <option value="低">低</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">目标表</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.table || ''}
                      placeholder="表名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">目标字段</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.targetField || ''}
                      placeholder="字段名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">状态</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.status || ''}
                    >
                      <option value="">请选择状态</option>
                      <option value="启用">启用</option>
                      <option value="暂停">暂停</option>
                      <option value="禁用">禁用</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">清洗规则</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      defaultValue={selectedRule?.rule || ''}
                      placeholder="请输入具体的清洗规则描述"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">规则表达式</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="请输入规则的具体表达式或SQL语句"
                    />
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedRule ? '更新' : '创建'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    取消
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

export default DataCleansing;