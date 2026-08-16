import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"
import { useInventarioModule } from "@/features/inventario/useInventarioModule"
import DataTable from "@/components/shared/DataTable"

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

export default function InventarioMovimientosPage() {
  const {
    tiposMovimientoInventario,
    loading,
    error,
    movementForm,
    movementFormError,
    activeItems,
    updateMovementFormField,
    handleMovementInputChange,
    registrarMovimiento,
    movements,
    movementColumns,
  } = useInventarioModule()

  return (
    <section className="min-w-0 space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <CardTitle
            id="movimiento-inventario"
            className="scroll-mt-6 text-lg text-[#7c2d12]"
          >
            Registrar movimiento
          </CardTitle>
          <CardDescription>
            La API registra entradas, salidas o ajustes y actualiza el stock
            transaccionalmente.
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
                  step="any"
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
                  placeholder="Mínimo 3 caracteres"
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
              <PermissionGate permission={PERMISSIONS.INVENTORY_MOVE}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7c2d12] hover:bg-[#9a3412]"
                >
                  {loading
                    ? "Registrando..."
                    : "Registrar movimiento"}
                </Button>
              </PermissionGate>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-lg text-[#7c2d12]">
            Historial de movimientos
          </CardTitle>
          <CardDescription>
            Movimientos persistidos y consultados desde la API MLBT.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          {loading && movements.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Cargando movimientos...
            </p>
          ) : (
            <DataTable
              columns={movementColumns}
              data={movements}
              emptyMessage="No hay movimientos registrados."
            />
          )}
        </CardContent>
      </Card>
    </section>
  )
}
