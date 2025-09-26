'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Edit, Trash2, Eye, Play, Pause, Shield, Target, CheckCircle, AlertTriangle, XCircle, Clock, TrendingUp } from 'lucide-react';

const QualityConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('rules');

  const qualityRules = [
    {
      id: 1,
      name: '用户邮箱格式检查',
      type: '格式校验',
      dimension: '准确性',
      targetTable: 'users',
      targetField: 'email',
      ruleExpression: 'email REGEXP \'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$\'',
      threshold: 95,
      status: '启用',
      severity: '中',
      createTime: '2024-01-01 10:00:00',
      lastCheck: '2024-01-15 14:30:00',
      passRate: 98.2,
      failCount: 156
    },
    {
      id: 2,
      name: '手机号长度校验',
      type: '长度校验',
      dimension: '完整性',
      targetTable: 'users',
      targetField: 'mobile',
      ruleExpression: 'LENGTH(mobile) = 11 AND mobile REGEXP \'^[0-9]+$\'',
      threshold: 99,
      status: '启用',
      severity: '高',
      createTime: '2024-01-02 11:30:00',
      lastCheck: '2024-01-15 14:25:00',
      passRate: 97.8,
      failCount: 234
    },
    {
      id: 3,
      name: '订单金额范围检查',
      type: '范围校验',
      dimension: '合理性',
      targetTable: 'orders',
      targetField: 'amount',
      ruleExpression: 'amount > 0 AND amount < 100000',
      threshold: 90,
      status: '暂停',
      severity: '高',
      createTime: '2024-01-05 09:15:00',
      lastCheck: '2024-01-12 16:45:00',
      passRate: 89.5,
      failCount: 89
    },
    {
      id: 4,
      name: '用户ID唯一性检查',
      type: '唯一性校验',
      dimension: '一致性',
      targetTable: 'users',
      targetField: 'user_id',
      ruleExpression: 'COUNT(user_id) = COUNT(DISTINCT user_id)',
      threshold: 100,
      status: '启用',
      severity: '高',
      createTime: '2024-01-08 14:20:00',
      lastCheck: '2024-01-15 13:15:00',
      passRate: 100,
      failCount: 0
    }
  ];

  const qualityReports = [
    {
      id: 1,
      tableName: 'users',
      totalRecords: 125680,
      passedRecords: 123456,
      failedRecords: 2224,
      qualityScore: 98.2,
      lastCheck: '2024-01-15 14:30:00',
      issues: [
        { rule: '用户邮箱格式检查', count: 156 },
        { rule: '手机号长度校验', count: 234 }
      ]
    },
    {
      id: 2,
      tableName: 'orders',
      totalRecords: 89760,
      passedRecords: 88934,
      failedRecords: 826,
      qualityScore: 99.1,
      lastCheck: '2024-01-15 12:00:00',
      issues: [
        { rule: '订单金额范围检查', count: 89 }
      ]
    },
    {
      id: 3,
      tableName: 'products',
      totalRecords: 45680,
      passedRecords: 45345,
      failedRecords: 335,
      qualityScore: 99.3,
      lastCheck: '2024-01-15 10:15:00',
      issues: []
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
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getQualityScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
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
            <h1 className="text-2xl font-semibold text-gray-900">质量规则配置</h1>
            <p className="mt-1 text-sm text-gray-600">
              配置数据质量校验规则，监控和保障数据质量
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Play className="w-4 h-4 mr-2" />
              批量检查
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
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总规则数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{qualityRules.length}</dd>
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
                      {qualityRules.filter(r => r.status === '启用').length}
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
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">平均通过率</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {Math.round(qualityRules.reduce((sum, r) => sum + r.passRate, 0) / qualityRules.length)}%
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
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">异常数据</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {qualityRules.reduce((sum, r) => sum + r.failCount, 0)}
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
                质量规则
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                质量报告
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
                        类型维度
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        阈值/严重性
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        质量指标
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {qualityRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{rule.ruleExpression}</div>
                            <div className="text-xs text-gray-400 mt-1">最近检查：{rule.lastCheck}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{rule.targetTable}</div>
                          <div className="text-sm text-gray-500">{rule.targetField}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{rule.type}</div>
                          <div className="text-sm text-gray-500">{rule.dimension}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">≥{rule.threshold}%</div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(rule.severity)}`}>
                            {rule.severity}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className={`font-semibold ${getQualityScoreColor(rule.passRate)}`}>
                            通过率：{rule.passRate}%
                          </div>
                          <div className="text-red-600">异常：{rule.failCount} 条</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="执行检查"
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

            {activeTab === 'reports' && (
              <div className="space-y-6">
                {qualityReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{report.tableName}</h3>
                        <p className="text-sm text-gray-500">最后检查时间：{report.lastCheck}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getQualityScoreColor(report.qualityScore)}`}>
                          {report.qualityScore}%
                        </div>
                        <div className="text-sm text-gray-500">质量得分</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-semibold text-blue-600">
                          {report.totalRecords.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600">总记录数</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-semibold text-green-600">
                          {report.passedRecords.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">通过记录</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-2xl font-semibold text-red-600">
                          {report.failedRecords.toLocaleString()}
                        </div>
                        <div className="text-sm text-red-600">异常记录</div>
                      </div>
                    </div>

                    {report.issues.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">主要问题</h4>
                        <div className="space-y-2">
                          {report.issues.map((issue, index) => (
                            <div key={index} className="flex justify-between items-center bg-yellow-50 px-3 py-2 rounded">
                              <span className="text-sm text-gray-900">{issue.rule}</span>
                              <span className="text-sm font-medium text-red-600">{issue.count} 条</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {report.issues.length === 0 && (
                      <div className="text-center py-4">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
                        <p className="text-sm text-green-600">数据质量良好，无异常问题</p>
                      </div>
                    )}
                  </div>
                ))}
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
                  {selectedRule ? '编辑质量规则' : '新增质量规则'}
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
                    <label className="block text-sm font-medium text-gray-700">校验类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.type || ''}
                    >
                      <option value="">请选择校验类型</option>
                      <option value="格式校验">格式校验</option>
                      <option value="长度校验">长度校验</option>
                      <option value="范围校验">范围校验</option>
                      <option value="唯一性校验">唯一性校验</option>
                      <option value="完整性校验">完整性校验</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">质量维度</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.dimension || ''}
                    >
                      <option value="">请选择质量维度</option>
                      <option value="准确性">准确性</option>
                      <option value="完整性">完整性</option>
                      <option value="一致性">一致性</option>
                      <option value="合理性">合理性</option>
                      <option value="及时性">及时性</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">目标表</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.targetTable || ''}
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
                    <label className="block text-sm font-medium text-gray-700">质量阈值(%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.threshold || '95'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">严重等级</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedRule?.severity || ''}
                    >
                      <option value="">请选择严重等级</option>
                      <option value="高">高</option>
                      <option value="中">中</option>
                      <option value="低">低</option>
                    </select>
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
                    <label className="block text-sm font-medium text-gray-700">规则表达式</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      defaultValue={selectedRule?.ruleExpression || ''}
                      placeholder="请输入SQL表达式或校验规则"
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

export default QualityConfig;