import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}