import { createContext, useContext, useMemo, useState } from "react"

import {
  inventarioMock,
  movimientosInventarioMock,
} from "@/data/mocks/inventario.mock"
import { ventasMock } from "@/data/mocks/ventas.mock"

const MlbtDataContext = createContext(null)

export function MlbtDataProvider({ children }) {
  const [itemsInventario, setItemsInventario] = useState(inventarioMock)
  const [movimientosInventario, setMovimientosInventario] = useState(
    movimientosInventarioMock
  )
  const [ventas, setVentas] = useState(ventasMock)

  const value = useMemo(
    () => ({
      itemsInventario,
      setItemsInventario,
      movimientosInventario,
      setMovimientosInventario,
      ventas,
      setVentas,
    }),
    [itemsInventario, movimientosInventario, ventas]
  )

  return (
    <MlbtDataContext.Provider value={value}>
      {children}
    </MlbtDataContext.Provider>
  )
}

export function useMlbtData() {
  const context = useContext(MlbtDataContext)

  if (!context) {
    throw new Error("useMlbtData debe usarse dentro de MlbtDataProvider")
  }

  return context
}
