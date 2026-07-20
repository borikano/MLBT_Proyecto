import { Outlet } from "react-router-dom"

import InventarioProvider from "@/features/inventario/InventarioProvider"

export default function InventarioModule() {
  return (
    <InventarioProvider>
      <Outlet />
    </InventarioProvider>
  )
}
