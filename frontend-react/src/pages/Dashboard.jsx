import domicilioImg from "@/assets/mlbt/ui/domicilio.png"
import horarioImg from "@/assets/mlbt/ui/horario.png"
import registroImg from "@/assets/mlbt/ui/registro-nuevo.png"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const metricas = [
  {
    titulo: "Ventas del día",
    valor: "$ 420.000",
    descripcion: "Valor mockeado para validar el dashboard.",
  },
  {
    titulo: "Productos activos",
    valor: "18",
    descripcion: "Inventario simulado de la taquería.",
  },
  {
    titulo: "Usuarios registrados",
    valor: "6",
    descripcion: "Usuarios administrativos mockeados.",
  },
  {
    titulo: "Pedidos pendientes",
    valor: "4",
    descripcion: "Pedidos simulados para seguimiento interno.",
  },
]

const accesosRapidos = [
  {
    titulo: "Atención a domicilio",
    descripcion: "Control visual de pedidos y entregas simuladas.",
    imagen: domicilioImg,
  },
  {
    titulo: "Horario de atención",
    descripcion: "Referencia visual para operación de la taquería.",
    imagen: horarioImg,
  },
  {
    titulo: "Registro administrativo",
    descripcion: "Base visual para la gestión de usuarios del sistema.",
    imagen: registroImg,
  },
]

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Panel principal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#7c2d12]">
          Dashboard MLBT
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Resumen administrativo mockeado para la primera iteración del frontend
          de María La Bonita Taquería.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricas.map((metrica) => (
          <Card key={metrica.titulo} className="border-[#f1d4bd]">
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

      <div className="grid gap-4 lg:grid-cols-3">
        {accesosRapidos.map((item) => (
          <Card key={item.titulo} className="overflow-hidden border-[#f1d4bd]">
            <div className="flex h-40 items-center justify-center bg-[#1c120d] p-6">
              <img
                src={item.imagen}
                alt={item.titulo}
                className="h-full w-full object-contain"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-xl text-[#7c2d12]">
                {item.titulo}
              </CardTitle>
              <CardDescription>{item.descripcion}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
