# 用户注册功能使用指南

## 概述

这个注册功能模块为 STEAM 学习平台提供了完整的用户注册体验，包括表单验证、用户体验优化和 API 集成。

## 组件结构

### 1. RegisterForm 组件
位置：`apps/mobile/src/components/RegisterForm.tsx`

**功能特性：**
- 完整的表单字段（用户名、密码、邮箱等）
- 实时表单验证
- 用户友好的错误提示
- 现代化的 UI 设计
- 支持密码显示/隐藏切换
- 角色选择（学生/教师）

### 2. RegisterScreen 组件
位置：`apps/mobile/src/screens/RegisterScreen.tsx`

**功能特性：**
- 安全区域处理
- 导航集成
- 注册成功后的逻辑处理

## 表单验证规则

根据后端 API 文档，实现了以下验证规则：

- **用户名**: 必填，3-50 字符，仅支持字母、数字和下划线
- **密码**: 必填，6-255 字符
- **确认密码**: 必填，必须与密码一致
- **邮箱**: 必填，有效邮箱格式，不超过 100 字符
- **手机号**: 可选，中国手机号格式
- **头像 URL**: 可选，有效 URL 格式，不超过 255 字符
- **昵称**: 必填，不超过 50 字符
- **用户角色**: 可选，默认为学生
- **个人简介**: 可选

## 如何在导航中使用

### 1. 在导航配置中添加注册屏幕

```typescript
// 在你的导航配置文件中
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          title: '注册',
          headerShown: false // 如果想隐藏默认导航头
        }}
      />
      {/* 其他认证相关屏幕 */}
    </AuthStack.Navigator>
  );
}
```

### 2. 从其他屏幕导航到注册页面

```typescript
// 在任何需要跳转到注册页面的地方
navigation.navigate('Register');
```

## API 集成

注册功能使用以下 API 端点：

- `POST /users` - 创建新用户
- `GET /users/username/:username` - 检查用户名可用性（待实现）
- `GET /users/email/:email` - 检查邮箱可用性（待实现）

## 扩展功能建议

### 1. 实时用户名/邮箱检查

可以在用户输入时实时检查用户名和邮箱是否已被占用：

```typescript
// 在 RegisterForm 组件中添加
const checkUsernameDebounced = useCallback(
  debounce(async (username: string) => {
    if (username.length >= 3) {
      try {
        const response = await checkUsernameAvailability(username);
        // 处理检查结果
      } catch (error) {
        console.error('检查用户名失败:', error);
      }
    }
  }, 500),
  []
);
```

### 2. 社交媒体注册

可以添加第三方登录选项，如微信、QQ 等。

### 3. 邮箱验证

注册成功后发送验证邮件，要求用户验证邮箱地址。

### 4. 隐私政策和用户协议

添加隐私政策和用户协议的确认选项。

## 样式自定义

所有样式都在组件内部定义，可以根据项目的设计系统进行调整：

- 修改 `styles` 对象中的颜色、字体、间距等
- 使用主题系统统一管理样式
- 支持深色模式

## 错误处理

- 网络错误：显示友好的错误提示
- 验证错误：实时显示字段级别的错误信息
- API 错误：根据后端返回的错误信息显示相应提示 