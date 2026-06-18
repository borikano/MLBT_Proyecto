export const productosVentaMock = [
  {
    id: 1,
    codigo: "VEN-0001",
    nombre: "Taco al pastor",
    categoria: "Tacos",
    precio: 12000,
    estado: "Activo",
    receta: [
      { itemId: 1, cantidad: 1 },
      { itemId: 2, cantidad: 0.15 },
    ],
  },
  {
    id: 2,
    codigo: "VEN-0002",
    nombre: "Quesadilla mixta",
    categoria: "Quesadillas",
    precio: 16000,
    estado: "Activo",
    receta: [
      { itemId: 1, cantidad: 1 },
      { itemId: 3, cantidad: 0.2 },
    ],
  },
  {
    id: 3,
    codigo: "VEN-0003",
    nombre: "Taco de carne asada",
    categoria: "Tacos",
    precio: 14000,
    estado: "Activo",
    receta: [
      { itemId: 1, cantidad: 1 },
      { itemId: 6, cantidad: 0.15 },
    ],
  },
  {
    id: 4,
    codigo: "VEN-0004",
    nombre: "Gaseosa personal",
    categoria: "Bebidas",
    precio: 5000,
    estado: "Activo",
    receta: [{ itemId: 4, cantidad: 1 }],
  },
  {
    id: 5,
    codigo: "VEN-0005",
    nombre: "Agua fresca",
    categoria: "Bebidas",
    precio: 6000,
    estado: "Activo",
    receta: [{ itemId: 5, cantidad: 0.5 }],
  },
]

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

export const ventasMock = [
  {
    id: 1,
    saleNumber: "VTA-0001",
    fechaHora: "2026-06-18T10:15:00",
    fecha: "2026-06-18",
    hora: "10:00",
    tipoVenta: "Mesa",
    metodoPagoSegmento: "efectivo",
    metodoPago: "Efectivo",
    cliente: "Cliente mostrador",
    usuario: "Administrador MLBT",
    estado: "Confirmada",
    items: [
      {
        productId: 1,
        productName: "Taco al pastor",
        quantity: 2,
        unitPrice: 12000,
        subtotal: 24000,
      },
      {
        productId: 4,
        productName: "Gaseosa personal",
        quantity: 1,
        unitPrice: 5000,
        subtotal: 5000,
      },
    ],
    total: 29000,
  },
  {
    id: 2,
    saleNumber: "VTA-0002",
    fechaHora: "2026-06-18T13:45:00",
    fecha: "2026-06-18",
    hora: "13:00",
    tipoVenta: "Para llevar",
    metodoPagoSegmento: "transferencias",
    metodoPago: "Transferencia bancaria",
    cliente: "Pedido rápido",
    usuario: "Administrador MLBT",
    estado: "Confirmada",
    items: [
      {
        productId: 2,
        productName: "Quesadilla mixta",
        quantity: 1,
        unitPrice: 16000,
        subtotal: 16000,
      },
      {
        productId: 5,
        productName: "Agua fresca",
        quantity: 1,
        unitPrice: 6000,
        subtotal: 6000,
      },
    ],
    total: 22000,
  },
  {
    id: 3,
    saleNumber: "VTA-0003",
    fechaHora: "2026-06-17T19:20:00",
    fecha: "2026-06-17",
    hora: "19:00",
    tipoVenta: "Domicilio",
    metodoPagoSegmento: "billeteras",
    metodoPago: "Nequi",
    cliente: "Domicilio norte",
    usuario: "Administrador MLBT",
    estado: "Confirmada",
    items: [
      {
        productId: 1,
        productName: "Taco al pastor",
        quantity: 4,
        unitPrice: 12000,
        subtotal: 48000,
      },
      {
        productId: 3,
        productName: "Taco de carne asada",
        quantity: 2,
        unitPrice: 14000,
        subtotal: 28000,
      },
    ],
    total: 76000,
  },
]
