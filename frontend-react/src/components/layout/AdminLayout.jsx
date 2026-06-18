import { Outlet } from "react-router-dom"

import AppSidebar from "@/components/layout/AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b bg-white px-6">
          <SidebarTrigger />

          <div>
            <p className="text-sm font-semibold text-[#7c2d12]">
              María La Bonita Taquería
            </p>
            <p className="text-xs text-muted-foreground">
              Sistema administrativo mock
            </p>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] bg-[#fff7ed] p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
