import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Forbidden() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7ed] p-6">
      <Card className="w-full max-w-lg border-[#f1d4bd] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#7c2d12]">
            Acceso no autorizado
          </CardTitle>
          <CardDescription>
            Tu sesión es válida, pero tu rol no tiene permiso para acceder a
            esta funcionalidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="bg-[#7c2d12] hover:bg-[#9a3412]">
            <Link to="/dashboard">Volver al dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
