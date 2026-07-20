import { Outlet } from "react-router-dom"

import { UsuariosProvider } from "@/features/usuarios/UsuariosProvider"

export default function UsuariosModule() {
  return (
    <UsuariosProvider>
      <Outlet />
    </UsuariosProvider>
  )
}
