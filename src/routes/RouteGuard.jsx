import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { Paths } from './routerConfig'

export default function RouteGuard({ meta = {}, children }) {
  const { isAuthenticated, hasRole } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (meta?.title) {
      document.title = meta.title
    }
  }, [meta?.title])

  if (meta?.requiresAuth && !isAuthenticated) {
    return <Navigate to={Paths.Login} replace state={{ from: location }} />
  }

  if (meta?.roles && meta.roles.length > 0 && !hasRole(meta.roles)) {
    return <Navigate to={Paths.Unauthorized} replace />
  }

  return children
}