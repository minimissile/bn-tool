import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active bg-yellow-100 text-yellow-700' : 'text-gray-700 hover:text-black'} px-3 py-2 rounded-md transition-colors`
  return (
    <nav className="navbar bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="nav-container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="nav-logo text-xl font-bold text-yellow-500">BN-Tool</div>
        <div className="nav-links flex items-center gap-3">
          <NavLink to="/" className={linkClass}>首页</NavLink>
          <NavLink to="/tools/reward-calculator" className={linkClass}>奖励计算器</NavLink>
          <NavLink to="/tools/price-query" className={linkClass}>价格查询</NavLink>
        </div>
      </div>
    </nav>
  )
}