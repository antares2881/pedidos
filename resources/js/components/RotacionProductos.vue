<template>
  <div class="rotacion-report-container">
    <!-- Desktop Table -->
    <div class="desktop-table">
        <div class="professional-table-wrapper">
            <table class="professional-table">
                <thead>
                    <tr>
                        <th class="text-center">
                            <i class="fas fa-barcode"></i>
                            Código
                        </th>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="index" class="data-row">
                        <td class="text-center codigo-cell">
                            <span class="codigo-badge">{{ item.codigo }}</span>
                        </td>
                        <td class="text-left producto-cell">
                            <span class="producto-name">{{ item.producto }}</span>
                        </td>
                        <td class="text-center presentacion-cell">
                            <span class="presentacion-badge">{{ item.presentacion }}</span>
                        </td>
                        <td class="text-right cantidad-cell">
                            <span class="cantidad-value">{{ item.total }}</span>
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
        <div v-for="(item, index) in paginatedData" :key="index" class="producto-card">
            <div class="card-header">
                <div class="producto-info">
                    <i class="fas fa-box producto-icon"></i>
                    <div class="producto-details">
                        <span class="producto-name-mobile">{{ item.producto }}</span>
                        <span class="codigo-mobile">Código: {{ item.codigo }}</span>
                    </div>
                </div>
                <div class="cantidad-badge">
                    <i class="fas fa-sort-numeric-down"></i>
                    {{ item.total }}
                </div>
            </div>
            
            <div class="card-body">
                <div class="presentacion-info">
                    <i class="fas fa-pills presentacion-icon"></i>
                    <div class="presentacion-content">
                        <span class="presentacion-label">Presentación</span>
                        <span class="presentacion-value">{{ item.presentacion }}</span>
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
                // datos: [],
                headers:[
                    {text: 'Codigo', value: 'codigo'},
                    {text: 'Producto', value: 'producto'},
                    {text: 'Presentación', value: 'presentacion'},
                    {text: 'Cantidad', value: 'total'},
                ],
                // Paginación
                currentPage: 1,
                itemsPerPage: 15,
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
.rotacion-report-container {
    width: 100%;
    padding: 0;
    background: white;
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
    min-width: 700px;
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

.professional-table thead th i {
    margin-right: 0.5rem;
    color: #10b981;
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
.codigo-cell {
    font-weight: 600;
    color: #1e293b;
}

.codigo-badge {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    color: #4338ca;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #a5b4fc;
    font-family: 'Courier New', monospace;
}

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

.cantidad-cell {
    font-weight: 600;
    font-family: 'Courier New', monospace;
}

.cantidad-value {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #93c5fd;
    font-size: 1.1rem;
}

/* Mobile Cards Styles */
.producto-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.producto-card:hover {
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

.producto-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
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
    font-size: 1.1rem;
    line-height: 1.2;
}

.codigo-mobile {
    font-weight: 600;
    color: #64748b;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
    background: #f8fafc;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    align-self: flex-start;
}

.cantidad-badge {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    font-weight: 700;
    border: 1px solid #93c5fd;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-family: 'Courier New', monospace;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.presentacion-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.presentacion-icon {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

.presentacion-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
}

.presentacion-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.presentacion-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1e293b;
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
    border-color: #10b981;
    color: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.pagination-btn.page-number.active {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-color: #10b981;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.pagination-dots {
    color: #94a3b8;
    font-weight: 600;
    padding: 0 0.5rem;
}

/* Responsive Design */
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
    .mobile-cards-container {
        padding: 1rem;
    }
    
    .producto-card {
        padding: 1.25rem;
        margin-bottom: 0.875rem;
    }
    
    .card-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
        text-align: center;
    }
    
    .producto-info {
        justify-content: center;
        text-align: center;
    }
    
    .producto-name-mobile {
        font-size: 1rem;
        text-align: center;
    }
    
    .cantidad-badge {
        align-self: center;
        font-size: 1.1rem;
    }
    
    .presentacion-info {
        padding: 1rem;
    }
}

@media (max-width: 480px) {
    .producto-card {
        padding: 1rem;
    }
    
    .producto-icon {
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
    }
    
    .producto-name-mobile {
        font-size: 0.95rem;
    }
    
    .cantidad-badge {
        font-size: 1rem;
        padding: 0.6rem 1rem;
    }
}
</style>