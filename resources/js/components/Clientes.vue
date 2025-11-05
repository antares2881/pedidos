<template>
    <v-app>
        <div class="clientes-container">
            <!-- Professional Loading State -->
            <div v-if="loader" class="loading-container">
                <div class="loading-content">
                    <div class="professional-loader">
                        <div class="loader-spinner"></div>
                        <div class="loader-pulse"></div>
                    </div>
                    <div class="loading-text">
                        <h5 class="loading-title">Cargando clientes...</h5>
                        <p class="loading-subtitle">Obteniendo información de clientes del sistema...</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="clientes-content">
                <crear-cliente ref="crearCliente" @cliente_id="clienteNew"/>
                
                <!-- Modal Movimientos de Productos -->
                <div class="modal fade" id="movimientosModal" tabindex="-1" role="dialog" aria-labelledby="movimientosModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">
                            <div class="modal-header bg-gradient-turquesa">
                                <h5 class="modal-title text-white" id="movimientosModalLabel">
                                    <i class="fas fa-chart-line mr-2"></i>
                                    Movimientos de Productos - {{ clienteSeleccionado.razon_social }}
                                </h5>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <!-- Selector de Productos -->
                                <div class="form-group mb-4">
                                    <label for="productoSelect" class="form-label">
                                        <i class="fas fa-search mr-2 text-turquesa"></i>
                                        Seleccionar Producto
                                    </label>
                                    <basic-select
                                        :options="productosOptions"
                                        id="productoSelect"
                                        placeholder="Buscar producto por nombre..."
                                        :selected-option="productoSeleccionado"
                                        @select="selectProducto"
                                        v-model="movimientos.producto_id"
                                    ></basic-select>
                                </div>

                                <!-- Loading de productos -->
                                <div v-if="loadingProductos" class="text-center my-4">
                                    <div class="spinner-border text-turquesa" role="status">
                                        <span class="sr-only">Cargando productos...</span>
                                    </div>
                                    <p class="mt-2 text-muted">Cargando productos...</p>
                                </div>

                                <!-- Información del producto seleccionado -->
                                <div v-if="productoSeleccionado.value" class="producto-info-card mb-4">
                                    <div class="card border-turquesa">
                                        <div class="card-header bg-light">
                                            <h6 class="mb-0">
                                                <i class="fas fa-info-circle text-turquesa mr-2"></i>
                                                Información del Producto
                                            </h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <p><strong>Código:</strong> {{ productoSeleccionado.codigo }}</p>
                                                    <p><strong>Precio:</strong> {{ productoSeleccionado.precio | currency }}</p>
                                                </div>
                                                <div class="col-md-6">
                                                    <p><strong>Stock:</strong> {{ productoSeleccionado.stock }}</p>
                                                    <p><strong>Presentación:</strong> {{ productoSeleccionado.presentacion }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Historial de movimientos -->
                                <div v-if="productoSeleccionado.value" class="movimientos-section">
                                    <h6 class="mb-3">
                                        <i class="fas fa-history text-turquesa mr-2"></i>
                                        Historial de Movimientos
                                    </h6>
                                    
                                    <!-- Loading de movimientos -->
                                    <div v-if="movimientos.loading" class="text-center my-4">
                                        <div class="spinner-border text-turquesa" role="status">
                                            <span class="sr-only">Cargando movimientos...</span>
                                        </div>
                                        <p class="mt-2 text-muted">Cargando historial de movimientos...</p>
                                    </div>
                                    
                                    <!-- Tabla de movimientos -->
                                    <div v-else-if="movimientos.lista.length > 0" class="movimientos-table-container">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover">
                                                <thead class="bg-turquesa text-white">
                                                    <tr>
                                                        <th><i class="fas fa-calendar-alt mr-1"></i>Fecha</th>
                                                        <th><i class="fas fa-file-invoice mr-1"></i>Factura</th>
                                                        <th><i class="fas fa-exchange-alt mr-1"></i>Tipo</th>
                                                        <th><i class="fas fa-sort-numeric-up mr-1"></i>Cantidad</th>
                                                        <th><i class="fas fa-dollar-sign mr-1"></i>Precio</th>
                                                        <th><i class="fas fa-gift mr-1"></i>Bonif./Adic.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="movimiento in movimientos.lista" :key="movimiento.numero_factura + movimiento.tipo_movimiento">
                                                        <td>{{ formatearFecha(movimiento.fecha) }}</td>
                                                        <td>
                                                            <span class="badge badge-outline-primary">
                                                                {{ movimiento.numero_factura }}
                                                            </span>
                                                            <span v-if="movimiento.electronica && movimiento.electronica !== 0" class="badge badge-success ml-1">
                                                                <i class="fas fa-bolt"></i> {{ movimiento.electronica }}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span class="badge" :class="movimiento.tipo_movimiento === 'factura' ? 'badge-primary' : 'badge-success'">
                                                                <i :class="movimiento.tipo_movimiento === 'factura' ? 'fas fa-file-invoice' : 'fas fa-shopping-cart'" class="mr-1"></i>
                                                                {{ movimiento.tipo_movimiento === 'factura' ? 'Factura' : 'Venta' }}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <strong>{{ movimiento.cantidad }}</strong>
                                                        </td>
                                                        <td>{{ formatearPrecio(movimiento.precio_factura) }}</td>
                                                        <td>
                                                            <span v-if="movimiento.bonificacion !== null">
                                                                {{ movimiento.bonificacion }}
                                                            </span>
                                                            <span v-else-if="movimiento.adicionales !== null">
                                                                {{ movimiento.adicionales }}
                                                            </span>
                                                            <span v-else class="text-muted">-</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <!-- Resumen de movimientos -->
                                        <div class="movimientos-summary mt-3">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="summary-card bg-primary">
                                                        <i class="fas fa-file-invoice"></i>
                                                        <div class="summary-info">
                                                            <h6>Facturas</h6>
                                                            <span>{{ contarTipoMovimiento('factura') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="summary-card bg-success">
                                                        <i class="fas fa-shopping-cart"></i>
                                                        <div class="summary-info">
                                                            <h6>Ventas</h6>
                                                            <span>{{ contarTipoMovimiento('venta') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="summary-card bg-turquesa">
                                                        <i class="fas fa-chart-line"></i>
                                                        <div class="summary-info">
                                                            <h6>Total</h6>
                                                            <span>{{ movimientos.lista.length }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Sin movimientos -->
                                    <div v-else class="alert alert-warning">
                                        <i class="fas fa-exclamation-triangle mr-2"></i>
                                        No se encontraron movimientos para este producto y cliente.
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                    <i class="fas fa-times mr-2"></i>
                                    Cerrar
                                </button>
                                <button type="button" class="btn btn-turquesa" @click="descargarExcel" :disabled="!productoSeleccionado.value || movimientos.lista.length === 0">
                                    <i class="fas fa-file-excel mr-2"></i>
                                    Descargar Excel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Header Section -->
                <div class="header-section">
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-6">
                            <div class="page-header">
                                <h2 class="page-title">
                                    <i class="fas fa-users mr-3"></i>
                                    Clientes
                                </h2>
                                <p class="page-description">
                                    Crea, edita y administra los clientes de tu sistema.
                                </p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="header-actions">
                                <div class="search-box">
                                    <i class="fas fa-search search-icon"></i>
                                    <input 
                                        type="text" 
                                        class="form-control search-input" 
                                        v-model="search" 
                                        placeholder="Buscar clientes..."
                                    >
                                </div>
                                <button class="btn btn-primary new-client-btn" @click="newCliente">
                                    <i class="fas fa-plus mr-2"></i>
                                    Nuevo Cliente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Professional Content -->
                <div class="professional-report-container">
                    <!-- Desktop Table -->
                    <div class="desktop-table">
                        <div class="professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-user"></i> Cliente</th>
                                        <th><i class="fas fa-map-marker-alt"></i> Municipio</th>
                                        <th><i class="fas fa-envelope"></i> Email</th>
                                        <th><i class="fas fa-map-pin"></i> Dirección</th>
                                        <th><i class="fas fa-phone"></i> Teléfono</th>
                                        <th><i class="fas fa-circle"></i> Estado</th>
                                        <th><i class="fas fa-cogs"></i> Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="cliente in paginatedClientes" :key="cliente.id">
                                        <td class="client-cell">
                                            <div class="client-name">
                                                <i class="fas fa-user client-icon"></i>
                                                <span class="name-text">{{ cliente.razon_social }}</span>
                                            </div>
                                        </td>
                                        <td class="municipio-cell">{{ cliente.municipio }}</td>
                                        <td class="email-cell">{{ cliente.email }}</td>
                                        <td class="direccion-cell">{{ cliente.direccion }}</td>
                                        <td class="telefono-cell">{{ cliente.telefono }}</td>
                                        <td class="status-cell">
                                            <span class="status-badge" :class="cliente.estado === 'Activo' ? 'status-active' : 'status-inactive'">
                                                <i class="fas fa-circle status-dot"></i>
                                                {{ cliente.estado }}
                                            </span>
                                        </td>
                                        <td class="actions-cell">
                                            <div class="action-buttons">
                                                <button class="action-btn btn-edit" @click="editCliente(cliente)" title="Editar cliente">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="action-btn btn-movements" @click="verMovimientos(cliente)" title="Ver movimientos de productos">
                                                    <i class="fas fa-chart-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Mobile Cards -->
                    <div class="mobile-cards-container">
                        <div v-for="cliente in paginatedClientes" :key="cliente.id" class="client-card">
                            <div class="card-header">
                                <div class="client-info">
                                    <div class="client-details">
                                        <div class="client-name-mobile">{{ cliente.razon_social }}</div>
                                        <div class="municipio-mobile">{{ cliente.municipio }}</div>
                                    </div>
                                </div>
                                <span class="status-badge-mobile" :class="cliente.estado === 'Activo' ? 'status-active' : 'status-inactive'">
                                    <i class="fas fa-circle status-dot"></i>
                                    {{ cliente.estado }}
                                </span>
                            </div>
                            <div class="card-body">
                                <div class="info-row">
                                    <i class="fas fa-envelope"></i>
                                    <span>{{ cliente.email }}</span>
                                </div>
                                <div class="info-row">
                                    <i class="fas fa-map-pin"></i>
                                    <span>{{ cliente.direccion }}</span>
                                </div>
                                <div class="info-row">
                                    <i class="fas fa-phone"></i>
                                    <span>{{ cliente.telefono }}</span>
                                </div>
                            </div>
                            <div class="actions-section">
                                <button class="mobile-action-btn edit-btn" @click="editCliente(cliente)">
                                    <i class="fas fa-edit"></i>
                                    Editar Cliente
                                </button>
                                <button class="mobile-action-btn movements-btn" @click="verMovimientos(cliente)">
                                    <i class="fas fa-chart-line"></i>
                                    Ver Movimientos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination Section -->
                    <div class="pagination-section">
                        <div class="pagination-info">
                            <div class="items-per-page">
                                <span class="pagination-label">Mostrar:</span>
                                <select class="items-select" v-model="itemsPerPage" @change="changeItemsPerPage">
                                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                            <div class="page-info-text">
                                Mostrando {{ paginationInfo.start }} - {{ paginationInfo.end }} de {{ paginationInfo.total }} clientes
                            </div>
                        </div>
                        <div class="pagination-controls">
                            <button class="pagination-btn prev-btn" @click="prevPage" :disabled="currentPage === 1">
                                <i class="fas fa-chevron-left"></i>
                                Anterior
                            </button>
                            <div class="page-numbers">
                                <button 
                                    v-for="page in getVisiblePages()" 
                                    :key="page"
                                    class="page-btn"
                                    :class="{ active: page === currentPage, ellipsis: page === '...' }"
                                    @click="goToPage(page)"
                                    :disabled="page === '...'"
                                >
                                    {{ page }}
                                </button>
                            </div>
                            <button class="pagination-btn next-btn" @click="nextPage" :disabled="currentPage === totalPages">
                                Siguiente
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </v-app>
</template>
<script>
    import { BasicSelect, ModelSelect } from 'vue-search-select';
    import * as XLSX from 'xlsx';
    export default {
        
        data() {
            return {
                cliente: {id: '', nit: '', dv: '', municipio_id: '', tipocliente_id: '', razon_social: '', contacto_comercial: '', email: '', direccion: '', telefono: '', aplicaretencion: false},
                clientes:[],
                clienteSeleccionado: {},
                dialogClient: false,
                editarCliente: -1,
                erroresCliente: '',
                loadingProductos: false,
                movimientos: {
                    cliente_id: '',
                    producto_id: '',
                    lista: [],
                    loading: false
                },
                productos: [],
                productoSeleccionado: {
                    value: '',
                    text: '',
                    codigo: '',
                    precio: 0,
                    stock: 0,
                    presentacion: ''
                },
                headers: [
                    {text: 'CLIENTES', value: 'razon_social', sortable: true, width: '20%'},
                    {text: 'MUNICIPIO', value: 'municipio', sortable: true, width: '15%'},
                    {text: 'EMAIL', value: 'email', sortable: true, width: '18%'},
                    {text: 'DIRECCIÓN', value: 'direccion', sortable: false, width: '20%'},
                    {text: 'TELÉFONO', value: 'telefono', sortable: false, width: '12%'},
                    {text: 'ESTADO', value: 'estado', sortable: true, width: '10%', align: 'center'},
                    {text: 'ACCIONES', value: 'actions', sortable: false, width: '5%', align: 'center'},
                ],
                index: -1,
                loader: true,
                municipios: [],
                search: '',
                // Paginación
                currentPage: 1,
                itemsPerPage: 15,
                itemsPerPageOptions: [10, 15, 25, 50],
                tipoClientes: [
                    {value: 1, text: 'Indirecto'},
                    {value: 2, text: 'Directo'}
                ],
            }
        },
        mounted() {
            this.getClientes()
        },
        methods: {
            // Métodos de paginación
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            goToPage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page;
                }
            },
            changeItemsPerPage() {
                this.currentPage = 1; // Reset to first page
            },
            getVisiblePages() {
                const totalPages = this.totalPages;
                const current = this.currentPage;
                const delta = 2; // Número de páginas a mostrar a cada lado de la actual
                
                if (totalPages <= 7) {
                    // Si hay 7 páginas o menos, mostrar todas
                    return Array.from({ length: totalPages }, (_, i) => i + 1);
                }
                
                let pages = [];
                
                // Siempre mostrar la primera página
                pages.push(1);
                
                if (current - delta > 2) {
                    pages.push('...');
                }
                
                // Páginas alrededor de la actual
                const start = Math.max(2, current - delta);
                const end = Math.min(totalPages - 1, current + delta);
                
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
                
                if (current + delta < totalPages - 1) {
                    pages.push('...');
                }
                
                // Siempre mostrar la última página
                if (totalPages > 1) {
                    pages.push(totalPages);
                }
                
                return pages;
            },
            clienteNew(cliente){
                // console.log(cliente)
                this.clientes.push(cliente)
            },
            close(){
                this.dialogClient = false;
                this.$nextTick(() => {
                    this.erroresCliente = '';                
                    this.editarCliente = -1
                    this.cliente = {};
                })
            },        
            editCliente(item){
                this.$refs.crearCliente.editCliente(item);
            },
            verMovimientos(cliente){
                this.clienteSeleccionado = cliente;
                this.movimientos.cliente_id = cliente.id;
                this.resetProductoSeleccionado();
                this.getProductos();
                $('#movimientosModal').modal('show');
            },
            getProductos(){
                this.loadingProductos = true;
                axios.get('/detalleproductos')
                    .then(res => {
                        console.log('Productos obtenidos:', res.data);
                        this.productos = res.data;
                        this.loadingProductos = false;
                    })
                    .catch(err => {
                        console.error('Error al obtener productos:', err);
                        this.loadingProductos = false;
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudieron cargar los productos. Intente nuevamente.',
                            confirmButtonText: 'Aceptar'
                        });
                    });
            },
            selectProducto(item){
                if(item){
                    this.productoSeleccionado = {
                        value: item.value,
                        text: item.text,
                        codigo: item.codigo,
                        precio: item.precio,
                        stock: item.stock,
                        presentacion: item.presentacion
                    };
                    this.movimientos.producto_id = item.value;
                    // Cargar movimientos del producto seleccionado
                    this.getMovimientosProducto();
                } else {
                    this.resetProductoSeleccionado();
                }
            },
            resetProductoSeleccionado(){
                this.productoSeleccionado = {
                    value: '',
                    text: '',
                    codigo: '',
                    precio: 0,
                    stock: 0,
                    presentacion: ''
                };
                this.movimientos.producto_id = '';
                this.movimientos.lista = [];
            },
            getMovimientosProducto(){
                if(!this.clienteSeleccionado.id || !this.productoSeleccionado.value){
                    return;
                }
                
                this.movimientos.loading = true;
                
                axios.get(`/movimientos-producto/${this.clienteSeleccionado.id}/${this.productoSeleccionado.value}`)
                    .then(res => {
                        console.log('Movimientos obtenidos:', res.data);
                        this.movimientos.lista = res.data.movimientos;
                        this.movimientos.loading = false;
                    })
                    .catch(error => {
                        console.error('Error cargando movimientos:', error);
                        this.movimientos.loading = false;
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudieron cargar los movimientos del producto.'
                        });
                    });
            },
            descargarExcel(){
                if(!this.productoSeleccionado.value || this.movimientos.lista.length === 0){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sin datos para exportar',
                        text: 'Por favor seleccione un producto que tenga movimientos.',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                // Crear datos para Excel
                const datosExcel = this.movimientos.lista.map(movimiento => ({
                    'Fecha': this.formatearFecha(movimiento.fecha),
                    'Número Factura': movimiento.numero_factura,
                    'Electrónica': movimiento.electronica && movimiento.electronica !== 0 ? movimiento.electronica : '',
                    'Tipo': movimiento.tipo_movimiento === 'factura' ? 'Factura' : 'Venta',
                    'Cantidad': movimiento.cantidad,
                    'Precio': movimiento.precio_factura,
                    'Bonificación': movimiento.bonificacion || '',
                    'Adicionales': movimiento.adicionales || ''
                }));

                // Crear información del encabezado
                const encabezado = {
                    'Cliente': this.clienteSeleccionado.razon_social,
                    'Producto': this.productoSeleccionado.text,
                    'Código': this.productoSeleccionado.codigo,
                    'Total Movimientos': this.movimientos.lista.length,
                    'Facturas': this.contarTipoMovimiento('factura'),
                    'Ventas': this.contarTipoMovimiento('venta'),
                    'Fecha Generación': new Date().toLocaleDateString('es-CO')
                };

                this.exportarAExcel(datosExcel, encabezado);
            },
            exportarAExcel(datos, encabezado){
                // Crear libro de Excel
                const wb = XLSX.utils.book_new();
                
                // Crear hoja con información del reporte
                const wsInfo = XLSX.utils.json_to_sheet([encabezado]);
                XLSX.utils.book_append_sheet(wb, wsInfo, 'Información');
                
                // Crear hoja con los movimientos
                const wsMovimientos = XLSX.utils.json_to_sheet(datos);
                XLSX.utils.book_append_sheet(wb, wsMovimientos, 'Movimientos');
                
                // Generar nombre del archivo
                const nombreArchivo = `Movimientos_${this.clienteSeleccionado.razon_social}_${this.productoSeleccionado.codigo}_${new Date().toISOString().slice(0,10)}.xlsx`;
                
                // Descargar archivo
                XLSX.writeFile(wb, nombreArchivo);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Excel generado',
                    text: `El archivo ${nombreArchivo} se ha descargado correctamente.`,
                    confirmButtonText: 'Aceptar'
                });
            },
            formatearFecha(fecha){
                if(!fecha) return '-';
                const fechaObj = new Date(fecha);
                return fechaObj.toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            },
            formatearPrecio(precio){
                if(precio === null || precio === undefined) return '-';
                return new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                }).format(precio);
            },
            contarTipoMovimiento(tipo){
                return this.movimientos.lista.filter(mov => mov.tipo_movimiento === tipo).length;
            },
            getClientes(){
                axios.get('/clientes')
                    .then(res => {
                        console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.clientes.push({
                                id: res.data[i].id,
                                municipio_id: res.data[i].municipio_id,
                                municipio: res.data[i].municipios.mcpio,
                                tipocliente_id: res.data[i].tipocliente_id,
                                estado_id: res.data[i].estado_id,
                                estado: res.data[i].estado.estado,
                                razon_social: res.data[i].razon_social,
                                contacto_comercial: res.data[i].contacto_comercial,
                                email: res.data[i].email,
                                nit: res.data[i].nit,
                                dv: res.data[i].dv,
                                direccion: res.data[i].direccion,
                                telefono: res.data[i].telefono,
                                aplicaretencion: res.data[i].aplicaretencion
                            })
                        }
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getMunicipios(){
                axios.get('/municipios')
                    .then(res => {
                        this.municipios = [];
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.municipios.push({
                                value: res.data[i].id,
                                text: res.data[i].mcpio +' - '+res.data[i].departamentos.nombre_dpto
                            });                         
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            newCliente(){
                this.$refs.crearCliente.newCliente();
            },
            saveCliente(){
                axios.post('/clientes', this.cliente)
                    .then(res => {
                        if(res.data.id){
                            Swal.fire({
                                icon: 'success',
                                title: 'Cliente creado',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })       
                        }else{
                            this.erroresCliente = res.data;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            updateCliente(){
                axios.put(`/clientes/${this.cliente.id}`, this.cliente)
                    .then(res => {
                        if (res.data === 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Cliente actualizado',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })     
                        } else {
                            this.erroresCliente = res.data;
                        }
                    })
            },
        },
        watch:{        
            dialogClient (val) {
                val || this.close()
            },
            search() {
                // Resetear página cuando cambie la búsqueda
                this.currentPage = 1;
            }
        },
        computed:{
            tituloModalCliente(){
                return this.editarCliente === -1 ? 'Nuevo cliente' : 'Editar cliente' 
            },
            productosOptions(){
                return this.productos.map(producto => ({
                    value: producto.id,
                    text: `${producto.productos.producto} - ${producto.presentaciones.presentacion} (${producto.codigo})`,
                    codigo: producto.codigo,
                    precio: producto.precio,
                    stock: producto.stock,
                    presentacion: producto.presentaciones.presentacion
                }));
            },
            filteredClientes() {
                let filtered = this.clientes;
                
                // Aplicar filtro de búsqueda
                if (this.search) {
                    filtered = filtered.filter(cliente => 
                        cliente.razon_social.toLowerCase().includes(this.search.toLowerCase()) ||
                        cliente.municipio.toLowerCase().includes(this.search.toLowerCase()) ||
                        cliente.email.toLowerCase().includes(this.search.toLowerCase()) ||
                        cliente.direccion.toLowerCase().includes(this.search.toLowerCase()) ||
                        cliente.telefono.toLowerCase().includes(this.search.toLowerCase())
                    );
                }
                
                return filtered;
            },
            paginatedClientes() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredClientes.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredClientes.length / this.itemsPerPage);
            },
            paginationInfo() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1;
                const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredClientes.length);
                return {
                    start,
                    end,
                    total: this.filteredClientes.length
                };
            }
        },
        components:{
            BasicSelect,
            ModelSelect
        }
    }
</script>

<style scoped>
/* Professional Container */
.clientes-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
}

/* Professional Loading */
.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 40px 20px;
    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.loading-content {
    text-align: center;
    max-width: 300px;
}

.professional-loader {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
}

.loader-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(102, 126, 234, 0.1);
    border-left: 4px solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
    z-index: 2;
}

.loader-pulse {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
    z-index: 1;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(0.8); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(0.8); opacity: 1; }
}

