import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute({ children }) {
  const raw = localStorage.getItem('user')
  if (!raw) return <Navigate to="/" replace />
  return children
}