'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Play, Pause, Edit, Trash2, Eye, Send, ArrowRight, Database, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const DataPush = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const pushTasks = [
    {
      id: 1,
      name: '用户数据推送至CRM',
      source: 'user_warehouse',
      target: 'CRM系统',
      targetUrl: 'https://crm.company.com/api/users',
      pushMode: '实时推送',
      status: '运行中',
      lastPush: '2024-01-15 14:30:25',
      nextPush: '实时',
      totalCount: 125420,
      successCount: 125418,
      failedCount: 2,
      createTime: '2024-01-01 09:00:00'
    },
    {
      id: 2,
      name: '订单数据推送至BI系统',
      source: 'order_warehouse',
      target: 'BI分析平台',
      targetUrl: 'https://bi.company.com/api/orders',
      pushMode: '定时推送',
      status: '已完成',
      lastPush: '2024-01-15 12:00:00',
      nextPush: '2024-01-16 12:00:00',
      totalCount: 89760,
      successCount: 89760,
      failedCount: 0,
      createTime: '2024-01-01 10:30:00'
    },
    {
      id: 3,
      name: '产品数据推送至电商平台',
      source: 'product_warehouse',
      target: '电商平台API',
      targetUrl: 'https://ecommerce.company.com/api/products',
      pushMode: '批量推送',
      status: '失败',
      lastPush: '2024-01-15 10:15:30',
      nextPush: '重试中',
      totalCount: 45680,
      successCount: 42300,
      failedCount: 3380,
      createTime: '2024-01-01 14:20:00'
    }
  ];

  const pushRecords = [
    {
      id: 1,
      taskName: '用户数据推送至CRM',
      startTime: '2024-01-15 14:30:00',
      endTime: '2024-01-15 14:30:25',
      status: '成功',
      pushCount: 150,
      failedCount: 0,
      duration: '25秒',
      targetResponse: '200 OK'
    },
    {
      id: 2,
      taskName: '订单数据推送至BI系统',
      startTime: '2024-01-15 12:00:00',
      endTime: '2024-01-15 12:05:30',
      status: '成功',
      pushCount: 2340,
      failedCount: 0,
      duration: '5分30秒',
      targetResponse: '200 OK'
    },
    {
      id: 3,
      taskName: '产品数据推送至电商平台',
      startTime: '2024-01-15 10:15:30',
      endTime: '2024-01-15 10:17:45',
      status: '部分失败',
      pushCount: 800,
      failedCount: 156,
      duration: '2分15秒',
      targetResponse: '500 Error'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '运行中':
        return 'bg-green-100 text-green-800';
      case '已完成':
        return 'bg-blue-100 text-blue-800';
      case '失败':
      case '部分失败':
        return 'bg-red-100 text-red-800';
      case '已暂停':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '运行中':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case '已完成':
        return <Database className="w-4 h-4 text-blue-600" />;
      case '失败':
      case '部分失败':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case '已暂停':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">数据推送</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理数据推送任务，将处理后的数据推送到外部系统
            </p>
          </div>
          <button
            onClick={handleAddTask}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增推送任务
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总推送任务</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{pushTasks.length}</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">运行中</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {pushTasks.filter(t => t.status === '运行中').length}
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
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">已完成</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {pushTasks.filter(t => t.status === '已完成').length}
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
                    <dt className="text-sm font-medium text-gray-500 truncate">异常任务</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {pushTasks.filter(t => t.status === '失败').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 推送任务列表 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">推送任务列表</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      任务信息
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数据流向
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      推送模式
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      推送统计
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pushTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.name}</div>
                          <div className="text-sm text-gray-500">最近推送：{task.lastPush}</div>
                          <div className="text-sm text-gray-500">下次推送：{task.nextPush}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-900">{task.source}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{task.target}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{task.targetUrl}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {task.pushMode}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>总计：{task.totalCount.toLocaleString()}</div>
                        <div className="text-green-600">成功：{task.successCount.toLocaleString()}</div>
                        <div className="text-red-600">失败：{task.failedCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {task.status === '运行中' ? (
                          <button className="text-orange-600 hover:text-orange-900">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-900">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
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

        {/* 推送记录 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">最近推送记录</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      任务名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      执行时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      执行结果
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      推送统计
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      目标响应
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pushRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.taskName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{record.startTime}</div>
                        <div>至 {record.endTime}</div>
                        <div className="text-xs text-gray-400">耗时：{record.duration}</div>
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
                        <div>推送：{record.pushCount.toLocaleString()}</div>
                        <div className="text-red-600">失败：{record.failedCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs rounded ${
                          record.targetResponse.includes('200') 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.targetResponse}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 新增/编辑任务模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedTask ? '编辑推送任务' : '新增推送任务'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">任务名称</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">数据源</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.source || ''}
                    >
                      <option value="">请选择数据源</option>
                      <option value="user_warehouse">用户数据仓库</option>
                      <option value="order_warehouse">订单数据仓库</option>
                      <option value="product_warehouse">商品数据仓库</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">目标系统</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.target || ''}
                      placeholder="目标系统名称"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">目标URL</label>
                    <input
                      type="url"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.targetUrl || ''}
                      placeholder="https://api.target-system.com/data"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">推送模式</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.pushMode || ''}
                    >
                      <option value="">请选择</option>
                      <option value="实时推送">实时推送</option>
                      <option value="定时推送">定时推送</option>
                      <option value="批量推送">批量推送</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">推送频率</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择</option>
                      <option value="realtime">实时</option>
                      <option value="5min">每5分钟</option>
                      <option value="1hour">每小时</option>
                      <option value="1day">每天</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedTask ? '更新' : '创建'}
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

export default DataPush;