.loading-title {
    color: #2c3e50;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.loading-subtitle {
    color: #6c757d;
    font-size: 0.95rem;
    font-weight: 400;
    margin: 0 0 2rem 0;
    line-height: 1.4;
}

.loading-progress {
    width: 100%;
    max-width: 300px;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    margin: 0 auto;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #17a2b8, #138496);
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
}

/* Header Section */
.clientes-content {
    max-width: 1400px;
    margin: 0 auto;
}

.header-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
}

.page-header h2 {
    color: #2c3e50;
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
}

.page-description {
    color: #64748b;
    font-size: 1.1rem;
    margin: 0;
    font-weight: 400;
}

.header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    min-width: 300px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    z-index: 3;
    pointer-events: none;
}

.search-input {
    width: 100%;
    height: 50px;
    padding: 0 1rem 0 3rem !important;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.search-input::placeholder {
    color: #9ca3af;
    padding-left: 0;
}

.search-input:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: white;
}

.new-client-btn {
    height: 50px;
    padding: 0 2rem;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.new-client-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Professional Report Container */
.professional-report-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

/* Mobile Cards - Hidden by default */
.mobile-cards-container {
    display: none;
}

.desktop-table {
    display: block;
}

/* Professional Table */
.professional-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.professional-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: white;
    font-size: 0.95rem;
}

