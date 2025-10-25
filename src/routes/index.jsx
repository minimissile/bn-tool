import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { RouteNames, Paths } from './routerConfig'
import RouteGuard from './RouteGuard'

// 懒加载页面组件
const Home = lazy(() => import('../pages/home'))
const RewardCalculator = lazy(() => import('../pages/RewardCalculator'))
const PriceQuery = lazy(() => import('../pages/PriceQuery'))
const Login = lazy(() => import('../pages/Login'))
const Unauthorized = lazy(() => import('../pages/Unauthorized'))
const NotFound = lazy(() => import('../pages/NotFound'))

const withGuard = (element, meta) => (
  <Suspense fallback={<div>页面加载中...</div>}>
    <RouteGuard meta={meta}>
      {element}
    </RouteGuard>
  </Suspense>
)

// 父级 /tools 需要包含 Outlet 以渲染子路由
const ToolsLayout = () => (
  <Outlet />
)

export const router = createBrowserRouter([
  {
    path: Paths.Home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withGuard(<Home />, { title: '首页', name: RouteNames.Home }),
      },
      {
        path: Paths.Tools,
        element: withGuard(<ToolsLayout />, { title: '工具', name: RouteNames.Tools }),
        children: [
          {
            index: true,
            element: withGuard(<div className="page-card">选择具体工具</div>, { title: '工具', name: RouteNames.Tools }),
          },
          {
            path: 'reward-calculator',
            element: withGuard(<RewardCalculator />, { title: '奖励计算器', name: RouteNames.RewardCalculator, requiresAuth: true, roles: ['user', 'admin'] }),
          },
          {
            path: 'price-query/:address?',
            element: withGuard(<PriceQuery />, { title: '价格查询', name: RouteNames.PriceQuery }),
          }
        ]
      },
    ]
  },
  {
    path: Paths.Login,
    element: withGuard(<Login />, { title: '登录', name: RouteNames.Login }),
  },
  {
    path: Paths.Unauthorized,
    element: withGuard(<Unauthorized />, { title: '权限不足', name: RouteNames.Unauthorized }),
  },
  {
    path: Paths.NotFound,
    element: withGuard(<NotFound />, { title: '未找到', name: RouteNames.NotFound }),
  }
])