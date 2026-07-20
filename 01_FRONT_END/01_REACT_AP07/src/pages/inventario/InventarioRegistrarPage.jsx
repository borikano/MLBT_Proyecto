import { useInventarioModule } from "@/features/inventario/useInventarioModule"

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

export default function InventarioRegistrarPage() {
  const {
    categoriasInventario,
    estadosInventario,
    unidadesInventario,
    itemForm,
    itemFormError,
    estaEditando,
    limpiarItemForm,
    updateItemFormField,
    handleItemInputChange,
    guardarItem,
  } = useInventarioModule()

  return (
    <section className="min-w-0 space-y-5">
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
    </section>
  )
}
