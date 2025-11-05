<template>
    <v-app>
        <div class="products-container">
            <modalitem-component ref="modalItemProducto" @updateItems="updateListItems"/>
            <modalproducto-component ref="modalProducto"/>
            
            <!-- Professional Loading State -->
            <div v-if="loader" class="loading-container">
                <div class="loading-content">
                    <div class="professional-loader">
                        <div class="loader-spinner"></div>
                        <div class="loader-pulse"></div>
                    </div>
                    <h3 class="loading-title">Cargando Productos</h3>
                    <p class="loading-subtitle">Obteniendo información del inventario...</p>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>
            
            <div v-else class="products-content">
                <!-- Header Section -->
                <div class="header-section">
                    <!-- First Row: Title and Action Buttons -->
                    <div class="row align-items-center mb-4">
                        <div class="col-12 col-lg-6">
                            <div class="page-header">
                                <h2 class="page-title">
                                    <i class="fas fa-boxes mr-3"></i>
                                    Productos
                                </h2>
                                <p class="page-description">
                                    Crea, edita y administra los productos de tu inventario
                                </p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="header-actions">
                                <button class="btn btn-success new-product-btn" @click="nuevoProducto">
                                    <i class="fas fa-tags mr-2"></i>
                                    Nuevo producto
                                </button>
                                <button class="btn btn-primary new-item-btn" @click="nuevoItemProducto">
                                    <i class="fas fa-plus mr-2"></i>
                                    Nuevo item
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Second Row: Filters and Search -->
                    <div class="row align-items-end">
                        <div class="col-12 col-md-4">
                            <div class="filter-group">
                                <label class="filter-label">Lista de precios</label>
                                <div class="select-wrapper">
                                    <select 
                                        id="tipolista" 
                                        class="form-select" 
                                        v-model="tipolista_id" 
                                        @change="getProductos"
                                    >
                                        <option :value="item.id" v-for="item, index in tipoListas" :key="index">
                                            {{ item.tipo_lista }}
                                        </option>
                                    </select>
                                    <i class="fas fa-chevron-down select-icon"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-8">
                            <div class="filter-group">
                                <label class="filter-label">Buscar producto</label>
                                <div class="search-box">
                                    <i class="fas fa-search search-icon"></i>
                                    <input 
                                        type="text" 
                                        class="form-control search-input" 
                                        v-model="search" 
                                        placeholder="Escribe el nombre del producto..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Professional Content -->
                <div class="professional-report-container">
                    <!-- Table Header with Export Button -->
                    <div class="table-header-section">
                        <div class="table-info">
                            <h3 class="table-title">
                                <i class="fas fa-list table-icon"></i>
                                Inventario de Productos
                            </h3>
                            <span class="table-count">{{ filteredProductos.length }} productos encontrados</span>
                        </div>
                        <div class="table-actions">
                            <a href="/descargar-inventario" class="excel-btn" target="_blank">
                                <i class="fas fa-file-excel"></i>
                                Exportar inventario
                            </a>
                        </div>
                    </div>
                    
                    <!-- Table Loading State -->
                    <div v-if="tableLoader" class="table-loading-container">
                        <div class="table-loading-content">
                            <div class="table-loader">
                                <div class="table-loader-spinner"></div>
                                <div class="table-loader-pulse"></div>
                            </div>
                            <h4 class="table-loading-title">Cargando Lista de Precios</h4>
                            <p class="table-loading-subtitle">Actualizando productos...</p>
                            <div class="table-loading-progress">
                                <div class="table-progress-bar"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Table -->
                    <div v-else class="desktop-table">
                        <div class="professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-flask"></i> Laboratorio</th>
                                        <th><i class="fas fa-box"></i> Producto</th>
                                        <th><i class="fas fa-pills"></i> Presentación</th>
                                        <th><i class="fas fa-warehouse"></i> Stock</th>
                                        <th><i class="fas fa-dollar-sign"></i> Precio</th>
                                        <th><i class="fas fa-cogs"></i> Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="producto in paginatedProductos" :key="producto.id">
                                        <td class="lab-cell">
                                            <div class="lab-container">
                                                <img 
                                                    :src="producto.logo" 
                                                    :alt="'Logo ' + producto.Laboratorio" 
                                                    :title="producto.Laboratorio" 
                                                    class="lab-logo"
                                                    @error="$event.target.src = '/images/default-lab.png'"
                                                >
                                                <span class="lab-name">{{ producto.Laboratorio }}</span>
                                            </div>
                                        </td>
                                        <td class="product-cell">
                                            <div class="product-info" @click="editarProducto(producto)">
                                                <span class="product-name">{{ producto.producto }}</span>
                                                <span class="product-code" v-if="producto.codigo">{{ producto.codigo }}</span>
                                            </div>
                                        </td>
                                        <td class="presentation-cell">
                                            <span class="presentation-badge">{{ producto.presentacion }}</span>
                                        </td>
                                        <td class="stock-cell">
                                            <span 
                                                class="stock-badge"
                                                :class="{
                                                    'stock-low': producto.stock < 5,
                                                    'stock-medium': producto.stock >= 5 && producto.stock < 20,
                                                    'stock-high': producto.stock >= 20
                                                }"
                                            >
                                                {{ producto.stock }}
                                            </span>
                                        </td>
                                        <td class="price-cell">
                                            <span class="price-value">${{ producto.precio | currency }}</span>
                                        </td>
                                        <td class="actions-cell">
                                            <div class="action-buttons">
                                                <button 
                                                    class="action-btn btn-edit" 
                                                    @click="editarItemProducto(producto)"
                                                    title="Editar producto"
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Mobile Cards -->
                    <div v-if="!tableLoader" class="mobile-cards-container">
                        <div v-for="producto in paginatedProductos" :key="producto.id" class="product-card">
                            <div class="card-header">
                                <div class="product-info-mobile">
                                    <div class="lab-info-mobile">
                                        <img 
                                            :src="producto.logo" 
                                            :alt="'Logo ' + producto.Laboratorio" 
                                            class="lab-logo-mobile"
                                            @error="$event.target.src = '/images/default-lab.png'"
                                        >
                                        <span class="lab-name-mobile">{{ producto.Laboratorio }}</span>
                                    </div>
                                    <span 
                                        class="stock-badge-mobile"
                                        :class="{
                                            'stock-low': producto.stock < 5,
                                            'stock-medium': producto.stock >= 5 && producto.stock < 20,
                                            'stock-high': producto.stock >= 20
                                        }"
                                    >
                                        Stock: {{ producto.stock }}
                                    </span>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="product-name-mobile" @click="editarProducto(producto)">{{ producto.producto }}</div>
                                <div class="product-code-mobile" v-if="producto.codigo">{{ producto.codigo }}</div>
                                <div class="info-row">
                                    <i class="fas fa-pills"></i>
                                    <span>{{ producto.presentacion }}</span>
                                </div>
                                <div class="info-row">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span class="price-mobile">${{ producto.precio | currency }}</span>
                                </div>
                            </div>
                            <div class="actions-section">
                                <button class="mobile-action-btn edit-btn" @click="editarItemProducto(producto)">
                                    <i class="fas fa-edit"></i>
                                    Editar Producto
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- No Data Message -->
                    <div v-if="!tableLoader && filteredProductos.length === 0" class="no-data-container">
                        <div class="no-data-message">
                            <i class="fas fa-inbox no-data-icon"></i>
                            <h4>No se encontraron productos</h4>
                            <p>Intenta cambiar los filtros o crear un nuevo producto</p>
                        </div>
                    </div>

                    <!-- Pagination Section -->
                    <div v-if="!tableLoader && filteredProductos.length > 0" class="pagination-section">
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
                                Mostrando {{ paginationInfo.start }} - {{ paginationInfo.end }} de {{ paginationInfo.total }} productos
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
    export default {
        data() {
            return {
                headers: [
                    {text: 'Laboratorio', value: 'lab'},
                    // {text: 'Codigo', value: 'codigo'},
                    {text: 'Producto', value: 'producto'},
                    {text: 'Presentacion', value: 'presentacion'},
                    {text: 'Stock', value: 'stock'},
                    {text: 'VlrUnit', value: 'precio'},
                    {text: 'Lista', value: 'tipo_lista'},
                    {text: 'Acciones', value: 'acciones'},
                ],
                loader: true,
                tableLoader: false,
                productos: [],
                search: '',
                tipolista_id: 3,
                tipoListas: [],
                totalStock: 0,
                // Paginación
                currentPage: 1,
                itemsPerPage: 15,
                itemsPerPageOptions: [10, 15, 25, 50]
            }
        },  
        computed: {
            filteredProductos() {
                let filtered = this.productos;
                
                // Aplicar filtro de búsqueda
                if (this.search) {
                    filtered = filtered.filter(producto => 
                        producto.producto.toLowerCase().includes(this.search.toLowerCase()) ||
                        producto.Laboratorio.toLowerCase().includes(this.search.toLowerCase()) ||
                        producto.presentacion.toLowerCase().includes(this.search.toLowerCase()) ||
                        (producto.codigo && producto.codigo.toLowerCase().includes(this.search.toLowerCase())) ||
                        producto.tipo_lista.toLowerCase().includes(this.search.toLowerCase())
                    );
                }
                
                return filtered;
            },
            paginatedProductos() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredProductos.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredProductos.length / this.itemsPerPage);
            },
            paginationInfo() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1;
                const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredProductos.length);
                return {
                    start,
                    end,
                    total: this.filteredProductos.length
                };
            }
        },
        watch: {
            search() {
                // Resetear página cuando cambie la búsqueda
                this.currentPage = 1;
            }
        },
        mounted() {
            this.getProductos();
            this.getTiposListaPrecios();
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
            getTiposListaPrecios(){
                axios.get('/tipos-lista-precios')
                    .then(res => {
                        // console.log(res.data);
                        this.tipoListas = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getProductos(){
                // Activar loader de tabla solo si no es la carga inicial
                if (!this.loader) {
                    this.tableLoader = true;
                }
                
                axios.get(`/listas-precios/${this.tipolista_id}`)
                    .then(res => {
                        // console.log(res.data)
                        this.productos = res.data
                        this.loader = false;
                        this.tableLoader = false;
                    })
                    .catch(err => {
                        console.log(err)
                        this.loader = false;
                        this.tableLoader = false;
                    })
            },
            editarProducto(item){
                this.$refs.modalProducto.editProduct(item);
            },
            nuevoProducto(){
                this.$refs.modalProducto.newProduct();
            },
            editarItemProducto(item){
                this.$refs.modalItemProducto.editProduct(item, this.tipoListas);
            },
            nuevoItemProducto(){
                this.$refs.modalItemProducto.newProduct(this.tipoListas);
            },
            updateListItems(item){
                const index = this.productos.findIndex((producto) => producto.id === item.id);
                this.productos.splice(index, 1)
                this.productos.unshift(item);
                // console.log(this.productos[index])
            }
        },
    }
</script>
<style scoped>
/* Professional Container */
.products-container {
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
.products-content {
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
    justify-content: flex-end;
}



.new-product-btn, .new-item-btn {
    height: 50px;
    padding: 0 2rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.new-product-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

.new-product-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.new-item-btn {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.new-item-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.filter-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.95rem;
    margin: 0;
}

.select-wrapper {
    position: relative;
}

.form-select {
    width: 100%;
    height: 50px;
    padding: 0 1rem 0 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    color: #374151;
    appearance: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding-right: 3rem;
}

.form-select:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: white;
}

.select-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    pointer-events: none;
    transition: transform 0.3s ease;
}

.search-box {
    position: relative;
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

/* Professional Report Container */
.professional-report-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

/* Table Loading */
.table-loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    padding: 3rem 2rem;
    background: rgba(248, 250, 252, 0.3);
}

.table-loading-content {
    text-align: center;
    max-width: 280px;
}

.table-loader {
    position: relative;
    display: inline-block;
    margin-bottom: 25px;
}

.table-loader-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(102, 126, 234, 0.1);
    border-left: 3px solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
    z-index: 2;
}

.table-loader-pulse {
    position: absolute;
    top: -8px;
    left: -8px;
    width: 66px;
    height: 66px;
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 50%;
    animation: pulse 1.8s ease-in-out infinite;
    z-index: 1;
}

.table-loading-title {
    color: #374151;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 6px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.table-loading-subtitle {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 400;
    margin: 0 0 1.5rem 0;
    line-height: 1.3;
}

.table-loading-progress {
    width: 100%;
    max-width: 250px;
    height: 3px;
    background: #e5e7eb;
    border-radius: 2px;
    margin: 0 auto;
    overflow: hidden;
}

.table-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #17a2b8, #138496);
    border-radius: 2px;
    animation: progress 1.5s ease-in-out infinite;
}

