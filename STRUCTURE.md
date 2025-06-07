# STEAM 项目结构优化总结

## 📁 项目目录结构

```
STEAM/
├── 📁 apps/                     # 应用程序目录
│   ├── 📁 backend/             # NestJS 后端应用
│   │   ├── 📁 src/             # 源代码
│   │   ├── 📄 package.json     # 后端依赖配置
│   │   ├── 📄 tsconfig.json    # 后端 TS 配置
│   │   └── 📄 nest-cli.json    # NestJS CLI 配置
│   └── 📁 mobile/              # React Native 移动端应用
│       ├── 📁 src/             # 源代码
│       ├── 📄 package.json     # 移动端依赖配置
│       ├── 📄 tsconfig.json    # 移动端 TS 配置
│       └── 📄 app.json         # Expo 配置
├── 📁 packages/                # 共享包目录
│   ├── 📁 shared/              # 共享工具和常量
│   │   ├── 📁 src/
│   │   │   ├── 📁 utils/       # 工具函数
│   │   │   ├── 📁 constants/   # 常量定义
│   │   │   └── 📄 index.ts     # 入口文件
│   │   ├── 📄 package.json
│   │   └── 📄 tsconfig.json
│   ├── 📁 types/               # TypeScript 类型定义
│   │   ├── 📁 src/
│   │   │   └── 📄 index.ts     # 类型定义
│   │   ├── 📄 package.json
│   │   └── 📄 tsconfig.json
│   └── 📁 utils/               # 工具函数库
│       ├── 📁 src/
│       │   └── 📄 index.ts     # 工具函数
│       ├── 📄 package.json
│       └── 📄 tsconfig.json
├── 📁 .vscode/                 # VSCode 配置
│   └── 📄 settings.json        # 编辑器设置
├── 📄 package.json             # 根 package.json (workspace 配置)
├── 📄 pnpm-workspace.yaml      # PNPM workspace 配置
├── 📄 tsconfig.json            # 根 TypeScript 配置
├── 📄 .gitignore               # Git 忽略文件
├── 📄 README.md                # 项目说明文档
└── 📄 STRUCTURE.md             # 本文档
```

## 🔧 配置优化

### 1. TypeScript 配置层次结构

* **根配置** (`tsconfig.json`): 定义基础配置和项目引用
* **包配置**: 每个包都有独立的 TypeScript 配置
* **应用配置**: 继承根配置并添加特定设置

### 2. 包管理优化

* 使用 **PNPM workspace** 管理 monorepo
* 共享包使用 `workspace:*` 依赖声明
* 统一的依赖管理和版本控制

### 3. 路径映射配置

```typescript
// 根配置中的路径映射
"paths": {
  "@steam/shared/*": ["packages/shared/src/*"],
  "@steam/types/*": ["packages/types/src/*"],
  "@steam/utils/*": ["packages/utils/src/*"]
}
```

## 📦 共享包说明

### @steam/shared

* **用途**: 共享工具函数和常量
* **内容**: 
  + 通用工具函数 (formatDate, generateId)
  + 项目常量 (API_CONFIG, APP_CONFIG, STORAGE_KEYS)

### @steam/types

* **用途**: TypeScript 类型定义
* **内容**:
  + 用户相关类型 (User, UserProfile, UserPreferences)
  + API 响应类型 (ApiResponse, PaginatedResponse)
  + 课程相关类型 (Course, Lesson)
  + 通用类型 (LoadingState, BaseEntity)

### @steam/utils

* **用途**: 高级工具函数
* **内容**:
  + 日期格式化函数
  + 邮箱验证函数
  + ID 生成函数
  + API 响应创建函数

## 🚀 可用脚本

### 全局脚本

```bash
pnpm build              # 构建所有包和应用
pnpm build:packages     # 仅构建共享包
pnpm build:apps         # 仅构建应用
pnpm dev                # 启动所有包的开发模式
pnpm type-check         # TypeScript 类型检查
pnpm clean              # 清理所有构建文件
```

### 移动端脚本

```bash
pnpm mobile:start       # 启动 Expo 开发服务器
pnpm mobile:android     # Android 设备运行
pnpm mobile:ios         # iOS 设备运行
pnpm mobile:web         # 浏览器运行
```

### 后端脚本

```bash
pnpm backend:dev        # 启动开发服务器
pnpm backend:build      # 构建后端应用
pnpm backend:start      # 启动生产服务器
pnpm backend:test       # 运行测试
```

## 🎯 优化亮点

### 1. 代码复用

* 前后端共享类型定义，确保数据结构一致性
* 通用工具函数避免重复开发
* 统一的常量管理

### 2. 开发体验

* 统一的 TypeScript 配置
* 路径映射支持，简化导入语句
* VSCode 配置优化，提升开发效率

### 3. 构建优化

* 增量构建支持
* 项目引用 (Project References) 提升构建速度
* 清晰的依赖关系管理

### 4. 维护性

* 清晰的目录结构
* 模块化的包设计
* 完善的文档说明

## 📋 使用建议

1. **新功能开发**: 优先考虑是否可以放在共享包中
2. **类型定义**: 所有接口和类型都应该在 `@steam/types` 中定义
3. **工具函数**: 通用函数放在 `@steam/utils`，简单常量放在 `@steam/shared`
4. **导入规范**: 使用路径映射，如 `import { User } from '@steam/types'`

## 🔄 后续扩展

可以考虑添加的包：
* `@steam/ui`: 共享 UI 组件库
* `@steam/api`: API 客户端封装
* `@steam/config`: 环境配置管理
* `@steam/testing`: 测试工具和 mock 数据 
