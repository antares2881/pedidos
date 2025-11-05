<template>
    <v-app>
        <div class="pedidos-container">
            <aplicar-filtros ref="filtros" @aplicarFiltros="filtrar" />
            <historial-pagos ref="historialPagos" />
            
            <!-- Header Section -->
            <div class="header-section">
                <div class="page-header">
                    <h2>
                        <span class="custom-icon custom-icon-document">📋</span>
                        <span class="page-title">{{ title }}</span>
                    </h2>
                    <p class="page-description">
                        Gestión y seguimiento completo de pedidos con herramientas de búsqueda avanzada
                    </p>
                </div>
                
                <div class="header-actions">
                    <div class="search-box">
                        <span class="custom-icon custom-icon-search">🔍</span>
                        <input 
                            type="text" 
                            class="form-control search-input" 
                            v-model="search" 
                            placeholder="Buscar por cliente, pedido o factura..."
                        >
                    </div>
                    <button class="btn btn-primary new-lab-btn" @click="opcionesFiltrado">
                        <span class="custom-icon custom-icon-filter">🔽</span>
                        Filtrar Pedidos
                    </button>
                </div>
            </div>

            <!-- Professional Loader -->
            <div class="loading-section" v-if="loader">
                <div class="professional-report-container">
                    <div class="loader-container">
                        <div class="spinner-professional"></div>
                        <h3 class="loader-title">Cargando gestión de pedidos</h3>
                        <p class="loader-subtitle">Procesando información de pedidos, facturas y estados...</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Content -->
            <div class="pedidos-content" v-if="!loader">
                <div class="professional-report-container">
                    <!-- Desktop/Tablet Table -->
                    <div class="desktop-table">
                        <div class="table-responsive professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            <span class="custom-icon">🏢</span>
                                            Lab
                                        </th>
                                        <th class="text-left">
                                            <span class="custom-icon">👤</span>
                                            Cliente
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">📅</span>
                                            Fecha
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">📋</span>
                                            Pedido
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">📄</span>
                                            Factura
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">💰</span>
                                            Valor
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">⚙️</span>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedPedidos" :key="index" class="data-row">
                                        <!-- Logo del laboratorio -->
                                        <td class="text-center lab-cell">
                                            <div class="logo-container">
                                                <img :src="item.logo" alt="Logo laboratorio" class="lab-logo">
                                            </div>
                                        </td>

                                        <!-- Cliente -->
                                        <td class="text-left client-cell">
                                            <span class="client-name">{{ item.cliente.split(' - ')[0] }}</span>
                                            <small class="client-location">{{ item.cliente.split(' - ')[1] }}</small>
                                        </td>

                                        <!-- Fecha -->
                                        <td class="text-center date-cell">
                                            <span class="date-value">
                                                {{ (item.numero_factura == 0) ? item.fecha_pedido : item.fecha_factura }}
                                            </span>
                                        </td>

                                        <!-- Pedido -->
                                        <td class="text-center pedido-cell">
                                            <a :href="'/imprimir-pedido-calox/1/' + item.num_pedido" target="_blank" class="pedido-number">
                                                <span class="custom-icon">🖨️</span>
                                                {{ item.num_pedido }}
                                            </a>
                                        </td>

                                        <!-- Factura -->
                                        <td class="text-center invoice-cell">
                                            <a 
                                                v-if="item.numero_factura != 0"
                                                :href="'/imprimir-pedido-calox/2/' + item.id" 
                                                target="_blank" 
                                                class="invoice-number"
                                            >
                                                <span class="custom-icon">📄</span> {{ item.numero_factura }}
                                            </a>
                                            <span v-else class="no-factura">
                                                <span class="custom-icon">⏰</span>
                                                Pendiente
                                            </span>
                                        </td>

                                        <!-- Valor -->
                                        <td class="text-right amount-cell">
                                            <span class="amount-value">{{ item.total_factura | currency }}</span>
                                        </td>

                                        <!-- Acciones -->
                                        <td class="text-center actions-cell">
                                            <div class="action-buttons">
                                                <button 
                                                    v-if="item.estado_id === 6 || item.estado_id === 5" 
                                                    @click="historyCoin(item)" 
                                                    class="action-btn history-btn"
                                                    title="Ver historial de abonos"
                                                >
                                                    <span class="custom-icon">💳</span>
                                                </button>
                                                <div v-else class="status-badge" :class="getStatusClass(item.estado_id)">
                                                    {{ getStatusText(item.estado_id) }}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Professional Pagination -->
                    <div class="pagination-section" v-if="filteredData.length > 0">
                        <div class="pagination-info">
                            <div class="items-per-page">
                                <span class="pagination-label">Mostrar:</span>
                                <select 
                                    v-model="itemsPerPage" 
                                    @change="changeItemsPerPage"
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
                                    {{ paginationInfo.start }} - {{ paginationInfo.end }} de {{ filteredData.length }} registros
                                </span>
                            </div>
                        </div>
                        
                        <div class="pagination-controls">
                            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn prev-btn">
                                <i class="fas fa-chevron-left"></i>
                                Anterior
                            </button>
                            
                            <div class="page-numbers">
                                <template v-for="page in getVisiblePages()">
                                    <button v-if="page !== 'ellipsis'" :key="'btn-' + page" :class="['page-btn', { 'active': currentPage === page }]" @click="goToPage(page)">
                                        {{ page }}
                                    </button>
                                    <span v-else :key="'ellipsis-' + page" class="page-btn ellipsis">...</span>
                                </template>
                            </div>
                            
                            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn next-btn">
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
        props: ['ventas'],
        data() {
            return {
                abono: {abono: false, recibo_caja: null},
                dialogAbonar: false,
                error: '',
                headers: [
                    {text: 'Lab', value: 'LogoEmpresa', width: '80px', sortable: false},
                    {text: 'Cliente', value: 'cliente', width: '250px'},
                    {text: 'Fecha', value: 'fecha', width: '120px'},
                    {text: 'Pedido', value: 'pedido', width: '120px', sortable: false},
                    {text: 'Factura', value: 'factura', width: '120px', sortable: false},
                    {text: 'Valor', value: 'Valorfactura', width: '130px', align: 'end'},
                    {text: 'Acciones', value: 'btnAcciones', width: '120px', sortable: false, align: 'center'},
                ],
                index: -1,
                loader: false,
                mensajeError: false,
                pedidosCalox: [],
                saldo: 0,
                search: '',
                title: 'Pedidos pendientes',
                todasLasFacturas: [],
                // Paginación personalizada
                currentPage: 1,
                itemsPerPage: 15,
                itemsPerPageOptions: [10, 15, 25, 50, 100]
            }
        },
        watch: {
            search() {
                // Resetear página cuando cambie la búsqueda
                this.currentPage = 1;
            }
        },
        mounted() {
            this.todasLasFacturas = this.ventas;
            const opcion = {pendientes: true, canceladas: false, pagadas: false}
            this.filtrar(opcion);
        },
        methods: {
            filtrar(opcion){
                this.loader = true;
                let facturas = []

                if(opcion.canceladas){
                    this.title = 'Pedidos cancelados';
                    this.todasLasFacturas.map((el) => {
                        if(el.estado_id === 3){
                            facturas.push(Object.assign({}, el))
                        }
                    });
                    this.setVentas(facturas);
                }else if(opcion.pagadas){
                    this.title = 'Pedidos pagados';
                    this.todasLasFacturas.map((el) => {
                        if(el.estado_id === 6){
                            facturas.push(Object.assign({}, el))
                        }
                    });
                    this.setVentas(facturas);
                }else if(opcion.pendientes){
                    this.title = 'Pedidos pendientes';
                    this.todasLasFacturas.map((el) => {
                        if(el.estado_id === 4 || el.estado_id === 5 || el.estado_id === 1){
                            facturas.push(Object.assign({}, el))
                        }
                    });
                    this.setVentas(facturas);
                }
                this.modalFiltrar = false;
                
                setTimeout(() => {
                    this.loader = false;
                }, 500);
            },
            getStatusClass(estadoId) {
                switch(estadoId) {
                    case 1: return 'status-nuevo';
                    case 3: return 'status-cancelado';
                    case 4: return 'status-pendiente';
                    case 5: return 'status-parcial';
                    case 6: return 'status-pagado';
                    default: return 'status-default';
                }
            },
            getStatusText(estadoId) {
                switch(estadoId) {
                    case 1: return 'Nuevo';
                    case 3: return 'Cancelado';
                    case 4: return 'Pendiente';
                    case 5: return 'Parcial';
                    case 6: return 'Pagado';
                    default: return 'N/A';
                }
            },           
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            historyCoin(item){
                this.$refs.historialPagos.getHistorialPagos(2, item);
            },
            opcionesFiltrado(){
                this.$refs.filtros.showFiltros(2);
            },
            setTiempo(item){
                let hoy = new Date();
                let fecha = new Date(item); //Calcula el tiempo transcurrido de la factura
                let tiempo = Math.round((hoy.getTime() - fecha.getTime())/86400000);
                return tiempo
            },
            setVentas(facturas){
                this.pedidosCalox = [];
                facturas.map((el) => {

                    this.pedidosCalox.push({
                        id: el.id,
                        cliente: el.razon_social+' - '+el.mcpio,
                        laboratorio: el.Laboratorio,
                        logo: el.logo,
                        num_pedido: el.num_pedido,
                        numero_factura: el.numero_factura,
                        fecha_pedido: el.fecha,
                        fecha_factura: el.fecha_factura,
                        valor: el.valor,
                        total_factura: el.total_factura,
                        estado_id: el.estado_id
                    })

                });
                
                // Reset pagination
                this.currentPage = 1;
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
                if (page !== '...' && page >= 1 && page <= this.totalPages) {
                    this.currentPage = page;
                }
            },
            changeItemsPerPage() {
                this.currentPage = 1; // Reset to first page
            },
            getVisiblePages() {
                const total = this.totalPages;
                const current = this.currentPage;
                const pages = [];
                
                if (total <= 7) {
                    // Si hay 7 páginas o menos, mostrar todas
                    for (let i = 1; i <= total; i++) {
                        pages.push(i);
                    }
                } else {
                    // Lógica para páginas con elipsis
                    if (current <= 4) {
                        // Cerca del inicio
                        for (let i = 1; i <= 5; i++) {
                            pages.push(i);
                        }
                        pages.push('ellipsis');
                        pages.push(total);
                    } else if (current >= total - 3) {
                        // Cerca del final
                        pages.push(1);
                        pages.push('ellipsis');
                        for (let i = total - 4; i <= total; i++) {
                            pages.push(i);
                        }
                    } else {
                        // En el medio
                        pages.push(1);
                        pages.push('ellipsis');
                        for (let i = current - 1; i <= current + 1; i++) {
                            pages.push(i);
                        }
                        pages.push('ellipsis');
                        pages.push(total);
                    }
                }
                
                return pages;
            }
        },
        computed: {
            filteredData() {
                let filtered = this.pedidosCalox;
                
                // Aplicar filtro de búsqueda
                if (this.search) {
                    const searchTerm = this.search.toLowerCase();
                    filtered = filtered.filter(item => {
                        return item.cliente.toLowerCase().includes(searchTerm) ||
                               item.num_pedido.toString().includes(searchTerm) ||
                               (item.numero_factura && item.numero_factura.toString().includes(searchTerm));
                    });
                }
                
                return filtered;
            },
            paginatedPedidos() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredData.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredData.length / this.itemsPerPage);
            },
            paginationInfo() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1;
                const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
                return {
                    start: this.filteredData.length > 0 ? start : 0,
                    end: end
                };
            }
        },
    }
