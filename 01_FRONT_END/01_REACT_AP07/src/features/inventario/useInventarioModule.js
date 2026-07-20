import { useContext } from "react"

import { InventarioContext } from "./inventarioContext"

function useInventarioModule() {
  const context = useContext(InventarioContext)

  if (!context) {
    throw new Error("useInventarioModule debe usarse dentro de InventarioProvider")
  }

  return context
}

export { useInventarioModule }
