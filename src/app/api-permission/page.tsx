'use client';

import React from 'react';
import Layout from '@/components/Layout';

const ApiPermission = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900">API权限管理</h1>
        <p className="mt-1 text-sm text-gray-600">管理API访问权限和用户授权</p>
      </div>
    </Layout>
  );
};

export default ApiPermission;
