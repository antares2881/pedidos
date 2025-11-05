<template>
    <v-app>
        <div class="invoices-container">
            <aplicar-filtros ref="filtros" @aplicarFiltros="filtrar" />
            <historial-pagos ref="historialPagos" />
            
            <!-- Header Section -->
            <div class="header-section">
                <div class="page-header">
                    <h2>
                        <span class="custom-icon custom-icon-document">📄</span>
                        <span class="page-title">{{ title }}</span>
                    </h2>
                    <p class="page-description">
                        Gestión completa del historial de facturas y seguimiento de pagos
                    </p>
                </div>
                
                <div class="header-actions">
                    <div class="search-box">
                        <span class="custom-icon custom-icon-search">🔍</span>
                        <input 
                            type="text" 
                            class="form-control search-input" 
                            v-model="search" 
                            placeholder="Buscar por cliente o factura..."
                        >
                    </div>
                    <button class="btn btn-primary new-lab-btn" @click="opcionesFiltrado">
                        <span class="custom-icon custom-icon-filter">🔽</span>
                        Filtrar Facturas
                    </button>
                </div>
            </div>

            <!-- Professional Loader -->
            <div class="loading-section" v-if="loader">
                <div class="professional-report-container">
                    <div class="loader-container">
                        <div class="spinner-professional"></div>
                        <h3 class="loader-title">Cargando historial de facturas</h3>
                        <p class="loader-subtitle">Procesando información de facturas y estados de pago...</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Content -->
            <div class="invoices-content" v-if="!loader">
                <div class="professional-report-container">
                    <!-- Desktop/Tablet Table -->
                    <div class="desktop-table">
                        <div class="table-responsive professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            <span class="custom-icon">👤</span>
                                            Cliente
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">📄</span> Factura
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
                                            <span class="custom-icon">⏱️</span>
                                            Estado/Edad
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">⚙️</span>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedFacturas" :key="index" class="data-row">
                                        <td class="text-left client-cell">
                                            <span class="client-name">{{ item.cliente }}</span>
                                        </td>
                                        <td class="text-center invoice-cell">
                                            <span class="invoice-number">
                                                {{ (item.electronica == 0) ? item.num_factura : item.electronica }}
                                            </span>
                                        </td>
                                        <td class="text-center date-cell">
                                            <span class="date-value">{{ item.fecha }}</span>
                                        </td>
                                        <td class="text-right amount-cell">
                                            <span class="amount-value">{{ item.total | currency }}</span>
                                        </td>
                                        <td class="text-center status-cell">
                                            <div v-if="item.estado_id === 3 || item.estado_id === 6">
                                                <span
                                                    class="status-badge status-cancelled"
                                                    v-if="item.estado_id === 3"
                                                >
                                                    <span class="custom-icon">❌</span>
                                                    Cancelada
                                                </span>
                                                <span
                                                    class="status-badge status-paid"
                                                    v-if="item.estado_id === 6"
                                                >
                                                    <span class="custom-icon">✅</span>
                                                    Pagada
                                                </span>
                                            </div>
                                            <div v-else>
                                                <span
                                                    class="age-badge"
                                                    :class="{
                                                        'age-normal': item.tiempo <= 30,
                                                        'age-warning': item.tiempo > 30 && item.tiempo <= 45, 
                                                        'age-danger': item.tiempo > 45
                                                    }"
                                                >
                                                    <span class="custom-icon">⏰</span>
                                                    {{ item.tiempo }} días
                                                </span>
                                            </div>
                                        </td>
                                        <td class="text-center actions-cell">
                                            <div class="action-buttons">
                                                <a :href="'/imprimir-factura/' + item.id" target="_blank" class="action-btn print-btn" title="Imprimir factura">
                                                    <span class="custom-icon">🖨️</span>
                                                </a>
                                                <button 
                                                    v-if="item.estado_id === 6 || item.estado_id === 5"
                                                    @click="historyCoin(item)" 
                                                    title="Historial de abonos"
                                                    class="action-btn history-btn"
                                                >
                                                    <span class="custom-icon">💳</span>
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
                        <div v-for="(item, index) in paginatedFacturas" :key="index" class="invoice-card">
                            <div class="card-header">
                                <div class="client-info">
                                    <span class="custom-icon client-icon">👤</span>
                                    <span class="client-name-mobile">{{ item.cliente }}</span>
                                </div>
                                <div class="invoice-badge">
                                    <span class="custom-icon">📄</span> {{ (item.electronica == 0) ? item.num_factura : item.electronica }}
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
                                            <span class="info-value">{{ item.total | currency }}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="status-section">
                                    <div v-if="item.estado_id === 3 || item.estado_id === 6" class="status-container">
                                        <span
                                            class="status-badge-mobile status-cancelled"
                                            v-if="item.estado_id === 3"
                                        >
                                            <span class="custom-icon">❌</span>
                                            Cancelada
                                        </span>
                                        <span
                                            class="status-badge-mobile status-paid"
                                            v-if="item.estado_id === 6"
                                        >
                                            <span class="custom-icon">✅</span>
                                            Pagada
                                        </span>
                                    </div>
                                    <div v-else class="age-container">
                                        <span class="custom-icon age-icon">⏰</span>
                                        <span
                                            class="age-badge-mobile"
                                            :class="{
                                                'age-normal': item.tiempo <= 30,
                                                'age-warning': item.tiempo > 30 && item.tiempo <= 45, 
                                                'age-danger': item.tiempo > 45
                                            }"
                                        >
                                            {{ item.tiempo }} días de antigüedad
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="actions-section">
                                    <a :href="'/imprimir-factura/' + item.id" target="_blank" class="mobile-action-btn print-btn">
                                        <span class="custom-icon">🖨️</span>
                                        Imprimir
                                    </a>
                                    <button 
                                        v-if="item.estado_id === 6 || item.estado_id === 5"
                                        @click="historyCoin(item)" 
                                        class="mobile-action-btn history-btn"
                                    >
                                        <span class="custom-icon">💳</span>
                                        Historial
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div class="pagination-section" v-if="filteredFacturas.length > 0">
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
            
            <!-- <abonofactura-component ref="abonoFactura" /> -->
            <!-- <notas-component ref="notas" /> -->
        </div>
    </v-app>
