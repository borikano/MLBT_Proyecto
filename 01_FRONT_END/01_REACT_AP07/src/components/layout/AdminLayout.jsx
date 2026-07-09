import { Outlet } from "react-router-dom"

import AppSidebar from "@/components/layout/AppSidebar"

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fff7ed]">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-[#ead8c8] bg-white/95 px-6 backdrop-blur">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead8c8] text-[#7c2d12]">
            ⌁
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#7c2d12]">
              María La Bonita Taquería
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Sistema administrativo integrado
            </p>
          </div>
        </header>

        <main
          id="mlbt-main-content"
          className="min-w-0 flex-1 overflow-y-auto bg-[#fff7ed] p-4 md:p-6"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
