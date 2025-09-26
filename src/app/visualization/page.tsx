'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, BarChart3, PieChart, LineChart, Edit, Trash2, Share, Download, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const Visualization = () => {
  const [selectedChart] = useState<null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 示例图表数据
  const barData = [
    { name: '1月', 用户数: 4000, 订单数: 2400 },
    { name: '2月', 用户数: 3000, 订单数: 1398 },
    { name: '3月', 用户数: 2000, 订单数: 9800 },
    { name: '4月', 用户数: 2780, 订单数: 3908 },
    { name: '5月', 用户数: 1890, 订单数: 4800 },
    { name: '6月', 用户数: 2390, 订单数: 3800 },
  ];

  const pieData = [
    { name: '移动端', value: 400, color: '#0088FE' },
    { name: '桌面端', value: 300, color: '#00C49F' },
    { name: '平板端', value: 300, color: '#FFBB28' },
    { name: '其他', value: 200, color: '#FF8042' },
  ];

  const lineData = [
    { name: '00:00', value: 100 },
    { name: '04:00', value: 200 },
    { name: '08:00', value: 500 },
    { name: '12:00', value: 800 },
    { name: '16:00', value: 600 },
    { name: '20:00', value: 300 },
  ];

  const areaData = [
    { name: '一月', 销售额: 4000, 成本: 2400 },
    { name: '二月', 销售额: 3000, 成本: 1398 },
    { name: '三月', 销售额: 2000, 成本: 9800 },
    { name: '四月', 销售额: 2780, 成本: 3908 },
    { name: '五月', 销售额: 1890, 成本: 4800 },
    { name: '六月', 销售额: 2390, 成本: 3800 },
  ];

  const dashboards = [
    {
      id: 1,
      name: '销售数据分析',
      description: '展示销售趋势和业绩数据',
      charts: 4,
      lastModified: '2024-01-15 14:30:25',
      owner: '张三'
    },
    {
      id: 2,
      name: '用户行为分析',
      description: '分析用户访问模式和偏好',
      charts: 6,
      lastModified: '2024-01-15 14:25:15',
      owner: '李四'
    },
    {
      id: 3,
      name: '运营数据概览',
      description: '核心运营指标监控',
      charts: 8,
      lastModified: '2024-01-15 14:20:08',
      owner: '王五'
    }
  ];

  const chartTypes = [
    { type: 'bar', name: '柱状图', icon: BarChart3, color: 'text-blue-600' },
    { type: 'line', name: '折线图', icon: LineChart, color: 'text-green-600' },
    { type: 'pie', name: '饼图', icon: PieChart, color: 'text-purple-600' },
    { type: 'area', name: '面积图', icon: BarChart3, color: 'text-orange-600' },
  ];

  const renderChart = (type: string) => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="用户数" fill="#8884d8" />
              <Bar dataKey="订单数" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                  label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="销售额" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="成本" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作栏 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">数据可视化</h1>
            <p className="mt-1 text-sm text-gray-600">
              创建和管理数据可视化图表，构建交互式仪表盘
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新建图表
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Plus className="w-4 h-4 mr-2" />
              新建仪表盘
            </button>
          </div>
        </div>

        {/* 图表类型预览 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">图表类型</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chartTypes.map((chart) => {
                const IconComponent = chart.icon;
                return (
                  <div key={chart.type} className="border rounded-lg p-4 hover:shadow-md cursor-pointer">
                    <div className="text-center">
                      <IconComponent className={`mx-auto h-12 w-12 ${chart.color} mb-3`} />
                      <h4 className="text-sm font-medium text-gray-900">{chart.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 示例图表展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 柱状图 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">用户数据统计</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {renderChart('bar')}
            </div>
          </div>

          {/* 饼图 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">设备类型分布</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {renderChart('pie')}
            </div>
          </div>

          {/* 折线图 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">访问趋势</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {renderChart('line')}
            </div>
          </div>

          {/* 面积图 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">销售与成本对比</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {renderChart('area')}
            </div>
          </div>
        </div>

        {/* 仪表盘列表 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">我的仪表盘</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      仪表盘名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      图表数量
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创建者
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最后修改
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboards.map((dashboard) => (
                    <tr key={dashboard.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BarChart3 className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{dashboard.name}</div>
                            <div className="text-sm text-gray-500">{dashboard.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dashboard.charts} 个图表
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dashboard.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dashboard.lastModified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Share className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Settings className="w-4 h-4" />
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

        {/* 创建图表模态框 */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">新建图表</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">图表名称</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入图表名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">图表类型</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择图表类型</option>
                      <option value="bar">柱状图</option>
                      <option value="line">折线图</option>
                      <option value="pie">饼图</option>
                      <option value="area">面积图</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">数据源</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">请选择数据源</option>
                      <option value="mysql">用户数据库</option>
                      <option value="oracle">订单数据库</option>
                      <option value="api">API接口</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SQL查询</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      rows={4}
                      placeholder="SELECT * FROM table_name"
                    />
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    创建图表
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
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

export default Visualization;