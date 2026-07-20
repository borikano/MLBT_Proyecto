import { Outlet } from "react-router-dom"

import VentasProvider from "@/features/ventas/VentasProvider"

export default function VentasModule() {
  return (
    <VentasProvider>
      <Outlet />
    </VentasProvider>
  )
}
