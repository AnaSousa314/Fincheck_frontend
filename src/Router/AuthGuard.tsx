import { Outlet, Navigate } from 'react-router-dom'

interface AuthGuardProps {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }:AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    // Redirecionar p/ /login
    return <Navigate to="/login" replace/>;
  }
  
  if (signedIn && !isPrivate) {
    // Redirecionar p/ /dashboard
    return <Navigate to="/" replace/>;
  }

  return <Outlet/>
}