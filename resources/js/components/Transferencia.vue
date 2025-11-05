<template>
    <v-app>
        <div class="transfers-container">
            <aplicar-filtros ref="filtros" @aplicarFiltros="filtrar" />
            <printransfer-component ref="imprimir"/>
            
            <!-- Header Section -->
            <div class="header-section">
                <div class="page-header">
                    <h2>
                        <span class="custom-icon custom-icon-document">🔄</span>
                        <span class="page-title">{{ title || 'Transferencias' }}</span>
                    </h2>
                    <p class="page-description">
                        Gestión y seguimiento completo de transferencias entre almacenes
                    </p>
                </div>
                
                <div class="header-actions">
                    <div class="search-box">
                        <span class="custom-icon custom-icon-search">🔍</span>
                        <input 
                            type="text" 
                            class="form-control search-input" 
                            v-model="search" 
                            placeholder="Buscar por cliente..."
                        >
                    </div>
                    <button class="btn btn-primary new-lab-btn" @click="opcionesFiltrado">
                        <span class="custom-icon custom-icon-filter">🔽</span>
                        Filtrar Transferencias
                    </button>
                </div>
            </div>



            <!-- Professional Loader -->
            <div class="loading-section" v-if="loader">
                <div class="professional-report-container">
                    <div class="loader-container">
                        <div class="spinner-professional"></div>
                        <h3 class="loader-title">{{ getLoaderTitle() }}</h3>
                        <p class="loader-subtitle">{{ getLoaderSubtitle() }}</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Content -->
            <div class="transfers-content" v-if="!loader">
                <div class="professional-report-container">
                    <!-- Desktop/Tablet Table -->
                    <div class="desktop-table">
                        <div class="table-responsive professional-table-wrapper" :class="{ 'filtering': filterLoading }">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            <span class="custom-icon">👤</span>
                                            Cliente
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">#️⃣</span>
                                            No. Transferencia
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">📅</span>
                                            Fecha
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">💰</span>
                                            Valor
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">🏃‍♂️</span>
                                            Estado
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">⚙️</span>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedTransferencias" :key="index" class="data-row">
                                        <td class="text-left client-cell">
                                            <span class="client-name">{{ item.cliente }}</span>
                                        </td>
                                        <td class="text-center transfer-cell">
                                            <span class="transfer-number">{{ item.numero }}</span>
                                        </td>
                                        <td class="text-center date-cell">
                                            <span class="date-value">{{ item.fecha }}</span>
                                        </td>
                                        <td class="text-right amount-cell">
                                            <span class="amount-value">{{ item.valor | currency }}</span>
                                        </td>
                                        <td class="text-center status-cell">
                                            <span 
                                                class="status-badge"
                                                :class="getStatusClass(item.estado_id)"
                                            >
                                                <span class="custom-icon">{{ getStatusEmoji(item.estado_id) }}</span>
                                                {{ item.estado }}
                                            </span>
                                        </td>
                                        <td class="text-center actions-cell">
                                            <div class="action-buttons">
                                                <button 
                                                    @click="showTransfer(item)" 
                                                    class="action-btn view-btn"
                                                    title="Ver detalles"
                                                >
                                                    <span class="custom-icon">👁️</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Mobile Cards -->
                    <div class="mobile-cards-container" :class="{ 'filtering': filterLoading }">
                        <div v-for="(item, index) in paginatedTransferencias" :key="index" class="transfer-card">
                            <div class="card-header">
                                <div class="client-info">
                                    <span class="custom-icon client-icon">👤</span>
                                    <span class="client-name-mobile">{{ item.cliente }}</span>
                                </div>
                                <div class="transfer-badge">
                                    <span class="custom-icon">#️⃣</span>
                                    {{ item.numero }}
                                </div>
                            </div>
                            
                            <div class="card-body">
                                <div class="info-row">
                                    <div class="info-item">
                                        <span class="custom-icon info-icon">📅</span>
                                        <div class="info-content">
                                            <span class="info-label">Fecha</span>
                                            <span class="info-value">{{ item.fecha }}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="info-item">
                                        <span class="custom-icon info-icon">💰</span>
                                        <div class="info-content">
                                            <span class="info-label">Valor</span>
                                            <span class="info-value">{{ item.valor | currency }}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="status-section">
                                    <div class="status-container">
                                        <span class="custom-icon status-flag">🏃‍♂️</span>
                                        <span 
                                            class="status-badge-mobile"
                                            :class="getStatusClass(item.estado_id)"
                                        >
                                            <span class="custom-icon">{{ getStatusEmoji(item.estado_id) }}</span>
                                            {{ item.estado }}
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="actions-section">
                                    <button 
                                        @click="showTransfer(item)" 
                                        class="mobile-action-btn view-btn"
                                    >
                                        <span class="custom-icon">👁️</span>
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div class="pagination-section" v-if="filteredTransferencias.length > 0">
                        <div class="pagination-info">
                            <div class="items-per-page">
                                <span class="pagination-label">Mostrar:</span>
                                <select 
                                    v-model="itemsPerPage" 
                                    @change="changeItemsPerPage(itemsPerPage)"
                                    class="items-select"
                                >
                                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <span class="pagination-label">registros</span>
                            </div>
                            <div class="page-info">
                                <span class="page-info-text">
                                    Mostrando {{ paginationInfo.start }} - {{ paginationInfo.end }} de {{ paginationInfo.total }} registros
                                </span>
                            </div>
                        </div>
                        
                        <div class="pagination-controls">
                            <button 
                                @click="prevPage" 
                                :disabled="currentPage === 1"
                                class="pagination-btn prev-btn"
                            >
                                <span class="custom-icon">◀️</span>
                                Anterior
                            </button>
                            
                            <div class="page-numbers">
                                <button 
                                    v-for="page in getVisiblePages()" 
                                    :key="page"
                                    @click="goToPage(page)"
                                    :class="['page-btn', { 'active': page === currentPage, 'ellipsis': page === '...' }]"
                                    :disabled="page === '...'"
                                >
                                    {{ page }}
                                </button>
                            </div>
                            
                            <button 
                                @click="nextPage" 
                                :disabled="currentPage === totalPages"
                                class="pagination-btn next-btn"
                            >
                                Siguiente
                                <span class="custom-icon">▶️</span>
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
                detalleProductos: [],
                loader: true,
                filterLoading: false,
                search: '',
                title: 'Transferencias Pendientes',
                todosPedidos: [],
                transferencia: {},
                transferencias: [],
                // Paginación
                currentPage: 1,
                itemsPerPage: 10,
                itemsPerPageOptions: [10, 25, 50, 100]
            }
        },
        computed: {
            filteredTransferencias() {
                let filtered = this.transferencias;
                
                // Aplicar filtro de búsqueda
                if (this.search) {
                    filtered = filtered.filter(transfer => 
                        transfer.cliente.toLowerCase().includes(this.search.toLowerCase()) ||
                        transfer.numero.toString().toLowerCase().includes(this.search.toLowerCase())
                    );
                }
                
                return filtered;
            },
            paginatedTransferencias() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredTransferencias.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredTransferencias.length / this.itemsPerPage);
            },
            paginationInfo() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1;
                const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredTransferencias.length);
                return {
                    start,
                    end,
                    total: this.filteredTransferencias.length
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
            this.getTransferencias();
        },
        methods: {  
            filtrar(opcion){
                // Mostrar loader completo al aplicar filtros
                this.loader = true;
                
                // Simular tiempo de procesamiento para mostrar el loader
                setTimeout(() => {
                    this.aplicarFiltro(opcion);
                    // Resetear página actual al aplicar filtros
                    this.currentPage = 1;
                    this.loader = false;
                }, 800); // 800ms para mostrar el loader como en HistorialFacturas
            },
            getLoaderTitle(){
                if (this.filterLoading) {
                    return 'Aplicando filtros';
                }
                return 'Cargando transferencias';
            },
            getLoaderSubtitle(){
                if (this.filterLoading) {
                    return 'Filtrando transferencias según criterios seleccionados...';
                }
                return 'Procesando información de transferencias y estados...';
            },
            aplicarFiltroInicial(){
                // Aplicar filtro inicial inmediatamente sin delay
                const opcion = {canceladas: false, pagadas: false, pendientes: true};
                this.aplicarFiltro(opcion);
            },
            aplicarFiltro(opcion){
                let pedidos = []

                if(opcion.canceladas){
                    this.title = 'Transferencias Canceladas';
                    this.todosPedidos.forEach((el) => {
                        if(el.estado_id === 3){
                            pedidos.push(Object.assign({}, el))
                        }
                    });
                }else if(opcion.pagadas){
                    this.title = 'Transferencias Completadas';
                    this.todosPedidos.forEach((el) => {
                        if(el.estado_id === 2){
                            pedidos.push(Object.assign({}, el))
                        }
                    });
                }else if(opcion.pendientes){
                    this.title = 'Transferencias Pendientes';
                    this.todosPedidos.forEach((el) => {
                        if(el.estado_id === 1){
                            pedidos.push(Object.assign({}, el))
                        }
                    });
                }
                
                this.setTransferencias(pedidos);
            },
            getColor(estado){
                if(estado === 1) return 'info'
                else if(estado === 2) return 'success'
                else return 'red'
            },
            getStatusClass(estadoId) {
                if (estadoId === 1) return 'status-pending';
                else if (estadoId === 2) return 'status-completed';
                else return 'status-cancelled';
            },
            getStatusIcon(estadoId) {
                if (estadoId === 1) return 'fas fa-clock';
                else if (estadoId === 2) return 'fas fa-check-circle';
                else return 'fas fa-times-circle';
            },
            getStatusEmoji(estadoId) {
                if (estadoId === 1) return '⏰';
                else if (estadoId === 2) return '✅';
                else return '❌';
            },
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
            changeItemsPerPage(newValue) {
                this.itemsPerPage = newValue;
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
            getTransferencias(){
                axios.get('/historial-transferencias')
                    .then(res => {
                        // console.log(res.data)
                        this.todosPedidos = res.data;
                        // Aplicar filtro inicial inmediatamente
                        this.aplicarFiltroInicial();
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loader = false;
                    })
            },
            opcionesFiltrado(){
                console.log('Abriendo modal de filtros');
                this.$refs.filtros.showFiltros(3);
            },
            setTransferencias(pedidos){
                // Optimización: usar map para mejor rendimiento
                this.transferencias = pedidos.map(pedido => ({
                    id: pedido.id,
                    nit: pedido.clientes.nit,
                    dv: pedido.clientes.dv,
                    cliente: pedido.clientes.razon_social,
                    estado: pedido.estados.estado,
                    estado_id: pedido.estado_id,
                    numero: pedido.numero,
                    fecha: pedido.fecha,
                    valor: pedido.valor,
                    factura: pedido.factura
                }));
            },
            showTransfer(item){
                
                this.$refs.imprimir.showTransferencia(item);
            }
            
        },
    }
