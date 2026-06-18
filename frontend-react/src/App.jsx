import { BrowserRouter } from "react-router-dom"

import { MlbtDataProvider } from "@/context/MlbtDataContext"
import AppRouter from "@/routes/AppRouter"

export default function App() {
  return (
    <BrowserRouter>
      <MlbtDataProvider>
        <AppRouter />
      </MlbtDataProvider>
    </BrowserRouter>
  )
}
