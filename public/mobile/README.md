# Pedidos Móvil

Aplicación web progresiva (PWA) optimizada para teléfonos y conectada al backend Laravel de Pedidos.

## Instalación

1. Copie el contenido de esta carpeta a `public/mobile` dentro de la aplicación Laravel.
2. Abra `https://su-servidor/mobile/` desde el teléfono.
3. Use **Instalar app** en el menú del navegador.

La aplicación debe publicarse en el mismo dominio que Laravel para reutilizar de forma segura la sesión y la protección CSRF. No requiere `npm install` ni compilación.

## Funciones

- Inicio de sesión contra Laravel.
- Panel con pedidos recientes y métricas rápidas.
- Creación de pedidos en tres pasos.
- Búsqueda por producto, código o laboratorio.
- Carrito con cantidades, bonificación y precio editable.
- Borrador automático local y recuperación después de cerrar la app.
- Historial de pedidos con filtros y detalle.
- Consulta rápida de inventario y clientes.
- Caché de interfaz para apertura rápida y modo sin conexión del borrador.

## Configuración

Por defecto se usa el mismo origen del sitio. Si se sirve desde otra ruta, cambie `API_BASE` en `js/app.js`. Para producción use HTTPS, requisito de instalación de las PWA.

