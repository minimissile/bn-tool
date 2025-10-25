import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page-card max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-3">币安工具集首页</h1>
      <p className="text-gray-600 mb-6">选择下方工具开始使用：</p>
      <div className="tools-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="tool-card rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="tool-icon text-3xl">🏆</div>
          <div className="tool-title text-lg font-semibold">奖励计算器</div>
          <div className="tool-description text-gray-500 mb-4">根据交易量计算奖励份额</div>
          <Link className="tool-link inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md" to="/tools/reward-calculator">打开</Link>
        </div>
        <div className="tool-card rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="tool-icon text-3xl">💱</div>
          <div className="tool-title text-lg font-semibold">价格查询</div>
          <div className="tool-description text-gray-500 mb-4">查询代币价格（支持参数传递）</div>
          <Link className="tool-link inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md" to="/tools/price-query">打开</Link>
        </div>
      </div>
    </div>
  )
}