</script>
<style scoped>
/* Professional Container */
.transfers-container {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 2rem;
}

/* Header Section */
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
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
}

/* Sistema de iconos personalizados con emojis */
.custom-icon {
    display: inline-block;
    font-size: 1.2em;
    line-height: 1;
    margin-right: 0.5rem;
    vertical-align: middle;
    font-style: normal;
    font-weight: normal;
}

.custom-icon-document {
    font-size: 2rem;
    margin-right: 1rem;
    color: #17a2b8;
}

.custom-icon-search {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    pointer-events: none;
    font-size: 1.2rem;
    margin-right: 0;
    color: #64748b;
}

.custom-icon-filter {
    font-size: 1rem;
    margin-right: 0.5rem;
    color: white;
}

/* Iconos en headers de tabla */
.professional-table thead th .custom-icon {
    color: #17a2b8;
    margin-right: 0.5rem;
    font-size: 1.1rem;
}

/* Iconos de cliente móvil */
.client-icon.custom-icon {
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-right: 0.75rem;
}

/* Iconos de información móvil */
.info-icon.custom-icon {
    background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
    color: #17a2b8;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    margin-right: 0;
}

/* Iconos de estado */
.status-flag.custom-icon {
    font-size: 1.5rem;
    color: #64748b;
    margin-right: 1rem;
}

