'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { menuConfig } from '@/config/menu';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // 寻找包含当前路径的父级菜单
  const findParentMenuItem = (items: MenuItem[], targetPath: string): string | null => {
    for (const item of items) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === targetPath) {
            return item.id;
          }
          if (child.children) {
            const found = findParentMenuItem([child], targetPath);
            if (found) return item.id;
          }
        }
      }
    }
    return null;
  };

  // 当路径改变时，自动展开包含当前页面的父菜单
  useEffect(() => {
    const parentId = findParentMenuItem(menuConfig, pathname);
    if (parentId && !expandedItems.includes(parentId)) {
      setExpandedItems(prev => [...prev, parentId]);
    }
  }, [pathname]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = pathname === item.path;
    
    // 检查是否有子菜单被选中
    const hasActiveChild = hasChildren && item.children!.some(child => 
      child.path === pathname || 
      (child.children && child.children.some(grandChild => grandChild.path === pathname))
    );

    return (
      <div key={item.id} className="mb-1">
        {item.path ? (
          <Link
            href={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              "hover:bg-gray-100 hover:text-gray-900",
              isActive
                ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-600",
              level > 0 && "ml-6 pl-2" // 子菜单缩进更多
            )}
          >
            {item.icon && getIcon(item.icon)}
            <span className="ml-2">{item.title}</span>
          </Link>
        ) : (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
              "hover:bg-gray-100 hover:text-gray-900",
              hasActiveChild 
                ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600" // 有子菜单被选中时的样式
                : "text-gray-700",
              level > 0 && "ml-4"
            )}
          >
            <div className="flex items-center">
              {item.icon && getIcon(item.icon)}
              <span className="ml-2">{item.title}</span>
            </div>
            {hasChildren && (
              isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">大数据分析平台</h2>
      </div>
      
      <nav className="p-4">
        <div className="space-y-2">
          {menuConfig.map(item => renderMenuItem(item))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;