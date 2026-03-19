import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isUserLoggedIn = true; // Replace with actual authentication logic later

  return isUserLoggedIn ? children : <Navigate to="/login" replace />;
}