</template>
<script>
    export default {
        props: ['user'],
        data() {
            return {
                abono: {},
                errores: '',
                facturas: [],
                fechaHoy : '',
                loader: true,
                mensajeError: false,
                search: '',
                title: 'Facturas Pendientes',
                todasLasFacturas: [],
                // Paginación
                currentPage: 1,
                itemsPerPage: 10,
                itemsPerPageOptions: [10, 25, 50, 100]
            }
        },
        computed: {
            filteredFacturas() {
                let filtered = this.facturas;
                
                // Aplicar filtro de búsqueda
                if (this.search) {
                    filtered = filtered.filter(factura => 
                        factura.cliente.toLowerCase().includes(this.search.toLowerCase()) ||
                        factura.num_factura.toString().toLowerCase().includes(this.search.toLowerCase()) ||
                        (factura.electronica && factura.electronica.toString().toLowerCase().includes(this.search.toLowerCase()))
                    );
                }
                
                return filtered;
            },
            paginatedFacturas() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredFacturas.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredFacturas.length / this.itemsPerPage);
            },
            paginationInfo() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1;
                const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredFacturas.length);
                return {
                    start,
                    end,
                    total: this.filteredFacturas.length
                };
            }
        },
        watch: {
            search() {
                // Resetear página cuando cambie la búsqueda
                this.currentPage = 1;
            }
        },
        created() {

        },
        mounted() {
            this.getFacturas()
            // console.log(this.user)
        },
        methods: {            
            filtrar(opcion){
                // Mostrar loader al aplicar filtros
                this.loader = true;
                
                // Simular tiempo de procesamiento para mostrar el loader
                setTimeout(() => {
                    let facturas = []

                    if(opcion.canceladas){
                        this.title = 'Facturas Canceladas';
                        this.todasLasFacturas.map((el) => {
                            if(el.estado_id === 3){
                                facturas.push(Object.assign({}, el))
                            }
                        });
                        this.setFacturas(facturas);
                    }else if(opcion.pagadas){
                        this.title = 'Facturas Pagadas';
                        this.todasLasFacturas.map((el) => {
                            if(el.estado_id === 6){
                                facturas.push(Object.assign({}, el))
                            }
                        });
                        this.setFacturas(facturas);
                    }else if(opcion.pendientes){
                        this.title = 'Facturas Pendientes';
                        this.todasLasFacturas.map((el) => {
                            if(el.estado_id === 4 || el.estado_id === 5){
                                facturas.push(Object.assign({}, el))
                            }
                        });
                        this.setFacturas(facturas);
                    }
                    
                    // Resetear página actual al aplicar filtros
                    this.currentPage = 1;
                    this.loader = false;
                }, 800); // 800ms para mostrar el loader
            },
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
            historyCoin(item){
                this.$refs.historialPagos.getHistorialPagos(1, item);
            },
            getFacturas(){
                axios.get('/facturas')
                    .then(res => {
                        // console.log(res.data)
                        this.setFacturas(res.data);
                        this.todasLasFacturas = res.data;
                        this.loader = false;
                        const opcion = {pendientes: true, canceladas: false, pagadas: false}
                        this.filtrar(opcion);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            opcionesFiltrado(){
                this.$refs.filtros.showFiltros(1);
            },
            setFacturas(facturas){
                this.facturas = [];
                let hoy = new Date();
                for (let i = 0; i < facturas.length; i++) {

                    let fecha = new Date(facturas[i].fecha_factura); //Calcula el tiempo transcurrido de la factura
                    let tiempo = Math.round((hoy.getTime() - fecha.getTime())/86400000);

                    this.facturas.push({
                        id: facturas[i].id,
                        estado_id: facturas[i].estado_id,
                        estado: facturas[i].estado,
                        cliente: facturas[i].razon_social,
                        num_factura: facturas[i].numero_factura,
                        electronica: facturas[i].electronica,
                        fecha: facturas[i].fecha_factura,
                        total: facturas[i].valor,
                        tiempo: tiempo
                    });
                }
            },
        },
    }
</script>
<style scoped>
/* Professional Container */
.invoices-container {
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

.page-header h2 i,
.header-icon {
    color: #3b82f6 !important;
    margin-right: 1rem;
    font-size: 2rem;
    display: inline-block;
    -webkit-text-fill-color: #3b82f6 !important;
    background: none !important;
    background-clip: unset !important;
    -webkit-background-clip: unset !important;
    opacity: 1 !important;
    visibility: visible !important;
}

.header-icon-fallback {
    margin-right: 1rem;
    font-size: 2rem;
    display: none;
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
    color: #3b82f6;
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
    color: #3b82f6;
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
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    margin-right: 0;
}

/* Iconos de edad */
.age-icon.custom-icon {
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
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    background: white;
}

.new-lab-btn {
    height: 50px;
    padding: 0 2rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.new-lab-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
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
    border-top: 4px solid #3b82f6;
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
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
}

/* Content */
.invoices-content {
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
    border-bottom: 2px solid #3b82f6;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
}

.professional-table thead th i {
    margin-right: 0.5rem;
    color: #3b82f6;
}

/* Table Body */
.professional-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
}

.professional-table tbody tr:hover {
    background: rgba(59, 130, 246, 0.05);
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

.invoice-cell {
    font-weight: 600;
    color: #1e293b;
}

.invoice-number {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #fcd34d;
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

.status-cancelled {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #dc2626;
    border: 1px solid #f87171;
}

.status-paid {
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    color: #059669;
    border: 1px solid #4ade80;
}

.age-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
}

.age-normal {
    background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
    color: #0369a1;
    border: 1px solid #7dd3fc;
}

.age-warning {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border: 1px solid #fbbf24;
}

.age-danger {
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

.print-btn {
    background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(248, 113, 113, 0.3);
}

.print-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(248, 113, 113, 0.4);
}

.history-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

.history-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

/* Mobile Cards Styles */
.invoice-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.invoice-card:hover {
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

.invoice-badge {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    border: 1px solid #fcd34d;
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

.status-badge-mobile {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
}

.age-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
}

.age-icon {
    font-size: 1.5rem;
    color: #64748b;
}

.age-badge-mobile {
    font-weight: 700;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-align: center;
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
    .invoices-container {
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
    
    .invoice-card {
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
    
    .invoice-badge {
        align-self: center;
        font-size: 0.85rem;
    }
    
    .info-row {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
}

@media (max-width: 480px) {
    .invoices-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .invoice-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
    }
    
    .client-name-mobile {
        font-size: 0.95rem;
    }
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
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
    border-color: #3b82f6;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
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
    border-color: #3b82f6;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
}

.page-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border-color: #3b82f6;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
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

@media (max-width: 480px) {
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
