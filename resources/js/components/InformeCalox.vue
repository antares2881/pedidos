<template>
    <v-app>
        <div class="informe-container">
            <!-- Header Section -->
            <div class="header-card">
                <div class="header-content">
                    <div class="page-header">
                        <h2 class="page-title">
                            <i class="fas fa-chart-line mr-3"></i>
                            Informe Calox
                        </h2>
                        <p class="page-description">
                            Genera informes detallados de ventas, cobros y transferencias por laboratorio y rango de fechas.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Filters Section -->
            <div class="filters-card">
                <div class="filters-header">
                    <h5 class="filters-title">
                        <i class="fas fa-filter mr-2"></i>
                        Filtros de búsqueda
                    </h5>
                </div>
                <div class="filters-content">
                    <div class="row">
                        <div class="col-12 col-lg-6 mb-4">
                            <div class="form-group-modern">
                                <label class="form-label-modern">
                                    <i class="fas fa-flask mr-2"></i>
                                    Laboratorio
                                </label>
                                <model-select
                                    :options="laboratorios"
                                    v-model="informe.laboratorio_id"
                                    class="modern-select-informe"
                                    placeholder="Seleccionar laboratorio"
                                ></model-select>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 mb-4">
                            <div class="form-group-modern">
                                <label class="form-label-modern">
                                    <i class="fas fa-calendar-alt mr-2"></i>
                                    Fecha inicial
                                </label>
                                <input 
                                    type="date" 
                                    class="form-control modern-input-informe" 
                                    :class="{ 'is-invalid': fechaFinalInvalida && informe.fecha_inicial }"
                                    v-model="informe.fecha_inicial"
                                >
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 mb-4">
                            <div class="form-group-modern">
                                <label class="form-label-modern">
                                    <i class="fas fa-calendar-alt mr-2"></i>
                                    Fecha final
                                </label>
                                <input 
                                    type="date" 
                                    class="form-control modern-input-informe" 
                                    :class="{ 'is-invalid': fechaFinalInvalida }"
                                    v-model="informe.fecha_final"
                                >
                                <div v-if="fechaFinalInvalida" class="invalid-feedback">
                                    La fecha final no puede ser menor a la fecha inicial
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Checkboxes Section -->
                    <div class="checkbox-section">
                        <h6 class="checkbox-title">Tipo de informe:</h6>
                        <div class="checkbox-group">
                            <div class="modern-checkbox">
                                <input 
                                    class="checkbox-input" 
                                    type="checkbox" 
                                    id="ventas"
                                    v-model="informe.ventas"
                                >
                                <label class="checkbox-label" for="ventas">
                                    <span class="checkbox-custom"></span>
                                    <i class="fas fa-shopping-cart checkbox-icon"></i>
                                    Ventas
                                </label>
                            </div>
                            <div class="modern-checkbox">
                                <input 
                                    class="checkbox-input" 
                                    type="checkbox" 
                                    id="cobros"
                                    v-model="informe.cobros"
                                >
                                <label class="checkbox-label" for="cobros">
                                    <span class="checkbox-custom"></span>
                                    <i class="fas fa-money-bill-wave checkbox-icon"></i>
                                    Cobros
                                </label>
                            </div>
                            <div class="modern-checkbox">
                                <input 
                                    class="checkbox-input" 
                                    type="checkbox" 
                                    id="transferencia"
                                    v-model="informe.transferencia"
                                >
                                <label class="checkbox-label" for="transferencia">
                                    <span class="checkbox-custom"></span>
                                    <i class="fas fa-exchange-alt checkbox-icon"></i>
                                    Transferencias
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="action-buttons">
                        <button class="btn btn-generate" @click="generarInforme" :disabled="cargandoInforme || fechaFinalInvalida">
                            <i v-if="!cargandoInforme" class="fas fa-chart-bar mr-2"></i>
                            <i v-if="cargandoInforme" class="fas fa-spinner fa-spin mr-2"></i>
                            {{ cargandoInforme ? 'Generando informe...' : 'Generar informe' }}
                        </button>
                        <a 
                            :href="'/generar-excel/' + informe.fecha_inicial +'/'+informe.fecha_final + '/' + informe.laboratorio_id" 
                            class="btn btn-download" 
                            target="_blank" 
                            v-if="informe.fecha_inicial !== '' && informe.fecha_final !== '' && !cargandoInforme && !fechaFinalInvalida"
                        >
                            <i class="fas fa-file-excel mr-2"></i>
                            Descargar informe
                        </a>
                    </div>
                </div>
            </div>

            <!-- Alert Section -->
            <div class="alert-section" v-if="infoMensaje">
                <div class="alert alert-info modern-alert">
                    <i class="fas fa-info-circle mr-2"></i>
                    {{ mensaje }}
                </div>
            </div>

            <!-- Loading Section -->
            <div v-if="cargandoInforme" class="loading-section">
                <div class="loading-card">
                    <div class="loading-content">
                        <div class="loading-spinner">
                            <div class="spinner-border" role="status"></div>
                        </div>
                        <h5 class="loading-title">
                            <i class="fas fa-chart-line mr-2"></i>
                            Generando informe
                        </h5>
                        <p class="loading-description">
                            Procesando datos del {{ informe.fecha_inicial }} al {{ informe.fecha_final }}...
                        </p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <div v-if="mostrarInformes" class="results-section">
                <div class="results-card">
                    <div class="results-header">
                        <h5 class="results-title">
                            <i class="fas fa-table mr-2"></i>
                            Resultados del informe
                        </h5>
                        <div class="results-summary">
                            <span class="summary-item">
                                <i class="fas fa-list-ol mr-1"></i>
                                {{ informes.length }} registros encontrados
                            </span>
                            <span class="summary-item">
                                <i class="fas fa-calculator mr-1"></i>
                                Total: {{ calcularTotal(informes) | currency }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="table-container">
                        <div class="table-responsive">            
                            <table class="table professional-informe-table">
                                <thead class="table-header">
                                    <tr v-if="informe.cobros">
                                        <th class="th-modern">CLIENTE / FACTURA</th>
                                        <th class="th-modern text-center"># RECIBO</th>                         
                                        <th class="th-modern text-center">SALDO ANTERIOR</th>                            
                                        <th class="th-modern text-center">ABONO</th>
                                        <th class="th-modern text-center">RETENCIÓN</th>
                                        <th class="th-modern text-center">DESCUENTO</th>
                                        <th class="th-modern text-center">NOTA CRÉDITO</th>
                                        <th class="th-modern text-center">PENDIENTE</th>
                                        <th class="th-modern text-center">FECHA ABONO</th>
                                    </tr>
                                    <tr v-else>
                                        <th class="th-modern">CLIENTE</th>
                                        <th class="th-modern text-center">CIUDAD</th>                            
                                        <th class="th-modern text-center">{{ (informe.ventas) ? '# PEDIDO' : '# TRANSFERENCIA' }}</th>
                                        <th class="th-modern text-center">FECHA</th>
                                        <th class="th-modern text-center">VALOR</th>
                                    </tr>                        
                                </thead>
                                
                                <tbody v-if="informe.cobros">                        
                                    <tr v-for="(item, index) in informes" :key="index" class="table-row">
                                        <td class="td-modern client-info">
                                            <div class="client-main">{{ item.cliente }} - {{ item.ciudad }}</div>
                                            <div class="client-details">
                                                <span class="detail-item">
                                                    <i class="fas fa-file-invoice mr-1"></i>
                                                    Factura: {{ item.factura }}
                                                </span>
                                                <span class="detail-item">
                                                    <i class="fas fa-dollar-sign mr-1"></i>
                                                    Valor: {{ item.valor_fac | currency }}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="data-badge">{{ item.num_recibo_caja }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-neutral">{{ item.saldo | currency }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-positive">{{ item.valor | currency }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-negative">{{ item.retencion | currency }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-negative">{{ item.descuento | currency }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-warning">{{ item.valor_nota | currency }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-pending">{{ item.pendiente | currency }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="date-badge">{{ item.fecha }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                                
                                <tbody v-else>
                                    <tr v-for="(item, index) in informes" :key="index" class="table-row">
                                        <td class="td-modern">
                                            <div class="client-name">{{ item.clientes.razon_social }}</div>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="city-badge">{{ item.municipios.mcpio }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="data-badge">{{ (informe.ventas) ? item.num_pedido : item.numero }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="date-badge">{{ item.fecha }}</span>
                                        </td>
                                        <td class="td-modern text-center">
                                            <span class="amount-text amount-positive">{{ item.valor | currency }}</span>
                                        </td>                            
                                    </tr>
                                </tbody>
                                
                                <tfoot class="table-footer">
                                    <tr>
                                        <td :colspan="informe.cobros ? 8 : 4" class="total-label">
                                            <strong>
                                                <i class="fas fa-calculator mr-2"></i>
                                                TOTAL GENERAL
                                            </strong>
                                        </td>
                                        <td class="total-value">
                                            <strong>{{ calcularTotal(informes) | currency }}</strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>
<script>
    import Swal from 'sweetalert2';
    import { ModelSelect } from 'vue-search-select'
    export default {
        data() {
            return {
                informe: {ventas: false, cobros: false, transferencia: false, fecha_inicial: '', fecha_final: '', laboratorio_id: null },
                infoMensaje: false,
                laboratorios: [],
                mensaje: '',
                mostrarInformes: false,
                informes: [],
                cargandoInforme: false,
                fechaFinalInvalida: false
            }
        },
        mounted(){
            this.getLaboratorios()
        },
        watch: {
            'informe.fecha_inicial': function() {
                this.validarFechas();
            },
            'informe.fecha_final': function() {
                this.validarFechas();
            }
        },
        methods: {
            validarFechas() {
                if (this.informe.fecha_inicial && this.informe.fecha_final) {
                    const fechaInicial = new Date(this.informe.fecha_inicial);
                    const fechaFinal = new Date(this.informe.fecha_final);
                    
                    this.fechaFinalInvalida = fechaFinal < fechaInicial;
                    
                    if (this.fechaFinalInvalida) {
                        this.infoMensaje = true;
                        this.mensaje = 'La fecha final no puede ser menor a la fecha inicial';
                    } else if (this.mensaje === 'La fecha final no puede ser menor a la fecha inicial') {
                        this.infoMensaje = false;
                        this.mensaje = '';
                    }
                } else {
                    this.fechaFinalInvalida = false;
                }
            },
            calcularTotal(ventas){
                let total = 0;
                for (let i = 0; i < ventas.length; i++) {                    
                    total += ventas[i].valor
                }
                return total;
            },
            generarInforme(){
                this.informes = [];
                this.infoMensaje = false;
                this.mensaje = '';
                this.mostrarInformes = false;

                if(this.informe.laboratorio_id === null){
                    Swal.fire({
                        title: 'Debe escoger un laboratorio',
                        icon: 'warning'
                    })
                    return
                }

                if (this.informe.fecha_inicial === '' || this.informe.fecha_final === '') {
                    this.infoMensaje = true;
                    this.mensaje = 'Hay fechas vacias';
                    return;
                }

                if (this.fechaFinalInvalida) {
                    Swal.fire({
                        title: 'Error en las fechas',
                        text: 'La fecha final no puede ser menor a la fecha inicial',
                        icon: 'error'
                    });
                    return;
                }

                if(this.informe.ventas === false && this.informe.cobros === false &&this.informe.transferencia === false){
                    this.infoMensaje = true;
                    this.mensaje = 'Debe elegir un tipo de informe';
                    return;
                }                

                this.mostrarInformes = false;
                this.cargandoInforme = true;
                let url = '';

                if(this.informe.ventas)url='/generar-informe-ventas/';
                if(this.informe.cobros)url='/generar-informe-cobros/';
                if(this.informe.transferencia)url='/generar-informe-transferencia/';

                axios.get(url+this.informe.fecha_inicial+'/'+this.informe.fecha_final+'/'+this.informe.laboratorio_id)
                    .then(res => {
                        this.cargandoInforme = false;
                        if (res.data.length > 0) {
                            this.mostrarInformes = true;
                            if(this.informe.cobros){
                                for (let i = 0; i < res.data.length; i++) {
                                    this.informes.push({
                                        cliente: res.data[i].razon_social,
                                        ciudad: res.data[i].mcpio,
                                        num_recibo_caja: res.data[i].num_recibo_caja,
                                        fecha: res.data[i].fecha,
                                        valor: res.data[i].valor_abono,
                                        factura: res.data[i].numero_factura,
                                        valor_fac: res.data[i].total_factura,
                                        descuento: res.data[i].descuento,
                                        retencion: res.data[i].retencion,
                                        saldo: res.data[i].saldo,
                                        valor_nota: res.data[i].valor_nota,
                                        pendiente: res.data[i].pendiente,
                                    })                                 
                                }
                            }else{                                
                                this.informes = res.data;
                            }
                        } else {
                            this.infoMensaje = true;
                            this.mensaje = 'No se encontraron registros para los filtros seleccionados';
                        }
                    })
                    .catch(err => {
                        this.cargandoInforme = false;
                        console.log(err);
                        Swal.fire({
                            title: 'Error al generar informe',
                            text: 'Ocurrió un error al consultar los datos. Intente nuevamente.',
                            icon: 'error'
                        });
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
        },        
        components:{
            ModelSelect
        }
    }
</script>

<style scoped>
/* Container principal */
.informe-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    padding: 20px;
}

/* Header Section */
.header-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 25px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
}

.header-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #17a2b8 0%, #138496 50%, #f093fb 100%);
}

.page-title {
    color: #2c3e50;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.page-title i {
    color: #17a2b8;
}

.page-description {
    color: #6c757d;
    font-size: 1rem;
    margin-bottom: 0;
    line-height: 1.5;
}

/* Filters Section */
.filters-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    margin-bottom: 25px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
}

.filters-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #28a745 0%, #20c997 50%, #17a2b8 100%);
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
    padding: 30px;
}

/* Form Groups */
.form-group-modern {
    margin-bottom: 0;
}

.form-label-modern {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
}

.form-label-modern i {
    color: #17a2b8;
}

.modern-input-informe {
    border-radius: 8px;
    border: 2px solid #e9ecef;
    padding: 12px 16px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    height: 48px;
}

.modern-input-informe:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);
    outline: none;
    background: #ffffff;
}

.modern-input-informe.is-invalid {
    border-color: #dc3545;
    background: linear-gradient(145deg, #fff5f5 0%, #ffeaea 100%);
    box-shadow: inset 0 2px 4px rgba(220, 53, 69, 0.1);
}

.modern-input-informe.is-invalid:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15), inset 0 2px 4px rgba(220, 53, 69, 0.1);
    outline: none;
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 5px;
    font-size: 0.8rem;
    color: #dc3545;
    font-weight: 500;
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid rgba(220, 53, 69, 0.2);
    display: flex;
    align-items: center;
}

.invalid-feedback::before {
    content: '⚠️';
    margin-right: 8px;
    font-size: 0.9rem;
}

/* Select moderno */
.modern-select-informe {
    border-radius: 8px;
    border: 2px solid #e9ecef;
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

/* Checkbox Section */
.checkbox-section {
    margin: 25px 0;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    border: 1px solid #e9ecef;
}

.checkbox-title {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 1rem;
}

.checkbox-group {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
}

.modern-checkbox {
    position: relative;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    color: #495057;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid transparent;
}

.checkbox-label:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #17a2b8;
}

.checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid #ced4da;
    border-radius: 4px;
    margin-right: 10px;
    position: relative;
    transition: all 0.3s ease;
    background: white;
}

.checkbox-input:checked + .checkbox-label .checkbox-custom {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border-color: #17a2b8;
}

.checkbox-input:checked + .checkbox-label .checkbox-custom::after {
    content: '✓';
    position: absolute;
    color: white;
    font-size: 12px;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.checkbox-input:checked + .checkbox-label {
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.1);
    border-color: #17a2b8;
}

.checkbox-icon {
    margin-right: 8px;
    color: inherit;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 25px;
}

.btn-generate {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border: none;
    border-radius: 8px;
    padding: 12px 25px;
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
}

.btn-generate:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a67d8 0%, #17a2b8 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    color: white;
}

.btn-generate:disabled {
    background: linear-gradient(135deg, #a8a8a8 0%, #8e8e8e 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 15px rgba(168, 168, 168, 0.2);
    color: white;
}

.btn-generate:disabled:hover {
    transform: none;
    box-shadow: 0 4px 15px rgba(168, 168, 168, 0.2);
}

.btn-download {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border: none;
    border-radius: 8px;
    padding: 12px 25px;
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    display: inline-flex;
    align-items: center;
}

.btn-download:hover {
    background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
    text-decoration: none;
    color: white;
}

/* Alert Section */
.alert-section {
    margin-bottom: 25px;
}

.modern-alert {
    border-radius: 12px;
    border: none;
    padding: 15px 20px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.15);
    background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
    color: #0c5460;
}

/* Loading Section */
.loading-section {
    margin-bottom: 25px;
    animation: fadeInUp 0.6s ease-out;
}

.loading-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    padding: 40px 30px;
    margin-bottom: 25px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
    text-align: center;
}

