import {
  useCallback,
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"

import {
  categoriasInventario,
  estadosInventario,
  tiposMovimientoInventario,
  unidadesInventario,
} from "@/data/catalogs/inventory.catalog"
import {
  createItemColumns,
  createMovementColumns,
} from "./inventarioColumns"
import { InventarioContext } from "./inventarioContext"
import {
  buildCreateInventoryPayload,
  buildInventoryMovementPayload,
  buildUpdateInventoryPayload,
  mapApiInventoryListToUi,
  mapApiInventoryMovementToUi,
  mapApiInventoryMovementsToUi,
  mapApiInventoryToUi,
} from "@/mappers/inventory.mapper"
import {
  createInventoryApi,
  createInventoryMovementApi,
  deactivateInventoryApi,
  listInventoryApi,
  listInventoryMovementsApi,
  updateInventoryApi,
} from "@/services/inventory.api"
import { handleAuthenticatedApiError } from "@/lib/auth"
import { isApiError } from "@/lib/api"

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

function getFunctionalApiError(error, fallbackMessage) {
  if (isApiError(error, 403)) {
    return "No tienes permiso para realizar esta operación."
  }

  if (isApiError(error, 409)) {
    return error.message || "La operación entra en conflicto con el inventario actual."
  }

  if (isApiError(error, 400) || isApiError(error, 404)) {
    return error.message || fallbackMessage
  }

  if (isApiError(error) && error.status >= 500) {
    return "No fue posible completar la operación. Intenta nuevamente."
  }

  return error?.message || fallbackMessage
}

export default function InventarioProvider({ children }) {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [itemForm, setItemForm] = useState(initialItemForm)
  const [movementForm, setMovementForm] = useState(initialMovementForm)
  const [itemFormError, setItemFormError] = useState("")
  const [movementFormError, setMovementFormError] = useState("")
  const [itemEditandoId, setItemEditandoId] = useState(null)
  const [itemSeleccionado, setItemSeleccionado] = useState(null)
  const [filtroInventario, setFiltroInventario] = useState("todos")

  const estaEditando = Boolean(itemEditandoId)

  const handleApiFailure = useCallback(
    (apiError, fallbackMessage) => {
      if (handleAuthenticatedApiError(apiError)) {
        navigate("/login", { replace: true })
        return "La sesión ya no es válida. Inicia sesión nuevamente."
      }

      return getFunctionalApiError(apiError, fallbackMessage)
    },
    [navigate]
  )

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

        setItems(mapApiInventoryListToUi(inventoryData))
        setMovements(mapApiInventoryMovementsToUi(movementData))
        setError("")
      })
      .catch((apiError) => {
        if (!active) {
          return
        }

        setError(
          handleApiFailure(
            apiError,
            "No fue posible cargar el inventario."
          )
        )
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [handleApiFailure])

  const cargarInventario = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const data = await listInventoryApi()
      setItems(mapApiInventoryListToUi(data))
      return true
    } catch (apiError) {
      setError(
        handleApiFailure(
          apiError,
          "No fue posible cargar el inventario."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }, [handleApiFailure])

  const cargarMovimientos = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const data = await listInventoryMovementsApi()
      setMovements(mapApiInventoryMovementsToUi(data))
      return true
    } catch (apiError) {
      setError(
        handleApiFailure(
          apiError,
          "No fue posible cargar los movimientos de inventario."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }, [handleApiFailure])

  const totalItems = items.length
  const itemsActivos = items.filter((item) => item.estado === "Activo").length
  const itemsStockBajo = items.filter(
    (item) =>
      item.estado === "Activo" &&
      Number(item.stock) <= Number(item.stockMin)
  )
  const totalStockBajo = itemsStockBajo.length

  const activeItems = items.filter((item) => item.estado === "Activo")

  const itemsFiltrados = items.filter((item) => {
    if (filtroInventario === "stock-bajo") {
      return (
        item.estado === "Activo" &&
        Number(item.stock) <= Number(item.stockMin)
      )
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

    if (!estaEditando && (!Number.isFinite(stock) || stock < 0)) {
      return "El stock inicial debe ser un número válido mayor o igual a cero."
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

  const guardarItem = async (event) => {
    event.preventDefault()

    const mensajeError = validarItemForm()

    if (mensajeError) {
      setItemFormError(mensajeError)
      return false
    }

    setLoading(true)
    setError("")
    setItemFormError("")

    try {
      if (estaEditando) {
        const data = await updateInventoryApi(
          itemEditandoId,
          buildUpdateInventoryPayload(itemForm)
        )
        const itemActualizado = mapApiInventoryToUi(data)

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === itemActualizado.id
              ? itemActualizado
              : item
          )
        )
      } else {
        const data = await createInventoryApi(
          buildCreateInventoryPayload(itemForm)
        )
        const nuevoItem = mapApiInventoryToUi(data)

        setItems((currentItems) => [
          ...currentItems,
          nuevoItem,
        ])
      }

      limpiarItemForm()
      return true
    } catch (apiError) {
      setItemFormError(
        handleApiFailure(
          apiError,
          estaEditando
            ? "No fue posible actualizar el ítem."
            : "No fue posible crear el ítem."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
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
    navigate("/inventario/registrar")
  }

  const abrirConfirmacionBaja = (item) => {
    setItemSeleccionado(item)
    setItemFormError("")
  }

  const cerrarConfirmacionBaja = () => {
    setItemSeleccionado(null)
  }

  const darBajaItem = async () => {
    if (!itemSeleccionado) {
      return false
    }

    setLoading(true)
    setError("")
    setItemFormError("")

    try {
      const data = await deactivateInventoryApi(itemSeleccionado.id)
      const itemActualizado = mapApiInventoryToUi(data)

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemActualizado.id
            ? itemActualizado
            : item
        )
      )

      if (itemSeleccionado.id === itemEditandoId) {
        limpiarItemForm()
      }

      cerrarConfirmacionBaja()
      return true
    } catch (apiError) {
      setItemFormError(
        handleApiFailure(
          apiError,
          "No fue posible inactivar el ítem."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  const activarItem = async (itemSeleccionadoParaActivar) => {
    setLoading(true)
    setError("")
    setItemFormError("")

    try {
      const data = await updateInventoryApi(
        itemSeleccionadoParaActivar.id,
        {
          estado: "ACTIVO",
        }
      )
      const itemActualizado = mapApiInventoryToUi(data)

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemActualizado.id
            ? itemActualizado
            : item
        )
      )

      return true
    } catch (apiError) {
      setItemFormError(
        handleApiFailure(
          apiError,
          "No fue posible activar el ítem."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  const validarMovementForm = () => {
    const quantity = Number(movementForm.cantidad)
    const reason = movementForm.motivo.trim()

    if (!movementForm.itemId || !movementForm.tipo || !reason) {
      return "Completa ítem, tipo de movimiento, cantidad y motivo."
    }

    if (reason.length < 3) {
      return "El motivo debe tener mínimo 3 caracteres."
    }

    if (!Number.isFinite(quantity) || quantity === 0) {
      return "La cantidad debe ser un número distinto de cero."
    }

    if (
      (movementForm.tipo === "entrada" ||
        movementForm.tipo === "salida") &&
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

    return ""
  }

  const registrarMovimiento = async (event) => {
    event.preventDefault()

    const mensajeError = validarMovementForm()

    if (mensajeError) {
      setMovementFormError(mensajeError)
      return false
    }

    setLoading(true)
    setError("")
    setMovementFormError("")

    try {
      const data = await createInventoryMovementApi(
        buildInventoryMovementPayload(movementForm)
      )
      const nuevoMovimiento = mapApiInventoryMovementToUi(data)

      setMovements((currentMovements) => [
        nuevoMovimiento,
        ...currentMovements,
      ])

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === nuevoMovimiento.itemId
            ? {
                ...item,
                stock: nuevoMovimiento.stockNuevo,
                updatedAt:
                  nuevoMovimiento.createdAt ||
                  item.updatedAt,
              }
            : item
        )
      )

      limpiarMovementForm()
      return true
    } catch (apiError) {
      setMovementFormError(
        handleApiFailure(
          apiError,
          "No fue posible registrar el movimiento."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  const itemColumns = createItemColumns({
    editarItem,
    activarItem,
    abrirConfirmacionBaja,
  })
  const movementColumns = createMovementColumns()

  const contextValue = {
    categoriasInventario,
    estadosInventario,
    tiposMovimientoInventario,
    unidadesInventario,
    items,
    movements,
    loading,
    error,
    itemForm,
    movementForm,
    itemFormError,
    movementFormError,
    itemEditandoId,
    itemSeleccionado,
    filtroInventario,
    setFiltroInventario,
    estaEditando,
    totalItems,
    itemsActivos,
    itemsStockBajo,
    totalStockBajo,
    activeItems,
    itemsFiltrados,
    cargarInventario,
    cargarMovimientos,
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
