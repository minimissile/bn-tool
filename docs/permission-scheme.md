# 路由权限控制方案

本文档说明权限上下文、路由守卫逻辑与使用方式，并给出扩展建议。

## 权限上下文（AuthProvider）
- 文件：`src/auth/AuthProvider.jsx`
- 暴露：
  - `isAuthenticated: boolean` 当前是否已登录
  - `roles: string[]` 当前用户角色集合（示例：`['user']`、`['admin']`）
  - `login(roles: string[])` 登录并设置角色；状态持久化到 `localStorage`
  - `logout()` 退出登录并清空状态
  - `hasRole(required: string[] | string)` 判断当前角色是否满足要求
- 持久化：使用 `localStorage` 存储登录态与角色，浏览器刷新后仍然保留（演示用）

## 路由守卫（RouteGuard）
- 文件：`src/routes/RouteGuard.jsx`
- 入口参数：`meta`（由 `src/routes/index.jsx` 传入）
  - `title: string` 设置 `document.title`
  - `requiresAuth?: boolean` 是否必须登录
  - `roles?: string[]` 访问所需角色集合（与 `hasRole` 配合）
- 跳转策略：
  - 未登录且需要认证：重定向至 `Paths.Login`（`/auth/login`），并透传 `from` 路径以便登录后回跳
  - 已登录但角色不满足：重定向至 `Paths.Unauthorized`（`/auth/unauthorized`）

## 使用示例
- 奖励计算器（受保护，允许 `user` 与 `admin`）：
  - meta：`{ title: '奖励计算器', requiresAuth: true, roles: ['user','admin'] }`
- 价格查询（公开页，无角色要求）：
  - meta：`{ title: '价格查询' }`

## 扩展与最佳实践
- 角色模型：
  - 示例：`viewer`、`user`、`admin`；将高权限角色隐式包含低权限能力（如 `admin` ⊇ `user` ⊇ `viewer`）
- 细粒度权限：
  - 将资源级能力（如 `canViewPrice`, `canManageUsers`）抽象为 `permissions`，并在守卫中同时校验 `roles` 与 `permissions`
- 安全建议：
  - 演示项目使用 `localStorage`；生产推荐使用后端颁发令牌（JWT/OAuth）、服务端会话或零信任鉴权
  - 路由级鉴权仅是前端第一道防线，务必在 API 层做后端鉴权与审计

## 开发约定
- 路由均通过 `withGuard(Page, meta)` 包裹，保证统一的 `title` 设置与权限控制
- 所有重定向路径统一通过 `Paths` 常量维护，避免硬编码与路径漂移