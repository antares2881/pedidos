<template>
    <div class="ultimo-pedido-container">
        <!-- Summary Header -->
        <div class="summary-header">
            <div class="summary-cards">
                <div class="summary-card valor-factura">
                    <div class="summary-icon">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <div class="summary-content">
                        <h4 class="summary-title">Valor Factura</h4>
                        <p class="summary-value">{{ formatCurrency(datos[0].tipocliente_id === 1 ? datos[0].valor : datos[0].total_factura) }}</p>
                    </div>
                </div>
                
                <div class="summary-card fecha-factura">
                    <div class="summary-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="summary-content">
                        <h4 class="summary-title">Fecha Factura</h4>
                        <p class="summary-value">{{ (datos[0].tipocliente_id === 1) ? datos[0].fecha_factura : datos[0].fecha }}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Desktop Table -->
        <div class="desktop-table">
            <div class="professional-table-wrapper">
                <table class="professional-table">
                    <thead>
                        <tr>
                            <th class="text-left">
                                <i class="fas fa-box"></i>
                                Producto
                            </th>
                            <th class="text-center">
                                <i class="fas fa-pills"></i>
                                Presentación
                            </th>
                            <th class="text-right">
                                <i class="fas fa-sort-numeric-down"></i>
                                Cantidad
                            </th>
                            <th class="text-right">
                                <i class="fas fa-dollar-sign"></i>
                                Precio
                            </th>
                            <th class="text-right">
                                <i class="fas fa-calculator"></i>
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paginatedData" :key="index" class="data-row">
                            <td class="text-left producto-cell">
                                <span class="producto-name">{{ item.producto }}</span>
                            </td>
                            <td class="text-center presentacion-cell">
                                <span class="presentacion-badge">{{ item.presentacion }}</span>
                            </td>
                            <td class="text-right cantidad-cell">
                                <span class="cantidad-value">{{ item.cantidad }}</span>
                            </td>
                            <td class="text-right precio-cell">
                                <span class="precio-value">{{ formatCurrency(item.tipocliente_id === 1 ? item.precio_factura : item.precio_entrada) }}</span>
                            </td>
                            <td class="text-right total-cell">
                                <span class="total-value">{{ formatCurrency(item.tipocliente_id === 1 ? (item.precio_factura * item.cantidad) : (item.precio_entrada * item.cantidad)) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Pagination -->
        <div class="pagination-section" v-if="shouldPaginate">
            <div class="pagination-info">
                <span class="pagination-text">
                    Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, datos.length) }} de {{ datos.length }} productos
                </span>
            </div>
            <div class="pagination-controls">
                <button 
                    class="pagination-btn" 
                    @click="prevPage" 
                    :disabled="currentPage === 1"
                >
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <button 
                    v-for="page in Math.min(totalPages, 5)" 
                    :key="page"
                    class="pagination-btn page-number"
                    :class="{ active: currentPage === page }"
                    @click="goToPage(page)"
                >
                    {{ page }}
                </button>
                
                <span v-if="totalPages > 5" class="pagination-dots">...</span>
                
                <button 
                    class="pagination-btn" 
                    @click="nextPage" 
                    :disabled="currentPage === totalPages"
                >
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
        
        <!-- Mobile Cards -->
        <div class="mobile-cards-container">
            <div v-for="(item, index) in paginatedData" :key="index" class="pedido-card">
                <div class="card-header">
                    <div class="producto-info">
                        <i class="fas fa-box producto-icon"></i>
                        <div class="producto-details">
                            <span class="producto-name-mobile">{{ item.producto }}</span>
                            <span class="presentacion-mobile">{{ item.presentacion }}</span>
                        </div>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="info-grid">
                        <div class="info-item cantidad">
                            <i class="fas fa-sort-numeric-down info-icon"></i>
                            <div class="info-content">
                                <span class="info-label">Cantidad</span>
                                <span class="info-value">{{ item.cantidad }}</span>
                            </div>
                        </div>
                        
                        <div class="info-item precio">
                            <i class="fas fa-dollar-sign info-icon"></i>
                            <div class="info-content">
                                <span class="info-label">Precio Unit.</span>
                                <span class="info-value">{{ formatCurrency(item.tipocliente_id === 1 ? item.precio_factura : item.precio_entrada) }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="total-section">
                        <div class="total-container">
                            <i class="fas fa-calculator total-icon"></i>
                            <div class="total-content">
                                <span class="total-label">Total Línea</span>
                                <span class="total-amount">{{ formatCurrency(item.tipocliente_id === 1 ? (item.precio_factura * item.cantidad) : (item.precio_entrada * item.cantidad)) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['datos'],
    data() {
        return {
            headers: [
                {text: 'Producto', value: 'producto'},
                {text: 'Presentación', value: 'presentacion'},
                {text: 'Cantidad', value: 'cantidad'},
                {text: 'Precio', value: 'precio_entrada'},
                {text: 'Total', value: 'valor_total'},
            ],
            // Paginación
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0
        }
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.datos.slice(start, end);
        },
        shouldPaginate() {
            return this.datos.length > this.itemsPerPage;
        }
    },
    watch: {
        datos: {
            handler() {
                this.totalPages = Math.ceil(this.datos.length / this.itemsPerPage);
                this.currentPage = 1;
            },
            immediate: true
        }
    },
    methods: {
        // Formato de moneda
        formatCurrency(value) {
            if (!value && value !== 0) return '$ 0';
            const num = parseFloat(value);
            return '$ ' + num.toLocaleString('es-CO', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },
        // Paginación
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
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
        }
    },
}
</script>

<style scoped>
/* Container */
.ultimo-pedido-container {
    width: 100%;
    padding: 0;
}

/* Summary Header */
.summary-header {
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 2px solid #e5e7eb;
}

.summary-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.summary-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
}

