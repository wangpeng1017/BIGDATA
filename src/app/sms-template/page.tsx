'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MessageSquare, Eye, Copy, Send, Filter, FileText, Calendar, User, Tag, Check, X, Code } from 'lucide-react';

interface SmsTemplate {
  id: string;
  name: string;
  code: string;
  content: string;
  type: 'verification' | 'notification' | 'marketing' | 'system';
  status: 'active' | 'inactive' | 'draft';
  category: string;
  variables: string[];
  usageCount: number;
  creator: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  tags: string[];
}

export default function SmsTemplatePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplate | null>(null);
  const [previewData, setPreviewData] = useState<{[key: string]: string}>({});

  // 模拟短信模版数据
  const [templates, setTemplates] = useState<SmsTemplate[]>([
    {
      id: '1',
      name: '登录验证码',
      code: 'LOGIN_VERIFICATION',
      content: '您的登录验证码是：{code}，有效期5分钟，请勿泄露给他人。',
      type: 'verification',
      status: 'active',
      category: '用户认证',
      variables: ['code'],
      usageCount: 15420,
      creator: '张三',
      createdAt: '2024-01-15 10:30:00',
      updatedAt: '2024-03-20 14:25:00',
      description: '用户登录时发送的验证码短信模版',
      tags: ['验证码', '登录', '安全']
    },
    {
      id: '2',
      name: '订单支付成功通知',
      code: 'ORDER_PAYMENT_SUCCESS',
      content: '亲爱的{customerName}，您的订单{orderNo}已支付成功，金额{amount}元，我们将尽快为您处理。',
      type: 'notification',
      status: 'active',
      category: '订单通知',
      variables: ['customerName', 'orderNo', 'amount'],
      usageCount: 8956,
      creator: '李四',
      createdAt: '2024-02-01 09:15:00',
      updatedAt: '2024-03-15 16:40:00',
      description: '用户支付成功后的通知短信',
      tags: ['订单', '支付', '通知']
    },
    {
      id: '3',
      name: '促销活动通知',
      code: 'PROMOTION_NOTIFICATION',
      content: '{customerName}，限时优惠！{productName}现在只要{discountPrice}元，立省{savings}元！点击链接：{link}',
      type: 'marketing',
      status: 'active',
      category: '营销推广',
      variables: ['customerName', 'productName', 'discountPrice', 'savings', 'link'],
      usageCount: 25630,
      creator: '王五',
      createdAt: '2024-01-20 11:45:00',
      updatedAt: '2024-03-25 10:20:00',
      description: '促销活动推广短信模版',
      tags: ['促销', '营销', '优惠']
    },
    {
      id: '4',
      name: '系统维护通知',
      code: 'SYSTEM_MAINTENANCE',
      content: '系统将于{maintenanceTime}进行维护，预计持续{duration}，期间服务可能中断，敬请谅解。',
      type: 'system',
      status: 'draft',
      category: '系统通知',
      variables: ['maintenanceTime', 'duration'],
      usageCount: 0,
      creator: '赵六',
      createdAt: '2024-03-22 15:30:00',
      updatedAt: '2024-03-22 15:30:00',
      description: '系统维护通知短信模版（草稿）',
      tags: ['系统', '维护', '通知']
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      draft: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      active: '启用',
      inactive: '停用',
      draft: '草稿'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      verification: 'bg-blue-100 text-blue-800',
      notification: 'bg-green-100 text-green-800',
      marketing: 'bg-purple-100 text-purple-800',
      system: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      verification: '验证码',
      notification: '通知',
      marketing: '营销',
      system: '系统'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handlePreview = (template: SmsTemplate) => {
    setSelectedTemplate(template);
    const initialData: {[key: string]: string} = {};
    template.variables.forEach(variable => {
      initialData[variable] = `[${variable}]`;
    });
    setPreviewData(initialData);
    setShowPreviewModal(true);
  };

  const renderPreviewContent = () => {
    if (!selectedTemplate) return '';
    let content = selectedTemplate.content;
    Object.keys(previewData).forEach(key => {
      content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), previewData[key] || `{${key}}`);
    });
    return content;
  };

  const handleCopy = (template: SmsTemplate) => {
    navigator.clipboard.writeText(template.content);
    // 这里可以添加提示
  };

  const handleTest = (template: SmsTemplate) => {
    // 这里实现测试发送逻辑
    console.log('Testing template:', template);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        {/* 头部 */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <MessageSquare className="mr-2 text-blue-600" />
                短信模版管理
              </h1>
              <p className="text-gray-600 mt-1">管理和编辑短信模版，支持变量配置和预览测试</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <FileText className="mr-2 w-4 h-4" />
                导入模版
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="mr-2 w-4 h-4" />
                新建模版
              </button>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
              <div className="text-sm text-gray-600">总模版数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{templates.filter(t => t.status === 'active').length}</div>
              <div className="text-sm text-gray-600">启用模版</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{templates.reduce((sum, t) => sum + t.usageCount, 0).toLocaleString()}</div>
              <div className="text-sm text-gray-600">总使用次数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{templates.filter(t => t.status === 'draft').length}</div>
              <div className="text-sm text-gray-600">草稿模版</div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索模版名称、编码或内容..."
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
                <option value="active">启用</option>
                <option value="inactive">停用</option>
                <option value="draft">草稿</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">全部类型</option>
                <option value="verification">验证码</option>
                <option value="notification">通知</option>
                <option value="marketing">营销</option>
                <option value="system">系统</option>
              </select>
            </div>
          </div>
        </div>

        {/* 模版列表 */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      {getTypeBadge(template.type)}
                      {getStatusBadge(template.status)}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      编码: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{template.code}</code>
                    </div>
                    <div className="text-sm text-gray-600">{template.description}</div>
                  </div>
                </div>

                {/* 模版内容预览 */}
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="text-sm text-gray-700 line-clamp-3">{template.content}</div>
                </div>

                {/* 变量列表 */}
                {template.variables.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">变量:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded flex items-center">
                          <Code className="w-3 h-3 mr-1" />
                          {variable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 统计信息 */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                  <div>
                    <div className="text-gray-600">使用次数</div>
                    <div className="font-semibold text-blue-600">{template.usageCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">创建者</div>
                    <div className="font-semibold text-gray-800">{template.creator}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">更新时间</div>
                    <div className="font-semibold text-gray-800">{template.updatedAt.split(' ')[0]}</div>
                  </div>
                </div>

                {/* 标签 */}
                {template.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handlePreview(template)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    预览
                  </button>
                  <button
                    onClick={() => handleCopy(template)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    复制
                  </button>
                  <button
                    onClick={() => handleTest(template)}
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    测试
                  </button>
                  <button className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 text-sm text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 预览模态框 */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">模版预览 - {selectedTemplate.name}</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* 变量输入 */}
                {selectedTemplate.variables.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">设置变量值：</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedTemplate.variables.map((variable) => (
                        <div key={variable}>
                          <label className="block text-xs text-gray-600 mb-1">{variable}</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={previewData[variable] || ''}
                            onChange={(e) => setPreviewData(prev => ({...prev, [variable]: e.target.value}))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 预览内容 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">预览效果：</h4>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <div className="text-sm text-gray-800 whitespace-pre-wrap">{renderPreviewContent()}</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  字符数: {renderPreviewContent().length} / 70 (单条短信)
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  关闭
                </button>
                <button
                  onClick={() => handleTest(selectedTemplate)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  发送测试
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