.loading-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #17a2b8 0%, #138496 50%, #f093fb 100%);
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.loading-spinner {
    position: relative;
}

.spinner-border {
    width: 4rem;
    height: 4rem;
    border: 0.4em solid rgba(102, 126, 234, 0.1);
    border-top: 0.4em solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-title {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-title i {
    color: #17a2b8;
}

.loading-description {
    color: #6c757d;
    font-size: 1rem;
    margin-bottom: 0;
    line-height: 1.5;
}

.loading-progress {
    width: 100%;
    max-width: 300px;
    height: 6px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #17a2b8 0%, #138496 100%);
    border-radius: 3px;
    animation: progressAnimation 2s ease-in-out infinite;
    width: 0%;
}

@keyframes progressAnimation {
    0% { width: 0%; transform: translateX(-100%); }
    50% { width: 100%; transform: translateX(0%); }
    100% { width: 100%; transform: translateX(100%); }
}

/* Results Section */
.results-section {
    animation: fadeInUp 0.6s ease-out;
}

.results-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(255,255,255,0.8);
    overflow: hidden;
    position: relative;
}

.results-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffc107 0%, #fd7e14 50%, #dc3545 100%);
}

.results-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 20px 30px;
    border-bottom: 2px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
}

.results-title {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0;
    font-size: 1.1rem;
}

