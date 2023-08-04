import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }:AuthGuardProps) {
  const {signedIn} = useAuth();

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