/* Table Header */
.professional-table thead th {
    background: transparent;
    color: #374151;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 1.25rem 1rem;
    border-bottom: 2px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.professional-table thead th i {
    margin-right: 0.5rem;
    color: #17a2b8;
}

/* Table Body */
.professional-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
}

.professional-table tbody tr:hover {
    background: rgba(102, 126, 234, 0.05);
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.professional-table tbody td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #f1f5f9;
}

/* Cell Styles */
.client-cell {
    font-weight: 600;
    color: #1e293b;
}

.client-name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.client-icon {
    color: #17a2b8;
    font-size: 1rem;
    width: 20px;
    text-align: center;
}

.name-text {
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #81d4fa;
}

.municipio-cell, .email-cell, .direccion-cell, .telefono-cell {
    color: #64748b;
    font-weight: 500;
}

.status-cell {
    text-align: center;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.status-active {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
}

.status-inactive {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(239, 68, 68, 0.3);
}

.status-dot {
    font-size: 0.6rem;
    margin-right: 0.5rem;
}

/* Action Buttons */
.actions-cell {
    text-align: center;
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    text-decoration: none;
}

.btn-edit {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.btn-edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-movements {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(23, 162, 184, 0.3);
}

.btn-movements:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(23, 162, 184, 0.4);
}

/* Mobile Cards Styles */
.client-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.client-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
}

