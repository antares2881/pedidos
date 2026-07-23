<template>
    <b-modal
        ref="my-modal"
        hide-footer
        centered
        scrollable
        :title="title"
        :size="modalSize"
        modal-class="history-price-modal"
        dialog-class="history-price-dialog"
        body-class="history-price-body"
    >
        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive">
            <table class="table table-sm table-striped table-hover">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" class="text-nowrap">Cliente</th>
                        <th scope="col" class="text-nowrap">N° Pedido</th>
                        <th scope="col" class="text-nowrap text-right">Precio Entrada</th>
                        <th scope="col" class="text-nowrap text-center">Cantidad</th>
                        <th scope="col" class="text-nowrap text-center">Adicional</th>
                        <th scope="col" class="text-nowrap">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loading state -->
                    <tr v-if="loading">
                        <td colspan="6" class="text-center py-4">
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="spinner-border text-primary mr-2" role="status" style="width: 1.5rem; height: 1.5rem;">
                                    <span class="sr-only">Cargando...</span>
                                </div>
                                <span class="text-muted">Cargando datos...</span>
                            </div>
                        </td>
                    </tr>
                    <!-- Data rows -->
                    <tr v-else v-for="item, index in paginatedProducts" :key="index" class="table-row">
                        <td class="text-truncate" :title="item.razon_social">{{ item.razon_social }}</td>
                        <td class="text-center">{{ item.num_pedido }}</td>
                        <td class="text-right font-weight-bold text-success">{{ item.precio_entrada | currency }}</td>
                        <td class="text-center">{{ item.cantidad }}</td>
                        <td class="text-center">{{ item.adicionales || '-' }}</td>
                        <td class="text-nowrap">{{ formatingDate(item.created_at) }}</td>
                    </tr>
                    <!-- Empty state -->
                    <tr v-if="!loading && paginatedProducts.length === 0">
                        <td colspan="6" class="text-center text-muted py-4">
                            <i class="fas fa-inbox fa-2x mb-2"></i>
                            <br>No hay historial de precios disponible
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Paginación -->
        <div v-if="totalPages > 1" class="history-pagination d-flex justify-content-between align-items-center mt-3">
            <div class="text-muted small">
                Mostrando {{ startIndex + 1 }} - {{ endIndex }} de {{ totalRecords }} registros
            </div>
            <b-pagination
                :value="currentLaravelPage"
                @input="changePage"
                :total-rows="totalRecords"
                :per-page="5"
                size="sm"
                class="mb-0"
                prev-text="‹"
                next-text="›"
                first-text="«"
                last-text="»"
                limit="5"
                :disabled="loading"
            ></b-pagination>
        </div>
    </b-modal>
</template>
<script>
    export default{
        data(){
            return{
                productos: null,
                title: null,
                loading: false,
                currentProduct: null // Para mantener referencia del producto actual
            }
        },
        computed: {
            // Tamaño del modal basado en el ancho de pantalla
            modalSize() {
                return 'xl'; // Usar tamaño fijo para evitar problemas de reactividad
            },
            // Productos de la página actual (ya vienen paginados desde Laravel)
            paginatedProducts() {
                return this.productos && this.productos.data ? this.productos.data : [];
            },
            // Total de páginas desde Laravel
            totalPages() {
                return this.productos && this.productos.last_page ? this.productos.last_page : 1;
            },
            // Página actual desde Laravel
            currentLaravelPage() {
                return this.productos && this.productos.current_page ? this.productos.current_page : 1;
            },
            // Total de registros desde Laravel
            totalRecords() {
                return this.productos && this.productos.total ? this.productos.total : 0;
            },
            // Índice de inicio para mostrar información de paginación
            startIndex() {
                return this.productos && this.productos.from ? this.productos.from - 1 : 0;
            },
            // Índice de fin para mostrar información de paginación
            endIndex() {
                return this.productos && this.productos.to ? this.productos.to : 0;
            }
        },
        methods: {
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            async showPriceProducts(item){
                this.loading = true;
                this.productos = null;
                this.title = item.producto + ' - ' + item.presentacion;
                this.currentProduct = item;

                await new Promise(resolve => this.$nextTick(resolve));
                this.$refs['my-modal'].show();

                try {
                    const res = await axios.get(`/view-history-price/${item.codigo}`);
                    this.productos = res.data;
                    return res.data;
                } finally {
                    this.loading = false;
                }
            },
            // Método para cambiar de página
            changePage(page) {
                if (!this.currentProduct || !this.currentProduct.codigo) {
                    console.error('No hay producto actual para cargar');
                    return;
                }

                // Evitar cargar la misma página
                if (page === this.currentLaravelPage) {
                    return;
                }

                this.loading = true;
                axios.get(`/view-history-price/${this.currentProduct.codigo}?page=${page}`)
                    .then(res => {
                        this.productos = res.data;
                        this.loading = false;
                    })
                    .catch(err => {
                        console.error('Error al cambiar página:', err);
                        this.loading = false;
                        
                        // Opcional: mostrar mensaje de error al usuario
                        if (this.$toast) {
                            this.$toast.error('Error al cargar los datos. Inténtalo de nuevo.');
                        }
                    });
            },

        }
    }
