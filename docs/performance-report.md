# 路由与加载性能优化报告

本文档说明当前已实施的性能优化措施，并提出进一步优化建议。

## 已实施的优化
- 路由级代码分割：
  - 所有页面通过 `React.lazy` 懒加载，按需加载对应 chunk（`Home`、`RewardCalculator`、`PriceQuery`、`Login`、`Unauthorized`、`NotFound`）
  - 减少首屏体积，加快首次可交互时间（TTI）
- 统一布局与导航：
  - `MainLayout` 承载 `Navbar` 与 `Outlet`，避免重复渲染与布局抖动
- 守卫轻量化：
  - `RouteGuard` 仅在进入路由时执行标题设置与鉴权判断，避免昂贵副作用

## 进一步建议
- 预取与预加载：
  - 在导航链接 `onMouseEnter` 事件中调用 `import('../pages/RewardCalculator')`、`import('../pages/PriceQuery')` 进行“悬停预取”，加速实际点击后的渲染
  - 对高频路由配置 `<link rel="prefetch">` 或使用框架内置预取策略
- 资源分包策略（Vite）：
  - 在 `vite.config.js` 中通过 `build.rollupOptions.output.manualChunks` 对第三方库做更细分的拆分（如将 `react-router-dom` 单独分包）
  - 示例：
    ```js
    // vite.config.js
    export default {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'router': ['react-router-dom'],
              'auth': ['zustand'],
            }
          }
        }
      }
    }
    ```
- Suspense 占位优化：
  - 当前占位为“页面加载中...”；可改为骨架屏或渐进式加载提示，避免白屏感知
- 路由级缓存（可选）：
  - 对数据密集型页面（如价格查询）使用 SWR/React Query 做请求缓存与失效控制，减少重复请求
- 监控与度量：
  - 集成 `web-vitals` 上报 FCP、LCP、CLS 与 TTI；结合路由切换事件做用户体验度量

## 风险与注意事项
- 过度分包可能造成请求放大与调度开销；需结合实际包体积、路由使用热度权衡
- 预取需谨慎，避免在弱网或移动端导致无谓流量消耗；可基于网络状况动态启用