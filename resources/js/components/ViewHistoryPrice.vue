<template>
    <b-modal ref="my-modal" hide-footer :title="title" :size="modalSize" class="history-price-modal">
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
        <div v-if="totalPages > 1" class="d-flex justify-content-between align-items-center mt-3">
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
            showPriceProducts(item){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    axios.get(`/view-history-price/${item.codigo}`)
                        .then(res => {
                            this.productos = res.data;
                            this.title = item.producto + ' - ' + item.presentacion;
                            this.currentProduct = item; // Guardar el item original con código
                            this.loading = false;
                            this.$nextTick(() => {
                                this.$refs['my-modal'].show();
                                resolve(res.data);
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            this.loading = false;
                            reject(err);
                        })
                });
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

<style scoped>
/* Estilos para el modal de historial de precios */
.history-price-modal {
    --primary-color: #17a2b8;
    --primary-hover: #138496;
}

/* Modal responsivo */
.history-price-modal .modal-dialog {
    margin: 1rem;
}

@media (min-width: 1280px) {
    .history-price-modal .modal-dialog {
        max-width: 90vw;
        margin: 1.75rem auto;
    }
}

@media (max-width: 768px) {
    .history-price-modal .modal-dialog {
        margin: 0.5rem;
        max-width: calc(100vw - 1rem);
    }
    
    .history-price-modal .modal-body {
        padding: 0.75rem;
    }
}

/* Tabla responsiva mejorada */
.table-responsive {
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.table {
    margin-bottom: 0;
    background-color: white;
}

.table th {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    font-weight: 600;
    border: none;
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
}

.table td {
    padding: 0.75rem 0.5rem;
    vertical-align: middle;
    border-top: 1px solid #e9ecef;
    font-size: 0.85rem;
}

.table-row:hover {
    background-color: #f8f9fa;
    transform: translateY(-1px);
    transition: all 0.2s ease;
}

/* Texto truncado para celdas largas */
.text-truncate {
    max-width: 200px;
}

/* Estilos para precios */
.text-success {
    color: var(--primary-color) !important;
    font-weight: 600;
}

/* Paginación personalizada */
.pagination .page-link {
    color: var(--primary-color);
    border: 1px solid #dee2e6;
    background-color: white;
}

.pagination .page-link:hover {
    color: white;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.pagination .page-item.active .page-link {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
}

/* Responsive para pantallas pequeñas */
@media (max-width: 576px) {
    .table th,
    .table td {
        padding: 0.5rem 0.25rem;
        font-size: 0.8rem;
    }
    
    .text-truncate {
        max-width: 120px;
    }
    
    .pagination {
        font-size: 0.8rem;
    }
}

/* Estado vacío */
.table tbody tr td[colspan="6"] {
    padding: 2rem;
    background-color: #f8f9fa;
}

.table tbody tr td[colspan="6"] i {
    color: #6c757d;
}

/* Mejoras visuales adicionales */
.modal-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    border-bottom: none;
}

.modal-header .modal-title {
    font-weight: 600;
}

.modal-header .close {
    color: white;
    opacity: 0.8;
}

.modal-header .close:hover {
    opacity: 1;
}

.modal-body {
    padding: 1.5rem;
}

/* Información de paginación */
.text-muted.small {
    font-size: 0.8rem;
    color: #6c757d !important;
}

/* Spinner de carga */
.spinner-border.text-primary {
    color: var(--primary-color) !important;
    border-right-color: transparent;
}

/* Paginación deshabilitada */
.pagination.disabled .page-link {
    opacity: 0.5;
    pointer-events: none;
}
</style>
