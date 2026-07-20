import { useContext } from "react"

import { VentasContext } from "./ventasContext"

function useVentasModule() {
  const context = useContext(VentasContext)

  if (!context) {
    throw new Error("useVentasModule debe usarse dentro de VentasProvider")
  }

  return context
}

export { useVentasModule }
