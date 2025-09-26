'use client';

import React, { useState } from 'react';
import { Folder, FolderOpen, File, Plus, Edit, Trash2, Search, Filter, Database, Table, BarChart3, FileText, Eye, ChevronRight, ChevronDown } from 'lucide-react';

interface AssetNode {
  id: string;
  name: string;
  type: 'folder' | 'table' | 'view' | 'dataset';
  parentId?: string;
  children?: AssetNode[];
  description?: string;
  schema?: string;
  rowCount?: number;
  size?: string;
  lastUpdated?: string;
  tags?: string[];
}

interface CatalogStats {
  totalAssets: number;
  totalTables: number;
  totalViews: number;
  totalDatasets: number;
  categoryCount: number;
}

export default function AssetCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['root']);
  const [selectedAsset, setSelectedAsset] = useState<AssetNode | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // 模拟资产目录数据
  const [catalogTree, setCatalogTree] = useState<AssetNode[]>([
    {
      id: 'root',
      name: '数据资产目录',
      type: 'folder',
      children: [
        {
          id: 'business',
          name: '业务数据',
          type: 'folder',
          children: [
            {
              id: 'user_table',
              name: 'user_info',
              type: 'table',
              description: '用户信息表',
              schema: 'public',
              rowCount: 125000,
              size: '25.6 MB',
              lastUpdated: '2024-03-25 14:30:00',
              tags: ['用户', '业务', '核心表']
            },
            {
              id: 'order_table',
              name: 'orders',
              type: 'table',
              description: '订单信息表',
              schema: 'public',
              rowCount: 450000,
              size: '89.2 MB',
              lastUpdated: '2024-03-25 16:45:00',
              tags: ['订单', '交易', '业务']
            }
          ]
        },
        {
          id: 'analytics',
          name: '分析数据',
          type: 'folder',
          children: [
            {
              id: 'sales_view',
              name: 'sales_summary',
              type: 'view',
              description: '销售数据汇总视图',
              schema: 'analytics',
              lastUpdated: '2024-03-25 10:15:00',
              tags: ['销售', '汇总', '分析']
            },
            {
              id: 'customer_dataset',
              name: '客户分析数据集',
              type: 'dataset',
              description: '客户行为分析数据集',
              size: '156.8 MB',
              lastUpdated: '2024-03-24 22:30:00',
              tags: ['客户', '分析', '行为']
            }
          ]
        },
        {
          id: 'external',
          name: '外部数据',
          type: 'folder',
          children: [
            {
              id: 'api_data',
              name: '第三方API数据',
              type: 'dataset',
              description: '来自第三方API的数据',
              size: '45.2 MB',
              lastUpdated: '2024-03-25 08:00:00',
              tags: ['外部', 'API', '第三方']
            }
          ]
        }
      ]
    }
  ]);

  // 模拟统计数据
  const [stats, setStats] = useState<CatalogStats>({
    totalAssets: 1247,
    totalTables: 156,
    totalViews: 89,
    totalDatasets: 234,
    categoryCount: 12
  });

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const getAssetIcon = (type: string, isExpanded?: boolean) => {
    switch (type) {
      case 'folder':
        return isExpanded ? <FolderOpen className="w-4 h-4 text-yellow-600" /> : <Folder className="w-4 h-4 text-yellow-600" />;
      case 'table':
        return <Table className="w-4 h-4 text-blue-600" />;
      case 'view':
        return <BarChart3 className="w-4 h-4 text-green-600" />;
      case 'dataset':
        return <Database className="w-4 h-4 text-purple-600" />;
      default:
        return <File className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderTreeNode = (node: AssetNode, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center py-2 px-2 hover:bg-gray-100 rounded cursor-pointer ${
            selectedAsset?.id === node.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(node.id);
            }
            setSelectedAsset(node);
            if (node.type !== 'folder') {
              setShowDetails(true);
            }
          }}
        >
          <div className="flex items-center flex-1">
            {hasChildren && (
              <button className="mr-1">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
            {getAssetIcon(node.type, isExpanded)}
            <span className="ml-2 text-sm">{node.name}</span>
            {node.rowCount && (
              <span className="ml-2 text-xs text-gray-500">({node.rowCount.toLocaleString()} 行)</span>
            )}
          </div>
          {node.type !== 'folder' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAsset(node);
                  setShowDetails(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <Eye className="w-3 h-3" />
              </button>
              <button className="text-green-600 hover:text-green-800">
                <Edit className="w-3 h-3" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const getAllNodes = (nodes: AssetNode[]): AssetNode[] => {
    let result: AssetNode[] = [];
    const traverse = (nodeList: AssetNode[]) => {
      for (const node of nodeList) {
        if (node.type !== 'folder') {
          result.push(node);
        }
        if (node.children) {
          traverse(node.children);
        }
      }
    };
    traverse(nodes);
    return result;
  };

  const filteredAssets = getAllNodes(catalogTree).filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (asset.description && asset.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || asset.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧目录树 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200 px-4 py-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">资产目录</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {/* 统计卡片 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm text-blue-600">总资产</div>
                  <div className="text-xl font-bold text-blue-900">{stats.totalAssets}</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-sm text-green-600">数据表</div>
                  <div className="text-xl font-bold text-green-900">{stats.totalTables}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <div className="text-sm text-yellow-600">视图</div>
                  <div className="text-xl font-bold text-yellow-900">{stats.totalViews}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="text-sm text-purple-600">数据集</div>
                  <div className="text-xl font-bold text-purple-900">{stats.totalDatasets}</div>
                </div>
              </div>
              
              {/* 目录树 */}
              <div className="border rounded max-h-96 overflow-y-auto">
                {catalogTree.map(node => renderTreeNode(node))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧主内容 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 头部 */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Database className="mr-2 text-blue-600" />
                    资产目录管理
                  </h1>
                  <p className="text-gray-600 mt-1">管理和浏览数据资产目录结构</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                    <Plus className="mr-2 w-4 h-4" />
                    新建目录
                  </button>
                </div>
              </div>
            </div>

            {/* 搜索和筛选 */}
            <div className="px-6 py-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索资产名称或描述..."
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
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">全部类型</option>
                    <option value="table">数据表</option>
                    <option value="view">视图</option>
                    <option value="dataset">数据集</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 资产列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200 px-6 py-3">
              <h3 className="text-lg font-semibold text-gray-800">资产列表</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredAssets.map((asset) => (
                  <div key={asset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        {getAssetIcon(asset.type)}
                        <div className="ml-2">
                          <h4 className="text-sm font-semibold text-gray-900">{asset.name}</h4>
                          <p className="text-xs text-gray-500">
                            {asset.type === 'table' && '数据表'}
                            {asset.type === 'view' && '视图'}
                            {asset.type === 'dataset' && '数据集'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => {
                            setSelectedAsset(asset);
                            setShowDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{asset.description}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      {asset.rowCount && <div>行数: {asset.rowCount.toLocaleString()}</div>}
                      {asset.size && <div>大小: {asset.size}</div>}
                      {asset.lastUpdated && <div>更新: {asset.lastUpdated}</div>}
                    </div>
                    {asset.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {asset.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 资产详情模态框 */}
      {showDetails && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedAsset.name}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">类型</dt>
                  <dd className="text-sm text-gray-900">
                    {selectedAsset.type === 'table' && '数据表'}
                    {selectedAsset.type === 'view' && '视图'}
                    {selectedAsset.type === 'dataset' && '数据集'}
                  </dd>
                </div>
                {selectedAsset.description && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">描述</dt>
                    <dd className="text-sm text-gray-900">{selectedAsset.description}</dd>
                  </div>
                )}
                {selectedAsset.schema && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">模式</dt>
                    <dd className="text-sm text-gray-900">{selectedAsset.schema}</dd>
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
                {selectedAsset.lastUpdated && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">最后更新</dt>
                    <dd className="text-sm text-gray-900">{selectedAsset.lastUpdated}</dd>
                  </div>
                )}
                {selectedAsset.tags && selectedAsset.tags.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">标签</dt>
                    <dd className="flex flex-wrap gap-2">
                      {selectedAsset.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
