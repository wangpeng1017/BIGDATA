'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Play, Square, Edit, Trash2, Eye, AlertCircle, CheckCircle, Clock, Database } from 'lucide-react';

const DataAccess = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const syncTasks = [
    {
      id: 1,
      name: '用户数据同步',
      sourceType: 'MySQL',
      sourceInfo: '192.168.1.100:3306/user_db',
      targetType: 'Kafka',
      targetInfo: 'kafka-cluster:9092/user-topic',
      syncMode: '增量',
      status: '运行中',
      lastSync: '2024-01-15 14:30:25',
      nextSync: '2024-01-15 14:35:25',
      syncCount: 15420,
      errorCount: 2
    },
    {
      id: 2,
      name: '订单数据同步',
      sourceType: 'Oracle',
      sourceInfo: '192.168.1.101:1521/order_db',
      targetType: 'HDFS',
      targetInfo: '/data/orders/',
      syncMode: '全量',
      status: '已停止',
      lastSync: '2024-01-15 12:00:00',
      nextSync: '-',
      syncCount: 8756,
      errorCount: 0
    },
    {
      id: 3,
      name: '日志数据同步',
      sourceType: 'API',
      sourceInfo: 'https://api.logs.com/v1',
      targetType: 'Elasticsearch',
      targetInfo: 'es-cluster:9200/logs-index',
      syncMode: '实时',
      status: '异常',
      lastSync: '2024-01-15 14:20:08',
      nextSync: '重试中',
      syncCount: 245300,
      errorCount: 156
    }
  ];

  const executionRecords = [
    {
      id: 1,
      taskName: '用户数据同步',
      startTime: '2024-01-15 14:30:00',
      endTime: '2024-01-15 14:30:25',
      status: '成功',
      syncCount: 1200,
      errorCount: 0,
      duration: '25秒'
    },
    {
      id: 2,
      taskName: '订单数据同步',
      startTime: '2024-01-15 12:00:00',
      endTime: '2024-01-15 12:15:30',
      status: '成功',
      syncCount: 8756,
      errorCount: 0,
      duration: '15分30秒'
    },
    {
      id: 3,
      taskName: '日志数据同步',
      startTime: '2024-01-15 14:20:08',
      endTime: '2024-01-15 14:20:35',
      status: '失败',
      syncCount: 0,
      errorCount: 1,
      duration: '27秒'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '运行中':
        return 'bg-green-100 text-green-800';
      case '已停止':
        return 'bg-gray-100 text-gray-800';
      case '异常':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '运行中':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case '已停止':
        return <Square className="w-4 h-4 text-gray-600" />;
      case '异常':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
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
            <h1 className="text-2xl font-semibold text-gray-900">数据接入</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理数据同步任务，支持多种数据源间的数据传输
            </p>
          </div>
          <button
            onClick={handleAddTask}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增同步任务
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总任务数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{syncTasks.length}</dd>
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
                      {syncTasks.filter(t => t.status === '运行中').length}
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
                  <Square className="h-8 w-8 text-gray-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">已停止</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {syncTasks.filter(t => t.status === '已停止').length}
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
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">异常任务</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {syncTasks.filter(t => t.status === '异常').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 同步任务列表 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">同步任务列表</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      任务信息
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数据源
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      目标
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      同步模式
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      同步统计
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {syncTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.name}</div>
                          <div className="text-sm text-gray-500">最近同步：{task.lastSync}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.sourceType}</div>
                        <div className="text-sm text-gray-500">{task.sourceInfo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.targetType}</div>
                        <div className="text-sm text-gray-500">{task.targetInfo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {task.syncMode}
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
                        <div>成功：{task.syncCount.toLocaleString()}</div>
                        <div className="text-red-600">错误：{task.errorCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {task.status === '运行中' ? (
                          <button className="text-orange-600 hover:text-orange-900">
                            <Square className="w-4 h-4" />
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

        {/* 执行记录 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">最近执行记录</h3>
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
                      同步数量
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      耗时
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {executionRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.taskName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{record.startTime}</div>
                        <div>至 {record.endTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === '成功' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>成功：{record.syncCount.toLocaleString()}</div>
                        <div className="text-red-600">失败：{record.errorCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.duration}
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
                  {selectedTask ? '编辑同步任务' : '新增同步任务'}
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
                    <label className="block text-sm font-medium text-gray-700">数据源类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.sourceType || ''}
                    >
                      <option value="">请选择</option>
                      <option value="MySQL">MySQL</option>
                      <option value="Oracle">Oracle</option>
                      <option value="SQL Server">SQL Server</option>
                      <option value="API">API</option>
                      <option value="Kafka">Kafka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">目标类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.targetType || ''}
                    >
                      <option value="">请选择</option>
                      <option value="HDFS">HDFS</option>
                      <option value="Kafka">Kafka</option>
                      <option value="Elasticsearch">Elasticsearch</option>
                      <option value="MySQL">MySQL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">同步模式</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedTask?.syncMode || ''}
                    >
                      <option value="">请选择</option>
                      <option value="全量">全量同步</option>
                      <option value="增量">增量同步</option>
                      <option value="实时">实时同步</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">执行频率</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择</option>
                      <option value="manual">手动执行</option>
                      <option value="5min">每5分钟</option>
                      <option value="1hour">每小时</option>
                      <option value="1day">每天</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">数据源连接信息</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                      defaultValue={selectedTask?.sourceInfo || ''}
                      placeholder="请输入数据源连接配置"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">目标连接信息</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                      defaultValue={selectedTask?.targetInfo || ''}
                      placeholder="请输入目标连接配置"
                    />
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

export default DataAccess;