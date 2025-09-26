'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Search, Edit, Trash2, UserPlus, Download, Upload, Eye, Lock, Unlock } from 'lucide-react';

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      username: 'admin',
      name: '系统管理员',
      email: 'admin@example.com',
      phone: '13888888888',
      department: '技术部',
      position: '系统管理员',
      roles: ['管理员', '数据分析师'],
      status: '启用',
      lastLogin: '2024-01-15 14:30:25',
      createdAt: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      username: 'zhangsan',
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13666666666',
      department: '业务部',
      position: '业务分析师',
      roles: ['数据分析师'],
      status: '启用',
      lastLogin: '2024-01-15 14:25:15',
      createdAt: '2024-01-02 09:30:00'
    },
    {
      id: 3,
      username: 'lisi',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13777777777',
      department: '财务部',
      position: '财务专员',
      roles: ['普通用户'],
      status: '禁用',
      lastLogin: '2024-01-10 16:20:08',
      createdAt: '2024-01-03 14:15:30'
    },
    {
      id: 4,
      username: 'wangwu',
      name: '王五',
      email: 'wangwu@example.com',
      phone: '13999999999',
      department: '运营部',
      position: '运营经理',
      roles: ['部门经理', '数据分析师'],
      status: '启用',
      lastLogin: '2024-01-15 13:45:12',
      createdAt: '2024-01-04 11:20:45'
    }
  ];

  const departments = ['技术部', '业务部', '财务部', '运营部', '人事部', '市场部'];
  const positions = ['系统管理员', '业务分析师', '财务专员', '运营经理', '数据分析师', '产品经理'];
  const rolesList = ['管理员', '部门经理', '数据分析师', '普通用户'];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user: typeof users[0]) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleToggleStatus = (userId: number) => {
    alert(`切换用户状态: ${userId}`);
  };

  const getStatusColor = (status: string) => {
    return status === '启用' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作栏 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">用户管理</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理系统用户，包括用户信息、权限和状态
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddUser}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增用户
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              批量导入
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              导出用户
            </button>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索用户..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">所有部门</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">所有角色</option>
                {rolesList.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">所有状态</option>
                <option value="启用">启用</option>
                <option value="禁用">禁用</option>
              </select>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              用户列表 ({filteredUsers.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      用户信息
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      部门/岗位
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      角色
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最后登录
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.department}</div>
                        <div className="text-sm text-gray-500">{user.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {user.roles.map((role, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={user.status === '启用' ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}
                        >
                          {user.status === '启用' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
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

        {/* 用户统计 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-blue-500 p-3 rounded-md">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总用户数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{users.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-green-500 p-3 rounded-md">
                    <Unlock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">启用用户</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {users.filter(u => u.status === '启用').length}
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
                  <div className="bg-red-500 p-3 rounded-md">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">禁用用户</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {users.filter(u => u.status === '禁用').length}
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
                  <div className="bg-purple-500 p-3 rounded-md">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">在线用户</dt>
                    <dd className="text-2xl font-semibold text-gray-900">3</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 用户模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-[500px] shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedUser ? '编辑用户' : '新增用户'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">用户名</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedUser?.username || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">真实姓名</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedUser?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">邮箱</label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedUser?.email || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">手机号</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedUser?.phone || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">部门</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedUser?.department || ''}
                    >
                      <option value="">请选择部门</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">岗位</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedUser?.position || ''}
                    >
                      <option value="">请选择岗位</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">角色</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {rolesList.map(role => (
                        <div key={role} className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked={selectedUser?.roles.includes(role) || false}
                          />
                          <label className="ml-2 text-sm text-gray-700">{role}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {!selectedUser && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">初始密码</label>
                      <input
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="请输入初始密码"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedUser ? '更新' : '创建'}
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

export default UserManagement;