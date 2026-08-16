import { Navigate, Outlet, useLocation } from "react-router-dom"

import { getSession, isAuthenticated } from "@/lib/auth"
import { hasSessionPermission } from "@/security/authorization"

export default function ProtectedRoute({ permission }) {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (permission && !hasSessionPermission(getSession(), permission)) {
    return <Navigate to="/forbidden" replace state={{ from: location }} />
  }

  return <Outlet />
}
