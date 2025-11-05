<template>
    <v-app>
        <div class="reports-container">
            <!-- Professional Header -->
            <div class="professional-header">
                <div class="header-content">
                    <div class="header-left">
                        <h1 class="header-title">
                            <i class="fas fa-credit-card header-icon"></i>
                            Reportes de Abonos
                        </h1>
                        <p class="header-subtitle">
                            Consulta y analiza los abonos realizados por período de fechas
                        </p>
                    </div>
                </div>
            </div>

            <!-- Professional Filters -->
            <div class="filters-section">
                <div class="date-filters">
                    <div class="date-group">
                        <label class="filter-label">Fecha Inicial</label>
                        <input
                            type="date"
                            v-model="reporte.fecha_i"
                            class="date-input"
                            :class="{ 'is-invalid': fechaFinalInvalida && reporte.fecha_i }"
                        />
                    </div>
                    <div class="date-group">
                        <label class="filter-label">Fecha Final</label>
                        <input
                            type="date"
                            v-model="reporte.fecha_f"
                            class="date-input"
                            :class="{ 'is-invalid': fechaFinalInvalida }"
                        />
                        <div v-if="fechaFinalInvalida" class="invalid-feedback">
                            La fecha final no puede ser menor a la fecha inicial
                        </div>
                    </div>
                </div>
                
                <div class="actions-section">
                    <button 
                        class="professional-btn btn-primary" 
                        @click="buscarCobros"
                        :disabled="loader || fechaFinalInvalida"
                    >
                        <i class="fas fa-search" v-if="!loader"></i>
                        <div class="spinner-mini" v-if="loader"></div>
                        <span>{{ loader ? 'Buscando...' : 'Buscar Abonos' }}</span>
                    </button>
                </div>
            </div>
            <!-- Professional Loader -->
            <div class="loading-section" v-if="loader">
                <div class="professional-report-container">
                    <div class="loader-container">
                        <div class="spinner-professional"></div>
                        <h3 class="loader-title">Generando reporte de abonos</h3>
                        <p class="loader-subtitle">Procesando información de pagos del período seleccionado...</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Professional Report Content -->
            <div class="reports-content" v-if="!loader && cobros.length > 0">
                <div class="professional-report-container">
                    <div class="report-header">
                        <div class="report-info">
                            <h3 class="report-title">
                                <i class="fas fa-file-invoice-dollar report-icon"></i>
                                Reporte de Abonos
                            </h3>
                            <div class="report-details">
                                <span class="report-period">
                                    {{ formatDateRange() }}
                                </span>
                                <div class="summary-cards">
                                    <div class="summary-card total-card">
                                        <div class="summary-icon">
                                            <i class="fas fa-dollar-sign"></i>
                                        </div>
                                        <div class="summary-content">
                                            <h4 class="summary-title">Total Abonos</h4>
                                            <p class="summary-value">{{ totalAbono | currency }}</p>
                                        </div>
                                    </div>
                                    <div class="summary-card count-card">
                                        <div class="summary-icon">
                                            <i class="fas fa-list-ol"></i>
                                        </div>
                                        <div class="summary-content">
                                            <h4 class="summary-title">Registros</h4>
                                            <p class="summary-value">{{ cobros.length }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-controls">
                        <div class="search-container">
                            <i class="fas fa-search search-icon"></i>
                            <input
                                v-model="search"
                                placeholder="Buscar en la tabla..."
                                class="search-input"
                            />
                        </div>
                    </div>
                    
                    <!-- Desktop/Tablet Table -->
                    <div class="table-responsive professional-table-wrapper desktop-table">
                        <table class="professional-table">
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        <i class="fas fa-user"></i>
                                        Cliente
                                    </th>
                                    <th class="text-center">
                                        <i class="fas fa-file-invoice"></i>
                                        No. Factura
                                    </th>
                                    <th class="text-right">
                                        <i class="fas fa-dollar-sign"></i>
                                        Valor Factura
                                    </th>
                                    <th class="text-center">
                                        <i class="fas fa-calendar-alt"></i>
                                        Fecha Abono
                                    </th>
                                    <th class="text-right">
                                        <i class="fas fa-credit-card"></i>
                                        Valor Abono
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in filteredCobros" :key="index" class="data-row">
                                    <td class="text-left client-cell">
                                        <span class="client-name">{{ item.cliente }}</span>
                                    </td>
                                    <td class="text-center invoice-cell">
                                        <span class="invoice-number">{{ item.num_factura }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value">{{ item.valor | currency }}</span>
                                    </td>
                                    <td class="text-center date-cell">
                                        <span class="date-value">{{ item.fecha }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value abono-value">{{ item.valor_abono | currency }}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="total-row">
                                    <th colspan="4" class="total-label">
                                        <i class="fas fa-calculator"></i>
                                        <strong>Total de Abonos:</strong>
                                    </th>
                                    <th class="total-amount">
                                        <span class="final-total">{{ totalAbono | currency }}</span>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <!-- Mobile Cards -->
                    <div class="mobile-cards-container">
                        <div v-for="(item, index) in filteredCobros" :key="index" class="abono-card">
                            <div class="card-header">
                                <div class="client-info">
                                    <i class="fas fa-user client-icon"></i>
                                    <span class="client-name-mobile">{{ item.cliente }}</span>
                                </div>
                                <div class="invoice-badge">
                                    <i class="fas fa-file-invoice"></i>
                                    {{ item.num_factura }}
                                </div>
                            </div>
                            
                            <div class="card-body">
                                <div class="info-row">
                                    <div class="info-item">
                                        <i class="fas fa-dollar-sign info-icon"></i>
                                        <div class="info-content">
                                            <span class="info-label">Valor Factura</span>
                                            <span class="info-value">{{ item.valor | currency }}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="info-item">
                                        <i class="fas fa-calendar-alt info-icon"></i>
                                        <div class="info-content">
                                            <span class="info-label">Fecha Abono</span>
                                            <span class="info-value">{{ item.fecha }}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="abono-highlight">
                                    <i class="fas fa-credit-card abono-icon"></i>
                                    <div class="abono-content">
                                        <span class="abono-label">Valor Abono</span>
                                        <span class="abono-amount">{{ item.valor_abono | currency }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mobile Total -->
                        <div class="mobile-total-card">
                            <div class="total-header">
                                <i class="fas fa-calculator total-icon"></i>
                                <span class="total-title">Total de Abonos</span>
                            </div>
                            <div class="total-amount-mobile">{{ totalAbono | currency }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>
<script>
    import Swal from 'sweetalert2';
    
    export default {
        data() {
            return {
                cobros: [],
                loader: false,
                reporte: {fecha_i: null, fecha_f: null},
                search: '',
                totalAbono: 0,
                fechaFinalInvalida: false
            }
        },
        computed: {
            filteredCobros() {
                if (!this.search) return this.cobros;
                
                const searchTerm = this.search.toLowerCase();
                return this.cobros.filter(item => 
                    item.cliente.toLowerCase().includes(searchTerm) ||
                    item.num_factura.toString().toLowerCase().includes(searchTerm) ||
                    item.fecha.toLowerCase().includes(searchTerm)
                );
            }
        },
        watch: {
            'reporte.fecha_i': function() {
                this.validarFechas();
            },
            'reporte.fecha_f': function() {
                this.validarFechas();
            }
        },
        methods: {
            validarFechas() {
                if (this.reporte.fecha_i && this.reporte.fecha_f) {
                    const fechaInicial = new Date(this.reporte.fecha_i);
                    const fechaFinal = new Date(this.reporte.fecha_f);
                    
                    this.fechaFinalInvalida = fechaFinal < fechaInicial;
                } else {
                    this.fechaFinalInvalida = false;
                }
            },
            buscarCobros(){
                // Validaciones
                if (!this.reporte.fecha_i || !this.reporte.fecha_f) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos requeridos',
                        text: 'Debe seleccionar las fechas inicial y final'
                    });
                    return;
                }

                if (this.fechaFinalInvalida) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en las fechas',
                        text: 'La fecha final no puede ser menor a la fecha inicial'
                    });
                    return;
                }
                
                // Reset data
                this.cobros = [];
                this.totalAbono = 0;
                this.loader = true;
                
                axios.post('/reporte-abonos', this.reporte)
                    .then(res => {
                        res.data.map((el) => {
                            this.totalAbono += el.valor;
                            this.cobros.push({
                                cliente: el.cliente.razon_social,
                                num_factura: el.factura.numero_factura,
                                valor: el.factura.valor,
                                fecha: el.fecha,
                                valor_abono: el.valor
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo generar el reporte. Intenta nuevamente.'
                        });
                    })
                    .finally(() => {
                        this.loader = false;
                    });
            },
            formatDateRange() {
                if (!this.reporte.fecha_i || !this.reporte.fecha_f) return '';
                const startDate = new Date(this.reporte.fecha_i).toLocaleDateString('es-ES');
                const endDate = new Date(this.reporte.fecha_f).toLocaleDateString('es-ES');
                return `${startDate} - ${endDate}`;
            }
        },
    }
</script>

<style scoped>
/* Professional Container */
.reports-container {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 2rem;
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
    color: #10b981;
    font-size: 2rem;
}

.header-subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
    line-height: 1.6;
}