.client-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.client-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.client-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.1rem;
    line-height: 1.2;
}

.municipio-mobile {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
}

.status-badge-mobile {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    width: fit-content;
}

.status-badge-mobile.status-inactive {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.info-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
    color: #64748b;
}

.info-row i {
    color: #17a2b8;
    width: 20px;
    text-align: center;
}

/* Actions Section Mobile */
.actions-section {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
}

.mobile-action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border: none;
}

.edit-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.movements-btn {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(23, 162, 184, 0.3);
}

.movements-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
}

/* Pagination Styles */
.pagination-section {
    background: white;
    border-top: 2px solid #f1f5f9;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.pagination-info {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.items-per-page {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
}

.items-select {
    padding: 0.5rem 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    background: white;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
}

.items-select:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.page-info-text {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #17a2b8;
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #9ca3af;
}

.page-numbers {
    display: flex;
    gap: 0.25rem;
    margin: 0 1rem;
}

.page-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-btn:hover:not(:disabled):not(.ellipsis) {
    border-color: #17a2b8;
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.page-btn.active {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-color: #17a2b8;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.page-btn.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    color: #9ca3af;
}

.page-btn.ellipsis:hover {
    background: transparent;
    border: none;
}

/* Responsive Pagination */
@media (max-width: 768px) {
    .pagination-section {
        padding: 1rem;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }
    
    .pagination-info {
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .items-per-page {
        justify-content: center;
    }
    
    .pagination-controls {
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .page-numbers {
        margin: 0 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .pagination-btn {
        font-size: 0.8rem;
        padding: 0.6rem 0.8rem;
    }
    
    .page-btn {
        width: 35px;
        height: 35px;
        font-size: 0.8rem;
    }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .header-section {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }
    
    .header-actions {
        justify-content: center;
    }
    
    .search-box {
        min-width: 100%;
    }
    
    .page-header h2 {
        font-size: 2rem;
        justify-content: center;
    }
}

@media (max-width: 900px) {
    /* Show mobile cards, hide desktop table */
    .desktop-table {
        display: none;
    }
    
    .mobile-cards-container {
        display: block;
        padding: 0 0.5rem;
    }
}

/* Estilos para el modal de movimientos */
.movimientos-table-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e9ecef;
    border-radius: 8px;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(23, 162, 184, 0.05);
}

.table-hover tbody tr:hover {
    background-color: rgba(23, 162, 184, 0.1);
}

.badge-outline-primary {
    color: #17a2b8;
    border: 1px solid #17a2b8;
    background: transparent;
}

.movimientos-summary {
    margin-top: 1.5rem;
}

.summary-card {
    background: linear-gradient(135deg, var(--color), rgba(255,255,255,0.1));
    color: white;
    padding: 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.summary-card:hover {
    transform: translateY(-2px);
}

.summary-card.bg-primary {
    --color: #007bff;
}

.summary-card.bg-success {
    --color: #28a745;
}

.summary-card.bg-turquesa {
    --color: #17a2b8;
}

.summary-card i {
    font-size: 2rem;
    opacity: 0.8;
}

.summary-info h6 {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
    font-weight: 600;
}

.summary-info span {
    font-size: 1.5rem;
    font-weight: bold;
}

.bg-turquesa {
    background-color: #17a2b8 !important;
}

.text-turquesa {
    color: #17a2b8 !important;
}

.border-turquesa {
    border-color: #17a2b8 !important;
}

@media (max-width: 768px) {
    .clientes-container {
        padding: 1rem;
    }
    
    .header-section {
        border-radius: 16px;
        padding: 1.5rem;
    }
    
    .professional-report-container {
        border-radius: 16px;
    }
    
    .page-header h2 {
        font-size: 1.8rem;
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
    
    .client-card {
        margin-bottom: 1rem;
        padding: 1.25rem;
        border-radius: 14px;
    }
    
    .card-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
        margin-bottom: 1.25rem;
    }
    
    .client-info {
        justify-content: center;
        text-align: center;
    }
    
    .client-name-mobile {
        font-size: 1rem;
        text-align: center;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .movimientos-table-container {
        font-size: 0.9rem;
    }
    
    .summary-card {
        padding: 0.8rem;
        gap: 0.8rem;
    }
    
    .summary-card i {
        font-size: 1.5rem;
    }
    
    .summary-info span {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .clientes-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .client-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
    }
    
    .client-name-mobile {
        font-size: 0.95rem;
    }
    
    .pagination-controls {
        flex-direction: column;
        gap: 1rem;
    }
    
    .page-numbers {
        margin: 0;
        order: 2;
    }
    
    .prev-btn {
        order: 1;
        align-self: stretch;
        justify-content: center;
    }
    
    .next-btn {
        order: 3;
        align-self: stretch;
        justify-content: center;
    }
}

/* Modal Movimientos Styles */
.bg-gradient-turquesa {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
}

.text-turquesa {
    color: #17a2b8 !important;
}

.border-turquesa {
    border-color: #17a2b8 !important;
}

.btn-turquesa {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border: none;
    transition: all 0.3s ease;
}

.btn-turquesa:hover {
    background: linear-gradient(135deg, #138496 0%, #117a8b 100%);
    color: white;
    transform: translateY(-1px);
}

.btn-turquesa:disabled {
    background: #6c757d;
    color: white;
    opacity: 0.6;
    cursor: not-allowed;
}

.form-label {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
}

.producto-info-card .card-header {
    background: #f8f9fa !important;
    border-bottom: 2px solid #17a2b8;
}

.movimientos-section {
    border-top: 2px solid #e9ecef;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
}

.spinner-border.text-turquesa {
    color: #17a2b8 !important;
}

.modal-content {
    border-radius: 15px;
    border: none;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.modal-header {
    border-radius: 15px 15px 0 0;
    border-bottom: none;
    padding: 1.5rem;
}

.modal-body {
    padding: 2rem;
}

.modal-footer {
    border-top: 2px solid #e9ecef;
    padding: 1.5rem;
    border-radius: 0 0 15px 15px;
}

/* Responsive modal */
@media (max-width: 768px) {
    .modal-dialog {
        margin: 1rem;
        max-width: calc(100% - 2rem);
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .modal-header,
    .modal-footer {
        padding: 1rem 1.5rem;
    }
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
