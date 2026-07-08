import { useState } from "react"

import DataTable from "@/components/shared/DataTable"
import {
  categoriasInventario,
  estadosInventario,
  inventarioMock,
  movimientosInventarioMock,
  tiposMovimientoInventario,
  unidadesInventario,
} from "@/data/mocks/inventario.mock"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const initialItemForm = {
  nombre: "",
  categoria: "Proteínas",
  unidad: "kg",
  stock: "0",
  stockMin: "0",
  estado: "Activo",
}

const initialMovementForm = {
  itemId: "",
  tipo: "entrada",
  cantidad: "",
  motivo: "",
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function generateRegistrationNumber(items) {
  const maxSequence = items.reduce((currentMax, item) => {
    const sequence = Number(
      String(item.registrationNumber || "").replace("PRD-", "")
    )

    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax
  }, 0)

  return `PRD-${String(maxSequence + 1).padStart(4, "0")}`
}

function generateMovementNumber(movements) {
  const maxSequence = movements.reduce((currentMax, movement) => {
    const sequence = Number(
      String(movement.movementNumber || "").replace("MOV-", "")
    )

    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax
  }, 0)

  return `MOV-${String(maxSequence + 1).padStart(4, "0")}`
}

function getStockAlert(item) {
  return Number(item.stock) <= Number(item.stockMin)
    ? "Stock bajo"
    : "Stock estable"
}

function getStockAlertClass(item) {
  return Number(item.stock) <= Number(item.stockMin)
    ? "bg-red-50 text-red-700"
    : "bg-green-50 text-green-700"
}

function getStatusClass(status) {
  return status === "Activo"
    ? "bg-green-50 text-green-700"
    : "bg-red-50 text-red-700"
}

function getMovementLabel(tipo) {
  return (
    tiposMovimientoInventario.find((movementType) => movementType.value === tipo)
      ?.label || "Movimiento"
  )
}

function calculateNextStock(currentStock, movementType, quantity) {
  if (movementType === "entrada") {
    return currentStock + quantity
  }

  if (movementType === "salida") {
    return currentStock - quantity
  }

  return currentStock + quantity
}

export default function Inventario() {
  const [items, setItems] = useState(inventarioMock)
  const [movements, setMovements] = useState(movimientosInventarioMock)
  const [itemForm, setItemForm] = useState(initialItemForm)
  const [movementForm, setMovementForm] = useState(initialMovementForm)
  const [itemFormError, setItemFormError] = useState("")
  const [movementFormError, setMovementFormError] = useState("")
  const [itemEditandoId, setItemEditandoId] = useState(null)
  const [itemSeleccionado, setItemSeleccionado] = useState(null)
  const [filtroInventario, setFiltroInventario] = useState("todos")

  const estaEditando = Boolean(itemEditandoId)

  const totalItems = items.length
  const itemsActivos = items.filter((item) => item.estado === "Activo").length
  const itemsStockBajo = items.filter(
    (item) => Number(item.stock) <= Number(item.stockMin)
  )
  const totalStockBajo = itemsStockBajo.length

  const activeItems = items.filter((item) => item.estado === "Activo")

  const itemsFiltrados = items.filter((item) => {
    if (filtroInventario === "stock-bajo") {
      return Number(item.stock) <= Number(item.stockMin)
    }

    if (filtroInventario === "activos") {
      return item.estado === "Activo"
    }

    if (filtroInventario === "inactivos") {
      return item.estado === "Inactivo"
    }

    return true
  })

  const limpiarItemForm = () => {
    setItemForm(initialItemForm)
    setItemFormError("")
    setItemEditandoId(null)
  }

  const limpiarMovementForm = () => {
    setMovementForm(initialMovementForm)
    setMovementFormError("")
  }

  const updateItemFormField = (name, value) => {
    setItemForm((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (itemFormError) {
      setItemFormError("")
    }
  }

  const updateMovementFormField = (name, value) => {
    setMovementForm((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (movementFormError) {
      setMovementFormError("")
    }
  }

  const handleItemInputChange = (event) => {
    const { name, value } = event.target
    updateItemFormField(name, value)
  }

  const handleMovementInputChange = (event) => {
    const { name, value } = event.target
    updateMovementFormField(name, value)
  }

  const validarItemForm = () => {
    const nombre = itemForm.nombre.trim()
    const categoria = itemForm.categoria.trim()
    const unidad = itemForm.unidad.trim()
    const stock = Number(itemForm.stock)
    const stockMin = Number(itemForm.stockMin)

    if (!nombre || !categoria || !unidad || !itemForm.estado) {
      return "Completa nombre, categoría, unidad y estado del ítem."
    }

    if (!Number.isFinite(stock) || stock < 0) {
      return "El stock debe ser un número válido mayor o igual a cero."
    }

    if (!Number.isFinite(stockMin) || stockMin < 0) {
      return "El stock mínimo debe ser un número válido mayor o igual a cero."
    }

    const itemDuplicado = items.some(
      (item) =>
        item.nombre.toLowerCase() === nombre.toLowerCase() &&
        item.unidad.toLowerCase() === unidad.toLowerCase() &&
        item.id !== itemEditandoId
    )

    if (itemDuplicado) {
      return "Ya existe un ítem con el mismo nombre y unidad."
    }

    return ""
  }

  const guardarItem = (event) => {
    event.preventDefault()

    const mensajeError = validarItemForm()

    if (mensajeError) {
      setItemFormError(mensajeError)
      return
    }

    const today = getTodayIsoDate()

    const itemNormalizado = {
      nombre: itemForm.nombre.trim(),
      categoria: itemForm.categoria.trim(),
      unidad: itemForm.unidad.trim(),
      stock: Number(itemForm.stock),
      stockMin: Number(itemForm.stockMin),
      estado: itemForm.estado,
      updatedAt: today,
    }

    if (estaEditando) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemEditandoId
            ? {
                ...item,
                ...itemNormalizado,
              }
            : item
        )
      )

      limpiarItemForm()
      return
    }

    const nuevoId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1

    const nuevoItem = {
      id: nuevoId,
      registrationNumber: generateRegistrationNumber(items),
      ...itemNormalizado,
      createdAt: today,
      updatedAt: today,
    }

    setItems((currentItems) => [...currentItems, nuevoItem])
    limpiarItemForm()
  }

  const editarItem = (item) => {
    setItemEditandoId(item.id)
    setItemForm({
      nombre: item.nombre,
      categoria: item.categoria,
      unidad: item.unidad,
      stock: String(item.stock),
      stockMin: String(item.stockMin),
      estado: item.estado,
    })
    setItemFormError("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const abrirConfirmacionBaja = (item) => {
    setItemSeleccionado(item)
  }

  const cerrarConfirmacionBaja = () => {
    setItemSeleccionado(null)
  }

  const darBajaItem = () => {
    if (!itemSeleccionado) {
      return
    }

    const today = getTodayIsoDate()

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemSeleccionado.id
          ? {
              ...item,
              estado: "Inactivo",
              updatedAt: today,
            }
          : item
      )
    )

    if (itemSeleccionado.id === itemEditandoId) {
      limpiarItemForm()
    }

    cerrarConfirmacionBaja()
  }

  const activarItem = (itemSeleccionado) => {
    const today = getTodayIsoDate()

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemSeleccionado.id
          ? {
              ...item,
              estado: "Activo",
              updatedAt: today,
            }
          : item
      )
    )
  }

  const validarMovementForm = () => {
    const quantity = Number(movementForm.cantidad)
    const reason = movementForm.motivo.trim()

    if (!movementForm.itemId || !movementForm.tipo || !reason) {
      return "Completa ítem, tipo de movimiento, cantidad y motivo."
    }

    if (!Number.isFinite(quantity) || quantity === 0) {
      return "La cantidad debe ser un número distinto de cero."
    }

    if (
      (movementForm.tipo === "entrada" || movementForm.tipo === "salida") &&
      quantity < 0
    ) {
      return "Entrada y salida requieren una cantidad positiva."
    }

    const selectedItem = items.find(
      (item) => String(item.id) === movementForm.itemId
    )

    if (!selectedItem) {
      return "El ítem seleccionado no existe."
    }

    if (selectedItem.estado !== "Activo") {
      return "Solo se pueden registrar movimientos para ítems activos."
    }

    const nextStock = calculateNextStock(
      Number(selectedItem.stock),
      movementForm.tipo,
      quantity
    )

    if (nextStock < 0) {
      return "El movimiento no puede dejar el stock en negativo."
    }

    return ""
  }

  const registrarMovimiento = (event) => {
    event.preventDefault()

    const mensajeError = validarMovementForm()

    if (mensajeError) {
      setMovementFormError(mensajeError)
      return
    }

    const selectedItem = items.find(
      (item) => String(item.id) === movementForm.itemId
    )

    const quantity = Number(movementForm.cantidad)
    const stockAnterior = Number(selectedItem.stock)
    const stockNuevo = calculateNextStock(
      stockAnterior,
      movementForm.tipo,
      quantity
    )
    const today = getTodayIsoDate()

    const nuevoMovimiento = {
      id:
        movements.length > 0
          ? Math.max(...movements.map((movement) => movement.id)) + 1
          : 1,
      movementNumber: generateMovementNumber(movements),
      itemId: selectedItem.id,
      itemRegistrationNumber: selectedItem.registrationNumber,
      itemName: selectedItem.nombre,
      tipo: movementForm.tipo,
      tipoLabel: getMovementLabel(movementForm.tipo),
      cantidad: quantity,
      stockAnterior,
      stockNuevo,
      motivo: movementForm.motivo.trim(),
      fecha: today,
      usuarioId: "system-local",
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              stock: stockNuevo,
              updatedAt: today,
            }
          : item
      )
    )

    setMovements((currentMovements) => [
      nuevoMovimiento,
      ...currentMovements,
    ])

    limpiarMovementForm()
  }

  const itemColumns = [
    {
      accessorKey: "alerta",
      header: "Alerta",
      cell: ({ row }) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStockAlertClass(
            row.original
          )}`}
        >
          {getStockAlert(row.original)}
        </span>
      ),
    },
    {
      accessorKey: "registrationNumber",
      header: "Registro",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.registrationNumber}
        </span>
      ),
    },
    {
      accessorKey: "nombre",
      header: "Ítem",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.nombre}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.categoria}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "unidad",
      header: "Unidad",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "stockMin",
      header: "Stock mínimo",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
            row.original.estado
          )}`}
        >
          {row.original.estado}
        </span>
      ),
    },
    {
      id: "fechas",
      header: "Fechas",
      cell: ({ row }) => (
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Alta: {row.original.createdAt}</p>
          <p>Act: {row.original.updatedAt}</p>
        </div>
      ),
    },
    {
      id: "acciones",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => {
        const item = row.original

        return (
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editarItem(item)}
            >
              Editar
            </Button>

            {item.estado === "Inactivo" ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => activarItem(item)}
              >
                Activar
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                onClick={() => abrirConfirmacionBaja(item)}
              >
                Dar baja
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  const movementColumns = [
    {
      accessorKey: "movementNumber",
      header: "Movimiento",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.movementNumber}</span>
      ),
    },
    {
      accessorKey: "itemName",
      header: "Ítem",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.itemName}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.itemRegistrationNumber}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "tipoLabel",
      header: "Tipo",
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
    },
    {
      accessorKey: "stockNuevo",
      header: "Stock final",
    },
    {
      accessorKey: "motivo",
      header: "Motivo",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
    },
  ]

  return (
    <section className="min-w-0 space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Control local
        </p>

        <h1 id="resumen-inventario" className="scroll-mt-6 mt-1 text-2xl font-bold text-[#7c2d12]">Inventario</h1>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Total de ítems</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {totalItems}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Ítems activos</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {itemsActivos}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="p-4">
            <CardDescription className="text-red-700">
              Alertas de stock bajo
            </CardDescription>
            <CardTitle className="text-2xl text-red-800">
              {totalStockBajo}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card
        className={
          totalStockBajo > 0
            ? "border-red-200 bg-red-50"
            : "border-green-200 bg-green-50"
        }
      >
        <CardHeader className="p-5 pb-3">
          <CardTitle
            className={
              totalStockBajo > 0 ? "text-red-800" : "text-green-800"
            }
          >
            {totalStockBajo > 0
              ? "Alertas visuales de inventario"
              : "Inventario sin alertas críticas"}
          </CardTitle>
          <CardDescription
            className={
              totalStockBajo > 0 ? "text-red-700" : "text-green-700"
            }
          >
            {totalStockBajo > 0
              ? "Estos ítems están en el stock mínimo o por debajo del stock mínimo definido."
              : "Actualmente no hay ítems por debajo del stock mínimo."}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          {totalStockBajo > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {itemsStockBajo.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-red-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.registrationNumber} - {item.categoria}
                      </p>
                    </div>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Stock bajo
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md bg-red-50 p-2">
                      <p className="text-xs text-red-700">Stock actual</p>
                      <p className="text-lg font-bold text-red-800">
                        {item.stock} {item.unidad}
                      </p>
                    </div>

                    <div className="rounded-md bg-orange-50 p-2">
                      <p className="text-xs text-orange-700">Stock mínimo</p>
                      <p className="text-lg font-bold text-orange-800">
                        {item.stockMin} {item.unidad}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-green-800">
              Todos los ítems activos se encuentran por encima del stock mínimo
              definido.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-lg text-[#7c2d12]">
            <div id="formulario-inventario" className="scroll-mt-6" />
            {estaEditando ? "Modificar ítem" : "Registrar nuevo ítem"}
          </CardTitle>
          <CardDescription>
            Registra productos o insumos para controlar existencias y alertas de
            stock mínimo.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <form onSubmit={guardarItem} className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ej: Carne al pastor"
                  value={itemForm.nombre}
                  onChange={handleItemInputChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={itemForm.categoria}
                  onValueChange={(value) =>
                    updateItemFormField("categoria", value)
                  }
                >
                  <SelectTrigger id="categoria" className="h-9">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriasInventario.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="unidad">Unidad</Label>
                <Select
                  value={itemForm.unidad}
                  onValueChange={(value) => updateItemFormField("unidad", value)}
                >
                  <SelectTrigger id="unidad" className="h-9">
                    <SelectValue placeholder="Selecciona unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidadesInventario.map((unidad) => (
                      <SelectItem key={unidad} value={unidad}>
                        {unidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Ej: 10"
                  value={itemForm.stock}
                  onChange={handleItemInputChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stockMin">Stock mínimo</Label>
                <Input
                  id="stockMin"
                  name="stockMin"
                  type="number"
                  placeholder="Ej: 5"
                  value={itemForm.stockMin}
                  onChange={handleItemInputChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={itemForm.estado}
                  onValueChange={(value) => updateItemFormField("estado", value)}
                >
                  <SelectTrigger id="estado" className="h-9">
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosInventario.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {itemFormError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {itemFormError}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              {estaEditando && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={limpiarItemForm}
                >
                  Cancelar edición
                </Button>
              )}

              <Button
                type="submit"
                className="bg-[#7c2d12] hover:bg-[#9a3412]"
              >
                {estaEditando ? "Guardar cambios" : "Guardar ítem"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <CardTitle id="movimiento-inventario" className="scroll-mt-6 text-lg text-[#7c2d12]">Registrar movimiento</CardTitle>
          <CardDescription>
            Documenta entradas, salidas o ajustes. El movimiento actualiza el
            stock del ítem seleccionado.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <form onSubmit={registrarMovimiento} className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="itemId">Ítem</Label>
                <Select
                  value={movementForm.itemId}
                  onValueChange={(value) =>
                    updateMovementFormField("itemId", value)
                  }
                >
                  <SelectTrigger id="itemId" className="h-9">
                    <SelectValue placeholder="Selecciona un ítem" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeItems.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.registrationNumber} - {item.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tipo">Tipo de movimiento</Label>
                <Select
                  value={movementForm.tipo}
                  onValueChange={(value) =>
                    updateMovementFormField("tipo", value)
                  }
                >
                  <SelectTrigger id="tipo" className="h-9">
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposMovimientoInventario.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  placeholder="Ej: 5"
                  value={movementForm.cantidad}
                  onChange={handleMovementInputChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motivo">Motivo</Label>
                <Input
                  id="motivo"
                  name="motivo"
                  type="text"
                  placeholder="Ej: Compra de insumos"
                  value={movementForm.motivo}
                  onChange={handleMovementInputChange}
                  className="h-9"
                />
              </div>
            </div>

            {movementFormError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {movementFormError}
              </p>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#7c2d12] hover:bg-[#9a3412]"
              >
                Registrar movimiento
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle id="tablas-inventario" className="scroll-mt-6 text-lg text-[#7c2d12]">Data Table de inventario</CardTitle>
              <CardDescription>
                Ítems registrados con control de stock, alertas y estado.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={filtroInventario === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroInventario("todos")}
                className={
                  filtroInventario === "todos"
                    ? "bg-[#7c2d12] hover:bg-[#9a3412]"
                    : ""
                }
              >
                Todos
              </Button>

              <Button
                type="button"
                variant={
                  filtroInventario === "stock-bajo" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFiltroInventario("stock-bajo")}
                className={
                  filtroInventario === "stock-bajo"
                    ? "bg-red-700 hover:bg-red-800"
                    : "border-red-200 text-red-700 hover:bg-red-50"
                }
              >
                Stock bajo
              </Button>

              <Button
                type="button"
                variant={filtroInventario === "activos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroInventario("activos")}
                className={
                  filtroInventario === "activos"
                    ? "bg-green-700 hover:bg-green-800"
                    : ""
                }
              >
                Activos
              </Button>

              <Button
                type="button"
                variant={
                  filtroInventario === "inactivos" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFiltroInventario("inactivos")}
                className={
                  filtroInventario === "inactivos"
                    ? "bg-slate-700 hover:bg-slate-800"
                    : ""
                }
              >
                Inactivos
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <DataTable
            columns={itemColumns}
            data={itemsFiltrados}
            emptyMessage="No hay ítems para el filtro seleccionado."
          />
        </CardContent>
      </Card>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-lg text-[#7c2d12]">
            Historial de movimientos
          </CardTitle>
          <CardDescription>
            Registro local de entradas, salidas y ajustes realizados durante la
            sesión.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <DataTable
            columns={movementColumns}
            data={movements}
            emptyMessage="No hay movimientos registrados."
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(itemSeleccionado)}
        onOpenChange={(open) => {
          if (!open) {
            cerrarConfirmacionBaja()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Dar baja al ítem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción marcará{" "}
              <strong>{itemSeleccionado?.nombre}</strong> como Inactivo. El
              registro no se elimina para conservar trazabilidad del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={darBajaItem}
              className="bg-red-700 text-white hover:bg-red-800"
            >
              Confirmar baja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}










