import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import UserTypeSelection from './UserTypeSelection'
import InternalSignUp from './InternalSignUp'
import ExternalSignUp from './ExternalSignUp'

export default function SignUpFlow() {
  const [type, setType] = useState('')
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center p-6">
      {type === '' && (
        <UserTypeSelection onContinue={(selected) => setType(selected)} />
      )}

      {type === 'internal' && (
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm text-[#2A6495] font-semibold"
          >
            ← Back
          </button>
          <InternalSignUp />
        </div>
      )}

      {type === 'external' && (
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm text-[#2A6495] font-semibold"
          >
            ← Back
          </button>
          <ExternalSignUp />
        </div>
      )}
    </div>
  )
}