/* Table Header Section */
.table-header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 2px solid #f1f5f9;
    background: rgba(248, 250, 252, 0.5);
}

.table-info {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.table-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.table-icon {
    color: #17a2b8;
}

.table-count {
    color: #64748b;
    font-weight: 500;
    background: #f8fafc;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    font-size: 0.9rem;
}

.table-actions {
    display: flex;
    align-items: center;
}

.excel-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #059669;
    text-decoration: none;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    background: rgba(5, 150, 105, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    border: 1px solid rgba(5, 150, 105, 0.2);
    font-size: 0.9rem;
}

.excel-btn:hover {
    background: rgba(5, 150, 105, 0.2);
    transform: translateY(-2px);
    color: #047857;
    text-decoration: none;
    box-shadow: 0 5px 15px rgba(5, 150, 105, 0.2);
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
.lab-cell {
    font-weight: 600;
    color: #1e293b;
}

.lab-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.lab-logo {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    object-fit: contain;
    background: white;
    padding: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #e2e8f0;
}

.lab-name {
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
}

.product-cell {
    font-weight: 600;
    color: #1e293b;
}

.product-info {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
}

.product-info:hover {
    color: #17a2b8;
}

.product-name {
    display: block;
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #81d4fa;
    margin-bottom: 0.25rem;
}

.product-code {
    display: block;
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 500;
}

.presentation-cell {
    color: #64748b;
    font-weight: 500;
}

.presentation-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.85rem;
    background: #f8fafc;
    color: #374151;
    border: 1px solid #e2e8f0;
}

.stock-cell {
    text-align: center;
}

.stock-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    min-width: 60px;
    display: inline-block;
}

