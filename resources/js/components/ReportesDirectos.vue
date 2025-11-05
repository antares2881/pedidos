<template>
    <v-app>
        <div class="reports-container">
            <!-- Professional Header -->
            <div class="professional-header">
                <div class="header-content">
                    <div class="header-left">
                        <h1 class="header-title">
                            <i class="fas fa-chart-bar header-icon"></i>
                            Reportes Directos
                        </h1>
                        <p class="header-subtitle">
                            Genera reportes de compras, facturas y pedidos de clientes
                        </p>
                    </div>
                </div>
            </div>

            <!-- Professional Filters -->
            <div class="filters-section">
                <div class="filters-container">
                    <div class="filter-group">
                        <label class="filter-label">Buscar en</label>
                        <div class="custom-select-wrapper">
                            <basic-select
                                :options="reportes"
                                :selected-option="itemReporte"
                                @select="selectedReporte"
                            ></basic-select>
                        </div>
                    </div>
                    <div class="filter-group" v-if="reporte.tiporeporte === 2">
                        <label class="filter-label">Laboratorio</label>
                        <div class="custom-select-wrapper">
                            <model-select
                                :options="laboratorios"
                                v-model="reporte.laboratorio_id"
                            ></model-select>
                        </div>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">Cliente</label>
                        <div class="custom-select-wrapper">
                            <basic-select
                                :options="clientes"
                                :selected-option="item"
                                @select="selected"
                            ></basic-select>
                        </div>
                    </div>
                </div>
                
                <div class="date-filters">
                    <div class="date-group">
                        <label class="filter-label">Fecha Inicial</label>
                        <input
                            type="date"
                            v-model="reporte.fecha_inicial"
                            class="date-input"
                        />
                    </div>
                    <div class="date-group">
                        <label class="filter-label">Fecha Final</label>
                        <input
                            type="date"
                            v-model="reporte.fecha_final"
                            class="date-input"
                        />
                    </div>
                </div>
                
                <!-- Toggle para elegir entre Facturas y Cobros -->
                <div class="view-toggle-section" v-if="facturasClientes">
                    <div class="toggle-container">
                        <label class="filter-label">Visualizar</label>
                        <div class="toggle-buttons">
                            <button 
                                class="toggle-btn" 
                                :class="{ active: !mostrarCobros }"
                                @click="mostrarCobros = false"
                            >
                                <i class="fas fa-file-invoice"></i>
                                Facturas
                            </button>
                            <button 
                                class="toggle-btn" 
                                :class="{ active: mostrarCobros }"
                                @click="mostrarCobros = true"
                            >
                                <i class="fas fa-money-bill"></i>
                                Cobros
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="actions-section">
                    <button 
                        class="professional-btn btn-primary" 
                        @click="generarReporte"
                        :disabled="loading"
                    >
                        <i class="fas fa-chart-line" v-if="!loading"></i>
                        <div class="spinner-mini" v-if="loading"></div>
                        <span>{{ loading ? 'Generando...' : 'Generar Reporte' }}</span>
                    </button>
                </div>
                
                <!-- Error Messages -->
                <div class="error-section" v-if="errors.length > 0">
                    <div class="error-container">
                        <h4 class="error-title">
                            <i class="fas fa-exclamation-triangle"></i>
                            Se encontraron errores:
                        </h4>
                        <ul class="error-list">
                            <li v-for="(error, i) in errors" :key="i" class="error-item">
                                {{ error }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Professional Loader -->
            <div class="loading-section" v-if="loading">
                <div class="professional-report-container">
                    <div class="loader-container">
                        <div class="spinner-professional"></div>
                        <h3 class="loader-title">Generando reporte</h3>
                        <p class="loader-subtitle">Procesando información del {{ getReportTypeText() }}...</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reports Content -->
            <div class="reports-content" v-if="!loading && hasReportData">
                <div class="professional-report-container">
                    <div class="report-header">
                        <div class="report-info">
                            <h3 class="report-title">
                                <i class="fas fa-file-alt report-icon"></i>
                                {{ getReportTypeText() }}
                            </h3>
                            <div class="report-details">
                                <span class="report-period">
                                    {{ formatDateRange() }}
                                </span>
                                <span class="records-count" v-if="getCurrentDataLength() > 0">
                                    {{ getCurrentDataLength() }} registros encontrados
                                    <span class="data-type-label">{{ mostrarCobros ? '(Cobros)' : '(Facturas)' }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-content">
                        <reportes-facturas-clientes v-if="facturasClientes" :tipo_cliente="reporte.tiporeporte" :datos="datos" :cobros="cobros" :mostrar_cobros="mostrarCobros"/>
                        <!-- <reportes-rotacion-productos v-if="rotacionProductos" :datos="datos" /> -->
                        <!-- <reportes-ultimo-pedido v-if="ultimoPedido" :datos="datos" /> -->
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>
<script>
    import { BasicSelect, ModelSelect } from 'vue-search-select'
    export default {
        data() {
            return {
                cobros: [],
                clientes: [],
                datos: [],
                Dialogtipocliente: false,
                errors: [],
                facturasClientes: false,
                item: {
                    value: '',
                    text: ''
                },
                itemReporte: {
                    value: '',
                    text: ''
                },
                laboratorios: [],
                loading: false,
                mostrarCobros: false,
                reporte: {
                    cliente_id: 0, tiporeporte: null, fecha_inicial: null, fecha_final: null, tipocliente_id: 0
                },
                reportes: [
                    {value: 1, text: 'Facturas CVL'},
                    {value: 2, text: 'Ventas directos'},
                ],
                rotacionProductos: false,
                tipocliente_id: null,
                ultimoPedido: false
            }
        },
        computed: {
            hasReportData() {
                return this.rotacionProductos || this.facturasClientes || this.ultimoPedido;
            }
        },
        mounted() {
            this.getClientes()
            this.getLaboratorios()
        },
        methods: {
            generar(){
                // console.log(this.tipocliente_id)
                this.reporte.tipocliente = this.tipocliente_id
                this.reporte.cliente_id = true
                this.Dialogtipocliente = false
                this.generarReporte()
            },
            generarReporte(){
                if(this.reporte.tiporeporte === null || this.reporte.tiporeporte === '' || this.reporte.fecha_inicial === null || this.reporte.fecha_inicial === '' || this.reporte.fecha_final === null || this.reporte.fecha_final === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos requeridos',
                        text: 'El reporte contiene campos vacíos'
                    })
                    return
                }
                
                if(this.reporte.cliente_id === null || this.reporte.cliente_id === '' || this.reporte.cliente_id === undefined || this.reporte.cliente_id === 0){                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Cliente requerido',
                        text: 'El campo cliente es requerido para este tipo de reporte'
                    })
                    return
                   
                }
                
                // Start loading
                this.loading = true;
                this.errors = [];
                this.facturasClientes = false;
                this.rotacionProductos = false;
                this.ultimoPedido = false;
                this.datos = [];
                this.cobros = [];
                
                axios.post('/reportes-clientes', this.reporte)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.code === 200){
                            this.datos = res.data.datos;
                            this.cobros = res.data.pagos;
                            this.facturasClientes = true;                            
                        }else{
                            this.errors = res.data.datos;
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
                        this.loading = false;
                    });
            },
            getClientes(){
                axios.get('/clientes')
                    .then(res => {
                        res.data.map((el) => {
                            this.clientes.push({
                                text: el.razon_social+' - '+el.municipios.mcpio,
                                value: el.id
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getLaboratorios(){
                axios.get('/laboratorios')
                    .then(res => {
                        res.data.map((el) => {
                            this.laboratorios.push({
                                text: el.Laboratorio,
                                value: el.id
                            });
                        })
                    })
            },
            selected(item){
                this.item = item;
                this.reporte.cliente_id = item.value
            },
            selectedReporte(item){
                this.itemReporte = item;
                this.reporte.tiporeporte = item.value
            },
            getReportTypeText() {
                const reportType = this.reportes.find(r => r.value === this.reporte.tiporeporte);
                return reportType ? reportType.text : 'Reporte';
            },
            formatDateRange() {
                if (!this.reporte.fecha_inicial || !this.reporte.fecha_final) return '';
                const startDate = new Date(this.reporte.fecha_inicial).toLocaleDateString('es-ES');
                const endDate = new Date(this.reporte.fecha_final).toLocaleDateString('es-ES');
                return `${startDate} - ${endDate}`;
            },
            getCurrentDataLength() {
                if (this.mostrarCobros && this.cobros) {
                    return this.cobros.length;
                }
                return this.datos ? this.datos.length : 0;
            }
        },
        components:{
            BasicSelect, ModelSelect
        }
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
    color: #3b82f6;
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

.filters-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
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

.custom-select-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: stretch;
    min-height: 56px;
}

/* Select styling consistent with ReportesCartera */
.custom-select-wrapper select,
.custom-select-wrapper >>> .form-control,
.custom-select-wrapper >>> input {
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
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none;
}

.custom-select-wrapper select:focus,
.custom-select-wrapper >>> .form-control:focus,
.custom-select-wrapper >>> input:focus {
    border-color: #3b82f6;
}

/* Date filters */
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
}

.date-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* View Toggle Section */
.view-toggle-section {
    margin-bottom: 2rem;
}

.toggle-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
}

.toggle-buttons {
    display: flex;
    gap: 0.5rem;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 0.5rem;
}

.toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: #64748b;
}

.toggle-btn:hover {
    background: rgba(255, 255, 255, 0.7);
    color: #374151;
}

.toggle-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.toggle-btn i {
    font-size: 0.9rem;
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
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
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

/* Error Section */
.error-section {
    margin-top: 2rem;
}

.error-container {
    background: rgba(239, 68, 68, 0.1);
    border: 2px solid rgba(239, 68, 68, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
}

.error-title {
    color: #dc2626;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.error-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.error-item {
    color: #dc2626;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(239, 68, 68, 0.1);
}

.error-item:last-child {
    border-bottom: none;
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
    color: #3b82f6;
}

.report-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
}

.report-period {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    text-align: center;
}

.records-count {
    font-size: 0.9rem;
    color: #64748b;
    background: rgba(59, 130, 246, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(59, 130, 246, 0.2);
    font-weight: 500;
}

.data-type-label {
    font-size: 0.8rem;
    color: #3b82f6;
    font-weight: 600;
    margin-left: 0.5rem;
}

.report-content {
    padding: 0;
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
    .filters-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .date-filters {
        grid-template-columns: 1fr;
        gap: 1.5rem;
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
    
    .toggle-buttons {
        width: 100%;
        justify-content: center;
    }
    
    .toggle-btn {
        flex: 1;
        justify-content: center;
        padding: 0.875rem 1rem;
    }
    
    .report-title {
        font-size: 1.5rem;
        flex-direction: column;
        gap: 0.5rem;
    }
}

.v-dialog {
    background: #FFF !important;
}
</style>