/* Professional Filters */
.filters-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.date-filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.date-group {
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

.date-input {
    width: 100%;
    height: 56px;
    padding: 1rem 1.25rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    background: white;
    color: #374151;
    font-weight: 500;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease;
}

.date-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.date-input.is-invalid {
    border-color: #dc3545;
    background: linear-gradient(145deg, #fff5f5 0%, #ffeaea 100%);
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.date-input.is-invalid:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 8px;
    font-size: 0.85rem;
    color: #dc3545;
    font-weight: 600;
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid rgba(220, 53, 69, 0.2);
    display: flex;
    align-items: center;
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
}

.invalid-feedback::before {
    content: '⚠️';
    margin-right: 10px;
    font-size: 1rem;
}

/* Actions Section */
.actions-section {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
    position: relative;
    overflow: hidden;
}

.professional-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
}

/* Mini Spinner for Button */
.spinner-mini {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
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
    border-top: 4px solid #10b981;
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
    background: linear-gradient(90deg, #10b981, #059669);
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
}

/* Report Content */
.reports-content {
    margin-top: 2rem;
}

.report-header {
    padding: 2rem 2.5rem 1.5rem;
    border-bottom: 2px solid #e5e7eb;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.report-info {
    width: 100%;
    text-align: center;
}

.report-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.report-icon {
    color: #10b981;
}

.report-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
}

.report-period {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    text-align: center;
}

.summary-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
    max-width: 600px;
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

.total-card .summary-icon {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.count-card .summary-icon {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

/* Table Controls */
.table-controls {
    padding: 1.5rem 2.5rem;
    border-bottom: 1px solid #e5e7eb;
    background: white;
}

.search-container {
    position: relative;
    max-width: 400px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 1rem;
}

.search-input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    background: #f8fafc;
    color: #374151;
    outline: none;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: #10b981;
    background: white;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
    min-width: 800px;
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

.abono-value {
    color: #059669;
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
    font-size: 1.05rem;
}

/* Table Footer */
.professional-table tfoot {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: white;
}

.professional-table tfoot th {
    padding: 1.5rem 1rem;
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
}

.total-label {
    text-align: center;
}

.total-label i {
    margin-right: 0.5rem;
    color: #fbbf24;
}

.final-total {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e293b;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    font-weight: 800;
    font-size: 1.25rem;
    box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);
    border: 2px solid #fbbf24;
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

/* Mobile Cards - Hidden by default */
.mobile-cards-container {
    display: none;
}

.desktop-table {
    display: block;
}

/* Mobile Cards Styles */
.abono-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.abono-card:hover {
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

.abono-highlight {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
    border-radius: 16px;
    border: 2px solid #10b981;
}

.abono-icon {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.abono-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.abono-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #059669;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.abono-amount {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    font-family: 'Courier New', monospace;
}

.mobile-total-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-radius: 20px;
    padding: 2rem;
    margin-top: 1.5rem;
    color: white;
    text-align: center;
}

.total-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.total-icon {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

.total-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
}

.total-amount-mobile {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e293b;
    padding: 1rem 2rem;
    border-radius: 16px;
    font-weight: 800;
    font-size: 2rem;
    box-shadow: 0 10px 25px rgba(251, 191, 36, 0.4);
    border: 2px solid #fbbf24;
    font-family: 'Courier New', monospace;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .date-filters {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .summary-cards {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .header-title {
        font-size: 2rem;
    }
    
    .actions-section {
        justify-content: stretch;
    }
    
    .professional-btn {
        flex: 1;
        justify-content: center;
    }
    
    /* Table adjustments for medium screens */
    .professional-table {
        font-size: 0.9rem;
        min-width: 700px;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 1rem 0.75rem;
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
    .reports-container {
        padding: 1rem;
    }
    
    .professional-header,
    .filters-section {
        border-radius: 16px;
        padding: 1.5rem;
    }
    
    .professional-report-container {
        border-radius: 16px;
    }
    
    .header-title {
        font-size: 1.8rem;
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
    
    .report-header {
        padding: 1.5rem 1rem;
    }
    
    .report-title {
        font-size: 1.5rem;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .table-controls {
        padding: 1rem;
    }
    
    .search-container {
        max-width: 100%;
    }
    
    /* Mobile card adjustments */
    .abono-card {
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
    
    .info-item {
        padding: 0.875rem;
    }
    
    .info-icon {
        width: 32px;
        height: 32px;
        font-size: 0.8rem;
    }
    
    .info-value {
        font-size: 0.95rem;
    }
    
    .abono-highlight {
        padding: 1.25rem;
        gap: 0.875rem;
    }
    
    .abono-icon {
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
    }
    
    .abono-amount {
        font-size: 1.35rem;
    }
    
    .mobile-total-card {
        padding: 1.5rem;
        margin-top: 1.25rem;
    }
    
    .total-title {
        font-size: 1.1rem;
    }
    
    .total-amount-mobile {
        font-size: 1.75rem;
        padding: 0.875rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .reports-container {
        padding: 0.75rem;
    }
    
    .professional-header,
    .filters-section {
        padding: 1.25rem;
    }
    
    .header-title {
        font-size: 1.6rem;
    }
    
    .report-title {
        font-size: 1.3rem;
    }
    
    .summary-cards {
        gap: 0.75rem;
    }
    
    .summary-card {
        padding: 1.25rem;
    }
    
    .summary-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }
    
    .summary-value {
        font-size: 1.6rem;
    }
    
    .abono-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
    }
    
    .client-name-mobile {
        font-size: 0.95rem;
    }
    
    .abono-amount {
        font-size: 1.25rem;
    }
    
    .total-amount-mobile {
        font-size: 1.5rem;
    }
}
</style>