import { BrowserRouter } from "react-router-dom"

import { TooltipProvider } from "@/components/ui/tooltip"
import AppRouter from "@/routes/AppRouter"

export default function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  )
}
