'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Database, Edit, Trash2, Play, TestTube, Download } from 'lucide-react';

const DatabaseManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDb, setSelectedDb] = useState<typeof databases[0] | null>(null);
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users LIMIT 10;');

  const databases = [
    {
      id: 1,
      name: '用户数据库',
      type: 'MySQL',
      host: '192.168.1.100',
      port: 3306,
      database: 'user_db',
      status: '已连接',
      lastTest: '2024-01-15 14:30:25'
    },
    {
      id: 2,
      name: '订单数据库',
      type: 'Oracle',
      host: '192.168.1.101',
      port: 1521,
      database: 'order_db',
      status: '已连接',
      lastTest: '2024-01-15 14:25:15'
    },
    {
      id: 3,
      name: '日志数据库',
      type: 'SQL Server',
      host: '192.168.1.102',
      port: 1433,
      database: 'log_db',
      status: '连接失败',
      lastTest: '2024-01-15 14:20:08'
    }
  ];

  const tables = [
    { name: 'users', rows: 15420, size: '2.3MB' },
    { name: 'orders', rows: 8756, size: '1.8MB' },
    { name: 'products', rows: 2341, size: '0.9MB' },
  ];

  const queryResults = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', created_at: '2024-01-15' },
    { id: 2, name: '李四', email: 'lisi@example.com', created_at: '2024-01-14' },
    { id: 3, name: '王五', email: 'wangwu@example.com', created_at: '2024-01-13' },
  ];

  const handleAddDataSource = () => {
    setSelectedDb(null);
    setShowModal(true);
  };

  const handleEditDataSource = (db: typeof databases[0]) => {
    setSelectedDb(db);
    setShowModal(true);
  };

  const executeSQL = () => {
    alert('SQL查询已执行');
  };

  const testConnection = (dbId: number) => {
    alert(`测试数据库连接 ID: ${dbId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">数据库管理</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理数据源连接，执行SQL查询，查看表结构
            </p>
          </div>
          <button
            onClick={handleAddDataSource}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增数据源
          </button>
        </div>

        {/* 数据源列表 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">数据源列表</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数据源名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类型
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      连接信息
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
                  {databases.map((db) => (
                    <tr key={db.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Database className="h-5 w-5 text-gray-400 mr-3" />
                          <div className="text-sm font-medium text-gray-900">{db.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {db.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {db.host}:{db.port}/{db.database}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          db.status === '已连接'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {db.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => testConnection(db.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <TestTube className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditDataSource(db)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
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

        {/* SQL查询区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SQL编辑器 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">SQL查询</h3>
              <div className="space-y-4">
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>选择数据源</option>
                  {databases.map(db => (
                    <option key={db.id} value={db.id}>{db.name}</option>
                  ))}
                </select>
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows={8}
                  placeholder="输入SQL查询语句..."
                />
                <div className="flex space-x-3">
                  <button
                    onClick={executeSQL}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    执行SQL
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    导出结果
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 表结构 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">表结构</h3>
              <div className="space-y-2">
                {tables.map((table, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{table.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {table.rows.toLocaleString()} 行 · {table.size}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 查询结果 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">查询结果</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      姓名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      邮箱
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创建时间
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResults.map((row) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 数据源配置模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedDb ? '编辑数据源' : '新增数据源'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">数据源名称</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedDb?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">数据库类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedDb?.type || ''}
                    >
                      <option value="">请选择</option>
                      <option value="MySQL">MySQL</option>
                      <option value="Oracle">Oracle</option>
                      <option value="SQL Server">SQL Server</option>
                      <option value="达梦">达梦</option>
                      <option value="人大金仓">人大金仓</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">主机地址</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedDb?.host || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">端口</label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedDb?.port || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">数据库名</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedDb?.database || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">用户名</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">密码</label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedDb ? '更新' : '创建'}
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

export default DatabaseManagement;