<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Cookie
Route::get('/cookieSession', function(){
    session()->regenerate();
    $cookie = $_COOKIE;
    return json_encode($cookie);
});

Route::get('/', function () {
    return view('auth/login');
});

Auth::routes();

// Abono pedidos calox
Route::post('/abono-pedidos', 'AbonopedidoController@store2');
Route::get('/abonos/{venta_id}', 'AbonopedidoController@show');
Route::get('/registrar-abonos', 'AbonopedidoController@index');
Route::get('/facturas-directos-consaldo/{cliente_id}', 'AbonopedidoController@getFacturasConSaldoDirectos');
Route::get('/facturas-indirectos-consaldo/{cliente_id}', 'AbonopedidoController@getFacturasConSaldoIndirectos');

// Base retenciones
Route::get('/baseretenciones/{anio}', 'BaseretencioneController@show');

// Categorias
Route::get('/categorias', 'CategoriaController@index');

// Cobros clientes indirectos
Route::get('/cobros/{factura_id}', 'CobroController@show');
Route::post('/cobros', 'CobroController@store2');

// Comprobante pagos
Route::get('/comprobante/{factura_id}', 'CobroController@total');

// Combos
Route::get('/gestion-combos', 'ComboController@gestionCombos');
Route::get('/combos', 'ComboController@index');
Route::get('/combos/{id}', 'ComboController@show');
Route::post('/combos', 'ComboController@store');
Route::post('/armar-combo', 'ComboController@armarCombo');
Route::post('/dividir-combo', 'ComboController@dividirCombo');
Route::get('/prueba-combos', 'ComboController@prueba');

// Composiciones
Route::get('/composiciones', 'ComposicioneController@index');

// Consecutivos
Route::get('/consecutivo-pedidos-calox', 'VentaController@consecutivoPedido');
Route::get('/consecutivo-transferencias', 'TransferenciaController@consecutivoTransferencia');
Route::get('/consecutivo-recibo-caja', 'CobroController@consecutivoRecibo');
Route::get('/consecutivo-recibo-caja-calox', 'AbonopedidoController@consecutivoRecibo');

// Clientes
Route::get('/clientes', 'ClienteController@index');
Route::get('/clientes/{id}', 'ClienteController@show');
Route::put('/clientes/{id}', 'ClienteController@update');
Route::get('/getCliente', 'ClienteController@getCliente');
Route::post('/clientes', 'ClienteController@store');

// Detalle productos
Route::get('/detalleproductos', 'DetalleproductoController@index');
Route::post('/detalle-productos', 'DetalleproductoController@store');
Route::put('/detalle-productos/{id}', 'DetalleproductoController@update');
Route::get('/movimientos-producto/{cliente_id}/{producto_id}', 'DetalleproductoController@movimientosProducto');
Route::get('/productos', 'ProductoController@index');

Route::get('/fechaentradas/{producto}', 'FechaentradaController@buscarPrecioEntrada');

// Facturas
Route::get('/num-factura', 'FacturaController@numeroFactura');
Route::get('/find-factura/{id}', 'FacturaController@findFactura');
Route::get('/realizar-facturas/{num?}', 'FacturaController@doBill');
Route::get('/facturas', 'FacturaController@index');
Route::post('/facturas', 'FacturaController@store');
Route::put('/facturas/{id}', 'FacturaController@update');
Route::put('/cancel-facturas/{id}', 'FacturaController@cancelFactura');
Route::get('/historial-facturas', 'FacturaController@historialFacturacion');
Route::get('/imprimir-factura/{id}', 'FacturaController@imprimirFactura');

Route::get('/gestionar-indirectos', 'FacturaController@informacionPendientes');

// Informes
Route::get('/informe-calox', 'InformeController@index');
Route::get('/informe-facturacion-cartera', 'InformeController@cartera');
Route::get('/generar-excel/{fecha_i}/{fecha_f}/{lab_id}', 'InformeController@descargarExcelCalox');
Route::get('/generar-excel-cartera/{fecha}', 'InformeController@descargarExcelCartera');
Route::get('/generar-informe-ventas/{fecha_i}/{fecha_f}/{lab_id}', 'InformeController@generarInformeVentas');
Route::get('/generar-informe-cobros/{fecha_i}/{fecha_f}/{lab_id}', 'InformeController@generarInformeCobros');
Route::get('/generar-informe-transferencia/{fecha_i}/{fecha_f}/{lab_id}', 'InformeController@generarInformeTransferencias');

// Inventario
Route::get('/descargar-inventario', 'InventarioController@descargarInventario');
Route::get('/imprimir-pedido-calox/{tipo}/{id}', 'InventarioController@imprimirPedidoCalox');
Route::get('/productos-ventas/{id}', 'InventarioController@showProductosVenta');

Route::get('/inventario-productos', 'InventarioController@stocks');

// Listado de precios
Route::get('/listas-precios/{id}', 'ListaprecioController@show');
Route::get('/view-history-price/{codigo}', 'ListaprecioController@historyPrice');
Route::post('/new-item', 'ListaprecioController@store');
Route::put('/update-item/{codigo}', 'ListaprecioController@update');

// Municipios
Route::get('/municipios', 'MunicipioController@index');

