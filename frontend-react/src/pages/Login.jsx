import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
  })

  const [error, setError] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.usuario === "admin" && formData.clave === "admin") {
      sessionStorage.setItem("mlbt-auth", "true")
      navigate("/dashboard")
      return
    }

    setError("Usuario o contraseña incorrectos. Intenta con admin / admin.")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7ed] px-4">
      <Card className="w-full max-w-md border-[#f1d4bd] shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-[#7c2d12]">
            MLBT - María La Bonita Taquería
          </CardTitle>
          <CardDescription>
            Ingresa con tus credenciales para acceder al panel administrativo.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                name="usuario"
                type="text"
                placeholder="Ej: admin"
                value={formData.usuario}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clave">Contraseña</Label>
              <Input
                id="clave"
                name="clave"
                type="password"
                placeholder="Ej: admin"
                value={formData.clave}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
