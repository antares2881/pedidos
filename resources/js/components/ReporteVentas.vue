<template>
    <v-app>
        <div class="reporte-ventas-container">
            <!-- Professional Loading State -->
            <div v-if="loader" class="loading-container">
                <div class="loading-content">
                    <div class="professional-loader">
                        <div class="loader-spinner"></div>
                        <div class="loader-pulse"></div>
                    </div>
                    <h3 class="loading-title">Generando Reporte de Ventas</h3>
                    <p class="loading-subtitle">Procesando información de ventas del período seleccionado...</p>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>

            <div v-else class="reporte-content">
                <!-- Header Section -->
                <div class="header-section">
                    <div class="page-header">
                        <h2>
                            <i class="fas fa-chart-line mr-3"></i>
                            Reporte de Ventas
                        </h2>
                        <p class="page-description">
                            Consulta y analiza las ventas realizadas por período de fechas
                        </p>
                    </div>
                </div>

                <!-- Filters Section -->
                <div class="filters-section">
                    <div class="filters-header">
                        <h5 class="filters-title">
                            <i class="fas fa-filter mr-2"></i>
                            Filtros de búsqueda
                        </h5>
                    </div>
                    <div class="filters-content">
                        <div class="date-filters">
                            <div class="date-group">
                                <label class="filter-label">
                                    <i class="fas fa-calendar-alt mr-2"></i>
                                    Fecha Inicial
                                </label>
                                <input
                                    type="date"
                                    v-model="reporte.fecha_i"
                                    class="date-input"
                                    :class="{ 'is-invalid': fechaFinalInvalida && reporte.fecha_i }"
                                />
                            </div>
                            <div class="date-group">
                                <label class="filter-label">
                                    <i class="fas fa-calendar-alt mr-2"></i>
                                    Fecha Final
                                </label>
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
                                @click="generarReporteVentas"
                                :disabled="fechaFinalInvalida"
                            >
                                <i class="fas fa-search mr-2"></i>
                                Generar Reporte
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Section -->
                <div v-if="ventas.length > 0" class="results-section">
                    <div class="professional-report-container">
                        <div class="report-header">
                            <div class="report-info">
                                <h3 class="report-title">
                                    <i class="fas fa-table mr-2"></i>
                                    Resultados del Reporte
                                </h3>
                                <div class="report-summary">
                                    <div class="summary-card">
                                        <div class="summary-icon">
                                            <i class="fas fa-list-ol"></i>
                                        </div>
                                        <div class="summary-content">
                                            <h4 class="summary-title">Total Registros</h4>
                                            <p class="summary-value">{{ ventas.length }}</p>
                                        </div>
                                    </div>
                                    <div class="summary-card">
                                        <div class="summary-icon">
                                            <i class="fas fa-dollar-sign"></i>
                                        </div>
                                        <div class="summary-content">
                                            <h4 class="summary-title">Total Ventas</h4>
                                            <p class="summary-value">{{ calcularTotalVentas() | currency }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Professional Table -->
                        <div class="table-responsive professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            <i class="fas fa-user mr-2"></i>
                                            Cliente
                                        </th>
                                        <th class="text-center">
                                            <i class="fas fa-calendar-alt mr-2"></i>
                                            Fecha
                                        </th>
                                        <th class="text-right">
                                            <i class="fas fa-dollar-sign mr-2"></i>
                                            Valor
                                        </th>
                                        <th class="text-center">
                                            <i class="fas fa-info-circle mr-2"></i>
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in ventas" :key="index" class="data-row">
                                        <td class="text-left client-cell">
                                            <div class="client-info">
                                                <i class="fas fa-user client-icon"></i>
                                                <span class="client-name">{{ item.cliente }}</span>
                                            </div>
                                        </td>
                                        <td class="text-center date-cell">
                                            <span class="date-badge">{{ formatearFecha(item.fecha) }}</span>
                                        </td>
                                        <td class="text-right amount-cell">
                                            <span class="amount-value">{{ item.valor | currency }}</span>
                                        </td>
                                        <td class="text-center status-cell">
                                            <span class="status-badge" :class="getStatusClass(item.estado)">
                                                {{ item.estado }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="total-row">
                                        <th colspan="2" class="total-label">
                                            <i class="fas fa-calculator mr-2"></i>
                                            <strong>Total General:</strong>
                                        </th>
                                        <th class="total-amount">
                                            <span class="final-total">{{ calcularTotalVentas() | currency }}</span>
                                        </th>
                                        <th class="total-count">
                                            <span class="count-badge">{{ ventas.length }} registros</span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- No Data State -->
                <div v-else-if="!loader" class="no-data-section">
                    <div class="no-data-container">
                        <div class="no-data-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <h3 class="no-data-title">No hay información para mostrar</h3>
                        <p class="no-data-description">
                            Selecciona un rango de fechas y genera el reporte para ver los resultados
                        </p>
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
                clientes: [],
                headers: [
                    {text: 'Cliente', value: 'cliente'},
                    {text: 'Fecha', value: 'fecha'},
                    {text: 'Valor', value: 'valor'},
                    {text: 'Estado', value: 'estado'},
                ],
                reporte: {fecha_i: null, fecha_f: null},
                ventas: [],
                loader: false,
                fechaFinalInvalida: false
            }
        },
        mounted() {
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
            generarReporteVentas(){
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

                this.ventas = [];
                this.loader = true;
                
                axios.post('/reportes-ventas', this.reporte)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.length > 0){
                            res.data.map((el) => {
                                this.ventas.push({
                                    cliente: el.clientes.razon_social,
                                    fecha: el.fecha_factura,
                                    valor: el.valor,
                                    estado: el.estado.estado
                                })
                            })
                        }else{
                            this.ventas = []
                        }
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
            calcularTotalVentas() {
                return this.ventas.reduce((total, venta) => total + parseFloat(venta.valor || 0), 0);
            },
            formatearFecha(fecha) {
                if (!fecha) return '';
                const date = new Date(fecha);
                return date.toLocaleDateString('es-ES');
            },
            getStatusClass(estado) {
                const estados = {
                    'PAGADO': 'status-success',
                    'PENDIENTE': 'status-warning',
                    'CANCELADO': 'status-danger',
                    'ANULADO': 'status-danger'
                };
                return estados[estado?.toUpperCase()] || 'status-default';
            }
        },  
    }
