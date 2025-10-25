# 路由结构设计文档

本文档说明项目的路由层级、动态与嵌套路由、统一命名规范以及 meta 使用方式。

## 总体概览
- 入口：`src/main.jsx` 使用 `RouterProvider` 与 `AuthProvider` 包裹应用
- 路由配置文件：`src/routes/index.jsx`
- 路由命名与路径常量：`src/routes/routerConfig.js`
- 路由守卫：`src/routes/RouteGuard.jsx`
- 主布局：`src/layouts/MainLayout.jsx`（承载导航与嵌套路由 `Outlet`）

## 路由层级
- 根路径 `Paths.Home` -> `/`
  - `RouteNames.Home`，meta：`{ title: '首页', name: 'Home' }`
  - 页面：`src/pages/home.jsx`（懒加载）
- 二级路径 `Paths.Tools` -> `/tools`
  - meta：`{ title: '工具', name: 'Tools' }`
  - 子路由：
    - `/tools/reward-calculator`
      - `RouteNames.RewardCalculator`
      - meta：`{ title: '奖励计算器', requiresAuth: true, roles: ['user','admin'] }`
      - 页面：`src/pages/RewardCalculator.jsx`（懒加载）
    - `/tools/price-query/:address?`
      - `RouteNames.PriceQuery`
      - meta：`{ title: '价格查询' }`
      - 页面：`src/pages/PriceQuery.jsx`（懒加载），支持可选参数 `address`
- 认证相关
  - `Paths.Login` -> `/auth/login`
    - `RouteNames.Login`，meta：`{ title: '登录' }`
    - 页面：`src/pages/Login.jsx`
  - `Paths.Unauthorized` -> `/auth/unauthorized`
    - `RouteNames.Unauthorized`，meta：`{ title: '权限不足' }`
    - 页面：`src/pages/Unauthorized.jsx`
- 兜底 404
  - `Paths.NotFound` -> `*`
    - `RouteNames.NotFound`，meta：`{ title: '未找到' }`
    - 页面：`src/pages/NotFound.jsx`

## 动态与嵌套路由
- 嵌套：`/tools` 作为父级，具体工具以子路由形式组织，结构清晰、可扩展
- 动态：`/tools/price-query/:address?` 支持可选 `address` 参数，示例：
  - 无参数：`/tools/price-query`
  - 有参数：`/tools/price-query/0x1234...abcd`

## meta 使用
- 在 `src/routes/index.jsx` 通过 `withGuard` 包裹页面组件并传入 `meta`：
  - `title`：用于在 `RouteGuard` 中设置 `document.title`
  - `requiresAuth`：是否需要登录访问
  - `roles`：访问所需角色（与 `AuthProvider` 的 `hasRole` 配合）

## 命名规范
- 路由命名：统一使用 `PascalCase`，集中在 `RouteNames`
- 路径常量：集中在 `Paths`，统一在路由配置中使用常量而非硬编码字符串
- 文件命名：页面文件以小写并使用短横线或无空格（示例：`home.jsx`、`PriceQuery.jsx`），组件函数名使用 `PascalCase`
- 组件导入路径：与实际文件名保持一致，避免大小写不一致导致的编译错误（在 macOS 上尤其需要注意）

## 扩展建议
- 新增工具页：在 `/tools` 子路由下继续追加；按需设置 `requiresAuth` 与 `roles`
- 统一导航：在 `src/components/navbar.jsx` 中追加 `NavLink`