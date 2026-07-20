import { useState } from "react"

import {
  categoriasInventario,
  estadosInventario,
  inventarioMock,
  movimientosInventarioMock,
  tiposMovimientoInventario,
  unidadesInventario,
} from "@/data/mocks/inventario.mock"

import { Button } from "@/components/ui/button"

import { InventarioContext } from "./inventarioContext"

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

export default function InventarioProvider({ children }) {
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

  const contextValue = {
    categoriasInventario,
    estadosInventario,
    tiposMovimientoInventario,
    unidadesInventario,
    items,
    setItems,
    movements,
    setMovements,
    itemForm,
    setItemForm,
    movementForm,
    setMovementForm,
    itemFormError,
    setItemFormError,
    movementFormError,
    setMovementFormError,
    itemEditandoId,
    setItemEditandoId,
    itemSeleccionado,
    setItemSeleccionado,
    filtroInventario,
    setFiltroInventario,
    estaEditando,
    totalItems,
    itemsActivos,
    itemsStockBajo,
    totalStockBajo,
    activeItems,
    itemsFiltrados,
    limpiarItemForm,
    limpiarMovementForm,
    updateItemFormField,
    updateMovementFormField,
    handleItemInputChange,
    handleMovementInputChange,
    validarItemForm,
    guardarItem,
    editarItem,
    abrirConfirmacionBaja,
    cerrarConfirmacionBaja,
    darBajaItem,
    activarItem,
    validarMovementForm,
    registrarMovimiento,
    itemColumns,
    movementColumns,
  }

  return (
    <InventarioContext.Provider value={contextValue}>
      {children}
    </InventarioContext.Provider>
  )
}
