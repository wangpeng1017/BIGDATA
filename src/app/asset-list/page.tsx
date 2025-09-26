'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, Database, Table, BarChart3, Plus, Check, X, Tag, Calendar, Users } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'table' | 'view' | 'dataset' | 'api';
  category: string;
  description: string;
  owner: string;
  department: string;
  status: 'active' | 'inactive' | 'deprecated';
  quality: 'high' | 'medium' | 'low';
  sensitivity: 'public' | 'internal' | 'confidential' | 'restricted';
  rowCount?: number;
  size?: string;
  lastUpdated: string;
  createdAt: string;
  accessCount: number;
  tags: string[];
  schema?: string;
  location?: string;
}

export default function AssetListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sortField, setSortField] = useState<string>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 模拟资产数据
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'user_profile',
      type: 'table',
      category: '用户数据',
      description: '用户基础信息表，包含用户基本信息和属性',
      owner: '张三',
      department: '产品部',
      status: 'active',
      quality: 'high',
      sensitivity: 'internal',
      rowCount: 1250000,
      size: '456.2 MB',
      lastUpdated: '2024-03-25 14:30:00',
      createdAt: '2023-01-15 09:00:00',
      accessCount: 2456,
      tags: ['用户', '核心表', '业务'],
      schema: 'public',
      location: 'MySQL 主库'
    },
    {
      id: '2',
      name: 'sales_summary_view',
      type: 'view',
      category: '销售数据',
      description: '销售数据汇总视图，用于报表和分析',
      owner: '李四',
      department: '运营部',
      status: 'active',
      quality: 'medium',
      sensitivity: 'internal',
      lastUpdated: '2024-03-24 16:45:00',
      createdAt: '2023-06-20 11:30:00',
      accessCount: 856,
      tags: ['销售', '报表', '分析'],
      schema: 'analytics',
      location: 'ClickHouse 集群'
    },
    {
      id: '3',
      name: '客户行为分析数据集',
      type: 'dataset',
      category: '分析数据',
      description: '客户行为分析的清洗后数据集',
      owner: '王五',
      department: '数据部',
      status: 'active',
      quality: 'high',
      sensitivity: 'confidential',
      size: '2.1 GB',
      lastUpdated: '2024-03-23 08:15:00',
      createdAt: '2023-11-10 14:20:00',
      accessCount: 445,
      tags: ['客户', '行为', '分析', '机器学习'],
      location: 'Hadoop HDFS'
    },
    {
      id: '4',
      name: 'legacy_orders',
      type: 'table',
      category: '订单数据',
      description: '历史订单数据表，已不再维护',
      owner: '赵六',
      department: '系统部',
      status: 'deprecated',
      quality: 'low',
      sensitivity: 'internal',
      rowCount: 5600000,
      size: '1.2 GB',
      lastUpdated: '2023-12-31 23:59:59',
      createdAt: '2020-03-15 10:00:00',
      accessCount: 12,
      tags: ['订单', '历史', '弃用'],
      schema: 'legacy',
      location: 'MySQL 历史库'
    }
  ]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      deprecated: 'bg-red-100 text-red-800'
    };
    const labels = {
      active: '正常',
      inactive: '停用',
      deprecated: '已弃用'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getQualityBadge = (quality: string) => {
    const styles = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    };
    const labels = {
      high: '高',
      medium: '中',
      low: '低'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[quality as keyof typeof styles]}`}>
        {labels[quality as keyof typeof labels]}
      </span>
    );
  };

  const getSensitivityBadge = (sensitivity: string) => {
    const styles = {
      public: 'bg-blue-100 text-blue-800',
      internal: 'bg-gray-100 text-gray-800',
      confidential: 'bg-yellow-100 text-yellow-800',
      restricted: 'bg-red-100 text-red-800'
    };
    const labels = {
      public: '公开',
      internal: '内部',
      confidential: '机密',
      restricted: '限制'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[sensitivity as keyof typeof styles]}`}>
        {labels[sensitivity as keyof typeof labels]}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'table': return <Table className="w-4 h-4 text-blue-600" />;
      case 'view': return <BarChart3 className="w-4 h-4 text-green-600" />;
      case 'dataset': return <Database className="w-4 h-4 text-purple-600" />;
      case 'api': return <Database className="w-4 h-4 text-orange-600" />;
      default: return <Database className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  }).sort((a, b) => {
    let aValue = a[sortField as keyof Asset];
    let bValue = b[sortField as keyof Asset];
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSelectAsset = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAssets(
      selectedAssets.length === filteredAssets.length 
        ? [] 
        : filteredAssets.map(asset => asset.id)
    );
  };

  const categories = [...new Set(assets.map(asset => asset.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        {/* 头部 */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Database className="mr-2 text-blue-600" />
                资产列表管理
              </h1>
              <p className="text-gray-600 mt-1">查看和管理所有数据资产，包括表、视图和数据集</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Download className="mr-2 w-4 h-4" />
                导出列表
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <Plus className="mr-2 w-4 h-4" />
                新建资产
              </button>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{assets.length}</div>
              <div className="text-sm text-gray-600">总资产数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{assets.filter(a => a.status === 'active').length}</div>
              <div className="text-sm text-gray-600">正常资产</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{assets.filter(a => a.quality === 'high').length}</div>
              <div className="text-sm text-gray-600">高质量资产</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-sm text-gray-600">资产分类</div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索资产名称、描述或负责人..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="active">正常</option>
                <option value="inactive">停用</option>
                <option value="deprecated">已弃用</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">全部类型</option>
                <option value="table">数据表</option>
                <option value="view">视图</option>
                <option value="dataset">数据集</option>
                <option value="api">API</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">全部分类</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 批量操作 */}
        {selectedAssets.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-800">
                已选中 {selectedAssets.length} 个资产
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                  批量启用
                </button>
                <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700">
                  批量停用
                </button>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                  批量删除
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 资产表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}>
                  资产名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">质量</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">敏感等级</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('lastUpdated')}>
                  最后更新
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAssets.includes(asset.id)}
                      onChange={() => handleSelectAsset(asset.id)}
                      className="rounded border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {getTypeIcon(asset.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{asset.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {asset.type === 'table' && '数据表'}
                    {asset.type === 'view' && '视图'}
                    {asset.type === 'dataset' && '数据集'}
                    {asset.type === 'api' && 'API'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.category}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div>{asset.owner}</div>
                    <div className="text-xs text-gray-500">{asset.department}</div>
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(asset.status)}</td>
                  <td className="px-4 py-4">{getQualityBadge(asset.quality)}</td>
                  <td className="px-4 py-4">{getSensitivityBadge(asset.sensitivity)}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{asset.lastUpdated.split(' ')[0]}</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAsset(asset);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="查看详情"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="编辑">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              显示 {filteredAssets.length} 条结果，共 {assets.length} 个资产
            </div>
            <div className="text-sm text-gray-600">
              第 1 页 / 共 1 页
            </div>
          </div>
        </div>
      </div>

      {/* 资产详情模态框 */}
      {showDetails && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  {getTypeIcon(selectedAsset.type)}
                  <span className="ml-2">{selectedAsset.name}</span>
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">基本信息</h4>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">描述</dt>
                      <dd className="text-sm text-gray-900">{selectedAsset.description}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">负责人</dt>
                      <dd className="text-sm text-gray-900">{selectedAsset.owner} / {selectedAsset.department}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">状态</dt>
                      <dd>{getStatusBadge(selectedAsset.status)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">数据质量</dt>
                      <dd>{getQualityBadge(selectedAsset.quality)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">敏感等级</dt>
                      <dd>{getSensitivityBadge(selectedAsset.sensitivity)}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">技术信息</h4>
                  <dl className="space-y-3">
                    {selectedAsset.schema && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">模式</dt>
                        <dd className="text-sm text-gray-900">{selectedAsset.schema}</dd>
                      </div>
                    )}
                    {selectedAsset.location && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">存储位置</dt>
                        <dd className="text-sm text-gray-900">{selectedAsset.location}</dd>
                      </div>
                    )}
                    {selectedAsset.rowCount && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">行数</dt>
                        <dd className="text-sm text-gray-900">{selectedAsset.rowCount.toLocaleString()}</dd>
                      </div>
                    )}
                    {selectedAsset.size && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">数据大小</dt>
                        <dd className="text-sm text-gray-900">{selectedAsset.size}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">访问次数</dt>
                      <dd className="text-sm text-gray-900">{selectedAsset.accessCount}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">创建时间</dt>
                      <dd className="text-sm text-gray-900">{selectedAsset.createdAt}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">最后更新</dt>
                      <dd className="text-sm text-gray-900">{selectedAsset.lastUpdated}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-6">
                <dt className="text-sm font-medium text-gray-500 mb-2">标签</dt>
                <div className="flex flex-wrap gap-2">
                  {selectedAsset.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
