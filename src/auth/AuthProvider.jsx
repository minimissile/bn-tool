import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_state')
      if (raw) {
        const parsed = JSON.parse(raw)
        setIsAuthenticated(!!parsed.isAuthenticated)
        setRoles(Array.isArray(parsed.roles) ? parsed.roles : [])
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('auth_state', JSON.stringify({ isAuthenticated, roles }))
    } catch {}
  }, [isAuthenticated, roles])

  const login = (userRoles = ['user']) => {
    setIsAuthenticated(true)
    setRoles(userRoles)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setRoles([])
  }

  const hasRole = (requiredRoles = []) => {
    if (!requiredRoles || requiredRoles.length === 0) return true
    return requiredRoles.some(r => roles.includes(r))
  }

  const value = useMemo(() => ({
    isAuthenticated,
    roles,
    login,
    logout,
    hasRole,
  }), [isAuthenticated, roles])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}