</script>

<style>
/* Estilos para el modal de historial de precios */
.history-price-modal {
    --primary-color: #17a2b8;
    --primary-hover: #138496;
}

.history-price-modal .history-price-dialog {
    width: calc(100vw - 3rem);
    max-width: 1280px;
    margin: 1.5rem auto;
}

.history-price-modal .modal-content {
    max-height: calc(100vh - 3rem);
    overflow: hidden;
    border: 0;
    border-radius: 16px;
}

.history-price-modal .history-price-body {
    padding: 1.25rem;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .history-price-modal .history-price-dialog {
        width: calc(100vw - 1rem);
        max-width: calc(100vw - 1rem);
        margin: 0.5rem auto;
    }

    .history-price-modal .modal-content {
        max-height: calc(100vh - 1rem);
    }

    .history-price-modal .history-price-body {
        padding: 0.75rem;
    }
}

/* Tabla responsiva mejorada */
.history-price-modal .table-responsive {
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.history-price-modal .table {
    min-width: 920px;
    margin-bottom: 0;
    background-color: white;
}

.history-price-modal .table th {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    font-weight: 600;
    border: none;
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
}

.history-price-modal .table td {
    padding: 0.75rem 0.5rem;
    vertical-align: middle;
    border-top: 1px solid #e9ecef;
    font-size: 0.85rem;
}

.history-price-modal .table-row:hover {
    background-color: #f8f9fa;
    transform: translateY(-1px);
    transition: all 0.2s ease;
}

/* Texto truncado para celdas largas */
.history-price-modal .text-truncate {
    max-width: 200px;
}

/* Estilos para precios */
.history-price-modal .text-success {
    color: var(--primary-color) !important;
    font-weight: 600;
}

/* Paginación personalizada */
.history-price-modal .pagination .page-link {
    color: var(--primary-color);
    border: 1px solid #dee2e6;
    background-color: white;
}

.history-price-modal .pagination .page-link:hover {
    color: white;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.history-price-modal .pagination .page-item.active .page-link {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
}

/* Responsive para pantallas pequeñas */
@media (max-width: 576px) {
    .history-price-modal .table th,
    .history-price-modal .table td {
        padding: 0.5rem 0.25rem;
        font-size: 0.8rem;
    }
    
    .history-price-modal .text-truncate {
        max-width: 120px;
    }
    
    .history-price-modal .pagination {
        font-size: 0.8rem;
    }
}

/* Estado vacío */
.history-price-modal .table tbody tr td[colspan="6"] {
    padding: 2rem;
    background-color: #f8f9fa;
}

.history-price-modal .table tbody tr td[colspan="6"] i {
    color: #6c757d;
}

/* Mejoras visuales adicionales */
.history-price-modal .modal-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    border-bottom: none;
}

.history-price-modal .modal-header .modal-title {
    font-weight: 600;
}

.history-price-modal .modal-header .close {
    color: white;
    opacity: 0.8;
}

.history-price-modal .modal-header .close:hover {
    opacity: 1;
}

/* Información de paginación */
.history-price-modal .text-muted.small {
    font-size: 0.8rem;
    color: #6c757d !important;
}

.history-pagination {
    gap: 1rem;
}

@media (max-width: 767.98px) {
    .history-pagination {
        align-items: flex-start !important;
        flex-direction: column;
    }
}

/* Spinner de carga */
.history-price-modal .spinner-border.text-primary {
    color: var(--primary-color) !important;
    border-right-color: transparent;
}

/* Paginación deshabilitada */
.history-price-modal .pagination.disabled .page-link {
    opacity: 0.5;
    pointer-events: none;
}
</style>
