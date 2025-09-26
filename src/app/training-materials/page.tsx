'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Edit, Trash2, Eye, Download, Upload, FileText, Video, Image, Archive, BookOpen, Play, Clock } from 'lucide-react';

const TrainingMaterials = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const materials = [
    {
      id: 1,
      title: '数据仓库建模理论与实践',
      type: 'document',
      category: '理论学习',
      format: 'PDF',
      size: '15.6 MB',
      downloadCount: 156,
      description: '详细介绍数据仓库建模的基础理论和实际应用案例',
      author: '张三',
      uploadTime: '2024-01-01 10:00:00',
      tags: ['数据仓库', '建模', '理论']
    },
    {
      id: 2,
      title: 'SQL实战训练视频',
      type: 'video',
      category: '实战演练',
      format: 'MP4',
      size: '850.3 MB',
      downloadCount: 89,
      description: 'SQL查询优化和复杂查询的实战演练视频教程',
      author: '李四',
      uploadTime: '2024-01-03 14:30:00',
      tags: ['SQL', '查询优化', '实战']
    },
    {
      id: 3,
      title: '数据清洗案例数据集',
      type: 'dataset',
      category: '实训数据',
      format: 'CSV',
      size: '45.2 MB',
      downloadCount: 234,
      description: '包含各种数据质量问题的样本数据集，用于数据清洗练习',
      author: '王五',
      uploadTime: '2024-01-05 09:15:00',
      tags: ['数据清洗', '数据集', '练习']
    },
    {
      id: 4,
      title: 'BI工具使用手册',
      type: 'document',
      category: '工具指南',
      format: 'DOCX',
      size: '8.9 MB',
      downloadCount: 67,
      description: '商业智能工具的详细使用说明和操作指南',
      author: '赵六',
      uploadTime: '2024-01-08 16:45:00',
      tags: ['BI工具', '使用手册', '指南']
    }
  ];

  const categories = [
    { id: 'all', name: '全部', count: materials.length },
    { id: '理论学习', name: '理论学习', count: materials.filter(m => m.category === '理论学习').length },
    { id: '实战演练', name: '实战演练', count: materials.filter(m => m.category === '实战演练').length },
    { id: '实训数据', name: '实训数据', count: materials.filter(m => m.category === '实训数据').length },
    { id: '工具指南', name: '工具指南', count: materials.filter(m => m.category === '工具指南').length }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-8 h-8 text-blue-600" />;
      case 'video':
        return <Video className="w-8 h-8 text-red-600" />;
      case 'dataset':
        return <Archive className="w-8 h-8 text-green-600" />;
      default:
        return <FileText className="w-8 h-8 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'dataset':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMaterials = activeCategory === 'all' 
    ? materials 
    : materials.filter(m => m.category === activeCategory);

  const handleAddMaterial = () => {
    setSelectedMaterial(null);
    setShowModal(true);
  };

  const handleEditMaterial = (material: any) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 页面标题和操作 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">实训素材</h1>
            <p className="mt-1 text-sm text-gray-600">
              管理和分享数据平台实训相关的学习资料和数据集
            </p>
          </div>
          <button
            onClick={handleAddMaterial}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            上传素材
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总素材数</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{materials.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">文档资料</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {materials.filter(m => m.type === 'document').length}
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
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">视频教程</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {materials.filter(m => m.type === 'video').length}
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
                  <Archive className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">数据集</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {materials.filter(m => m.type === 'dataset').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* 分类过滤 */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeCategory === category.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </nav>
          </div>

          {/* 素材列表 */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(material.type)}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{material.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{material.author} · {material.uploadTime.split(' ')[0]}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(material.type)}`}>
                      {material.format}
                    </span>
                    <span className="text-xs text-gray-500">{material.size}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {material.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Download className="w-3 h-3 mr-1" />
                      {material.downloadCount} 次下载
                    </div>
                    <div className="flex space-x-2">
                      {material.type === 'video' && (
                        <button className="text-blue-600 hover:text-blue-800">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-green-600 hover:text-green-800">
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditMaterial(material)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 上传/编辑模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedMaterial ? '编辑素材' : '上传素材'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">标题</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedMaterial?.title || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">类型</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedMaterial?.type || ''}
                    >
                      <option value="">请选择类型</option>
                      <option value="document">文档</option>
                      <option value="video">视频</option>
                      <option value="dataset">数据集</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">分类</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedMaterial?.category || ''}
                    >
                      <option value="">请选择分类</option>
                      <option value="理论学习">理论学习</option>
                      <option value="实战演练">实战演练</option>
                      <option value="实训数据">实训数据</option>
                      <option value="工具指南">工具指南</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">描述</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      defaultValue={selectedMaterial?.description || ''}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">标签</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="用逗号分隔多个标签"
                      defaultValue={selectedMaterial?.tags?.join(', ') || ''}
                    />
                  </div>
                  {!selectedMaterial && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">文件上传</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>选择文件</span>
                              <input type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">或拖放文件到此处</p>
                          </div>
                          <p className="text-xs text-gray-500">支持 PDF、DOC、MP4、CSV 等格式</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedMaterial ? '更新' : '上传'}
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

export default TrainingMaterials;