# STEAM教育APP - 页面组件使用说明

## 概述

根据提供的HTML文件，我已经成功创建了四个对应的React Native页面组件，并在首页添加了跳转功能。

## 新增的页面组件

### 1. 数学页面 (`MathematicsScreen.tsx`)
- **特色功能**：
  - 数学主题横幅，包含数学公式展示
  - 数学领域分类（代数、几何、统计、微积分、概率、逻辑）
  - 热门数学课程列表
  - 每日数学挑战题
  - 数学游戏推荐

### 2. 技术页面 (`TechnologyScreen.tsx`)
- **特色功能**：
  - 热门技术课程展示
  - 技术分类（编程、机器人、电子、AR/VR、App开发）
  - 学习路径展示，包含进度条
  - 热门技术项目推荐

### 3. 工程页面 (`EngineeringScreen.tsx`)
- **特色功能**：
  - 工程设计挑战营推广
  - 工程类别（结构工程、电气工程、航空航天、机械工程）
  - 热门工程课程
  - 本周工程挑战，包含材料清单和难度级别
  - 学生工程项目展示

### 4. 艺术页面 (`ArtScreen.tsx`)
- **特色功能**：
  - 艺术主题横幅
  - 艺术形式分类（绘画、雕塑、数字艺术、音乐、表演）
  - 热门艺术课程
  - 艺术与科技融合项目
  - 推荐艺术导师
  - 本周创作挑战

## 首页跳转功能

在`HomeScreen.tsx`中，我修改了`handleCategoryPress`函数，添加了根据分类名称进行页面跳转的逻辑：

```typescript
const handleCategoryPress = (category: any) => {
  switch (category.name) {
    case '科学':
      navigation?.navigate('Science');
      break;
    case '技术':
      navigation?.navigate('Technology');
      break;
    case '工程':
      navigation?.navigate('Engineering');
      break;
    case '艺术':
      navigation?.navigate('Art');
      break;
    case '数学':
      navigation?.navigate('Mathematics');
      break;
  }
};
```

## 使用方式

### 1. 导入组件
```typescript
import MathematicsScreen from './src/screens/MathematicsScreen';
import TechnologyScreen from './src/screens/TechnologyScreen';
import EngineeringScreen from './src/screens/EngineeringScreen';
import ArtScreen from './src/screens/ArtScreen';
```

### 2. 配置导航（使用React Navigation）
```typescript
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Mathematics" component={MathematicsScreen} />
      <Stack.Screen name="Technology" component={TechnologyScreen} />
      <Stack.Screen name="Engineering" component={EngineeringScreen} />
      <Stack.Screen name="Art" component={ArtScreen} />
    </Stack.Navigator>
  );
}
```

## 设计特点

### 统一的设计风格
- 使用统一的主题配色方案
- 一致的组件样式和布局
- 响应式设计，适配不同屏幕尺寸

### 中文本地化
- 所有文本内容均为中文
- 符合中文用户的阅读习惯
- 教育内容贴近中国学生需求

### 交互体验
- 丰富的视觉元素和图标
- 清晰的信息层级
- 直观的操作反馈

### 教育内容丰富
- 每个领域都有详细的课程分类
- 包含实践项目和挑战
- 提供学习路径指导

## 主要功能亮点

1. **个性化学习路径**：技术页面提供详细的学习进度追踪
2. **实践项目导向**：工程页面强调动手实践和项目制作
3. **创意激发**：艺术页面注重创意思维和跨学科融合
4. **逻辑思维训练**：数学页面提供挑战题和游戏化学习

这些页面组件完美复现了HTML原型的功能，同时针对React Native平台进行了优化，提供了流畅的移动端用户体验。 