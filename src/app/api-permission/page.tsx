'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Plus, Edit, Trash2, Shield, User, Calendar, Check, X, Filter, Download, Eye } from 'lucide-react';

interface ApiPermission {
  id: string;
  apiName: string;
  apiPath: string;
  method: string;
  description: string;
  permission: string;
  status: 'active' | 'inactive' | 'pending';
  assignedUsers: number;
  createdAt: string;
  updatedAt: string;
}

interface PermissionAssignment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  apiId: string;
  apiName: string;
  permission: string;
  status: 'approved' | 'pending' | 'rejected';
  appliedAt: string;
  approvedAt?: string;
  approver?: string;
}

export default function ApiPermissionPage() {
  const [activeTab, setActiveTab] = useState<'permissions' | 'assignments'>('permissions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<ApiPermission | null>(null);

  // 模拟API权限数据
  const [permissions, setPermissions] = useState<ApiPermission[]>([
    {
      id: '1',
      apiName: '用户查询API',
      apiPath: '/api/users',
      method: 'GET',
      description: '查询用户信息接口',
      permission: 'user:read',
      status: 'active',
      assignedUsers: 15,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20'
    },
    {
      id: '2',
      apiName: '数据导出API',
      apiPath: '/api/data/export',
      method: 'POST',
      description: '数据导出接口',
      permission: 'data:export',
      status: 'active',
      assignedUsers: 8,
      createdAt: '2024-02-01',
      updatedAt: '2024-03-18'
    },
    {
      id: '3',
      apiName: '系统配置API',
      apiPath: '/api/system/config',
      method: 'PUT',
      description: '系统配置修改接口',
      permission: 'system:write',
      status: 'pending',
      assignedUsers: 3,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-22'
    }
  ]);

  // 模拟权限分配数据
  const [assignments, setAssignments] = useState<PermissionAssignment[]>([
    {
      id: '1',
      userId: 'u1',
      userName: '张三',
      userEmail: 'zhang@example.com',
      apiId: '1',
      apiName: '用户查询API',
      permission: 'user:read',
      status: 'approved',
      appliedAt: '2024-03-15',
      approvedAt: '2024-03-16',
      approver: '管理员'
    },
    {
      id: '2',
      userId: 'u2',
      userName: '李四',
      userEmail: 'li@example.com',
      apiId: '2',
      apiName: '数据导出API',
      permission: 'data:export',
      status: 'pending',
      appliedAt: '2024-03-20'
    },
    {
      id: '3',
      userId: 'u3',
      userName: '王五',
      userEmail: 'wang@example.com',
      apiId: '1',
      apiName: '用户查询API',
      permission: 'user:read',
      status: 'rejected',
      appliedAt: '2024-03-18',
      approver: '管理员'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    const labels = {
      active: '启用',
      inactive: '禁用',
      pending: '待审核',
      approved: '已通过',
      rejected: '已拒绝'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getMethodBadge = (method: string) => {
    const styles = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded ${styles[method as keyof typeof styles]}`}>
        {method}
      </span>
    );
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.apiPath.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || permission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.apiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'approved' as const, approvedAt: new Date().toISOString().split('T')[0], approver: '管理员' }
        : assignment
    ));
  };

  const handleReject = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'rejected' as const, approver: '管理员' }
        : assignment
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
        {/* 头部 */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Shield className="mr-2 text-blue-600" />
                API权限管理
              </h1>
              <p className="text-gray-600 mt-1">管理API权限配置和用户权限分配</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <User className="mr-2 w-4 h-4" />
                分配权限
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="mr-2 w-4 h-4" />
                新增API
              </button>
            </div>
          </div>

          {/* 标签切换 */}
          <div className="flex space-x-1 mt-4">
            <button
              onClick={() => setActiveTab('permissions')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'permissions' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              API权限配置
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'assignments' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              权限分配管理
            </button>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={activeTab === 'permissions' ? '搜索API名称或路径...' : '搜索用户或API...'}
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
                {activeTab === 'permissions' ? (
                  <>
                    <option value="active">启用</option>
                    <option value="inactive">禁用</option>
                    <option value="pending">待审核</option>
                  </>
                ) : (
                  <>
                    <option value="approved">已通过</option>
                    <option value="pending">待审核</option>
                    <option value="rejected">已拒绝</option>
                  </>
                )}
              </select>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
              <Download className="mr-2 w-4 h-4" />
              导出
            </button>
          </div>
        </div>

        {/* 内容区域 */}
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
}
