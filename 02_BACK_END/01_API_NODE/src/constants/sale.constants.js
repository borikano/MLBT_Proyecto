const tiposVenta = ["Mesa", "Domicilio", "Para llevar"];

const segmentosPago = [
  "efectivo",
  "tarjetas",
  "billeteras",
  "transferencias",
  "pasarelas"
];

const metodosPorSegmento = {
  efectivo: ["Efectivo"],
  tarjetas: ["Tarjeta debito", "Tarjeta credito", "Tarjeta débito", "Tarjeta crédito"],
  billeteras: ["Nequi", "Daviplata"],
  transferencias: ["Transferencia bancaria", "PSE"],
  pasarelas: ["Wompi", "Mercado Pago", "PayU"]
};

function isValidPaymentMethod(segmento, metodo) {
  const metodos = metodosPorSegmento[segmento] || [];
  return metodos.includes(metodo);
}

export {
  tiposVenta,
  segmentosPago,
  metodosPorSegmento,
  isValidPaymentMethod
};