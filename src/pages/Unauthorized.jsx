import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="page-card max-w-md mx-auto p-6 text-center space-y-3">
      <h1 className="text-2xl font-bold text-red-600">权限不足</h1>
      <p className="text-gray-600">您没有访问此页面的权限。</p>
      <Link className="tool-link inline-block bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md" to="/">返回首页</Link>
    </div>
  )
}