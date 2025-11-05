require('./bootstrap');

window.Vue = require('vue');

import Vuetify from '../plugins/vuetify'
import 'vue-search-select/dist/VueSearchSelect.css'
import VueCurrencyFilter from 'vue-currency-filter';

import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import Swal from 'sweetalert2';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

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

Vue.component('abonofactura-component', require('./components/AbonoFactura.vue').default);
Vue.component('agregar-notas', require('./components/AgregarNota.vue').default);
Vue.component('aplicar-filtros', require('./components/AplicarFiltros.vue').default);
Vue.component('combos-component', require('./components/Combos.vue').default);
Vue.component('clientes-component', require('./components/Clientes.vue').default);
Vue.component('crear-cliente', require('./components/CrearClientes.vue').default);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('facturas-component', require('./components/Facturas.vue').default);
Vue.component('facturar-pedidos', require('./components/RealizarFacturas.vue').default);
Vue.component('precioentrada-component', require('./components/PrecioEntrada.vue').default);
Vue.component('realizar-facturas', require('./components/RealizarFacturas.vue').default);
Vue.component('gestioncombos-component', require('./components/Gestioncombos.vue').default);
Vue.component('informacion-final-facturas', require('./components/InformacionFinalFacturas.vue').default);
Vue.component('informacion-pendientes', require('./components/InformacionPendientes.vue').default);
Vue.component('historialfacturas-component', require('./components/HistorialFacturas.vue').default);
Vue.component('historial-pagos', require('./components/HistorialAbonosCobros.vue').default);
Vue.component('home-component', require('./components/Home.vue').default);
Vue.component('informe-calox', require('./components/InformeCalox.vue').default);
Vue.component('informe-facturacion-cartera', require('./components/InformeFacturacionCartera.vue').default);
Vue.component('laboratorio-component', require('./components/Laboratorios.vue').default);
Vue.component('pedidos-calox', require('./components/PedidosCalox.vue').default);
Vue.component('items-component', require('./components/ItemsComponent.vue').default);
Vue.component('login-component', require('./components/Login.vue').default);
Vue.component('loader-component', require('./components/LoaderComponent.vue').default);
Vue.component('llamadas-component', require('./components/Llamadas.vue').default);
Vue.component('modaldetalleproducto-component', require('./components/ModalDetalleProducto.vue').default);
Vue.component('modalitem-component', require('./components/ModalItem.vue').default);
Vue.component('modalfacturas-pendientes', require('./components/ModalfacturasPendientes.vue').default);
Vue.component('modalproducto-component', require('./components/ModalProducto.vue').default);
Vue.component('notas-component', require('./components/Notas.vue').default);
Vue.component('stock-component', require('./components/Stock.vue').default);
Vue.component('transferencia-component', require('./components/Transferencia.vue').default);
Vue.component('printransfer-component', require('./components/ImprimirTransferencia.vue').default);
Vue.component('detalleproductos-component', require('./components/DetalleProductos.vue').default);
Vue.component('gestion-pedidos', require('./components/GestionPedidos.vue').default);
Vue.component('productos-component', require('./components/Producto.vue').default);
Vue.component('presentaciones-component', require('./components/Presentaciones.vue').default);
Vue.component('productoscombo-component', require('./components/ProductosCombos.vue').default);
Vue.component('registrar-abonos-cobros', require('./components/RegistrarAbonosCobros.vue').default);
Vue.component('reportes-cartera', require('./components/ReportesCartera.vue').default);
Vue.component('reportes-cobros', require('./components/ReportesAbonos.vue').default);
Vue.component('reportes-directos', require('./components/ReportesDirectos.vue').default);
Vue.component('reportes-ventas', require('./components/ReporteVentas.vue').default);
Vue.component('reportes-facturas-clientes', require('./components/ReportesFacturasClientes.vue').default);
Vue.component('reportes-faltantes', require('./components/Faltantesxpedido.vue').default);
Vue.component('reportes-rotacion-productos', require('./components/RotacionProductos.vue').default);
Vue.component('reportes-ultimo-pedido', require('./components/UltimoPedido.vue').default);
Vue.component('user-component', require('./components/User.vue').default);
Vue.component('view-history-price', require('./components/ViewHistoryPrice.vue').default);
Vue.component('gestion-recibos-caja', require('./components/GestionRecibosCaja.vue').default);
Vue.component('promociones-component', require('./components/PromocionesComponent.vue').default);

const app = new Vue({
    vuetify: Vuetify,
    el: '#app',
});