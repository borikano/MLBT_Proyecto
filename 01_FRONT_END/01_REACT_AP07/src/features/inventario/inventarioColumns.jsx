import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"
import { Button } from "@/components/ui/button"

import {
  getStatusClass,
  getStockAlert,
  getStockAlertClass,
} from "./inventarioLogic"
export function createItemColumns({
  editarItem,
  activarItem,
  abrirConfirmacionBaja,
}) {
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
            <PermissionGate permission={PERMISSIONS.INVENTORY_UPDATE}><Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editarItem(item)}
            >
              Editar
            </Button></PermissionGate>

            {item.estado === "Inactivo" ? (
              <PermissionGate permission={PERMISSIONS.INVENTORY_UPDATE}><Button
                type="button"
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => activarItem(item)}
              >
                Activar
              </Button></PermissionGate>
            ) : (
              <PermissionGate permission={PERMISSIONS.INVENTORY_UPDATE}><Button
                type="button"
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                onClick={() => abrirConfirmacionBaja(item)}
              >
                Dar baja
              </Button></PermissionGate>
            )}
          </div>
        )
      },
    },
  ]

  return itemColumns
}

export function createMovementColumns() {
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

  return movementColumns
}
