# STEAM Learning Platform

一个基于 React Native 和 NestJS 的 STEAM 教育平台，采用 monorepo 架构。

## 项目结构

```
STEAM/
├── apps/                    # 应用程序
│   ├── mobile/             # React Native 移动端应用
│   └── backend/            # NestJS 后端 API
├── packages/               # 共享包
│   ├── shared/            # 共享工具和常量
│   ├── types/             # TypeScript 类型定义
│   └── utils/             # 工具函数库
├── tsconfig.json          # 根 TypeScript 配置
├── pnpm-workspace.yaml    # PNPM workspace 配置
└── package.json           # 根 package.json
```

## 技术栈

### 前端 (Mobile)
- **React Native** - 跨平台移动应用开发
- **Expo** - React Native 开发平台
- **TypeScript** - 类型安全的 JavaScript
- **React Navigation** - 导航库
- **React Native Paper** - UI 组件库
- **Styled Components** - CSS-in-JS 样式库

### 后端 (Backend)
- **NestJS** - Node.js 企业级框架
- **TypeScript** - 类型安全的 JavaScript
- **Express** - Web 应用框架

### 开发工具
- **PNPM** - 快速、节省磁盘空间的包管理器
- **TypeScript** - 静态类型检查
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

## 快速开始

### 环境要求

- Node.js >= 18
- PNPM >= 8
- React Native 开发环境 (Android Studio / Xcode)

### 安装依赖

```bash
# 安装所有依赖
pnpm install
```

### 开发模式

```bash
# 启动所有包的开发模式
pnpm dev

# 启动移动端应用
pnpm mobile:start

# 启动后端开发服务器
pnpm backend:dev
```

### 构建

```bash
# 构建所有包和应用
pnpm build

# 仅构建共享包
pnpm build:packages

# 仅构建应用
pnpm build:apps
```

## 可用脚本

### 全局脚本
- `pnpm build` - 构建所有包和应用
- `pnpm dev` - 启动所有包的开发模式
- `pnpm clean` - 清理所有构建文件和依赖
- `pnpm type-check` - TypeScript 类型检查
- `pnpm lint` - 代码质量检查
- `pnpm test` - 运行所有测试

### 移动端脚本
- `pnpm mobile:start` - 启动 Expo 开发服务器
- `pnpm mobile:android` - 在 Android 设备上运行
- `pnpm mobile:ios` - 在 iOS 设备上运行
- `pnpm mobile:web` - 在浏览器中运行

### 后端脚本
- `pnpm backend:dev` - 启动开发服务器
- `pnpm backend:start` - 启动生产服务器
- `pnpm backend:build` - 构建后端应用
- `pnpm backend:test` - 运行后端测试

## 包说明

### @steam/shared
共享的工具函数和常量，可在前端和后端之间复用。

### @steam/types
TypeScript 类型定义，确保前后端类型一致性。

### @steam/utils
通用工具函数库，包含 API 客户端、验证函数等。

## 开发指南

### 添加新的共享包

1. 在 `packages/` 目录下创建新文件夹
2. 添加 `package.json` 和 `tsconfig.json`
3. 更新根目录的 `tsconfig.json` 引用
4. 在需要的应用中添加依赖

### 代码规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 和 Prettier 配置
- 共享代码放在 `packages/` 目录
- 应用特定代码放在 `apps/` 目录

## 许可证

ISC