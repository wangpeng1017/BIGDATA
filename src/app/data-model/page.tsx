'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Edit, Trash2, Eye, Copy, GitBranch, Database, Table, Layers, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const DataModel = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('models');

  const dataModels = [
    {
      id: 1,
      name: '用户主题域模型',
      type: '主题域',
      category: '业务模型',
      version: '1.2.0',
      status: '已发布',
      tableCount: 8,
      fieldCount: 56,
      description: '用户相关的核心业务模型，包括用户信息、用户行为等',
      creator: '张三',
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-15 14:30:00',
      usageCount: 15
    },
    {
      id: 2,
      name: '订单数据模型',
      type: '实体模型',
      category: '业务模型',
      version: '2.1.0',
      status: '开发中',
      tableCount: 12,
      fieldCount: 89,
      description: '订单全流程数据模型，涵盖下单、支付、配送等环节',
      creator: '李四',
      createTime: '2024-01-05 09:30:00',
      updateTime: '2024-01-15 16:45:00',
      usageCount: 23
    },
    {
      id: 3,
      name: '商品维度模型',
      type: '维度模型',
      category: '分析模型',
      version: '1.0.0',
      status: '已发布',
      tableCount: 5,
      fieldCount: 32,
      description: '商品维度建模，支持多层级分类和属性管理',
      creator: '王五',
      createTime: '2024-01-08 14:20:00',
      updateTime: '2024-01-10 11:15:00',
      usageCount: 8
    },
    {
      id: 4,
      name: '财务报表模型',
      type: '事实表',
      category: '分析模型',
      version: '1.5.2',
      status: '测试中',
      tableCount: 6,
      fieldCount: 45,
      description: '财务数据分析模型，支持收入、成本、利润等指标计算',
      creator: '赵六',
      createTime: '2024-01-10 16:00:00',
      updateTime: '2024-01-14 10:30:00',
      usageCount: 12
    }
  ];

  const modelStructure = [
    {
      tableName: 'user_base',
      tableComment: '用户基础信息表',
      fields: [
        { name: 'user_id', type: 'bigint', comment: '用户ID', isPrimary: true, isNotNull: true },
        { name: 'username', type: 'varchar(50)', comment: '用户名', isPrimary: false, isNotNull: true },
        { name: 'email', type: 'varchar(100)', comment: '邮箱', isPrimary: false, isNotNull: false },
        { name: 'mobile', type: 'varchar(20)', comment: '手机号', isPrimary: false, isNotNull: false },
        { name: 'create_time', type: 'datetime', comment: '创建时间', isPrimary: false, isNotNull: true }
      ]
    },
    {
      tableName: 'user_profile',
      tableComment: '用户画像表',
      fields: [
        { name: 'user_id', type: 'bigint', comment: '用户ID', isPrimary: true, isNotNull: true },
        { name: 'age_range', type: 'varchar(20)', comment: '年龄段', isPrimary: false, isNotNull: false },
        { name: 'gender', type: 'tinyint', comment: '性别', isPrimary: false, isNotNull: false },
        { name: 'city', type: 'varchar(50)', comment: '城市', isPrimary: false, isNotNull: false }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已发布':
        return 'bg-green-100 text-green-800';
      case '开发中':
        return 'bg-blue-100 text-blue-800';
      case '测试中':
        return 'bg-yellow-100 text-yellow-800';
      case '已废弃':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已发布':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case '开发中':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case '测试中':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case '已废弃':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Database className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddModel = () => {
    setSelectedModel(null);
    setShowModal(true);
  };

  const handleEditModel = (model: any) => {
    setSelectedModel(model);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">数据模型</h1>
            <p className="mt-1 text-sm text-gray-600">
              设计和管理数据模型，支持业务建模和数据仓库建模
            </p>
          </div>
          <button
            onClick={handleAddModel}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新建模型
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
                    <dt className="text-sm font-medium text-gray-500 truncate">总模型数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{dataModels.length}</dd>
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
                      {dataModels.filter(m => m.status === '已发布').length}
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
                  <Table className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总表数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {dataModels.reduce((sum, m) => sum + m.tableCount, 0)}
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
                  <Layers className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总字段数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {dataModels.reduce((sum, m) => sum + m.fieldCount, 0)}
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
                onClick={() => setActiveTab('models')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'models'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                模型列表
              </button>
              <button
                onClick={() => setActiveTab('structure')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'structure'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                模型结构
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'models' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        模型信息
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        类型分类
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        版本状态
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        结构统计
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        使用情况
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataModels.map((model) => (
                      <tr key={model.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{model.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{model.description}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              创建者：{model.creator} | {model.createTime}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{model.type}</div>
                          <div className="text-sm text-gray-500">{model.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center mb-1">
                            <GitBranch className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-900">v{model.version}</span>
                          </div>
                          <div className="flex items-center">
                            {getStatusIcon(model.status)}
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(model.status)}`}>
                              {model.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>表：{model.tableCount} 个</div>
                          <div>字段：{model.fieldCount} 个</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>引用次数：{model.usageCount}</div>
                          <div>最后更新：{model.updateTime.split(' ')[0]}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="查看详情"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditModel(model)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="编辑模型"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="复制模型"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="删除模型"
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

            {activeTab === 'structure' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">用户主题域模型结构</h3>
                  <span className="text-sm text-gray-500">版本 v1.2.0</span>
                </div>
                
                {modelStructure.map((table, tableIndex) => (
                  <div key={tableIndex} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center">
                        <Table className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-gray-900">{table.tableName}</span>
                        <span className="ml-2 text-sm text-gray-500">({table.tableComment})</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">字段名</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">注释</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">约束</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {table.fields.map((field, fieldIndex) => (
                            <tr key={fieldIndex} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-sm text-gray-900">
                                <div className="flex items-center">
                                  {field.isPrimary && (
                                    <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2" title="主键"></span>
                                  )}
                                  {field.name}
                                </div>
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500">{field.type}</td>
                              <td className="px-4 py-2 text-sm text-gray-500">{field.comment}</td>
                              <td className="px-4 py-2 text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  {field.isPrimary && (
                                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">PK</span>
                                  )}
                                  {field.isNotNull && (
                                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">NOT NULL</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 新增/编辑模型模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedModel ? '编辑数据模型' : '新建数据模型'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">模型名称</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedModel?.name || ''}
                      placeholder="请输入模型名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">模型类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedModel?.type || ''}
                    >
                      <option value="">请选择模型类型</option>
                      <option value="主题域">主题域</option>
                      <option value="实体模型">实体模型</option>
                      <option value="维度模型">维度模型</option>
                      <option value="事实表">事实表</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">模型分类</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedModel?.category || ''}
                    >
                      <option value="">请选择分类</option>
                      <option value="业务模型">业务模型</option>
                      <option value="分析模型">分析模型</option>
                      <option value="应用模型">应用模型</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">版本号</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedModel?.version || '1.0.0'}
                      placeholder="1.0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">状态</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedModel?.status || ''}
                    >
                      <option value="">请选择状态</option>
                      <option value="开发中">开发中</option>
                      <option value="测试中">测试中</option>
                      <option value="已发布">已发布</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">模型描述</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      defaultValue={selectedModel?.description || ''}
                      placeholder="请输入模型描述"
                    />
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedModel ? '更新' : '创建'}
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

export default DataModel;