/* Botones de acción con iconos */
.action-btn .custom-icon {
    font-size: 1.2rem;
    margin: 0;
}

.mobile-action-btn .custom-icon {
    font-size: 1.1rem;
    margin-right: 0.5rem;
}

/* Iconos de paginación */
.pagination-btn .custom-icon {
    font-size: 1rem;
    margin: 0 0.25rem;
}

/* Estados específicos de iconos */
.status-badge .custom-icon,
.status-badge-mobile .custom-icon {
    margin-right: 0.5rem;
    font-size: 1rem;
}

/* Asegurar que los emojis se vean bien en todos los navegadores */
.custom-icon {
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.page-title {
    background: linear-gradient(135deg, #17a2b8 0%, #17a2b8 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
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
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    background: white;
}

.new-lab-btn {
    height: 50px;
    padding: 0 2rem;
    background: linear-gradient(135deg, #17a2b8 0%, #17a2b8 100%);
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
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
}

.new-lab-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
    color: white;
}



/* Loading Section */
.loading-section {
    margin-top: 2rem;
    width: 100%;
}

.professional-report-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    box-sizing: border-box;
}

.loader-container {
    text-align: center;
    padding: 4rem 2rem;
}

.spinner-professional {
    width: 60px;
    height: 60px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem;
}

.loader-title {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
}

.loader-subtitle {
    color: #64748b;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 2rem 0;
    line-height: 1.5;
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
    background: linear-gradient(90deg, #17a2b8, #17a2b8);
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
}

/* Content */
.transfers-content {
    margin-top: 2rem;
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
    min-width: 900px;
}

/* Table Header */
.professional-table thead th {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #374151;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 1.25rem 1rem;
    border-bottom: 2px solid #17a2b8;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
}

/* Table Body */
.professional-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
}

.professional-table tbody tr:hover {
    background: rgba(139, 92, 246, 0.05);
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
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #81d4fa;
}

.transfer-cell {
    font-weight: 600;
    color: #1e293b;
}

.transfer-number {
    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
    color: #17a2b8;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #c4b5fd;
}

.date-cell {
    color: #64748b;
    font-weight: 500;
}

.date-value {
    background: #f8fafc;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}

.amount-cell {
    font-weight: 600;
    font-family: 'Courier New', monospace;
}

.amount-value {
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-weight: 700;
    color: #1e293b;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border: 1px solid #93c5fd;
}

/* Status Badges */
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
}

.status-pending {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border: 1px solid #fbbf24;
}

.status-completed {
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    color: #059669;
    border: 1px solid #4ade80;
}

.status-cancelled {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #dc2626;
    border: 1px solid #f87171;
}

/* Action Buttons */
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

.view-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.view-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Mobile Cards Styles */
.transfer-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.transfer-card:hover {
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
    gap: 0.75rem;
    flex: 1;
}

.client-icon {
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

.client-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.1rem;
    line-height: 1.2;
}

.transfer-badge {
    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
    color: #17a2b8;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    border: 1px solid #c4b5fd;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.info-icon {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
}

.info-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
}

.info-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-value {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
}

/* Status Section Mobile */
.status-section {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.status-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
}

.status-flag {
    font-size: 1.5rem;
    color: #64748b;
}

.status-badge-mobile {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    flex: 1;
    justify-content: center;
}

/* Actions Section Mobile */
.actions-section {
    display: flex;
    gap: 1rem;
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

/* Pagination Styles (same as HistorialFacturas) */
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
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
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
    background: rgba(139, 92, 246, 0.05);
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
    background: rgba(139, 92, 246, 0.05);
}

.page-btn.active {
    background: linear-gradient(135deg, #17a2b8 0%, #17a2b8 100%);
    color: white;
    border-color: #17a2b8;
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
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

/* Animations */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes progress {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
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

@media (max-width: 768px) {
    .transfers-container {
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
    
    .transfer-card {
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
    
    .transfer-badge {
        align-self: center;
        font-size: 0.85rem;
    }
    
    .info-row {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
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
}

@media (max-width: 480px) {
    .transfers-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .transfer-card {
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
</style>
