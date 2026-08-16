// Catalogos estaticos de presentacion del modulo Ventas.
// Productos y ventas reales pertenecen a la API.

export const segmentosMetodoPagoVenta = [
  {
    value: "efectivo",
    label: "Efectivo",
    description: "Pago físico en caja",
    metodos: [
      {
        value: "Efectivo",
        label: "Efectivo",
      },
    ],
  },
  {
    value: "tarjetas",
    label: "Tarjetas",
    description: "Pagos con datáfono o tarjeta",
    metodos: [
      {
        value: "Tarjeta débito",
        label: "Tarjeta débito",
      },
      {
        value: "Tarjeta crédito",
        label: "Tarjeta crédito",
      },
    ],
  },
  {
    value: "billeteras",
    label: "Billeteras digitales",
    description: "Pagos por billetera digital",
    metodos: [
      {
        value: "Nequi",
        label: "Nequi",
      },
      {
        value: "Daviplata",
        label: "Daviplata",
      },
    ],
  },
  {
    value: "transferencias",
    label: "Transferencias y PSE",
    description: "Transferencias bancarias o PSE",
    metodos: [
      {
        value: "Transferencia bancaria",
        label: "Transferencia bancaria",
      },
      {
        value: "PSE",
        label: "PSE",
      },
    ],
  },
  {
    value: "pasarelas",
    label: "Pasarelas de pago",
    description: "Pagos digitales por proveedor externo",
    metodos: [
      {
        value: "Wompi",
        label: "Wompi",
      },
      {
        value: "Mercado Pago",
        label: "Mercado Pago",
      },
      {
        value: "PayU",
        label: "PayU",
      },
    ],
  },
]

export const tiposVenta = ["Mesa", "Domicilio", "Para llevar"]
