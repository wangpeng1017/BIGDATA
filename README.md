# 大数据分析平台

基于 Next.js 14 开发的现代化数据管理平台，提供完整的数据集成、分析、治理和可视化功能。

## 功能特性

### 🔐 基础功能
- **用户认证**: 支持账号密码和短信验证码登录
- **权限管理**: 基于角色的访问控制系统
- **多级导航**: 左侧折叠式导航菜单

### 📊 数据管理
- **数据库管理**: 支持多种数据库类型连接和SQL查询
- **文件管理**: 类资源管理器的文件上传下载功能
- **数据接入**: 多源数据同步和ETL管道
- **数据质量**: 数据清洗和质量监控

### 📈 数据分析
- **可视化图表**: 柱状图、折线图、饼图、面积图等
- **仪表盘**: 可定制的数据大屏
- **实时监控**: 系统状态和性能监控
- **报表导出**: 多格式数据导出

### 🛠️ 系统管理
- **用户管理**: 完整的用户生命周期管理
- **组织架构**: 部门和岗位管理
- **数据字典**: 系统参数配置
- **日志审计**: 操作日志和异常追踪

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 框架**: Tailwind CSS
- **图表库**: Recharts
- **图标库**: Lucide React
- **开发语言**: TypeScript
- **部署平台**: Vercel

## 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

默认会重定向到登录页面，直接点击“登录”按钮即可进入平台（无需输入任何内容）。

### 构建和部署

```bash
# 本地构建
npm run build

# 启动生产版本
npm start
```

## 项目结构

```
chongqing-data-platform/
├── src/
│   ├── app/                    # App Router 页面
│   │   ├── dashboard/          # 首页仪表盘
│   │   ├── login/              # 登录页面
│   │   ├── database/           # 数据库管理
│   │   ├── file-management/    # 文件管理
│   │   ├── visualization/      # 数据可视化
│   │   ├── user-management/    # 用户管理
│   │   └── layout.tsx          # 根布局
│   ├── components/             # 可重用组件
│   │   ├── Layout.tsx          # 主布局组件
│   │   └── Sidebar.tsx         # 侧边栏导航
│   ├── config/                 # 配置文件
│   │   └── menu.ts             # 菜单配置
│   ├── types/                  # TypeScript 类型定义
│   │   └── menu.ts             # 菜单类型
│   └── lib/                    # 工具函数
│       └── utils.ts            # 通用工具函数
├── public/                     # 静态资源
├── .env.example               # 环境变量示例
├── vercel.json                # Vercel 部署配置
└── README.md                  # 项目文档
```

## 部署到 Vercel

### 方式一：通过 Git 集成

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 上导入项目
3. Vercel 会自动检测 Next.js 项目并进行配置
4. 设置环境变量后点击部署

### 方式二：通过 Vercel CLI

1. 安装 Vercel CLI：`npm i -g vercel`
2. 登录 Vercel：`vercel login`
3. 部署项目：`vercel`

## 主要页面说明

- **登录页面** (`/login`): 用户认证，支持多种登录方式
- **首页仪表盘** (`/dashboard`): 系统概览和核心指标
- **数据库管理** (`/database`): 数据源管理和SQL查询
- **文件管理** (`/file-management`): 文件上传下载和管理
- **数据可视化** (`/visualization`): 图表创建和仪表盘
- **用户管理** (`/user-management`): 用户和权限管理

## 许可证

本项目采用 MIT 许可证。
