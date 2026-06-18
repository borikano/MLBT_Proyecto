import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import logoPrincipal from "@/assets/mlbt/brand/logo-principal.png"
import inicioSesion from "@/assets/mlbt/backgrounds/inicio-sesion.png"

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
import { isAuthenticatedMock, loginMock } from "@/lib/auth"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
  })

  const [error, setError] = useState("")

  const redirectTo = location.state?.from?.pathname || "/dashboard"

  useEffect(() => {
    if (isAuthenticatedMock()) {
      navigate("/dashboard", { replace: true })
    }
  }, [navigate])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (error) {
      setError("")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = loginMock(formData)

    if (result.ok) {
      navigate(redirectTo, { replace: true })
      return
    }

    setError(result.message)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7ed]">
      <section className="grid min-h-screen grid-cols-1 lg:h-screen lg:grid-cols-2">
        <aside className="hidden items-center justify-center bg-[#1c120d] px-10 py-8 lg:flex">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <img
                src={inicioSesion}
                alt="Ilustración de inicio de sesión de María La Bonita Taquería"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-6 text-left shadow-xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f1a43c]">
                Sistema MLBT
              </p>

              <h1 className="mt-3 text-3xl font-bold text-white">
                María La Bonita Taquería
              </h1>

              <p className="mt-4 text-sm leading-6 text-orange-50/80">
                Panel administrativo para gestionar usuarios, inventario y
                ventas.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center px-4 py-10">
          <Card className="w-full max-w-md border-[#f1d4bd] shadow-xl">
            <CardHeader className="space-y-4 text-center">
              <img
                src={logoPrincipal}
                alt="Logo María La Bonita Taquería"
                className="mx-auto h-28 w-28 rounded-full border border-[#f1d4bd] object-contain shadow-sm"
              />

              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-[#7c2d12]">
                  MLBT - Panel Administrativo
                </CardTitle>
                <CardDescription>
                  Ingresa con tus credenciales para acceder al sistema.
                </CardDescription>
              </div>
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
                <Button
                  type="submit"
                  className="w-full bg-[#7c2d12] hover:bg-[#9a3412]"
                >
                  Iniciar sesión
                </Button>
              </CardFooter>
            </form>
          </Card>
        </section>
      </section>
    </main>
  )
}
