import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import UserTypeSelection from './UserTypeSelection'
import InternalSignUp from './InternalSignUp'
import ExternalSignUp from './ExternalSignUp'

export default function SignUpFlow() {
  const [type, setType] = useState('')
  const navigate = useNavigate()

  return (
    <div className=""/*flex items-center justify-center p-6*/>
      {type === '' && (
        <UserTypeSelection onContinue={(selected) => setType(selected)}
        onBack={() => navigate('/')} />
      )}

      {type === 'internal' && (
        <InternalSignUp onBack={() => setType('')} />
      )}

      {type === 'external' && (
        <ExternalSignUp onBack={() => setType('')} />
      )}
    </div>
  )
}
