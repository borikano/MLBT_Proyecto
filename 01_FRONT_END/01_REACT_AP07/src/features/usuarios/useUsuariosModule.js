import { useContext } from "react"

import { UsuariosContext } from "@/features/usuarios/usuariosContext"

export function useUsuariosModule() {
  const context = useContext(UsuariosContext)

  if (!context) {
    throw new Error("useUsuariosModule debe usarse dentro de UsuariosProvider.")
  }

  return context
}
