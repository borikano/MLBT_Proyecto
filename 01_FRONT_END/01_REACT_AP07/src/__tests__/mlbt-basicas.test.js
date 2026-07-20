import { describe, expect, it } from 'vitest';

function calcularTotalPedido(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

describe('Pruebas basicas MLBT', () => {
  it('calcula el total de un pedido de ventas', () => {
    const items = [
      { precio: 12000, cantidad: 2 },
      { precio: 8000, cantidad: 1 }
    ];

    const total = calcularTotalPedido(items);

    expect(total).toBe(32000);
  });

  it('valida que la API publica responda el endpoint health', async () => {
    const response = await fetch('https://mlbt-proyecto.onrender.com/api/health');
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  }, 30000);
});
