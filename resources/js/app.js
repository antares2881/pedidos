require('./bootstrap');

window.Vue = require('vue');

import Vuetify from '../plugins/vuetify'
import 'vue-search-select/dist/VueSearchSelect.css'
import VueCurrencyFilter from 'vue-currency-filter';

import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import Swal from 'sweetalert2';

import { BootstrapVue } from 'bootstrap-vue'

// Bootstrap base styles are supplied once by the application layout.
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

const pluginOptions = {
    globalOptions: { currency: {prefix: '$'}, locale: 'ES' , precision: 0, valueRange: { min: 0 }}
}

Vue.use(VueCurrencyInput, pluginOptions);
window.Swal = Swal;

Vue.use(VueCurrencyFilter, {
    symbol: '$', // El símbolo, por ejemplo €
    fractionCount: 0, // ¿Cuántos decimales mostrar?
    fractionSeparator: ',', // Separador de decimales
    symbolPosition: 'front', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
    symbolSpacing: true // Indica si debe poner un espacio entre el símbolo y la cantidad
});

// Load only the component used by the current Blade view. Previously every page
// parsed all 50 screens up front, producing an almost 10 MB entry bundle.
const asyncComponent = (file) => () => import(
    /* webpackChunkName: "screen-[request]" */ `./components/${file}.vue`
);

const screens = {
    'abonofactura-component': 'AbonoFactura', 'agregar-notas': 'AgregarNota',
    'aplicar-filtros': 'AplicarFiltros', 'combos-component': 'Combos',
    'clientes-component': 'Clientes', 'crear-cliente': 'CrearClientes',
    'example-component': 'ExampleComponent', 'facturas-component': 'Facturas',
    'facturar-pedidos': 'RealizarFacturas', 'precioentrada-component': 'PrecioEntrada',
    'realizar-facturas': 'RealizarFacturas', 'gestioncombos-component': 'Gestioncombos',
    'informacion-final-facturas': 'InformacionFinalFacturas',
    'informacion-pendientes': 'InformacionPendientes',
    'historialfacturas-component': 'HistorialFacturas', 'historial-pagos': 'HistorialAbonosCobros',
    'home-component': 'Home', 'informe-calox': 'InformeCalox',
    'informe-facturacion-cartera': 'InformeFacturacionCartera',
    'laboratorio-component': 'Laboratorios', 'pedidos-calox': 'PedidosCalox',
    'items-component': 'ItemsComponent', 'login-component': 'Login',
    'loader-component': 'LoaderComponent', 'llamadas-component': 'Llamadas',
    'modaldetalleproducto-component': 'ModalDetalleProducto', 'modalitem-component': 'ModalItem',
    'modalfacturas-pendientes': 'ModalfacturasPendientes', 'modalproducto-component': 'ModalProducto',
    'notas-component': 'Notas', 'stock-component': 'Stock',
    'transferencia-component': 'Transferencia', 'printransfer-component': 'ImprimirTransferencia',
    'detalleproductos-component': 'DetalleProductos', 'gestion-pedidos': 'GestionPedidos',
    'productos-component': 'Producto', 'presentaciones-component': 'Presentaciones',
    'productoscombo-component': 'ProductosCombos', 'registrar-abonos-cobros': 'RegistrarAbonosCobros',
    'reportes-cartera': 'ReportesCartera', 'reportes-cobros': 'ReportesAbonos',
    'reportes-directos': 'ReportesDirectos', 'reportes-ventas': 'ReporteVentas',
    'reportes-facturas-clientes': 'ReportesFacturasClientes',
    'reportes-faltantes': 'Faltantesxpedido', 'reportes-rotacion-productos': 'RotacionProductos',
    'reportes-ultimo-pedido': 'UltimoPedido', 'user-component': 'User',
    'view-history-price': 'ViewHistoryPrice', 'gestion-recibos-caja': 'GestionRecibosCaja',
    'promociones-component': 'PromocionesComponent'
};

Object.entries(screens).forEach(([name, file]) => Vue.component(name, asyncComponent(file)));

const app = new Vue({
    vuetify: Vuetify,
    el: '#app',
});