</script>

<style scoped>
/* Professional Container */
.reporte-ventas-container {
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
.reporte-content {
    max-width: 1400px;
    margin: 0 auto;
}

.header-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-header h2 {
    color: #2c3e50;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
}

.page-header h2 i {
    color: #17a2b8;
}

.page-description {
    color: #64748b;
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.6;
}

/* Filters Section */
.filters-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    margin-bottom: 2rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

.filters-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 20px 30px;
    border-bottom: 1px solid #e9ecef;
}

.filters-title {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0;
    font-size: 1.1rem;
}

.filters-content {
    padding: 2rem;
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
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
}

.filter-label i {
    color: #17a2b8;
}

.date-input {
    height: 56px;
    padding: 1rem 1.25rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    color: #374151;
    font-weight: 500;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.date-input:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);
    background: #ffffff;
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
    justify-content: flex-start;
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
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    color: white;
}

/* Results Section */
.results-section {
    animation: fadeInUp 0.6s ease-out;
}

.professional-report-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.report-header {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 2rem 2.5rem;
    border-bottom: 2px solid #e5e7eb;
}

.report-info {
    width: 100%;
}

.report-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
}

.report-title i {
    color: #17a2b8;
}

.report-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
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

.summary-card:first-child .summary-icon {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}

.summary-card:last-child .summary-icon {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    border-bottom: 2px solid #17a2b8;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.professional-table thead th i {
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

.client-info {
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

.client-name {
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

.date-cell {
    color: #64748b;
    font-weight: 500;
}

.date-badge {
    background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%);
    color: #f57c00;
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-weight: 600;
    border: 1px solid rgba(245, 124, 0, 0.2);
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
    font-size: 1.05rem;
    color: #059669;
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
}

.status-cell {
    color: #64748b;
    font-weight: 500;
}

.status-badge {
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-success {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724;
    border: 1px solid rgba(40, 167, 69, 0.2);
}

.status-warning {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    color: #856404;
    border: 1px solid rgba(255, 193, 7, 0.2);
}

.status-danger {
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    color: #721c24;
    border: 1px solid rgba(220, 53, 69, 0.2);
}

.status-default {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #495057;
    border: 1px solid rgba(108, 117, 125, 0.2);
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
    font-family: 'Courier New', monospace;
}

.count-badge {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    font-weight: 800;
    font-size: 1rem;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
    border: 2px solid #3b82f6;
}

/* No Data State */
.no-data-section {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    padding: 3rem 2rem;
}

.no-data-container {
    text-align: center;
    max-width: 400px;
}

.no-data-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: #9ca3af;
    font-size: 2rem;
}

.no-data-title {
    color: #374151;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
}

.no-data-description {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
    line-height: 1.5;
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

/* Responsive Design */
@media (max-width: 1024px) {
    .date-filters {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .report-summary {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .page-header h2 {
        font-size: 2rem;
    }
    
    .actions-section {
        justify-content: stretch;
    }
    
    .professional-btn {
        flex: 1;
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .reporte-ventas-container {
        padding: 1rem;
    }
    
    .header-section,
    .filters-section {
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
    
    .report-header {
        padding: 1.5rem 1rem;
    }
    
    .report-title {
        font-size: 1.5rem;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .professional-table {
        font-size: 0.85rem;
        min-width: 700px;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 0.875rem 0.5rem;
    }
}

@media (max-width: 480px) {
    .reporte-ventas-container {
        padding: 0.75rem;
    }
    
    .header-section,
    .filters-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .report-title {
        font-size: 1.3rem;
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
    
    .professional-table {
        min-width: 600px;
        font-size: 0.8rem;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 0.75rem 0.25rem;
    }
}
</style>
