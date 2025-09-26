'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  File, Folder, Upload, Download, Trash2, Edit2, 
  Plus, Search, Grid3X3, List, Eye 
} from 'lucide-react';

const FileManagement = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const directories = [
    { id: 1, name: '数据集', path: '/datasets', type: 'folder', parent: null },
    { id: 2, name: '用户数据', path: '/datasets/users', type: 'folder', parent: 1 },
    { id: 3, name: '订单数据', path: '/datasets/orders', type: 'folder', parent: 1 },
    { id: 4, name: '日志文件', path: '/logs', type: 'folder', parent: null },
    { id: 5, name: '备份文件', path: '/backups', type: 'folder', parent: null },
  ];

  const files = [
    {
      id: 1,
      name: 'users_2024.csv',
      size: '2.3MB',
      type: 'csv',
      modified: '2024-01-15 14:30:25',
      path: '/datasets/users/',
      owner: '管理员'
    },
    {
      id: 2,
      name: 'orders_202401.json',
      size: '5.8MB',
      type: 'json',
      modified: '2024-01-15 14:25:15',
      path: '/datasets/orders/',
      owner: '张三'
    },
    {
      id: 3,
      name: 'system_log.txt',
      size: '1.2MB',
      type: 'txt',
      modified: '2024-01-15 14:20:08',
      path: '/logs/',
      owner: '李四'
    },
    {
      id: 4,
      name: 'database_backup.sql',
      size: '15.6MB',
      type: 'sql',
      modified: '2024-01-15 14:15:30',
      path: '/backups/',
      owner: '管理员'
    },
    {
      id: 5,
      name: 'analysis_report.pdf',
      size: '892KB',
      type: 'pdf',
      modified: '2024-01-15 14:10:12',
      path: '/datasets/',
      owner: '王五'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="h-5 w-5 text-blue-500" />;
      case 'csv':
        return <File className="h-5 w-5 text-green-500" />;
      case 'json':
        return <File className="h-5 w-5 text-yellow-500" />;
      case 'txt':
        return <File className="h-5 w-5 text-gray-500" />;
      case 'sql':
        return <File className="h-5 w-5 text-purple-500" />;
      case 'pdf':
        return <File className="h-5 w-5 text-red-500" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(f => f.id));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作栏 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">文件管理</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理和组织您的数据文件，支持上传、下载和预览
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Plus className="w-4 h-4 mr-2" />
              新建目录
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧目录树 */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">目录结构</h3>
                <div className="space-y-2">
                  {directories.map((dir) => (
                    <div key={dir.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      {getFileIcon('folder')}
                      <span className="text-sm text-gray-900">{dir.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧文件列表 */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {/* 工具栏 */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="搜索文件..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          已选择 {selectedFiles.length} 个文件
                        </span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 文件列表 */}
                {viewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              checked={selectedFiles.length === files.length}
                              onChange={handleSelectAll}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            文件名
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            大小
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            修改时间
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            所有者
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {files.map((file) => (
                          <tr key={file.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedFiles.includes(file.id)}
                                onChange={() => handleFileSelect(file.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getFileIcon(file.type)}
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                  <div className="text-sm text-gray-500">{file.path}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {file.size}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {file.modified}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {file.owner}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit2 className="w-4 h-4" />
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
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className={`relative p-4 border rounded-lg hover:shadow-md cursor-pointer ${
                          selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => handleFileSelect(file.id)}
                      >
                        <div className="absolute top-2 right-2">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleFileSelect(file.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="text-center">
                          <div className="mx-auto w-12 h-12 flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 上传文件模态框 */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">上传文件</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        拖拽文件到此处或 
                        <button className="text-blue-600 hover:text-blue-500 ml-1">点击选择文件</button>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        支持 CSV、JSON、TXT、SQL、PDF 等格式
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">上传路径</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="/datasets/">数据集</option>
                      <option value="/logs/">日志文件</option>
                      <option value="/backups/">备份文件</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    开始上传
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
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

export default FileManagement;