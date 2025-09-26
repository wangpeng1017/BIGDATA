'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Database, Users, Activity, TrendingUp, Server, FileText, BarChart3 } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // 模拟数据
  const statsData = [
    { title: '数据源总数', value: '156', change: '+12%', icon: Database, color: 'bg-blue-500' },
    { title: '在线用户', value: '2,543', change: '+3.2%', icon: Users, color: 'bg-green-500' },
    { title: '数据处理量', value: '89.2GB', change: '+18%', icon: Activity, color: 'bg-purple-500' },
    { title: 'API调用量', value: '45,623', change: '+8.1%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const chartData = [
    { name: '一月', value: 400 },
    { name: '二月', value: 300 },
    { name: '三月', value: 600 },
    { name: '四月', value: 800 },
    { name: '五月', value: 500 },
    { name: '六月', value: 700 }
  ];

  const pieData = [
    { name: 'MySQL', value: 45, color: '#3B82F6' },
    { name: 'Oracle', value: 30, color: '#10B981' },
    { name: 'SQL Server', value: 15, color: '#F59E0B' },
    { name: '其他', value: 10, color: '#EF4444' }
  ];

  const systemModules = [
    { name: '数据集成', status: '运行中', icon: Database, color: 'text-green-600' },
    { name: '数据清洗', status: '运行中', icon: Server, color: 'text-green-600' },
    { name: 'API服务', status: '运行中', icon: FileText, color: 'text-green-600' },
    { name: '数据可视化', status: '维护中', icon: BarChart3, color: 'text-yellow-600' },
  ];

  const recentLogs = [
    { time: '2024-01-15 14:30:25', message: '用户 admin 登录系统', level: 'info' },
    { time: '2024-01-15 14:25:15', message: '数据同步任务执行成功', level: 'success' },
    { time: '2024-01-15 14:20:08', message: 'API调用频率异常', level: 'warning' },
    { time: '2024-01-15 14:15:30', message: '数据源连接失败', level: 'error' },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">数据平台概览</h1>
          <p className="mt-1 text-sm text-gray-600">
            欢迎使用重庆数据平台，这里是您的数据管理中心
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${stat.color} p-3 rounded-md`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 数据处理趋势 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">数据处理趋势</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 数据源分布 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">数据源分布</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 系统状态和日志 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 系统模块状态 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">系统模块状态</h3>
            <div className="space-y-4">
              {systemModules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`h-5 w-5 ${module.color}`} />
                      <span className="text-sm font-medium text-gray-900">{module.name}</span>
                    </div>
                    <span className={`text-sm ${module.color}`}>{module.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 最近日志 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">最近日志</h3>
            <div className="space-y-3">
              {recentLogs.map((log, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-500 flex-shrink-0">{log.time}</span>
                  <span className={`font-medium ${getLevelColor(log.level)}`}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 快速导航 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">快速导航</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Database className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">数据源管理</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Activity className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">数据处理</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">数据可视化</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">用户管理</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;