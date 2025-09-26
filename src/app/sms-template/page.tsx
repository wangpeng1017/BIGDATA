'use client';

import React from 'react';
import Layout from '@/components/Layout';

const SmsTemplate = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900">短信模版管理</h1>
        <p className="mt-1 text-sm text-gray-600">管理短信模板配置</p>
      </div>
    </Layout>
  );
};

export default SmsTemplate;
