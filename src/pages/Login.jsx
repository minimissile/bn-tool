import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLoginUser = () => {
    login(['user'])
    navigate(from, { replace: true })
  }

  const handleLoginAdmin = () => {
    login(['admin'])
    navigate(from, { replace: true })
  }

  return (
    <div className="page-card max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">登录</h1>
      <p className="text-gray-600">选择角色登录以访问受保护页面。</p>
      <div className="button-group flex gap-3">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md" onClick={handleLoginUser}>以用户身份登录</button>
        <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md" onClick={handleLoginAdmin}>以管理员身份登录</button>
      </div>
    </div>
  )
}