# STEAM教育应用 - React Native版本

这是一个基于React Native和Expo的STEAM教育应用，支持iOS和Android平台。

## 功能特性

- 🏠 **探索页面** - 轮播图、STEAM分类、推荐课程和热门活动
- 📚 **课程管理** - 浏览和学习各种STEAM课程
- 🎯 **活动参与** - 参加各种教育活动和比赛
- 👥 **社区互动** - 与其他学习者交流分享
- 👤 **个人中心** - 管理个人信息和学习进度

## 技术栈

- **React Native** - 跨平台移动应用框架
- **Expo** - 快速开发和部署工具
- **TypeScript** - 类型安全的JavaScript
- **React Navigation** - 导航管理
- **Expo Vector Icons** - 图标库
- **Expo Linear Gradient** - 渐变效果
- **React Native Safe Area Context** - 安全区域管理

## 安装和运行

### 前置要求

1. 安装 [Node.js](https://nodejs.org/) (版本 >= 16)
2. 安装 Expo CLI:
   ```bash
   npm install -g @expo/cli
   ```

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd steam-education-app

# 安装依赖
npm install
```

### 运行开发服务器

```bash
# 启动开发服务器
npm start

# 或者使用 Expo CLI
expo start
```

### 在设备上运行

1. **iOS模拟器**:
   ```bash
   npm run ios
   ```

2. **Android模拟器**:
   ```bash
   npm run android
   ```

3. **物理设备**:
   - 安装 Expo Go 应用
   - 扫描终端中显示的二维码

## 项目结构

```
src/
├── components/         # 可复用组件
│   ├── StatusBar.tsx  # 自定义状态栏
│   └── CourseCard.tsx # 课程卡片组件
├── screens/           # 屏幕组件
│   ├── HomeScreen.tsx
│   ├── CourseScreen.tsx
│   ├── ActivityScreen.tsx
│   ├── CommunityScreen.tsx
│   └── ProfileScreen.tsx
├── types/             # TypeScript类型定义
│   └── index.ts
└── utils/             # 工具函数
    └── theme.ts       # 主题配置
```

## 开发规范

- 使用函数式组件和Hooks
- 遵循TypeScript严格模式
- 使用Prettier格式化代码
- 组件采用Pascal命名
- 文件夹使用kebab-case命名

## 部署

### 构建生产版本

```bash
# 构建iOS
expo build:ios

# 构建Android
expo build:android
```

### 发布更新

```bash
expo publish
```

## 开发计划

- [ ] 完善首页功能
- [ ] 实现课程详情页
- [ ] 添加用户认证
- [ ] 集成支付系统
- [ ] 添加推送通知
- [ ] 实现离线缓存
- [ ] 添加深色模式支持

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。 