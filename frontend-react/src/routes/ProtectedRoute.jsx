import { Navigate, Outlet, useLocation } from "react-router-dom"

import { isAuthenticatedMock } from "@/lib/auth"

export default function ProtectedRoute() {
  const location = useLocation()

  if (!isAuthenticatedMock()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
