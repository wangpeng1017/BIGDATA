'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Shield } from 'lucide-react';

type Permission = { id: string; name: string; path: string; method: string; code: string; status: 'active' | 'inactive' | 'pending' };

const ApiPermissionPage: React.FC = () => {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [rows] = useState<Permission[]>([
    { id: '1', name: '用户查询API', path: '/api/users', method: 'GET', code: 'user:read', status: 'active' },
    { id: '2', name: '数据导出API', path: '/api/data/export', method: 'POST', code: 'data:export', status: 'active' },
    { id: '3', name: '系统配置API', path: '/api/system/config', method: 'PUT', code: 'system:write', status: 'pending' }
  ]);

  const filtered = rows.filter(r => (r.name + r.path + r.code).toLowerCase().includes(q.toLowerCase()) && (status === 'all' || r.status === status));

  const badge = (s: Permission['status']) => {
    const cls = s === 'active' ? 'bg-green-100 text-green-800' : s === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';
    const label = s === 'active' ? '启用' : s === 'pending' ? '待审核' : '禁用';
    return <span className={`px-2 py-1 text-xs rounded-full ${cls}`}>{label}</span>;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center"><Shield className="mr-2 text-blue-600" />API权限管理</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="搜索API名称/路径/权限代码..."
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="all">全部状态</option>
              <option value="active">启用</option>
              <option value="inactive">禁用</option>
              <option value="pending">待审核</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API信息</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">权限代码</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.path}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.method}</td>
                    <td className="px-4 py-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">{r.code}</code></td>
                    <td className="px-4 py-3">{badge(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiPermissionPage;
/*
        {/*
        <div className="p-6">
          {activeTab === 'permissions' ? (
            // API权限配置表格
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API信息</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求方式</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">权限标识</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">已分配用户</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{permission.apiName}</div>
                          <div className="text-sm text-gray-500">{permission.apiPath}</div>
                          <div className="text-xs text-gray-400 mt-1">{permission.description}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{getMethodBadge(permission.method)}</td>
                      <td className="px-4 py-4">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">{permission.permission}</code>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(permission.status)}</td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-900">{permission.assignedUsers} 人</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{permission.updatedAt}</td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // 权限分配管理表格
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户信息</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API信息</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">权限</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">审批人</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{assignment.userName}</div>
                          <div className="text-sm text-gray-500">{assignment.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{assignment.apiName}</div>
                      </td>
                      <td className="px-4 py-4">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">{assignment.permission}</code>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(assignment.status)}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{assignment.appliedAt}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{assignment.approver || '-'}</td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          {assignment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(assignment.id)}
                                className="text-green-600 hover:text-green-800 flex items-center"
                                title="通过"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(assignment.id)}
                                className="text-red-600 hover:text-red-800 flex items-center"
                                title="拒绝"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApiPermissionPage;
*/