</script>
<style scoped>
/* Professional Container */
.pedidos-container {
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
    color: #10b981;
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
    color: #10b981;
    margin-right: 0.5rem;
    font-size: 1.1rem;
}

/* Asegurar que los emojis se vean bien en todos los navegadores */
.custom-icon {
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.page-title {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    background: white;
}

.new-lab-btn {
    height: 50px;
    padding: 0 2rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

.new-lab-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    color: white;
}

/* Professional Header */
.professional-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.header-left {
    flex: 1;
}

.header-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-icon {
    color: #3b82f6;
    font-size: 2rem;
}

.header-subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
    line-height: 1.6;
}

.header-right {
    display: flex;
    align-items: center;
}

.stats-badge {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    min-width: 120px;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
}

.stat-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.9;
}

/* Professional Controls */
.controls-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-filter-container {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.search-container {
    position: relative;
    flex: 1;
    max-width: 500px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 1rem;
    z-index: 2;
}

.search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    background: #f8fafc;
    color: #374151;
    outline: none;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
    color: #9ca3af;
}

.clear-search-btn {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: #f3f4f6;
    border: none;
    border-radius: 6px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s ease;
}

.clear-search-btn:hover {
    background: #e5e7eb;
    color: #374151;
}

.professional-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.btn-filter {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-filter:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
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

.filter-container {
    display: flex;
    align-items: stretch;
}

.filter-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    white-space: nowrap;
}

