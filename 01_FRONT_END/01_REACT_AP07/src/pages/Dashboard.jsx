import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import domicilioImg from "@/assets/mlbt/ui/domicilio.png"
import horarioImg from "@/assets/mlbt/ui/horario.png"
import registroImg from "@/assets/mlbt/ui/registro-nuevo.png"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { isApiError } from "@/lib/api"
import { handleAuthenticatedApiError } from "@/lib/auth"
import { mapApiUsersToUi } from "@/mappers/user.mapper"
import { listUsersApi } from "@/services/users.api"
import {
  listInventoryApi,
  listInventoryMovementsApi,
} from "@/services/inventory.api"
import {
  mapApiInventoryListToUi,
  mapApiInventoryMovementsToUi,
} from "@/mappers/inventory.mapper"
import { mapApiSalesToUi } from "@/mappers/sale.mapper"
import { listSalesApi } from "@/services/sales.api"

function getTodayIsoDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatDisplayDate(isoDate) {
  if (!isoDate) {
    return "Sin fecha seleccionada"
  }

  const [year, month, day] = isoDate.split("-")
  return `${day}/${month}/${year}`
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatQuantity(value) {
  return Number(value).toLocaleString("es-CO", {
    maximumFractionDigits: 2,
  })
}

function getUsuarioNombre(usuario) {
  const nombres = usuario?.nombres || usuario?.name || ""
  const apellidos = usuario?.apellidos || usuario?.lastName || ""

  return `${nombres} ${apellidos}`.trim() || usuario?.email || "Usuario MLBT"
}

const accesosRapidos = [
  {
    titulo: "Gestión de usuarios",
    descripcion:
      "Crear, modificar, activar o retirar usuarios administrativos del sistema.",
    imagen: registroImg,
    ruta: "/usuarios",
    boton: "Ir a usuarios",
  },
  {
    titulo: "Control de inventario",
    descripcion:
      "Consultar insumos, stock mínimo, movimientos y alertas operativas.",
    imagen: horarioImg,
    ruta: "/inventario",
    boton: "Ir a inventario",
  },
  {
    titulo: "Registro de ventas",
    descripcion:
      "Crear ventas, validar stock, descontar insumos y analizar demanda.",
    imagen: domicilioImg,
    ruta: "/ventas",
    boton: "Ir a ventas",
  },
]

export default function Dashboard() {

  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [usuariosError, setUsuariosError] = useState("")
  const [itemsInventario, setItemsInventario] = useState([])
  const [movimientosInventario, setMovimientosInventario] = useState([])
  const [inventarioError, setInventarioError] = useState("")
  const [ventas, setVentas] = useState([])
  const [ventasError, setVentasError] = useState("")

  useEffect(() => {
    let active = true

    async function cargarUsuariosDashboard() {
      try {
        const data = await listUsersApi()

        if (active) {
          setUsuarios(mapApiUsersToUi(data))
          setUsuariosError("")
        }
      } catch (error) {
        if (!active) {
          return
        }

        if (handleAuthenticatedApiError(error)) {
          navigate("/login", { replace: true })
          return
        }

        if (isApiError(error, 403)) {
          setUsuarios([])
          setUsuariosError(
            "Tu rol no tiene permiso para consultar el módulo de usuarios."
          )
          return
        }

        setUsuarios([])
        setUsuariosError(
          isApiError(error) && error.status >= 500
            ? "No fue posible cargar usuarios para el dashboard."
            : error?.message || "No fue posible cargar usuarios para el dashboard."
        )
      }
    }

    cargarUsuariosDashboard()

    return () => {
      active = false
    }
  }, [navigate])

  useEffect(() => {
    let active = true

    Promise.all([
      listInventoryApi(),
      listInventoryMovementsApi(),
    ])
      .then(([inventoryData, movementData]) => {
        if (!active) {
          return
        }

        setItemsInventario(mapApiInventoryListToUi(inventoryData))
        setMovimientosInventario(
          mapApiInventoryMovementsToUi(movementData)
        )
        setInventarioError("")
      })
      .catch((error) => {
        if (!active) {
          return
        }

        if (handleAuthenticatedApiError(error)) {
          navigate("/login", { replace: true })
          return
        }

        if (isApiError(error, 403)) {
          setItemsInventario([])
          setMovimientosInventario([])
          setInventarioError(
            "Tu rol no tiene permiso para consultar inventario."
          )
          return
        }

        setItemsInventario([])
        setMovimientosInventario([])
        setInventarioError(
          isApiError(error) && error.status >= 500
            ? "No fue posible cargar inventario para el dashboard."
            : error?.message ||
                "No fue posible cargar inventario para el dashboard."
        )
      })

    return () => {
      active = false
    }
  }, [navigate])
  useEffect(() => {
    let active = true

    listSalesApi()
      .then((data) => {
        if (!active) {
          return
        }

        setVentas(mapApiSalesToUi(data))
        setVentasError("")
      })
      .catch((error) => {
        if (!active) {
          return
        }

        if (handleAuthenticatedApiError(error)) {
          navigate("/login", { replace: true })
          return
        }

        setVentas([])
        setVentasError(
          isApiError(error, 403)
            ? "Tu rol no tiene permiso para consultar ventas."
            : isApiError(error) && error.status >= 500
              ? "No fue posible cargar ventas para el dashboard."
              : error?.message ||
                  "No fue posible cargar ventas para el dashboard."
        )
      })

    return () => {
      active = false
    }
  }, [navigate])
  const today = getTodayIsoDate()
  const [fechaDashboard, setFechaDashboard] = useState(today)

  const ventasConfirmadas = ventas.filter(
    (venta) => venta.estado === "Confirmada"
  )
  const ventasOrdenadas = [...ventasConfirmadas].sort((a, b) =>
    String(b.fechaHora || "").localeCompare(String(a.fechaHora || ""))
  )

  const movimientosOrdenados = [...movimientosInventario].sort(
    (a, b) => Number(b.id || 0) - Number(a.id || 0)
  )

  const ventasHoy = ventasOrdenadas.filter((venta) => venta.fecha === fechaDashboard)

  const totalVentasHoy = ventasHoy.reduce(
    (total, venta) => total + Number(venta.total || 0),
    0
  )

  const productosVendidosHoy = ventasHoy.reduce(
    (total, venta) =>
      total +
      venta.items.reduce(
        (subtotalItems, item) => subtotalItems + Number(item.quantity || 0),
        0
      ),
    0
  )

  const itemsActivos = itemsInventario.filter(
    (item) => item.estado === "Activo"
  )

  const itemsStockBajo = itemsInventario.filter(
    (item) => Number(item.stock) <= Number(item.stockMin)
  )

  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.status === "Activo"
  )

  const ventasRecientes = ventasHoy.slice(0, 4)
  const movimientosRecientes = movimientosOrdenados.slice(0, 4)
  const usuariosRecientes = usuarios.slice(0, 4)

  const metricas = [
    {
      titulo: "Ventas del día",
      valor: ventasError ? "N/D" : formatCurrency(totalVentasHoy),
      descripcion: ventasError || `${ventasHoy.length} venta(s) confirmada(s) el ${formatDisplayDate(fechaDashboard)}.`,
    },
    {
      titulo: "Productos vendidos",
      valor: ventasError ? "N/D" : productosVendidosHoy,
      descripcion: ventasError || `Unidades vendidas el ${formatDisplayDate(fechaDashboard)} según el historial API.`,
    },
    {
      titulo: "Insumos activos",
      valor: inventarioError ? "N/D" : itemsActivos.length,
      descripcion:
        inventarioError ||
        "Ítems activos consultados desde la API MLBT.",
    },
    {
      titulo: "Usuarios activos",
      valor: usuariosError ? "N/D" : usuariosActivos.length,
      descripcion: usuariosError || "Usuarios activos consultados desde la API MLBT.",
    },
  ]

  return (
    <section className="min-w-0 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Panel principal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#7c2d12]">
          Dashboard MLBT
        </h1>

        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Resumen administrativo conectado a usuarios, inventario, ventas y
          movimientos de apoyo. Usuarios, inventario y ventas provienen de la API.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-[#f1d4bd] bg-white md:col-span-2 xl:col-span-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#7c2d12]">
                Calendario de análisis
              </CardTitle>
              <CardDescription>
                Selecciona una fecha para segmentar las ventas y productos
                vendidos desde el panel principal.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="w-full max-w-xs space-y-2">
                  <label
                    htmlFor="fechaDashboard"
                    className="text-sm font-medium text-slate-700"
                  >
                    Fecha de análisis
                  </label>

                  <input
                    id="fechaDashboard"
                    type="date"
                    value={fechaDashboard}
                    onChange={(event) => setFechaDashboard(event.target.value)}
                    className="h-10 w-full rounded-md border border-[#ead8c8] bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#c44f2a] focus:ring-2 focus:ring-[#f1d4bd]"
                  />
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
                  <span>
                    Analizando ventas del{" "}
                    <strong className="text-[#7c2d12]">
                      {formatDisplayDate(fechaDashboard)}
                    </strong>
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFechaDashboard(today)}
                    className="border-[#d6a37f] text-[#7c2d12] hover:bg-[#fff7ed]"
                  >
                    Volver a hoy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        {metricas.map((metrica) => (
          <Card key={metrica.titulo} className="border-[#f1d4bd] bg-white">
            <CardHeader className="pb-2">
              <CardDescription>{metrica.titulo}</CardDescription>
              <CardTitle className="text-3xl text-[#7c2d12]">
                {metrica.valor}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                {metrica.descripcion}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card
        className={
          itemsStockBajo.length > 0
            ? "border-red-200 bg-red-50"
            : "border-green-200 bg-green-50"
        }
      >
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle
                className={
                  itemsStockBajo.length > 0 ? "text-red-800" : "text-green-800"
                }
              >
                {itemsStockBajo.length > 0
                  ? "Alertas de inventario"
                  : "Inventario estable"}
              </CardTitle>

              <CardDescription
                className={
                  itemsStockBajo.length > 0 ? "text-red-700" : "text-green-700"
                }
              >
                {itemsStockBajo.length > 0
                  ? "Hay insumos en stock mínimo o por debajo del stock mínimo definido."
                  : "No hay insumos por debajo del stock mínimo definido."}
              </CardDescription>
            </div>

            <Button asChild variant="outline">
              <Link to="/inventario">Revisar inventario</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          {itemsStockBajo.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {itemsStockBajo.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-red-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-red-800">
                    {item.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.registrationNumber} - {item.categoria}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md bg-red-50 p-2">
                      <p className="text-xs text-red-700">Stock actual</p>
                      <p className="text-lg font-bold text-red-800">
                        {formatQuantity(item.stock)} {item.unidad}
                      </p>
                    </div>

                    <div className="rounded-md bg-orange-50 p-2">
                      <p className="text-xs text-orange-700">Stock mínimo</p>
                      <p className="text-lg font-bold text-orange-800">
                        {formatQuantity(item.stockMin)} {item.unidad}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-green-800">
              Todos los insumos activos se encuentran por encima del stock
              mínimo.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-[#7c2d12]">
                  Ventas de la fecha seleccionada
                </CardTitle>
                <CardDescription>
                  Ventas confirmadas consultadas desde la API para la fecha seleccionada.
                </CardDescription>
              </div>

              <Button asChild size="sm" variant="outline">
                <Link to="/ventas">Ver ventas</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {ventasRecientes.length > 0 ? (
              ventasRecientes.map((venta) => (
                <div
                  key={venta.id}
                  className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#7c2d12]">
                        {venta.saleNumber} - {venta.cliente}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {venta.fecha} · {venta.tipoVenta} · {venta.metodoPago}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#7c2d12]">
                      {formatCurrency(venta.total)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                {ventasError || "No hay ventas confirmadas para la fecha seleccionada."}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-[#7c2d12]">
                  Movimientos recientes
                </CardTitle>
                <CardDescription>
                  Últimos movimientos consultados desde la API.
                </CardDescription>
              </div>

              <Button asChild size="sm" variant="outline">
                <Link to="/inventario">Ver inventario</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {movimientosRecientes.length > 0 ? (
              movimientosRecientes.map((movimiento) => (
                <div
                  key={movimiento.id}
                  className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#7c2d12]">
                        {movimiento.movementNumber} - {movimiento.itemName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {movimiento.tipoLabel} · {movimiento.fecha} ·{" "}
                        {movimiento.motivo}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#7c2d12]">
                      {formatQuantity(movimiento.cantidad)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                No hay movimientos registrados.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-[#7c2d12]">
                  Usuarios recientes
                </CardTitle>
                <CardDescription>
                  Registros administrativos consultados desde la API.
                </CardDescription>
              </div>

              <Button asChild size="sm" variant="outline">
                <Link to="/usuarios">Ver usuarios</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {usuariosRecientes.length > 0 ? (
              usuariosRecientes.map((usuario, index) => (
                <div
                  key={usuario.id || usuario.registrationNumber || index}
                  className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
                >
                  <p className="truncate text-sm font-semibold text-[#7c2d12]">
                    {getUsuarioNombre(usuario)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {usuario.role || "Rol administrativo"} ·{" "}
                    {usuario.status || "Sin estado"}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                No hay usuarios cargados.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {accesosRapidos.map((item) => (
          <Card
            key={item.titulo}
            className="overflow-hidden border-[#f1d4bd] bg-white transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#fff7ed] via-[#fff3e3] to-[#f8dcc2] p-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#f1d4bd] bg-white p-3 shadow-sm">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-xl text-[#7c2d12]">
                {item.titulo}
              </CardTitle>
              <CardDescription>{item.descripcion}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button asChild className="w-full bg-[#7c2d12] hover:bg-[#9a3412]">
                <Link to={item.ruta}>{item.boton}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
