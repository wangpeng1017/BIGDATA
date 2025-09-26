import { MenuItem } from '@/types/menu';

export const menuConfig: MenuItem[] = [
  {
    id: 'basic-management',
    title: '基础登录和首页管理',
    icon: 'Home',
    children: [
      {
        id: 'login',
        title: '登录管理',
        path: '/login',
        icon: 'LogIn'
      },
      {
        id: 'dashboard',
        title: '首页管理',
        path: '/dashboard',
        icon: 'BarChart3'
      },
      {
        id: 'database',
        title: '数据库管理',
        path: '/database',
        icon: 'Database'
      }
    ]
  },
  {
    id: 'data-integration',
    title: '实训数据集成与管理模块',
    icon: 'FolderOpen',
    children: [
      {
        id: 'file-management',
        title: '文件管理',
        path: '/file-management',
        icon: 'FolderTree'
      },
      {
        id: 'data-access',
        title: '数据接入',
        path: '/data-access',
        icon: 'Download'
      },
      {
        id: 'source-data',
        title: '贴源数据',
        path: '/source-data',
        icon: 'FileText'
      }
    ]
  },
  {
    id: 'data-analysis',
    title: '实训数据分析与治理模块',
    icon: 'TrendingUp',
    children: [
      {
        id: 'data-push',
        title: '数据推送',
        path: '/data-push',
        icon: 'Send'
      },
      {
        id: 'data-model',
        title: '数据模型',
        path: '/data-model',
        icon: 'Box'
      },
      {
        id: 'data-cleansing',
        title: '数据清洗',
        path: '/data-cleansing',
        icon: 'Filter'
      },
      {
        id: 'quality-config',
        title: '质量和规则配置',
        path: '/quality-config',
        icon: 'Settings'
      },
      {
        id: 'visualization',
        title: '可视化展示',
        path: '/visualization',
        icon: 'PieChart'
      },
      {
        id: 'training-materials',
        title: '实训素材',
        path: '/training-materials',
        icon: 'BookOpen'
      },
      {
        id: 'api-catalog',
        title: 'API目录管理',
        path: '/api-catalog',
        icon: 'Globe'
      }
    ]
  },
  {
    id: 'data-service',
    title: '实训数据服务',
    icon: 'Server',
    children: [
      {
        id: 'api-permission',
        title: 'API权限管理',
        path: '/api-permission',
        icon: 'Shield'
      },
      {
        id: 'api-logs',
        title: 'API日志管理',
        path: '/api-logs',
        icon: 'FileText'
      }
    ]
  },
  {
    id: 'asset-management',
    title: '实训数据资产管理',
    icon: 'Package',
    children: [
      {
        id: 'asset-catalog',
        title: '资产目录',
        path: '/asset-catalog',
        icon: 'Folder'
      },
      {
        id: 'asset-list',
        title: '资产列表',
        path: '/asset-list',
        icon: 'List'
      }
    ]
  },
  {
    id: 'app-management',
    title: '实训应用管理',
    icon: 'Smartphone',
    children: [
      {
        id: 'sms-template',
        title: '消息管理短信模版',
        path: '/sms-template',
        icon: 'MessageCircle'
      },
      {
        id: 'sms-logs',
        title: '消息管理短信日志',
        path: '/sms-logs',
        icon: 'MessageSquare'
      }
    ]
  },
  {
    id: 'log-management',
    title: '实训日志管理',
    icon: 'FileText',
    children: [
      {
        id: 'app-system',
        title: '应用系统',
        path: '/app-system',
        icon: 'Monitor'
      },
      {
        id: 'login-logs',
        title: '登录日志',
        path: '/login-logs',
        icon: 'LogIn'
      },
      {
        id: 'error-logs',
        title: '异常日志',
        path: '/error-logs',
        icon: 'AlertTriangle'
      }
    ]
  },
  {
    id: 'system-management',
    title: '系统管理',
    icon: 'Settings',
    children: [
      {
        id: 'user-management',
        title: '用户管理',
        path: '/user-management',
        icon: 'Users'
      },
      {
        id: 'data-dictionary',
        title: '数据字典',
        path: '/data-dictionary',
        icon: 'BookOpen'
      },
      {
        id: 'organization',
        title: '机构管理',
        path: '/organization',
        icon: 'Building'
      },
      {
        id: 'position',
        title: '岗位管理',
        path: '/position',
        icon: 'UserCheck'
      },
      {
        id: 'attachment',
        title: '附件管理',
        path: '/attachment',
        icon: 'Paperclip'
      },
      {
        id: 'role-management',
        title: '角色管理',
        path: '/role-management',
        icon: 'UserCog'
      }
    ]
  }
];