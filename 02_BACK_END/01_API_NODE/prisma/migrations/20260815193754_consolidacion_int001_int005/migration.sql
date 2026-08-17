-- AlterTable
ALTER TABLE `productos_inventario` ADD COLUMN `categoria` VARCHAR(60) NULL,
    ADD COLUMN `numeroRegistro` VARCHAR(30) NULL,
    ADD COLUMN `stockMin` DECIMAL(10, 3) NOT NULL DEFAULT 0,
    MODIFY `stock` DECIMAL(10, 3) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `apellidos` VARCHAR(80) NULL,
    ADD COLUMN `documento` VARCHAR(30) NULL,
    ADD COLUMN `nombres` VARCHAR(80) NULL,
    ADD COLUMN `numeroRegistro` VARCHAR(30) NULL,
    ADD COLUMN `sessionVersion` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `telefono` VARCHAR(30) NULL,
    MODIFY `estado` ENUM('ACTIVO', 'PENDIENTE_APROBACION', 'PENDIENTE_BAJA', 'RETIRADO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE `ventas` ADD COLUMN `cliente` VARCHAR(120) NOT NULL DEFAULT 'Cliente mostrador',
    ADD COLUMN `estado` ENUM('CONFIRMADA', 'ANULADA') NOT NULL DEFAULT 'CONFIRMADA',
    ADD COLUMN `metodoPago` VARCHAR(60) NOT NULL DEFAULT 'Efectivo',
    ADD COLUMN `metodoPagoSegmento` VARCHAR(30) NOT NULL DEFAULT 'efectivo',
    ADD COLUMN `numeroVenta` VARCHAR(30) NULL,
    ADD COLUMN `tipoVenta` VARCHAR(30) NOT NULL DEFAULT 'Mesa',
    MODIFY `producto` VARCHAR(150) NULL,
    MODIFY `cantidad` INTEGER NULL;

-- CreateTable
CREATE TABLE `movimientos_inventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroMovimiento` VARCHAR(30) NULL,
    `productoId` INTEGER NOT NULL,
    `tipo` ENUM('ENTRADA', 'SALIDA', 'AJUSTE') NOT NULL,
    `cantidad` DECIMAL(10, 3) NOT NULL,
    `stockAnterior` DECIMAL(10, 3) NOT NULL,
    `stockNuevo` DECIMAL(10, 3) NOT NULL,
    `motivo` VARCHAR(255) NOT NULL,
    `usuarioId` INTEGER NULL,
    `ventaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `movimientos_inventario_numeroMovimiento_key`(`numeroMovimiento`),
    INDEX `movimientos_inventario_productoId_createdAt_idx`(`productoId`, `createdAt`),
    INDEX `movimientos_inventario_usuarioId_idx`(`usuarioId`),
    INDEX `movimientos_inventario_ventaId_idx`(`ventaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos_venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(30) NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `categoria` VARCHAR(60) NOT NULL DEFAULT 'General',
    `precio` DECIMAL(12, 2) NOT NULL,
    `estado` ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `productos_venta_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recetas_producto_venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoVentaId` INTEGER NOT NULL,
    `productoInventarioId` INTEGER NOT NULL,
    `cantidad` DECIMAL(10, 3) NOT NULL,

    INDEX `recetas_producto_venta_productoInventarioId_idx`(`productoInventarioId`),
    UNIQUE INDEX `recetas_producto_venta_productoVentaId_productoInventarioId_key`(`productoVentaId`, `productoInventarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta_detalles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ventaId` INTEGER NOT NULL,
    `productoVentaId` INTEGER NULL,
    `codigoProducto` VARCHAR(30) NULL,
    `nombreProducto` VARCHAR(150) NOT NULL,
    `categoria` VARCHAR(60) NULL,
    `cantidad` INTEGER NOT NULL,
    `precioUnitario` DECIMAL(12, 2) NOT NULL,
    `subtotal` DECIMAL(12, 2) NOT NULL,

    INDEX `venta_detalles_ventaId_idx`(`ventaId`),
    INDEX `venta_detalles_productoVentaId_idx`(`productoVentaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NULL,
    `role` VARCHAR(40) NULL,
    `modulo` VARCHAR(40) NOT NULL,
    `accion` VARCHAR(80) NOT NULL,
    `resultado` VARCHAR(20) NOT NULL,
    `entidad` VARCHAR(60) NULL,
    `entidadId` VARCHAR(80) NULL,
    `motivo` VARCHAR(255) NULL,
    `requestId` VARCHAR(64) NULL,
    `ip` VARCHAR(64) NULL,
    `metadata` JSON NULL,

    INDEX `audit_events_createdAt_idx`(`createdAt`),
    INDEX `audit_events_usuarioId_createdAt_idx`(`usuarioId`, `createdAt`),
    INDEX `audit_events_modulo_accion_createdAt_idx`(`modulo`, `accion`, `createdAt`),
    INDEX `audit_events_requestId_idx`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `productos_inventario_numeroRegistro_key` ON `productos_inventario`(`numeroRegistro`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_numeroRegistro_key` ON `usuarios`(`numeroRegistro`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_documento_key` ON `usuarios`(`documento`);

-- CreateIndex
CREATE UNIQUE INDEX `ventas_numeroVenta_key` ON `ventas`(`numeroVenta`);

-- CreateIndex
CREATE INDEX `ventas_fecha_idx` ON `ventas`(`fecha`);

-- AddForeignKey
ALTER TABLE `movimientos_inventario` ADD CONSTRAINT `movimientos_inventario_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos_inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimientos_inventario` ADD CONSTRAINT `movimientos_inventario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimientos_inventario` ADD CONSTRAINT `movimientos_inventario_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `ventas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recetas_producto_venta` ADD CONSTRAINT `recetas_producto_venta_productoVentaId_fkey` FOREIGN KEY (`productoVentaId`) REFERENCES `productos_venta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recetas_producto_venta` ADD CONSTRAINT `recetas_producto_venta_productoInventarioId_fkey` FOREIGN KEY (`productoInventarioId`) REFERENCES `productos_inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta_detalles` ADD CONSTRAINT `venta_detalles_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `ventas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta_detalles` ADD CONSTRAINT `venta_detalles_productoVentaId_fkey` FOREIGN KEY (`productoVentaId`) REFERENCES `productos_venta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_events` ADD CONSTRAINT `audit_events_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `ventas_usuarioId_idx` ON `ventas`(`usuarioId`);
