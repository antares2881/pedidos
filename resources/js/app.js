require('./bootstrap');

window.Vue = require('vue');

import 'vue-search-select/dist/VueSearchSelect.css'
import VueCurrencyFilter from 'vue-currency-filter';

import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import Swal from 'sweetalert2';

import { AlertPlugin } from 'bootstrap-vue/esm/components/alert'
import { BreadcrumbPlugin } from 'bootstrap-vue/esm/components/breadcrumb'
import { ButtonPlugin } from 'bootstrap-vue/esm/components/button'
import { FormCheckboxPlugin } from 'bootstrap-vue/esm/components/form-checkbox'
import { FormSelectPlugin } from 'bootstrap-vue/esm/components/form-select'
import { ModalPlugin } from 'bootstrap-vue/esm/components/modal'
import { PaginationPlugin } from 'bootstrap-vue/esm/components/pagination'

// Bootstrap base styles are supplied once by the application layout.
import 'bootstrap-vue/dist/bootstrap-vue.css'

[
    AlertPlugin,
    BreadcrumbPlugin,
    ButtonPlugin,
    FormCheckboxPlugin,
    FormSelectPlugin,
    ModalPlugin,
    PaginationPlugin
].forEach((plugin) => Vue.use(plugin));

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
const screenImportPromises = {};
const loadScreen = (file) => {
    if (!screenImportPromises[file]) {
        screenImportPromises[file] = import(
            /* webpackChunkName: "screen-[request]" */ `./components/${file}.vue`
        );
    }

    return screenImportPromises[file];
};
const asyncComponent = (file) => () => loadScreen(file);

// Permite que componentes con modales diferidos preparen únicamente su código
// durante tiempo ocioso, sin montarlos ni ejecutar sus consultas HTTP.
window.preloadVueScreen = loadScreen;

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

// Start downloading the next screen while the user is aiming at a menu item.
// The normal full-page navigation remains unchanged, but its JS and shared
// dependencies will already be in the HTTP cache.
const routeScreens = {
    '/laboratorios': 'Laboratorios',
    '/usuarios': 'User',
    '/registrar-abonos': 'RegistrarAbonosCobros',
    '/gestion-recibos': 'GestionRecibosCaja',
    '/gestionar-indirectos': 'InformacionPendientes',
    '/realizar-facturas': 'RealizarFacturas',
    '/agregar-notas': 'AgregarNota',
    '/clientes': 'Clientes',
    '/informe-calox': 'InformeCalox',
    '/informe-facturacion-cartera': 'InformeFacturacionCartera',
    '/inventario-productos': 'Producto',
    '/presentaciones': 'Presentaciones',
    '/promociones': 'PromocionesComponent',
    '/nueva-transferencia': 'Home',
    '/nuevo-pedido-calox': 'PedidosCalox',
    '/cartera': 'ReportesCartera',
    '/reportes-clientes': 'ReportesDirectos',
    '/abonos': 'ReportesAbonos',
    '/faltantes-productos': 'Faltantesxpedido',
    '/reportes-ventas': 'ReporteVentas',
    '/historial-facturas': 'HistorialFacturas',
    '/historial-transferencias': 'Transferencia',
    '/historial-pedidos': 'GestionPedidos'
};

const vuetifyScreenFiles = new Set([
    'Faltantesxpedido', 'Producto', 'Transferencia'
]);
const searchSelectScreenFiles = new Set([
    'Clientes', 'InformeCalox', 'PedidosCalox', 'RegistrarAbonosCobros',
    'ReportesCartera', 'ReportesDirectos', 'User'
]);
const prefetchedAssets = new Set();
const prefetchAsset = (path) => {
    if (prefetchedAssets.has(path)) {
        return;
    }

    prefetchedAssets.add(path);
    const hint = document.createElement('link');
    hint.rel = 'prefetch';
    hint.as = 'script';
    hint.href = path;
    document.head.appendChild(hint);
};
const prefetchScreen = (file) => {
    prefetchAsset(`/js/screen-${file}-vue.js`);

    if (vuetifyScreenFiles.has(file)) {
        prefetchAsset('/js/vendor-vuetify-shared.js');
    }
    if (searchSelectScreenFiles.has(file)) {
        prefetchAsset('/js/vendor-search-select.js');
    }
    if (file === 'Clientes') {
        prefetchAsset('/js/vendor-xlsx.js');
    }
};

document.querySelectorAll('.nav-left-sidebar a[href]').forEach((link) => {
    const path = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '') || '/';
    const file = routeScreens[path];
    if (!file) {
        return;
    }

    let requested = false;
    const preload = () => {
        if (!requested) {
            requested = true;
            prefetchScreen(file);
        }
    };

    link.addEventListener('pointerenter', preload, { once: true, passive: true });
    link.addEventListener('focus', preload, { once: true, passive: true });
    link.addEventListener('touchstart', preload, { once: true, passive: true });
});

// Vuetify is sizeable, so pages which only use Bootstrap should not download it.
// The Blade view exposes its screen as a custom element before Vue mounts.
const vuetifyScreens = new Set([
    'abonofactura-component', 'combos-component', 'detalleproductos-component',
    'example-component', 'facturas-component', 'gestioncombos-component',
    'login-component', 'notas-component', 'precioentrada-component',
    'productos-component', 'productoscombo-component', 'reportes-faltantes',
    // Transferencia renders ImprimirTransferencia, which uses Vuetify dialogs.
    'transferencia-component'
]);

const appRoot = document.getElementById('app');
const screenUsesVuetify = Array.from(appRoot.children).some((element) =>
    vuetifyScreens.has(element.tagName.toLowerCase())
) || Array.from(appRoot.querySelectorAll('*')).some((element) =>
    vuetifyScreens.has(element.tagName.toLowerCase())
);

const mountApp = (vuetify) => new Vue({
    ...(vuetify ? { vuetify } : {}),
    el: '#app',
});

if (screenUsesVuetify) {
    // MDI is only required by Vuetify screens. Keeping it out of the base
    // layout saves the stylesheet and font request on Bootstrap-only pages.
    const mdiStylesheet = document.createElement('link');
    mdiStylesheet.rel = 'stylesheet';
    mdiStylesheet.href = '/assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css';
    document.head.appendChild(mdiStylesheet);

    import(/* webpackChunkName: "vuetify-runtime" */ '../plugins/vuetify')
        .then(({ default: vuetify }) => mountApp(vuetify));
} else {
    mountApp();
}
