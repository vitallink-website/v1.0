import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ isSignedIn, isUserSelected, children }) {
  if (!isSignedIn) {
    return <Navigate to="/DeviceConnection" replace />
  }
  if (!isUserSelected) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected