import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const raw = localStorage.getItem('user')
  if (!raw) return <Navigate to="/" replace />
  const user = JSON.parse(raw)

  const accountType = (user.accountType || '').toString().toLowerCase()
  const role = (user.role || '').toString().toLowerCase()
  const allowed = allowedRoles.map(r => r.toString().toLowerCase())
  if (allowed.length && !allowed.includes(accountType)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Access denied</h1>
          <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 rounded">Go back</button>
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Login</a>
          </div>
        </div>
      </div>
    )
  }
  else if (role !== 'admin' && allowedRoles.includes('admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Access denied</h1>
          <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 rounded">Go back</button>
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Login</a>
          </div>
        </div>
      </div>
    )
  } 
  return children
}