import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import DataTable from "@/components/shared/DataTable"

const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
]

describe("DataTable", () => {
  it("muestra encabezados y registros", () => {
    render(
      <DataTable
        columns={columns}
        data={[{ nombre: "Tortilla", estado: "Activo" }]}
      />
    )

    expect(screen.getByRole("columnheader", { name: "Nombre" })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Estado" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Tortilla" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Activo" })).toBeInTheDocument()
  })

  it("muestra mensaje de estado vacio", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No hay insumos registrados."
      />
    )

    expect(screen.getByText("No hay insumos registrados.")).toBeInTheDocument()
  })
})