.results-summary {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.summary-item {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #495057;
    border: 1px solid #e9ecef;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* Table Styles */
.table-container {
    padding: 0;
    overflow-x: auto;
}

.professional-informe-table {
    margin-bottom: 0;
    font-size: 0.9rem;
    background: transparent;
    table-layout: fixed;
    width: 100%;
    min-width: 1200px;
}

.table-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.th-modern {
    background: transparent !important;
    color: #2c3e50 !important;
    font-weight: 700 !important;
    font-size: 0.8rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    padding: 18px 8px !important;
    border-bottom: 2px solid #dee2e6 !important;
    border-top: none !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.table-row {
    transition: all 0.2s ease;
}

.table-row:hover {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.td-modern {
    padding: 16px 8px !important;
    border-bottom: 1px solid #f0f0f0 !important;
    vertical-align: middle !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

/* Column Width Control */
.th-modern:nth-child(1),
.td-modern:nth-child(1) {
    width: 25% !important;
    min-width: 200px !important;
}

.th-modern:nth-child(2),
.td-modern:nth-child(2) {
    width: 10% !important;
    min-width: 80px !important;
    text-align: center !important;
}

.th-modern:nth-child(3),
.td-modern:nth-child(3),
.th-modern:nth-child(4),
.td-modern:nth-child(4),
.th-modern:nth-child(5),
.td-modern:nth-child(5),
.th-modern:nth-child(6),
.td-modern:nth-child(6),
.th-modern:nth-child(7),
.td-modern:nth-child(7),
.th-modern:nth-child(8),
.td-modern:nth-child(8) {
    width: 12% !important;
    min-width: 100px !important;
    text-align: center !important;
}

.th-modern:nth-child(9),
.td-modern:nth-child(9) {
    width: 11% !important;
    min-width: 90px !important;
    text-align: center !important;
}

/* Client Info Styles */
.client-info {
    max-width: none !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.client-main {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 0.9rem;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.client-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail-item {
    font-size: 0.8rem;
    color: #6c757d;
    display: flex;
    align-items: center;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.client-name {
    font-weight: 600;
    color: #2c3e50;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

/* Badge Styles */
.data-badge {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.75rem;
    border: 1px solid rgba(25, 118, 210, 0.2);
    white-space: nowrap !important;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.city-badge {
    background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
    color: #7b1fa2;
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.75rem;
    border: 1px solid rgba(123, 31, 162, 0.2);
    white-space: nowrap !important;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.date-badge {
    background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%);
    color: #f57c00;
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.75rem;
    border: 1px solid rgba(245, 124, 0, 0.2);
    white-space: nowrap !important;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Amount Styles */
.amount-text {
    font-weight: 700;
    font-size: 0.85rem;
    padding: 4px 6px;
    border-radius: 6px;
    white-space: nowrap !important;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 70px;
    text-align: center;
}

.amount-positive {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724;
    border: 1px solid rgba(40, 167, 69, 0.2);
}

.amount-negative {
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    color: #721c24;
    border: 1px solid rgba(220, 53, 69, 0.2);
}

.amount-warning {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    color: #856404;
    border: 1px solid rgba(255, 193, 7, 0.2);
}

.amount-pending {
    background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
    color: #0c5460;
    border: 1px solid rgba(23, 162, 184, 0.2);
}

.amount-neutral {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #495057;
    border: 1px solid rgba(108, 117, 125, 0.2);
}

/* Footer Table */
.table-footer {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-top: 2px solid #dee2e6;
}

.table-footer td {
    padding: 20px 12px !important;
    border-bottom: none !important;
    font-size: 1rem !important;
}

.total-label {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    color: #2c3e50 !important;
    text-align: center;
}

.total-value {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724 !important;
    text-align: center;
    font-size: 1.1rem !important;
}

/* Responsive Design */
@media (max-width: 1400px) {
    .professional-informe-table {
        min-width: 1000px;
    }
    
    .th-modern,
    .td-modern {
        font-size: 0.75rem !important;
        padding: 12px 6px !important;
    }
    
    .amount-text {
        font-size: 0.75rem;
        padding: 3px 5px;
        min-width: 60px;
    }
}

@media (max-width: 1024px) {
    .checkbox-group {
        flex-direction: column;
        gap: 15px;
    }
    
    .results-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .results-summary {
        width: 100%;
        justify-content: space-between;
    }
    
    .professional-informe-table {
        min-width: 900px;
    }
}

@media (max-width: 768px) {
    .informe-container {
        padding: 15px;
    }
    
    .header-card,
    .filters-card,
    .results-card,
    .loading-card {
        margin-bottom: 20px;
    }
    
    .filters-content {
        padding: 20px;
    }
    
    .loading-card {
        padding: 30px 20px;
    }
    
    .loading-title {
        font-size: 1.1rem;
        flex-direction: column;
        gap: 8px;
    }
    
    .loading-description {
        font-size: 0.9rem;
    }
    
    .spinner-border {
        width: 3rem;
        height: 3rem;
    }
    
    .page-title {
        font-size: 1.6rem;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .page-title i {
        margin-right: 0;
        margin-bottom: 8px;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .btn-generate,
    .btn-download {
        width: 100%;
        justify-content: center;
    }
    
    .professional-informe-table {
        min-width: 800px;
    }
    
    .th-modern,
    .td-modern {
        padding: 10px 4px !important;
        font-size: 0.7rem !important;
    }
    
    .client-info {
        max-width: none;
    }
    
    .client-details {
        display: none;
    }
    
    .amount-text {
        font-size: 0.7rem;
        padding: 2px 4px;
        min-width: 50px;
    }
    
    .data-badge,
    .city-badge,
    .date-badge {
        font-size: 0.65rem;
        padding: 2px 6px;
    }
    
    /* Table container scroll indicator */
    .table-container::after {
        content: "← Desliza para ver más →";
        position: sticky;
        right: 0;
        bottom: 10px;
        background: rgba(102, 126, 234, 0.1);
        color: #17a2b8;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.7rem;
        font-weight: 600;
        text-align: center;
        display: block;
        margin: 10px auto 0;
        width: fit-content;
        border: 1px solid rgba(102, 126, 234, 0.2);
    }
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
</style>
