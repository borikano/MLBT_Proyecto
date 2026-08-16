import { getSession } from "@/lib/auth"
import { hasSessionPermission } from "@/security/authorization"

export default function PermissionGate({
  permission,
  children,
  fallback = null,
}) {
  if (!permission || hasSessionPermission(getSession(), permission)) {
    return children
  }

  return fallback
}
