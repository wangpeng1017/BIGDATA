'use client';

import React from 'react';
import Layout from '@/components/Layout';

const AssetCatalog = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900">资产目录</h1>
        <p className="mt-1 text-sm text-gray-600">管理数据资产分类目录</p>
      </div>
    </Layout>
  );
};

export default AssetCatalog;
