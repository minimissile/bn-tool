import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-card max-w-md mx-auto p-6 text-center space-y-3">
      <h1 className="text-2xl font-bold">404 未找到页面</h1>
      <p className="text-gray-600">您访问的路径不存在。</p>
      <Link className="tool-link inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md" to="/">返回首页</Link>
    </div>
  )
}