.stock-low {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(239, 68, 68, 0.3);
}

.stock-medium {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);
}

.stock-high {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
}

.price-cell {
    font-weight: 600;
    color: #1e293b;
}

.price-value {
    font-weight: 700;
    color: #059669;
    font-size: 1.1rem;
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

/* Mobile Cards Styles */
.product-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.product-card:hover {
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

.product-info-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.lab-info-mobile {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.lab-logo-mobile {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    object-fit: contain;
    border: 2px solid #e2e8f0;
    background: white;
    padding: 5px;
}

.lab-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1rem;
}

.stock-badge-mobile {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    width: fit-content;
}

.stock-badge-mobile.stock-low {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
}

.stock-badge-mobile.stock-medium {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}

.stock-badge-mobile.stock-high {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.product-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.1rem;
    cursor: pointer;
    transition: color 0.3s ease;
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid #81d4fa;
    margin-bottom: 0.5rem;
}

.product-name-mobile:hover {
    color: #17a2b8;
}

.product-code-mobile {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 1rem;
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

.price-mobile {
    font-weight: 700;
    color: #059669;
    font-size: 1.1rem;
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

/* No Data Message */
.no-data-container {
    padding: 4rem 2rem;
    text-align: center;
}

.no-data-message {
    text-align: center;
    color: #6b7280;
}

.no-data-icon {
    font-size: 4rem;
    color: #d1d5db;
    margin-bottom: 1rem;
}

.no-data-message h4 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 1.5rem;
}

.no-data-message p {
    margin: 0;
    font-size: 1rem;
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
        text-align: center;
    }
    
    .header-actions {
        justify-content: center;
        margin-top: 1rem;
    }
    
    .page-header h2 {
        font-size: 2rem;
        justify-content: center;
    }
    
    .excel-link {
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

@media (max-width: 768px) {
    .products-container {
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
    
    .header-actions {
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1rem;
        justify-content: center;
    }
    
    .new-product-btn, .new-item-btn {
        width: 100%;
        justify-content: center;
    }
    
    .table-header-section {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .table-info {
        flex-direction: column;
        gap: 1rem;
    }
    
    .table-loading-container {
        min-height: 250px;
        padding: 2rem 1rem;
    }
    
    .table-loading-title {
        font-size: 1.1rem;
    }
    
    .table-loading-subtitle {
        font-size: 0.85rem;
    }
    
    .filter-group {
        margin-bottom: 1rem;
    }
    
    .product-card {
        margin-bottom: 1rem;
        padding: 1.25rem;
        border-radius: 14px;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
}

@media (max-width: 480px) {
    .products-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .product-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
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
</style>
