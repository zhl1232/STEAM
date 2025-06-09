# 用户模块 (Users Module)

这个模块负责管理 STEAM 平台的用户功能，包括用户注册、信息管理、角色控制等。

## 数据库表结构

用户表 (`users`) 包含以下字段：

- `id`: 主键，自增 ID
- `username`: 用户名，必须唯一，长度 3-50 字符
- `password_hash`: 加密后的密码，长度不超过 255 字符
- `email`: 电子邮箱，必须唯一，长度不超过 100 字符
- `phone_number`: 手机号，唯一，可选
- `avatar_url`: 用户头像的 URL 地址，可为空
- `nickname`: 用户昵称，长度不超过 50 字符
- `role`: 用户角色 (学生, 教师, 管理员)
- `bio`: 个人简介，可为空
- `created_at`: 账号创建时间
- `updated_at`: 信息最后更新时间
- `last_login_at`: 最后登录时间
- `is_active`: 账号是否激活

## 用户角色

系统支持三种用户角色：

- `student`: 学生
- `teacher`: 教师
- `admin`: 管理员

## API 端点

### 基础 CRUD 操作

- `POST /users` - 创建新用户
- `GET /users` - 获取所有用户列表
- `GET /users/:id` - 根据 ID 获取单个用户
- `PATCH /users/:id` - 更新用户信息
- `DELETE /users/:id` - 删除用户

### 查询端点

- `GET /users/username/:username` - 根据用户名查找用户
- `GET /users/email/:email` - 根据邮箱查找用户

### 特殊操作

- `PATCH /users/:id/last-login` - 更新用户最后登录时间
- `PATCH /users/:id/deactivate` - 软删除用户（设置为不活跃状态）

## 数据验证

### 创建用户时的验证规则

- **用户名**: 必填，3-50 字符，字符串类型
- **密码**: 必填，6-255 字符，字符串类型
- **邮箱**: 必填，有效邮箱格式，不超过 100 字符
- **手机号**: 可选，中国手机号格式，不超过 20 字符
- **头像 URL**: 可选，有效 URL 格式，不超过 255 字符
- **昵称**: 必填，不超过 50 字符，字符串类型
- **角色**: 可选，枚举值 (student/teacher/admin)
- **个人简介**: 可选，字符串类型 