.filter-btn .v-icon {
    margin-right: 0.25rem;
}

.filter-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.filter-btn:active {
    transform: translateY(0);
}

/* Content */
.pedidos-content {
    margin-top: 0;
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
    border-bottom: 2px solid #10b981;
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
    background: rgba(16, 185, 129, 0.05);
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
    text-align: center;
}

.lab-logo {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: contain;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

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
    display: block;
    margin-bottom: 0.25rem;
}

.client-location {
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
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

.pedido-cell a.pedido-number {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #16a34a;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #86efac;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.pedido-cell a.pedido-number:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

.invoice-cell a.invoice-number {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #fcd34d;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.invoice-cell a.invoice-number:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3);
}

.no-factura {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #dc2626;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #f87171;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
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

.history-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

.history-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
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
    display: block;
    margin-bottom: 0.25rem;
}

.client-location {
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 500;
}

.invoice-cell {
    font-weight: 600;
    color: #1e293b;
}

.pedido-number, .invoice-number {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #fcd34d;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.pedido-number:hover, .invoice-number:hover {
    background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(146, 64, 14, 0.2);
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

.no-factura {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid #fcd34d;
    white-space: nowrap;
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

.status-nuevo {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #1d4ed8;
    border: 1px solid #93c5fd;
}

.status-cancelado {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #dc2626;
    border: 1px solid #f87171;
}

.status-pendiente {
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    color: #ea580c;
    border: 1px solid #fb923c;
}

.status-parcial {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border: 1px solid #fcd34d;
}

.status-pagado {
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    color: #059669;
    border: 1px solid #4ade80;
}

.status-default {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    color: #64748b;
    border: 1px solid #cbd5e1;
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

.history-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

.history-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

/* Logo Container */
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.lab-logo {
    width: 45px;
    height: 45px;
    object-fit: contain;
    border-radius: 8px;
    border: 2px solid #f1f5f9;
    padding: 4px;
    background: white;
    transition: all 0.2s ease;
}

.lab-logo:hover {
    transform: scale(1.1);
    border-color: #3b82f6;
}

.client-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.client-name {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.9rem;
    line-height: 1.3;
}

.client-location {
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 500;
}

.date-container {
    display: flex;
    align-items: center;
}

.date-value {
    background: #f8fafc;
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    border: 1px solid #e2e8f0;
}

.action-container {
    display: flex;
    justify-content: center;
}

.pedido-btn, .factura-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    text-decoration: none !important;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    border: 1px solid;
    white-space: nowrap;
    min-width: fit-content;
}

.pedido-btn .v-icon,
.factura-btn .v-icon {
    font-size: 14px !important;
    flex-shrink: 0;
    margin-right: 0.25rem;
}

.pedido-btn {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #1d4ed8 !important;
    border-color: #93c5fd;
}

.pedido-btn:hover {
    background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
    color: #1d4ed8 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(29, 78, 216, 0.2);
}

.factura-btn {
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    color: #059669 !important;
    border-color: #4ade80;
}

.factura-btn:hover {
    background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
    color: #059669 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(5, 150, 105, 0.2);
}

.no-factura {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid #fcd34d;
    white-space: nowrap;
}

.no-factura .v-icon {
    font-size: 14px !important;
    flex-shrink: 0;
    margin-right: 0.25rem;
}

.value-container {
    display: flex;
    justify-content: flex-end;
}

.value-amount {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    color: #16a34a;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    border: 1px solid #bbf7d0;
}

.actions-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.history-btn {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border: 1px solid #fcd34d;
    border-radius: 8px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    min-width: 36px;
    flex-shrink: 0;
}

.history-btn .v-icon {
    font-size: 16px !important;
    line-height: 1;
}

.history-btn:hover {
    background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(217, 119, 6, 0.2);
}

/* Status Indicators */
.status-indicator {
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
    min-width: 80px;
}

.status-nuevo {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #1d4ed8;
    border: 1px solid #93c5fd;
}

.status-cancelado {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #dc2626;
    border: 1px solid #f87171;
}

.status-pendiente {
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    color: #ea580c;
    border: 1px solid #fb923c;
}

.status-parcial {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border: 1px solid #fcd34d;
}

.status-pagado {
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    color: #059669;
    border: 1px solid #4ade80;
}

.status-default {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    color: #64748b;
    border: 1px solid #cbd5e1;
}



/* Responsive Design */
@media (max-width: 1200px) {
    .professional-header {
        padding: 2rem;
    }
    
    .header-content {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        text-align: center;
    }
    
    .search-filter-container {
        flex-direction: column;
        gap: 1rem;
    }
    
    .search-container {
        max-width: 100%;
    }
    
    .professional-btn {
        align-self: stretch;
        justify-content: center;
    }
    
    .header-title {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .pedidos-container {
        padding: 1rem;
    }
    
    .professional-header,
    .controls-section {
        border-radius: 16px;
        padding: 1.5rem;
    }
    
    .professional-report-container {
        border-radius: 16px;
    }
    
    .loader-container {
        padding: 3rem 1.5rem;
    }
    
    .loader-title {
        font-size: 1.3rem;
    }
    
    .loader-subtitle {
        font-size: 0.9rem;
    }
    
    .table-card {
        border-radius: 16px !important;
    }
    
    .header-title {
        font-size: 1.8rem;
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
    
    .custom-data-table >>> thead th {
        font-size: 0.75rem !important;
        padding: 0.75rem 0.5rem !important;
    }
    
    .custom-data-table >>> tbody td {
        padding: 0.75rem 0.5rem !important;
        font-size: 0.85rem;
    }
    
    /* Responsive Pagination */
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
    
    .lab-logo {
        width: 35px;
        height: 35px;
    }
    
    .client-name {
        font-size: 0.85rem;
    }
    
    .client-location {
        font-size: 0.75rem;
    }
}

@media (max-width: 480px) {
    .pedidos-container {
        padding: 0.75rem;
    }
    
    .professional-header,
    .controls-section {
        padding: 1.25rem;
    }
    
    .header-title {
        font-size: 1.6rem;
    }
    
    .loader-container {
        padding: 2.5rem 1rem;
    }
    
    .loader-title {
        font-size: 1.2rem;
    }
    
    .loader-subtitle {
        font-size: 0.85rem;
    }
    
    .spinner-professional {
        width: 50px;
        height: 50px;
    }
    
    .stats-badge {
        min-width: 100px;
        padding: 1.25rem 1.5rem;
    }
    
    .stat-number {
        font-size: 1.75rem;
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

/* Loading state */
.custom-data-table >>> .v-data-table__progress {
    background: linear-gradient(90deg, #3b82f6, #17a2b8, #3b82f6);
    background-size: 200% 100%;
    animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Animations for Professional Loader */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes progress {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
}

/* No data state */
.custom-data-table >>> .v-data-table__empty-wrapper {
    padding: 3rem;
    text-align: center;
    color: #64748b;
    font-size: 1rem;
}

/* Hover effects for interactive elements */
.pedido-btn:focus,
.factura-btn:focus,
.history-btn:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* Professional Pagination Styles */
.pagination-section {
    background: white;
    border-top: 2px solid #f1f5f9;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    border-radius: 0 0 16px 16px;
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
</style>