.summary-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.valor-factura .summary-icon {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}

.fecha-factura .summary-icon {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}

.summary-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.summary-content {
    flex: 1;
}

.summary-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #64748b;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.summary-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    font-family: 'Courier New', monospace;
}

/* Mobile Cards - Hidden by default */
.mobile-cards-container {
    display: none;
    padding: 1.5rem;
}

.desktop-table {
    display: block;
}

/* Professional Table */
.professional-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    background: white;
}

.professional-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: white;
    font-size: 0.95rem;
    min-width: 800px;
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

.professional-table thead th i {
    margin-right: 0.5rem;
    color: #17a2b8;
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
.producto-cell {
    font-weight: 600;
    color: #1e293b;
}

.producto-name {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    color: #059669;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #86efac;
    display: inline-block;
    max-width: 100%;
}

.presentacion-cell {
    color: #64748b;
    font-weight: 500;
}

.presentacion-badge {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #fcd34d;
}

.cantidad-cell,
.precio-cell,
.total-cell {
    font-weight: 600;
    font-family: 'Courier New', monospace;
}

.cantidad-value {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    color: #4338ca;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #a5b4fc;
    font-size: 1.1rem;
}

.precio-value {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #93c5fd;
}

.total-value {
    background: linear-gradient(135deg, #e6f7ff 0%, #b3ecf2 100%);
    color: #17a2b8;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #7dd3fc;
    font-size: 1.1rem;
}

/* Mobile Cards Styles */
.pedido-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.pedido-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
}

.producto-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.producto-icon {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    color: #059669;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.producto-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.producto-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.2rem;
    line-height: 1.2;
}

.presentacion-mobile {
    font-weight: 600;
    color: #64748b;
    font-size: 0.9rem;
    background: #f8fafc;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    align-self: flex-start;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-grid {
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

.cantidad .info-icon {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    color: #4338ca;
}

.precio .info-icon {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
}

.info-icon {
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
    font-family: 'Courier New', monospace;
}

/* Total Section */
.total-section {
    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
    border-radius: 16px;
    padding: 1.5rem;
    border: 2px solid #c4b5fd;
}

.total-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
}

.total-icon {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.total-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    text-align: center;
}

.total-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #17a2b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.total-amount {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1e293b;
    font-family: 'Courier New', monospace;
}

/* Pagination */
.pagination-section {
    background: white;
    padding: 1.5rem 2rem;
    border-top: 2px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.pagination-info {
    color: #64748b;
    font-weight: 500;
    font-size: 0.9rem;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 2px solid #e5e7eb;
    background: white;
    color: #64748b;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 0.9rem;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #17a2b8;
    color: #17a2b8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.2);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.pagination-btn.page-number.active {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-color: #17a2b8;
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
}

.pagination-dots {
    color: #94a3b8;
    font-weight: 600;
    padding: 0 0.5rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .professional-table {
        font-size: 0.9rem;
    }
    
    .professional-table thead th,
    .professional-table tbody td {
        padding: 0.875rem 0.75rem;
    }
}

@media (max-width: 900px) {
    /* Show mobile cards, hide desktop table */
    .desktop-table {
        display: none;
    }
    
    .mobile-cards-container {
        display: block;
    }
    
    .pagination-section {
        padding: 1rem;
        flex-direction: column;
        text-align: center;
    }
    
    .pagination-controls {
        flex-wrap: wrap;
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .summary-header {
        padding: 1rem;
    }
    
    .summary-cards {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .summary-card {
        padding: 1.25rem;
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
    
    .summary-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }
    
    .summary-value {
        font-size: 1.25rem;
    }
    
    .mobile-cards-container {
        padding: 1rem;
    }
    
    .pedido-card {
        padding: 1.25rem;
        margin-bottom: 0.875rem;
    }
    
    .producto-info {
        justify-content: center;
        text-align: center;
    }
    
    .producto-name-mobile {
        font-size: 1.1rem;
        text-align: center;
    }
    
    .info-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .info-item {
        padding: 0.875rem;
    }
    
    .total-section {
        padding: 1.25rem;
    }
    
    .total-amount {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .pedido-card {
        padding: 1rem;
    }
    
    .producto-icon {
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
    }
    
    .producto-name-mobile {
        font-size: 1rem;
    }
    
    .total-amount {
        font-size: 1.25rem;
    }
    
    .summary-value {
        font-size: 1.1rem;
    }
}
</style>