// Notas
Route::get('/agregar-notas', 'NotaController@index');
Route::get('/numero-nota', 'NotaController@numero_nota');
Route::get('/consecutivo-nota/{tipofactura_id}', 'NotaController@getConsecutivo');
Route::get('/productos-nota/{id}', 'NotaController@productos');
Route::post('/notas', 'NotaController@store');
Route::put('/notas/{id}', 'NotaController@update');
Route::get('/imprimir-notas/{id}/{tipocliente}', 'NotaController@imprimirNota');

// Pedidos
Route::get('/nuevo-pedido-calox', 'InventarioController@pedidosCalox');
Route::get('/historial-pedidos', 'VentaController@index');
Route::get('/pedidos-calox/{id}', 'InventarioController@findPedidosCalox');
Route::post('/pedidos-calox', 'InventarioController@store');
Route::put('/pedidos-calox/{id}', 'InventarioController@update');

// Porcentaje
Route::get('/porcentaje', 'PorcentajeController@index');

// Presentaciones
Route::get('/presentaciones', 'PresentacioneController@index');
Route::post('/presentaciones', 'PresentacioneController@store');
Route::put('/presentaciones/{id}', 'PresentacioneController@update');

// Promociones
Route::get('/promociones', 'PromocionController@index');
Route::post('/promociones/importar', 'PromocionController@importarExcel');
Route::get('/promociones/descargar/{id}', 'PromocionController@descargarArchivo');
Route::get('/promociones/visualizar/{id}', 'PromocionController@visualizarArchivo');

// Productos
Route::get('/productos', 'ProductoController@index');
Route::get('/productos/{id}', 'ProductoController@show');
Route::post('/productos', 'ProductoController@store');
Route::put('/productos/{id}', 'ProductoController@update');

// Productos-combo
Route::get('/productos-combo', 'ProductoscomboController@index');
Route::get('/productos-combo/{id}', 'ProductoscomboController@getComboProducto');
Route::post('/productos-combo', 'ProductoscomboController@store');

// Producto transferencias
Route::get('/producto-transferencias/{id}', 'ProductotransferenciaController@show');

//Productos facturas
Route::get('/productos-factura/{id}', 'FacturaproductoController@show');

// Recibo de caja
Route::get('/recibo-caja/{num_recibo}', 'CobroController@imprimirRecibo2');

//Remision
Route::get('/imprimir-remision/{id}', 'TransferenciaController@imprimirRemision');

// Reportes
Route::get('/cartera', 'ReporteController@cartera');
Route::get('/reportes-clientes', 'ReporteController@clientes');
Route::get('/reportes-ventas', 'ReporteController@ventas');
Route::get('/abonos', 'ReporteController@abonos');
Route::get('/faltantes-productos', 'ReporteController@faltantesxcliente');
Route::post('/reportes-ventas', 'ReporteController@reporteVentas');
Route::post('/faltantes-productos', 'ReporteController@reportefaltantesxcliente');
Route::get('/faltantes-pedidos', 'ReporteController@productos_pendientes_transferencias');
Route::post('/reporte-cartera', 'ReporteController@reporteCartera');
Route::post('/reporte-abonos', 'ReporteController@reporteAbonos');
Route::post('/reportes-clientes', 'ReporteController@reporteClientes');

// Tipo lista precios
Route::get('/tipos-lista-precios', 'TipolistaController@index');

// Transferencias
Route::get('/historial-transferencias', 'TransferenciaController@index');
Route::get('/transferencias-pendientes', 'TransferenciaController@pendientes');
Route::get('/numero-transferencia/{id}', 'TransferenciaController@findNumberTransferencia');
Route::get('/imprimir-transferencia/{id}', 'TransferenciaController@imprimirTransferencia');
Route::post('/transferencias', 'TransferenciaController@store');
Route::put('/transferencias/{id}', 'TransferenciaController@update');
Route::put('/estado-transferencias/{id}', 'TransferenciaController@updateState');
Route::get('/nueva-transferencia/{num?}', 'TransferenciaController@nueva_vista')->name('nueva-transferencia');

// Users
Route::get('/usuarios', 'UserController@index');
Route::get('/updatePassword', 'UserController@update_password')->name('updatePassword');
Route::post('/updatePassword', 'UserController@reset_password')->name('updatePassword');
Route::put('/usuarios/{id}', 'UserController@update');
Route::get('/getUser', 'UserController@getUser');
Route::post('/usuarios', 'UserController@store');

// Ventas
Route::get('/ventas-pendientes', 'VentaController@pendientes_facturar');

//Laboratorios
Route::get('/laboratorios', 'LaboratorioController@index');
Route::post('/laboratorios', 'LaboratorioController@store');
Route::put('/laboratorios/{id}', 'LaboratorioController@update');
Route::get('/laboratorio-image/{filename}', 'LaboratorioController@getImage');

// Gestión Recibos de Caja
Route::get('/gestion-recibos', 'CobroController@gestionRecibos');
Route::get('/cobro/{num_recibo}', 'CobroController@obtenerReciboPorNumero');
Route::get('/abono/{num_recibo}', 'AbonopedidoController@obtenerReciboPorNumero');
Route::put('/cancelar-cobro/{num_recibo}', 'CobroController@cancelarRecibo');
Route::put('/cancelar-abono/{num_recibo}', 'AbonopedidoController@cancelarRecibo');
