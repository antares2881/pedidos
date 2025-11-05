<template>
    <v-app>
        <div class="abonos-container">
            <!-- Modal de facturas pendientes -->
            <b-modal ref="facturasClientes" no-close-on-backdrop centered hide-footer scrollable size="xl" modal-class="modal-facturas-pendientes">
                <template #modal-title>
                    <div class="modal-title-container">
                        <span class="custom-icon modal-icon">📋</span>
                        <span class="modal-title-text">Facturas Pendientes por Cliente</span>
                    </div>
                </template>
                <div class="modal-search-section">
                    <div class="search-controls">
                        <div class="search-inputs-row">
                            <div class="form-group flex-grow-1">
                                <label for="cliente_id" class="form-label">
                                    <span class="custom-icon">👤</span>
                                    Cliente
                                </label>
                                <model-select
                                    id="cliente_id"
                                    :options="clientes"
                                    v-model="factura.cliente_id"
                                    class="professional-select"
                                    :title="getClienteTooltip(factura.cliente_id)"
                                    placeholder="Seleccione un cliente..."
                                ></model-select>
                            </div>
                            <div class="form-group">
                                <label for="tiposfactura" class="form-label">
                                    <span class="custom-icon">🔍</span>
                                    Buscar en
                                </label>
                                <b-select 
                                    :options="tiposfactura" 
                                    v-model="factura.tiposfactura" 
                                    @change="buscarConsecutivo"
                                    class="professional-select"
                                ></b-select>
                            </div>
                            <div class="form-group button-group">
                                <label class="form-label invisible">
                                    <span class="custom-icon">⚪</span>
                                    Acción
                                </label>
                                <button class="btn btn-primary search-btn" @click="buscarFacturas" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
                                    <span v-else class="custom-icon">🔍</span>
                                    {{ loading ? 'Buscando...' : 'Buscar Facturas' }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nota-alert" v-if="nota.asociada">
                        <div class="alert alert-info professional-alert">
                            <span class="custom-icon">📝</span>
                            <div class="alert-content">
                                <strong>Nota Asociada:</strong>
                                <span class="nota-details">
                                    No. {{ nota.numero_nota }} | Valor: {{ nota.valor_nota | currency }} | Disponible: {{ nota.disponible | currency }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="facturas-table-section">
                    <!-- Vista de Tabla para Desktop -->
                    <div class="table-responsive-modal modal-table-wrapper d-none d-lg-block" style="min-height: 300px;">
                        <table class="modal-table">
                            <thead>
                                <tr>
                                    <th class="text-center checkbox-col">
                                        <span class="custom-icon">☑️</span>
                                    </th>
                                    <th v-if="factura.tiposfactura === 2" class="text-center">
                                        <span class="custom-icon">🏢</span>
                                        Lab
                                    </th>
                                    <th class="text-center">
                                        <span class="custom-icon">📄</span>
                                        Factura
                                    </th>
                                    <th class="text-center">
                                        <span class="custom-icon">📅</span>
                                        Fecha
                                    </th>
                                    <th class="text-right">
                                        <span class="custom-icon">💰</span>
                                        Valor
                                    </th>
                                    <th class="text-right">
                                        <span class="custom-icon">💳</span>
                                        Pagado
                                    </th>
                                    <th class="text-right">
                                        <span class="custom-icon">📝</span>
                                        NC
                                    </th>
                                    <th class="text-right">
                                        <span class="custom-icon">💼</span>
                                        Saldo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="loading" class="loading-row">
                                    <td :colspan="factura.tiposfactura === 2 ? 8 : 7" class="text-center loading-cell">
                                        <div class="loading-container">
                                            <div class="spinner-professional"></div>
                                            <span class="loading-text">Buscando facturas pendientes...</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else-if="noResultsFound && !loading" class="no-results-row">
                                    <td :colspan="factura.tiposfactura === 2 ? 8 : 7" class="text-center no-results-cell">
                                        <div class="no-results-container">
                                            <span class="custom-icon no-results-icon">📭</span>
                                            <div class="no-results-text">
                                                <strong>Sin resultados</strong><br>
                                                No se encontraron facturas pendientes para este cliente
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="item, index in facturas" :key="index" class="data-row">
                                    <td class="text-center checkbox-cell">
                                        <b-form-checkbox
                                            :id="'id'+index"
                                            :value="item"
                                            @input="selectFactura(index)"
                                            class="professional-checkbox"
                                        ></b-form-checkbox>
                                    </td>
                                    <td v-if="factura.tiposfactura === 2" class="text-center lab-cell">
                                        <img :src="item.logo" alt="Logo" class="lab-logo-small">
                                    </td>
                                    <td class="text-center invoice-cell">
                                        <span class="invoice-number-badge">
                                            {{ (item.electronica == 0) ? item.numero_factura : item.electronica }}
                                        </span>
                                    </td>
                                    <td class="text-center date-cell">
                                        <span class="date-value">{{ item.fecha_factura }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value">{{ item.total_factura | currency}}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-paid">{{ item.pagado | currency}}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-nc">{{ item.total_abono_nota | currency }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-balance">{{ item.total_factura - item.total_abono_nota - item.pagado | currency}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    
                    <!-- Vista Card para Móviles y Tablets -->
                    <div class="mobile-cards-container d-block d-lg-none">
                        <!-- Loading State -->
                        <div v-if="loading" class="mobile-loading-card">
                            <div class="loading-container">
                                <div class="spinner-professional"></div>
                                <span class="loading-text">Buscando facturas pendientes...</span>
                            </div>
                        </div>
                        
                        <!-- No Results State -->
                        <div v-else-if="noResultsFound && !loading" class="mobile-no-results-card">
                            <div class="no-results-container">
                                <span class="custom-icon no-results-icon">📭</span>
                                <div class="no-results-text">
                                    <strong>Sin resultados</strong><br>
                                    No se encontraron facturas pendientes para este cliente
                                </div>
                            </div>
                        </div>
                        
                        <!-- Cards de Facturas -->
                        <div v-else class="facturas-cards-list">
                            <div v-for="(item, index) in facturas" :key="index" class="factura-card">
                                <div class="card-header">
                                    <div class="card-checkbox">
                                        <b-form-checkbox
                                            :id="'mobile_id'+index"
                                            :value="item"
                                            @input="selectFactura(index)"
                                            class="professional-checkbox"
                                        ></b-form-checkbox>
                                    </div>
                                    <div class="card-title">
                                        <div class="invoice-info">
                                            <span class="invoice-number">
                                                {{ (item.electronica == 0) ? item.numero_factura : item.electronica }}
                                            </span>
                                            <span class="invoice-date">{{ item.fecha_factura }}</span>
                                        </div>
                                        <div v-if="factura.tiposfactura === 2" class="lab-info">
                                            <img :src="item.logo" alt="Logo" class="lab-logo-card">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card-body">
                                    <div class="amount-row">
                                        <div class="amount-item">
                                            <span class="amount-label">💰 Valor</span>
                                            <span class="amount-value-card">{{ item.total_factura | currency}}</span>
                                        </div>
                                        <div class="amount-item">
                                            <span class="amount-label">💳 Pagado</span>
                                            <span class="amount-paid-card">{{ item.pagado | currency}}</span>
                                        </div>
                                    </div>
                                    <div class="amount-row">
                                        <div class="amount-item">
                                            <span class="amount-label">📝 NC</span>
                                            <span class="amount-nc-card">{{ item.total_abono_nota | currency }}</span>
                                        </div>
                                        <div class="amount-item highlight">
                                            <span class="amount-label">💼 Saldo</span>
                                            <span class="amount-balance-card">{{ item.total_factura - item.total_abono_nota - item.pagado | currency}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-modal>
            
            <!-- Header Section -->
            <div class="header-section">
                <div class="page-header">
                    <h2>
                        <span class="custom-icon custom-icon-document">💰</span>
                        <span class="page-title">Registrar Abonos y Cobros</span>
                    </h2>
                    <p class="page-description">
                        Gestión de abonos a facturas pendientes y registro de cobros
                    </p>
                </div>
                
                <div class="header-actions my-2">
                    <button class="btn btn-primary new-lab-btn" @click="mostrarModalFacturas">
                        <span class="custom-icon custom-icon-filter">📋</span>
                        Asociar Facturas
                    </button>
                </div>
            </div>

            <!-- Main Content -->
            <div class="abonos-content">
                <div class="professional-report-container">
                    <!-- Client Information -->
                    <div class="client-info-section" v-if="abono.razon_social">
                        <div class="client-card">
                            <div class="client-header">
                                <span class="custom-icon client-icon">🏢</span>
                                <div class="client-details">
                                    <h6 class="client-name">{{ abono.razon_social }}</h6>
                                    <p class="client-nit">NIT: {{ abono.nit }}</p>
                                    <p class="client-address">{{ abono.direccion }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Controls -->
                    <div class="form-controls-section">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="fecha" class="form-label">
                                    <span class="custom-icon">📅</span>
                                    Fecha
                                </label>
                                <input type="date" id="fecha" class="form-control professional-input" v-model="abono.fecha">
                            </div>
                            <div class="form-group">
                                <label for="num_recibo" class="form-label">
                                    <span class="custom-icon">🧾</span>
                                    No. Recibo
                                </label>
                                <input type="number" id="num_recibo" class="form-control professional-input" v-model.number="abono.num_recibo_caja">
                            </div>
                        </div>
                    </div>
                    <!-- Nota Asociada -->
                    <div class="nota-section" v-if="nota.asociada">
                        <div class="alert alert-info professional-alert">
                            <span class="custom-icon">📝</span>
                            <div class="alert-content">
                                <strong>Nota Asociada:</strong>
                                <span class="nota-details">
                                    No. {{ nota.numero_nota }} | Valor: {{ nota.valor_nota | currency }} | Disponible: {{ nota.disponible | currency }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Documents Table -->
                    <div class="documents-table-section">
                        <!-- Vista de Tabla para Desktop -->
                        <div class="table-responsive professional-table-wrapper d-none d-lg-block">
                            <table class="professional-table documents-table desktop-table">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            <span class="custom-icon">📄</span>
                                            Documento
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">📅</span>
                                            Fecha
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">💰</span>
                                            Valor
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">💼</span>
                                            Saldo
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">📊</span>
                                            Retención
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">📝</span>
                                            NC
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">🎯</span>
                                            Descuento
                                        </th>
                                        <th class="text-right">
                                            <span class="custom-icon">💵</span>
                                            Efectivo
                                        </th>
                                        <th class="text-center">
                                            <span class="custom-icon">⚙️</span>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                            <tbody>
                                <tr v-for="item, index in abono.documentos" :key="index" class="data-row">                                   
                                    <td class="text-center document-cell">
                                        <span class="document-number">{{ (item.electronica === 0) ? item.numero_factura : item.electronica }}</span>
                                    </td>
                                    <td class="text-center date-cell">
                                        <span class="date-value">{{ item.fecha_factura }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value">{{ item.total_factura | currency }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-balance">{{ item.saldo | currency }}</span>
                                    </td>
                                    
                                    <td class="text-right input-cell">
                                        <input 
                                            type="text" 
                                            class="professional-input input-currency" 
                                            :id="'retencion' + index" 
                                            :value="formatCurrency(item.retencion)" 
                                            @input="updateField('retencion', index, $event)"
                                            @blur="calcularAbono(index)"
                                            placeholder="0">
                                    </td>
                                    <td class="text-right input-cell">
                                        <input 
                                            type="text" 
                                            class="professional-input input-currency" 
                                            :id="'valor_nota' + index" 
                                            :value="formatCurrency(item.valor_nota)" 
                                            @input="updateField('valor_nota', index, $event)"
                                            @blur="calcularAbono(index)"
                                            placeholder="0">
                                    </td>
                                    <td class="text-right input-cell">
                                        <input 
                                            type="text" 
                                            class="professional-input input-currency" 
                                            :id="'descuento' + index" 
                                            :value="formatCurrency(item.descuento)" 
                                            @input="updateField('descuento', index, $event)"
                                            @blur="calcularAbono(index)"
                                            placeholder="0">
                                    </td>
                                    <td class="text-right input-cell efectivo-cell">
                                        <input 
                                            type="text" 
                                            class="professional-input input-currency efectivo-input" 
                                            :id="'abono' + index" 
                                            :value="formatCurrency(item.abono)" 
                                            @input="updateField('abono', index, $event)"
                                            @blur="calcularTotalAbono(index)"
                                            placeholder="0">
                                    </td>
                                    <td class="text-center actions-cell">
                                        <button 
                                            class="action-btn delete-btn" 
                                            @click="eliminarDocumento(index)"
                                            title="Eliminar documento">
                                            <span class="custom-icon">🗑️</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="total-row">
                                    <td :colspan="factura.tiposfactura === 2 ? 7 : 6" class="total-label">
                                        <strong>
                                            <span class="custom-icon">💵</span>
                                            Total Efectivo
                                        </strong>
                                    </td>
                                    <td class="total-amount">
                                        <strong>{{ abono.total_abono | currency }}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <!-- Vista de Tarjetas para Móviles y Tablets -->
                    <div class="documents-cards-container d-block d-lg-none">
                        <div v-if="abono.documentos.length === 0" class="no-documents-message">
                            <div class="no-docs-container">
                                <span class="custom-icon">📄</span>
                                <p>No hay documentos asociados</p>
                                <small>Asocie facturas para registrar abonos</small>
                            </div>
                        </div>
                        
                        <div v-else class="documents-mobile-list">
                            <div v-for="(item, index) in abono.documentos" :key="index" class="document-mobile-card">
                                <!-- Card Header -->
                                <div class="card-header-mobile">
                                    <div class="document-info-mobile">
                                        <span class="document-number-mobile">
                                            📄 {{ (item.electronica === 0) ? item.numero_factura : item.electronica }}
                                        </span>
                                        <span class="document-date-mobile">📅 {{ item.fecha_factura }}</span>
                                    </div>
                                    <button 
                                        class="delete-btn-mobile" 
                                        @click="eliminarDocumento(index)"
                                        title="Eliminar documento">
                                        🗑️
                                    </button>
                                </div>
                                
                                <!-- Card Body -->
                                <div class="card-body-mobile">
                                    <!-- Valores Fijos -->
                                    <div class="amounts-row-mobile">
                                        <div class="amount-item-mobile">
                                            <span class="label-mobile">💰 Valor</span>
                                            <span class="value-mobile">{{ item.total_factura | currency }}</span>
                                        </div>
                                        <div class="amount-item-mobile">
                                            <span class="label-mobile">💼 Saldo</span>
                                            <span class="value-mobile">{{ item.saldo | currency }}</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Campos Editables -->
                                    <div class="inputs-section-mobile">
                                        <div class="input-row-mobile">
                                            <div class="input-group-mobile">
                                                <label class="input-label-mobile">📊 Retención</label>
                                                <input 
                                                    type="text" 
                                                    class="input-mobile" 
                                                    :id="'retencion_mobile_' + index" 
                                                    :value="formatCurrency(item.retencion)" 
                                                    @input="updateField('retencion', index, $event)"
                                                    @blur="calcularAbono(index)"
                                                    placeholder="0">
                                            </div>
                                            <div class="input-group-mobile">
                                                <label class="input-label-mobile">📝 NC</label>
                                                <input 
                                                    type="text" 
                                                    class="input-mobile" 
                                                    :id="'valor_nota_mobile_' + index" 
                                                    :value="formatCurrency(item.valor_nota)" 
                                                    @input="updateField('valor_nota', index, $event)"
                                                    @blur="calcularAbono(index)"
                                                    placeholder="0">
                                            </div>
                                        </div>
                                        
                                        <div class="input-row-mobile">
                                            <div class="input-group-mobile">
                                                <label class="input-label-mobile">🎯 Descuento</label>
                                                <input 
                                                    type="text" 
                                                    class="input-mobile" 
                                                    :id="'descuento_mobile_' + index" 
                                                    :value="formatCurrency(item.descuento)" 
                                                    @input="updateField('descuento', index, $event)"
                                                    @blur="calcularAbono(index)"
                                                    placeholder="0">
                                            </div>
                                            <div class="input-group-mobile efectivo-group">
                                                <label class="input-label-mobile">💵 Efectivo</label>
                                                <input 
                                                    type="text" 
                                                    class="input-mobile efectivo-input-mobile" 
                                                    :id="'abono_mobile_' + index" 
                                                    :value="formatCurrency(item.abono)" 
                                                    @input="updateField('abono', index, $event)"
                                                    @blur="calcularTotalAbono(index)"
                                                    placeholder="0">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Total Efectivo Card para Móviles -->
                        <div class="total-efectivo-card-mobile" v-if="abono.documentos.length > 0">
                            <div class="total-efectivo-mobile">
                                <span class="total-icon-mobile">💵</span>
                                <div class="total-content-mobile">
                                    <span class="total-label-mobile">Total Efectivo</span>
                                    <span class="total-value-mobile">{{ abono.total_abono | currency }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Observations Section -->
                <div class="observations-section">
                    <div class="form-group full-width">
                        <label for="observaciones" class="form-label">
                            <span class="custom-icon">📝</span>
                            Observaciones
                        </label>
                        <textarea 
                            id="observaciones" 
                            class="form-control professional-textarea" 
                            v-model="abono.observaciones"
                            rows="3"
                            placeholder="Ingrese observaciones adicionales..."
                        ></textarea>
                    </div>
                </div>

                <!-- Error Alert -->
                <div class="error-section" v-if="errores">
                    <div class="alert alert-danger professional-alert">
                        <span class="custom-icon">⚠️</span>
                        <div class="alert-content">
                            <strong>Error:</strong> {{ errores }}
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="actions-section">
                    <button class="btn btn-primary save-btn" @click="saveAbono">
                        <span class="custom-icon">💰</span>
                        Registrar Abono
                    </button>
                </div>
            </div>
        </div>
        </div>
    </v-app>
</template>
<script>
    import { ModelSelect } from 'vue-search-select';
    export default {
        data(){
            return{
                abono: {documentos: [], razon_social: '', total_abono: 0, num_recibo_caja: null, fecha: null, nit: null, direccion: null},
                clientes: [],
                factura: {},
                facturas: [],
                errores: null,
                loading: false,
                noResultsFound: false,
                nota: {numero_nota: null, valor_nota: 0, asociada: false},
                registrarAbono: null,
                tiposfactura: [
                    {text: 'Facturas CVL', value: 1},
                    {text: 'Ventas', value: 2},
                ],
                // Variables para manejo de resize
                resizeTimeout: null,
                lastIsMobile: window.innerWidth < 992
            }
        },
        mounted() {
            this.getClientes();
            
            // Listener para recarga de clientes cuando cambia el tamaño de pantalla
            window.addEventListener('resize', this.handleResize);
        },
        beforeDestroy() {
            // Limpiar el listener cuando se destruye el componente
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {            
            buscarConsecutivo(){
                if(this.factura.tiposfactura === 1){
                    axios.get('/consecutivo-recibo-caja')
                    .then(res => {
                        // console.log(res.data);
                        this.abono.num_recibo_caja = res.data[0].numero + 1
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }else{
                    axios.get('/consecutivo-recibo-caja-calox')
                    .then(res => {
                        // console.log(res.data)
                        
                        this.abono.num_recibo_caja = res.data + 1;
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            },
            buscarFacturas(){
                this.nota.asociada = false;
                this.noResultsFound = false;
                
                if(this.factura.cliente_id === null || this.factura.cliente_id === undefined || this.factura.cliente_id === ''){
                    Swal.fire({
                        title: 'Atención',
                        text: 'Debe elegir un cliente',
                        icon: 'warning'
                    })
                    return;
                }
                if(this.factura.tiposfactura === null || this.factura.tiposfactura === undefined || this.factura.tiposfactura === ''){
                    Swal.fire({
                        title: 'Atención',
                        text: 'Debe elegir en donde buscar la factura',
                        icon: 'warning'
                    })
                    return;
                }
                
                this.loading = true;
                this.facturas = [];
                
                if(this.factura.tiposfactura === 1){
                    this.facturasCVL();
                }else{
                    this.facturasVentas();
                }                
            },
            calcularAbono(index){
                // Obtener valores de los inputs (desktop o móvil)
                let retencionDesktop = document.getElementById('retencion'+index);
                let retencionMobile = document.getElementById('retencion_mobile_'+index);
                let retencion = this.parseCurrency(retencionDesktop ? retencionDesktop.value : (retencionMobile ? retencionMobile.value : '0'));

                let valorNotaDesktop = document.getElementById('valor_nota'+index);
                let valorNotaMobile = document.getElementById('valor_nota_mobile_'+index);
                let valor_nota = this.parseCurrency(valorNotaDesktop ? valorNotaDesktop.value : (valorNotaMobile ? valorNotaMobile.value : '0'));

                let descuentoDesktop = document.getElementById('descuento'+index);
                let descuentoMobile = document.getElementById('descuento_mobile_'+index);
                let descuento = this.parseCurrency(descuentoDesktop ? descuentoDesktop.value : (descuentoMobile ? descuentoMobile.value : '0'));

                this.abono.documentos[index].retencion = retencion;
                this.abono.documentos[index].valor_nota = valor_nota;
                this.abono.documentos[index].descuento = descuento;

                this.abono.documentos[index].abono = parseInt(this.abono.documentos[index].saldo) - parseInt(retencion) - parseInt(valor_nota) - parseInt(descuento);

                // Actualizar ambos campos de efectivo con el valor calculado
                let abonoDesktop = document.getElementById('abono'+index);
                let abonoMobile = document.getElementById('abono_mobile_'+index);
                
                if (abonoDesktop) {
                    abonoDesktop.value = this.formatCurrency(this.abono.documentos[index].abono);
                }
                if (abonoMobile) {
                    abonoMobile.value = this.formatCurrency(this.abono.documentos[index].abono);
                }

                this.abono.total_abono = 0;

                for (let i = 0; i < this.abono.documentos.length; i++) {
                    this.abono.total_abono += parseInt(this.abono.documentos[i].abono);
                }
            },
            calcularTotalAbono(index){
                // Obtener valor de abono (desktop o móvil)
                let abonoDesktop = document.getElementById('abono'+index);
                let abonoMobile = document.getElementById('abono_mobile_'+index);
                let abono = this.parseCurrency(abonoDesktop ? abonoDesktop.value : (abonoMobile ? abonoMobile.value : '0'));
                
                this.abono.documentos[index].abono = abono;

                // Sincronizar ambos campos si existen
                if (abonoDesktop && abonoMobile) {
                    const formattedValue = this.formatCurrency(abono);
                    abonoDesktop.value = formattedValue;
                    abonoMobile.value = formattedValue;
                }

                this.abono.total_abono = 0;

                for (let i = 0; i < this.abono.documentos.length; i++) {
                    this.abono.total_abono += parseInt(this.abono.documentos[i].abono);            
                }
            },
            eliminarDocumento(index) {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "¿Desea eliminar este documento del abono?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Restar el valor del documento del total antes de eliminarlo
                        this.abono.total_abono -= parseInt(this.abono.documentos[index].abono);
                        
                        // Eliminar el documento del array
                        this.abono.documentos.splice(index, 1);
                        
                        // Si no quedan documentos, limpiar la información del cliente
                        if (this.abono.documentos.length === 0) {
                            this.abono.razon_social = '';
                            this.abono.nit = '';
                            this.abono.direccion = '';
                            this.abono.total_abono = 0;
                        }

                        Swal.fire(
                            'Eliminado',
                            'El documento ha sido eliminado del abono.',
                            'success'
                        );
                    }
                });
            },
            formatCurrency(value) {
                if (!value || value === 0) return '0';
                return parseInt(value).toLocaleString('es-CO');
            },
            parseCurrency(value) {
                if (!value) return 0;
                return parseInt(value.toString().replace(/[,\.]/g, '')) || 0;
            },
            updateField(fieldName, index, event) {
                const rawValue = this.parseCurrency(event.target.value);
                this.abono.documentos[index][fieldName] = rawValue;
                // Formatear el valor en el campo
                event.target.value = this.formatCurrency(rawValue);
            },  
            facturasCVL(){
                axios.get(`/facturas-indirectos-consaldo/${this.factura.cliente_id}`)
                    .then(res => {
                        this.loading = false;
                        // console.log(res.data)
                        if(res.data.length > 0){
                            this.llenarFacturas(res.data, 1);
                            this.noResultsFound = false;
                        } else {
                            this.noResultsFound = true;
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        console.log(err);
                        Swal.fire({
                            title: 'Error',
                            text: 'Error al buscar las facturas. Intente nuevamente.',
                            icon: 'error'
                        });
                    })
            },
            facturasVentas(){
                axios.get(`/facturas-directos-consaldo/${this.factura.cliente_id}`)
                    .then(res => {
                        this.loading = false;
                        console.log(res.data)
                        if(res.data.length > 0){
                            this.llenarFacturas(res.data, 2);
                            this.noResultsFound = false;
                        } else {
                            this.noResultsFound = true;
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        console.log(err);
                        Swal.fire({
                            title: 'Error',
                            text: 'Error al buscar las facturas. Intente nuevamente.',
                            icon: 'error'
                        });
                    })
            },
            getClientes(){
                axios.get('/clientes')
                    .then(res => {
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            // Detectar si es pantalla móvil para mostrar formato más compacto
                            const isMobile = window.innerWidth < 992;
                            let clientText;
                            
                            if (isMobile) {
                                // En móviles: mostrar solo las primeras palabras + municipio abreviado
                                const razonSocial = res.data[i].razon_social;
                                const municipio = res.data[i].municipios.mcpio;
                                const palabras = razonSocial.split(' ');
                                const razonCorta = palabras.length > 3 ? 
                                    palabras.slice(0, 3).join(' ') + '...' : 
                                    razonSocial;
                                const municipioCorto = municipio.length > 10 ? 
                                    municipio.substring(0, 10) + '...' : 
                                    municipio;
                                clientText = `${razonCorta} - ${municipioCorto}`;
                            } else {
                                // En desktop: mostrar texto completo
                                clientText = res.data[i].razon_social + ' - ' + res.data[i].municipios.mcpio;
                            }
                            
                            this.clientes.push({
                                value: res.data[i].id,
                                text: clientText,
                                fullText: res.data[i].razon_social + ' - ' + res.data[i].municipios.mcpio // Guardamos el texto completo para tooltip
                            });
                        }
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleResize() {
                // Debounce para evitar múltiples ejecuciones
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    // Verificar si cambió entre móvil y desktop
                    const currentIsMobile = window.innerWidth < 992;
                    if (this.lastIsMobile !== currentIsMobile) {
                        this.lastIsMobile = currentIsMobile;
                        // Recargar clientes con el formato apropiado
                        this.clientes = [];
                        this.getClientes();
                    }
                }, 300);
            },
            getClienteTooltip(clienteId) {
                // Obtener el texto completo del cliente para mostrar en tooltip
                if (!clienteId) return '';
                const cliente = this.clientes.find(c => c.value === clienteId);
                return cliente ? cliente.fullText || cliente.text : '';
            },
            llenarFacturas(items, tipo_factura){
                
                if(Number.isInteger(items[0].valor_nota)){

                    this.nota.asociada = true;
                    this.nota.numero_nota = items[0].numero_nota;
                    this.nota.valor_nota = items[0].valor_nota;
                    this.nota.gastado = items[0].gastado;
                    this.nota.disponible = items[0].valor_nota - items[0].gastado;

                }

                for (let i = 0; i < items.length; i++) {
                    this.facturas.push({
                        aplicaretencion: items[i].aplicaretencion,
                        descuento: items[i].descuento,
                        estado: items[i].estado,
                        estado_id: items[i].estado_id,
                        fecha_factura: items[i].fecha_factura,
                        id: items[i].id,
                        numero_factura: items[i].numero_factura,
                        electronica: (tipo_factura === 1) ? items[i].electronica : 0,
                        logo: (tipo_factura === 2) ? items[i].logo : '',
                        pagado: items[i].pagado,
                        razon_social: items[i].razon_social,
                        nit: items[i].nit,
                        direccion: items[i].direccion,
                        total_factura: items[i].total_factura,
                        tipo_factura: tipo_factura,
                        total_abono_nota: items[i].total_abono_nota
                    });
                }
            },
            mostrarModalFacturas(){
                this.nota = {
                    valor_nota: 0, asociada: false
                }
                this.abono = {
                    documentos: [], razon_social: '', num_recibo: null, total_abono: 0, fecha: null, nit: null, direccion: null
                }
                this.$refs['facturasClientes'].show();
                
                // Aplicar z-index después de mostrar el modal
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.aplicarZIndexModal();
                    }, 300);
                });
            },
            aplicarZIndexModal() {
                // Buscar el modal específico
                const modal = document.querySelector('.modal-facturas-pendientes');
                if (!modal) {
                    return;
                }
                
                // Detectar si estamos en pantalla móvil (<992px)
                const isMobile = window.innerWidth < 992;
                
                // 1. SOLUCIONAR Z-INDEX DE DROPDOWNS VS TABLA
                // Aplicar z-index alto a toda la sección de search para que esté sobre la tabla
                const searchSection = modal.querySelector('.modal-search-section, .search-controls');
                if (searchSection) {
                    searchSection.style.position = 'relative';
                    searchSection.style.zIndex = '1060';
                }
                
                // BUSCAR ELEMENTOS EN EL DOM
                const allInputElements = modal.querySelectorAll('input, select, textarea, .form-control, .professional-select');
                const modelSelectElements = modal.querySelectorAll('model-select');
                const bSelectElements = modal.querySelectorAll('b-select');
                const professionalSelects = modal.querySelectorAll('.professional-select');
                const formGroups = modal.querySelectorAll('.form-group');
                
                // Función helper para aplicar z-index
                const applyZIndex = (element, zIndex) => {
                    if (element) {
                        element.style.position = 'relative';
                        element.style.zIndex = zIndex.toString();
                        return true;
                    }
                    return false;
                };
                
                if (isMobile) {
                    // MODO MÓVIL: Cliente tiene prioridad sobre TiposFactura
                    
                    // 1. Aplicar z-index a form groups (contenedores)
                    if (formGroups.length >= 2) {
                        applyZIndex(formGroups[0], 1090);
                        applyZIndex(formGroups[1], 1050);
                    }
                    
                    // 2. Aplicar z-index a elementos específicos
                    modelSelectElements.forEach((element) => {
                        applyZIndex(element, 1090);
                    });
                    
                    bSelectElements.forEach((element) => {
                        applyZIndex(element, 1050);
                    });
                    
                    // 3. Aplicar z-index a todos los professional-select
                    professionalSelects.forEach((element, index) => {
                        const isClienteSelect = element.closest('.form-group') === formGroups[0];
                        const zIndex = isClienteSelect ? 1090 : 1050;
                        applyZIndex(element, zIndex);
                    });
                    
                } else {
                    // MODO DESKTOP: Todos los selects con z-index alto
                    // 1. Aplicar z-index a form groups (contenedores)
                    formGroups.forEach((group) => {
                        applyZIndex(group, 1070);
                    });
                    
                    // 2. Aplicar z-index a elementos específicos
                    modelSelectElements.forEach((element) => {
                        applyZIndex(element, 1070);
                    });
                    
                    bSelectElements.forEach((element) => {
                        applyZIndex(element, 1070);
                    });
                    
                    // 3. Aplicar z-index a todos los professional-select
                    professionalSelects.forEach((element) => {
                        applyZIndex(element, 1070);
                    });
                    
                    // 4. Buscar y aplicar z-index extra alto a dropdowns
                    const dropdowns = modal.querySelectorAll('.vs__dropdown-menu, .dropdown-menu, .show');
                    dropdowns.forEach((dropdown) => {
                        if (dropdown) {
                            dropdown.style.position = 'fixed';
                            dropdown.style.zIndex = '1080';
                        }
                    });
                }
                
                // APLICAR Z-INDEX ADICIONAL A TODOS LOS ELEMENTOS DE FORMULARIO
                allInputElements.forEach((element, index) => {
                    if (element.classList.contains('professional-select') || 
                        element.tagName.toLowerCase() === 'select' ||
                        element.closest('model-select') || 
                        element.closest('b-select')) {
                        const zIndex = isMobile ? (index === 0 ? 1090 : 1050) : 1070;
                        applyZIndex(element, zIndex);
                    }
                });
                
                // 2. SOLUCIONAR ALINEACIÓN DEL BOTÓN
                // Buscar el botón y alinearlo correctamente
                const searchButton = modal.querySelector('.search-btn, .btn-primary');
                if (searchButton) {
                    const buttonContainer = searchButton.closest('.form-group, .button-group');
                    if (buttonContainer) {
                        buttonContainer.style.display = 'flex';
                        buttonContainer.style.flexDirection = 'column';
                        buttonContainer.style.justifyContent = 'flex-end';
                        buttonContainer.style.alignItems = 'stretch';
                    }
                }
                
                // Aplicar z-index específico a la tabla para que esté por debajo
                const facturaTable = modal.querySelector('.facturas-table-section, .modal-table-wrapper, table');
                if (facturaTable) {
                    facturaTable.style.position = 'relative';
                    facturaTable.style.zIndex = '1';
                }
            },
            printPageArea ( areaID ) {
                var printContent = documento.getElementById (areaID).innerHTML;
                var originalContent = documento.body.innerHTML ;
                documento.body.innerHTML = printContent;
                ventana.print ();
                documento.body.innerHTML = originalContent;
            },
            saveAbono(){
                Swal.showLoading();
                if(this.abono.fecha === '' || this.abono.fecha === null || this.abono.fecha === undefined){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atención',
                        text: 'El campo fecha es requerido'
                    });
                    Swal.hideLoading();
                    return;
                }

                if(this.abono.num_recibo_caja === 0 || this.abono.num_recibo_caja === null || this.abono.num_recibo_caja === undefined){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atención',
                        text: 'El numero de recibo no es valido'
                    });
                    Swal.hideLoading();
                    return;
                }

                if(this.abono.documentos.length === 0){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atención',
                        text: 'No hay facturas asociadas para realizar el abono'
                    })
                    Swal.hideLoading();
                    return;
                }

                this.abono.nota = this.nota;

                if(this.abono.tipo_factura === 1){
                    axios.post('/cobros', this.abono)
                        .then(res => {
                            // console.log(res.data)
                            Swal.hideLoading();
                            if(res.data.status === 'success'){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Abono guardado con exito',
                                    // <a :href="'/recibo-caja/'+item.id" target="_blank">{{item.num_recibo_caja}}</a>
                                    html:
                                        `<a href="/recibo-caja/${res.data.num_recibo}" target="_blank">Descargar recibo</a>`,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    confirmButtonText: 'Aceptar'
                                }).then((result) => {
                                    if(result.value){
                                        location.reload();
                                    }
                                })
                            }else{
                                this.errores = res.data;                            
                            }
                        })
                }else{
                    // console.log('aqui llegue')
                    axios.post('/abono-pedidos', this.abono)
                        .then(res => {
                            Swal.hideLoading();
                            if(res.data.status === 'success'){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Abono guardado con exito',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    confirmButtonText: 'Aceptar'
                                }).then((result) => {
                                    if(result.value){
                                        location.reload();
                                    }
                                })
                            }else{
                                this.errores = res.data;                            
                            }
                        })
                        .catch(err => console.log(err))
                }
            },
            selectFactura(index){
                
                this.abono.razon_social = this.facturas[index].razon_social;
                this.abono. nit = this.facturas[index].nit;
                this.abono.direccion = this.facturas[index].direccion;
                
                this.abono.tipo_factura = this.facturas[index].tipo_factura;

                let saldo = this.facturas[index].total_factura - this.facturas[index].pagado - this.facturas[index].total_abono_nota;
                let retencion = (this.facturas[index].aplicaretencion === 1 && this.facturas[index].total_factura > 1344573) ? Math.round(this.facturas[index].total_factura * 0.025) : 0;
                let descuento = (this.facturas[index].tipo_factura === 2) ? Math.round(this.facturas[index].total_factura * 0.05) : 0;
                // let valor_nota = (Number.isInteger(this.facturas[index].valor_nota)) ? this.facturas[index].valor_nota - this.facturas[index].gastado_nota : 0;
                let abono = saldo - retencion - descuento;
                
                this.abono.documentos.push({
                    numero_factura: this.facturas[index].numero_factura,
                    electronica: this.facturas[index].electronica,
                    fecha_factura: this.facturas[index].fecha_factura,
                    total_factura: this.facturas[index].total_factura,
                    id: this.facturas[index].id,
                    saldo,
                    retencion,
                    descuento,
                    abono,
                    valor_nota: 0
                });
                this.abono.total_abono += abono;
            }
        },        
        components: {
            ModelSelect
        }
    }
</script>

<style scoped>
/* Loading spinner personalizado */
.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}

.btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Estilos para el estado de loading en la tabla */
.table tbody tr td {
    vertical-align: middle;
}

/* Mensaje de sin resultados */
.alert-info {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 1px solid #2196f3;
    border-radius: 8px;
    color: #1565c0;
}

/* Modal Search Section Styles */
.modal-search-section {
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative !important;
    z-index: 1060 !important;
}

/* Search Controls Container */
.search-controls {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e9ecef;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    position: relative !important;
    z-index: 1060 !important;
}

.search-controls .search-inputs-row {
    display: flex !important;
    flex-direction: row !important;
    gap: 15px !important;
    align-items: end !important;
    width: 100% !important;
    margin-bottom: 15px;
}

.search-controls .form-group {
    display: flex !important;
    flex-direction: column !important;
    margin-bottom: 0 !important;
}

.search-controls .form-group.flex-grow-1 {
    flex: 1 !important;
    min-width: 0 !important;
}

.search-controls .button-group {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    align-items: stretch !important;
    flex-shrink: 0 !important;
    width: 200px !important;
    min-height: 65px !important; /* Altura total incluyendo label invisible */
}

.search-controls .form-label {
    height: 22px !important;
    margin-bottom: 5px !important;
    display: flex !important;
    align-items: center !important;
}

.search-controls .form-label.invisible {
    height: 22px !important;
    margin-bottom: 5px !important;
    visibility: hidden !important;
}

.search-controls .professional-select,
.search-controls .form-control,
.search-controls select,
.search-controls input {
    height: 38px !important;
    min-height: 38px !important;
}

.search-btn {
    height: 38px !important;
    min-height: 38px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 0 !important;
}

.search-controls .form-label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 5px;
    font-size: 0.9em;
    height: 22px;
    display: flex;
    align-items: center;
}

.search-controls .form-label.invisible {
    visibility: hidden;
    height: 22px;
    margin-bottom: 5px;
}

.search-btn {
    background: linear-gradient(135deg, #6c63ff 0%, #17a2b8 100%);
    border: none;
    border-radius: 8px;
    padding: 0 20px;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    max-width: 200px;
    font-size: 0.9em;
    margin-top: 0;
    white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 99, 255, 0.4);
}

.search-btn:disabled {
    opacity: 0.7;
    transform: none;
    box-shadow: 0 2px 8px rgba(108, 99, 255, 0.2);
}

.professional-select {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    background: white;
    transition: all 0.3s ease;
    height: 38px;
    padding: 0 12px;
    font-size: 0.9em;
}

.professional-select:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 0 0.2rem rgba(108, 99, 255, 0.25);
}

/* Asegurar altura uniforme en el modal */
.search-controls .professional-select,
.search-controls .form-control,
.search-controls select,
.search-controls input {
    height: 38px !important;
    min-height: 38px !important;
    box-sizing: border-box;
}

/* ModelSelect (vue-search-select) z-index fixes */
.modal-facturas-pendientes .model-select,
.modal-facturas-pendientes .vs__dropdown-toggle {
    position: relative !important;
    z-index: 1070 !important;
}

.modal-facturas-pendientes .vs__dropdown-menu {
    position: fixed !important;
    z-index: 1080 !important;
}

/* B-Select dropdown fixes */
.modal-facturas-pendientes .custom-select {
    position: relative !important;
    z-index: 1070 !important;
}

/* Tabla debe estar por debajo */
.modal-facturas-pendientes .facturas-table-section,
.modal-facturas-pendientes .modal-table-wrapper,
.modal-facturas-pendientes table {
    position: relative !important;
    z-index: 1 !important;
}

/* MEDIA QUERIES PARA RESOLVER Z-INDEX EN MÓVILES */
/* Pantallas menores a 992px - Resolver superposición select tiposFactura sobre clientes */
@media (max-width: 991.98px) {
    /* En móviles, reorganizar z-index para evitar superposición */
    .modal-facturas-pendientes .search-controls .form-group:first-child .model-select,
    .modal-facturas-pendientes .search-controls .form-group:first-child .vs__dropdown-toggle,
    .modal-facturas-pendientes .search-controls .form-group:first-child .vs__dropdown-menu {
        z-index: 1090 !important; /* Cliente tiene prioridad máxima */
    }
    
    .modal-facturas-pendientes .search-controls .form-group:nth-child(2) .custom-select,
    .modal-facturas-pendientes .search-controls .form-group:nth-child(2) select {
        z-index: 1050 !important; /* tiposFactura con menor prioridad */
    }
    
    /* Asegurar que el dropdown de clientes esté por encima */
    .modal-facturas-pendientes .search-controls .form-group:first-child .vs__dropdown-menu {
        position: fixed !important;
        z-index: 1100 !important;
    }
    
    /* Cambiar dirección de flex a columna en móviles para mejor distribución */
    .search-controls .search-inputs-row {
        flex-direction: column !important;
        gap: 20px !important;
        align-items: stretch !important;
    }
    
    .search-controls .button-group {
        width: 100% !important;
        min-height: auto !important;
        margin-top: 10px !important;
    }
    
    .search-btn {
        width: 100% !important;
        margin-top: 0 !important;
    }
    
    /* MEJORAS ESPECÍFICAS PARA SELECT DE CLIENTES EN MÓVILES */
    .modal-facturas-pendientes .search-controls .form-group:first-child .model-select {
        font-size: 0.85em !important; /* Texto más pequeño pero legible */
    }
    
    /* Opciones del dropdown más legibles en móviles */
    .modal-facturas-pendientes .vs__dropdown-menu {
        font-size: 0.85em !important;
        max-height: 200px !important; /* Limitar altura para mejor UX */
    }
    
    .modal-facturas-pendientes .vs__dropdown-option {
        padding: 12px 16px !important; /* Más espacio para tocar fácilmente */
        line-height: 1.3 !important;
        word-wrap: break-word !important;
        white-space: normal !important; /* Permitir que el texto se envuelva */
    }
    
    /* Campo de búsqueda del select más grande en móviles */
    .modal-facturas-pendientes .vs__search {
        font-size: 0.9em !important;
        padding: 8px 12px !important;
    }
    
    /* Botón de limpiar más accesible */
    .modal-facturas-pendientes .vs__clear {
        padding: 8px !important;
    }
}

.alert-info i {
    color: #2196f3;
}

/* Animación del spinner de carga */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner-border {
    animation: spin 1s linear infinite;
}

/* Estilo mejorado para el estado de carga */
.loading-state {
    padding: 2rem 0;
}

.loading-message {
    font-size: 1.1rem;
    color: #6c757d;
    font-weight: 500;
}

/* Estilos para campos de moneda */
.input-currency {
    text-align: right;
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    font-weight: 500;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    font-size: 0.8rem;
    padding: 3px 6px;
    width: 100%;
    min-width: 80px;
    white-space: nowrap;
    height: 26px;
    line-height: 1.2;
}

.input-currency:focus {
    background-color: #fff;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
}

/* Botón de eliminar */
.btn-danger.btn-sm {
    padding: 0.15rem 0.3rem;
    font-size: 0.7rem;
    border-radius: 4px;
    transition: all 0.15s ease-in-out;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-danger.btn-sm:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(220,53,69,0.3);
}

.btn-danger.btn-sm i {
    font-size: 0.7rem;
}

/* Estilo para la fila de total */
.table-total {
    background-color: #f8f9fa;
    font-weight: bold;
    border-top: 2px solid #dee2e6;
}

.table-total td {
    padding: 6px 8px !important;
    font-size: 0.9rem;
    white-space: nowrap;
    font-weight: 600;
    height: 36px;
    line-height: 1.3;
}

.table-total td:nth-child(8) {
    color: #2c3e50;
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    text-align: right;
    font-weight: 600;
}

/* Mejorar apariencia de la tabla */
.table th {
    background-color: #343a40;
    color: white;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    border: none;
    white-space: nowrap;
    font-size: 0.9rem;
    padding: 6px 8px;
    height: 35px;
    line-height: 1.2;
}

.table td {
    vertical-align: middle;
    border: 1px solid #e3e6f0;
    white-space: nowrap;
    font-size: 0.85rem;
    font-weight: 400;
    padding: 4px 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 120px;
    height: 32px;
    line-height: 1.3;
}

/* Estilos específicos para celdas de valores monetarios */
.table td:nth-child(3), /* Valor */
.table td:nth-child(4), /* Saldo */
.table td:nth-child(8) /* Efectivo */ {
    font-weight: 500;
    color: #2c3e50;
    text-align: right;
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    font-size: 0.87rem;
}

/* Estilos adicionales para tabla compacta */
.table-sm.table-responsive {
    font-size: 0.8rem;
}

.table-sm th,
.table-sm td {
    padding: 4px 2px;
}

/* Ajustar celdas específicas para mejor presentación */
.table td:nth-child(1) { /* Documento */
    font-weight: 500;
    color: #495057;
    min-width: 60px;
    font-size: 0.85rem;
}

.table td:nth-child(2) { /* Fecha */
    color: #6c757d;
    font-size: 0.82rem;
    min-width: 70px;
    font-weight: 400;
}

.table td:nth-child(9) { /* Acciones */
    width: 40px !important;
    min-width: 40px;
    max-width: 40px;
    text-align: center;
    padding: 2px;
}

/* Para las celdas de input */
.table td:nth-child(5), /* Retención */
.table td:nth-child(6), /* NC */
.table td:nth-child(7), /* Descuento */
.table td:nth-child(8) { /* Efectivo */
    padding: 3px !important;
    width: auto;
    min-width: 80px;
    max-width: 100px;
    vertical-align: middle;
}

/* Responsividad para campos pequeños en móvil */
@media (max-width: 768px) {
    .input-currency {
        font-size: 0.75rem;
        padding: 2px 4px;
        min-width: 60px;
        height: 24px;
    }
    
    .btn-danger.btn-sm {
        padding: 0.1rem 0.2rem;
        font-size: 0.6rem;
        width: 24px;
        height: 24px;
    }
    
    .table td {
        font-size: 0.78rem;
        padding: 3px 2px;
        height: 28px;
    }
    
    .table th {
        font-size: 0.8rem;
        padding: 4px 3px;
        height: 32px;
    }
}

/* Professional Styles for Abonos Component */
/* Abonos Container Styles */
.abonos-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    padding: 20px;
}

/* Professional Header */
.professional-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 25px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.professional-header h2 {
    color: white;
    margin: 0;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Modal Professional Styling */
.modal-header-professional {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-bottom: none;
    border-radius: 15px 15px 0 0 !important;
    padding: 20px 25px;
}

.modal-header-professional h4 {
    margin: 0;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
}

.modal-content-professional {
    border: none;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.modal-body-professional {
    padding: 25px;
    background: #f8f9fc;
}

/* Search Section */
.search-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: end;
}

.search-field {
    flex: 1;
    min-width: 200px;
}

.search-button {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border: none;
    border-radius: 10px;
    padding: 12px 25px;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.search-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

/* Results Section */
.results-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Professional Table */
.professional-table-wrapper {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    margin: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.professional-table {
    margin: 0;
    width: 100%;
    background: transparent;
}

.documents-table {
    font-size: 0.9rem;
}

.professional-table thead {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
}

.professional-table thead th {
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75em;
    letter-spacing: 0.5px;
    padding: 12px 8px;
    border: none;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    vertical-align: middle;
}

.professional-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.professional-table tbody tr:hover {
    background-color: rgba(102, 126, 234, 0.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.professional-table tbody td {
    padding: 8px 6px;
    vertical-align: middle;
    border: none;
    font-size: 0.85em;
}

/* Document Table Specific Styles */
.documents-table-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Documents Cards for Mobile/Tablet */
.documents-cards-container {
    padding: 10px;
}

.no-documents-message {
    text-align: center;
    padding: 40px 20px;
    background: rgba(248, 249, 250, 0.9);
    border-radius: 12px;
    border: 2px dashed #dee2e6;
    margin-bottom: 20px;
}

.no-docs-container {
    color: #6c757d;
}

.no-docs-container .custom-icon {
    font-size: 3em;
    margin-bottom: 10px;
    display: block;
}

.documents-mobile-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.document-mobile-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.card-header-mobile {
    background: linear-gradient(135deg, #6c63ff 0%, #17a2b8 100%);
    color: white;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 42px;
}

.document-info-mobile {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.document-number-mobile {
    font-weight: 600;
    font-size: 0.85em;
    line-height: 1.1;
}

.document-date-mobile {
    font-size: 0.7em;
    opacity: 0.9;
    line-height: 1.1;
}

.delete-btn-mobile {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 6px;
    padding: 6px 8px;
    color: white;
    font-size: 0.9em;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-btn-mobile:hover {
    background: rgba(231, 76, 60, 0.8);
    transform: scale(1.1);
}

.card-body-mobile {
    padding: 16px 18px;
}

.amounts-row-mobile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
}

.amount-item-mobile {
    background: rgba(248, 249, 250, 0.8);
    padding: 10px;
    border-radius: 8px;
    text-align: center;
}

.label-mobile {
    display: block;
    font-size: 0.85em;
    color: #6c757d;
    margin-bottom: 4px;
}

.value-mobile {
    display: block;
    font-weight: 600;
    color: #2c3e50;
    font-size: 1em;
}

.inputs-section-mobile {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.input-row-mobile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.input-group-mobile {
    display: flex;
    flex-direction: column;
}

.input-label-mobile {
    font-size: 0.8em;
    color: #495057;
    margin-bottom: 4px;
    font-weight: 500;
}

.input-mobile {
    padding: 8px 10px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 0.9em;
    background: white;
    transition: all 0.3s ease;
}

.input-mobile:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 0 0.2rem rgba(108, 99, 255, 0.25);
    outline: none;
}

.efectivo-group .input-mobile {
    background: rgba(0, 184, 148, 0.05);
    border-color: #00b894;
    font-weight: 600;
}

.total-efectivo-card-mobile {
    margin-top: 20px;
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 6px 20px rgba(0, 184, 148, 0.3);
}

.total-efectivo-mobile {
    display: flex;
    align-items: center;
    gap: 15px;
}

.total-icon-mobile {
    font-size: 2.5em;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.total-content-mobile {
    display: flex;
    flex-direction: column;
    color: white;
}

.total-label-mobile {
    font-size: 0.9em;
    opacity: 0.9;
    margin-bottom: 2px;
}

.total-value-mobile {
    font-size: 1.6em;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Table Cell Specific Styles */
.document-cell {
    min-width: 90px;
    font-weight: 600;
    color: #495057;
}

.date-cell {
    min-width: 85px;
    color: #6c757d;
    font-size: 0.8em;
}

.amount-cell {
    min-width: 95px;
    font-weight: 500;
    color: #2c3e50;
    font-family: 'Segoe UI', monospace;
}

.input-cell {
    min-width: 90px;
    padding: 4px !important;
}

.efectivo-cell {
    background-color: rgba(0, 184, 148, 0.05);
}

/* Professional Input Styles */
.professional-input {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 0.8em;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
    text-align: right;
    font-family: 'Segoe UI', monospace;
    font-weight: 500;
    width: 100%;
    min-width: 75px;
}

.professional-input:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 0.15rem rgba(102, 126, 234, 0.25);
    background: white;
    transform: translateY(-1px);
}

.efectivo-input {
    background: rgba(0, 184, 148, 0.1);
    border-color: #00b894;
    font-weight: 600;
    color: #00b894;
}

.efectivo-input:focus {
    border-color: #00b894;
    box-shadow: 0 0 0 0.15rem rgba(0, 184, 148, 0.25);
}

/* Action Button Styles */
.btn-delete {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    border: none;
    border-radius: 6px;
    padding: 4px 8px;
    color: white;
    font-size: 0.7em;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
}

.btn-delete:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
}

/* Data Row Styles */
.data-row {
    background: rgba(255, 255, 255, 0.7);
}

.data-row:nth-child(even) {
    background: rgba(248, 249, 250, 0.7);
}

/* Document Number and Date Styling */
.document-number {
    font-weight: 600;
    color: #495057;
    background: rgba(102, 126, 234, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.85em;
}

.date-value {
    color: #6c757d;
    font-size: 0.8em;
    font-weight: 500;
}

.amount-value, .amount-balance {
    color: #2c3e50;
    font-weight: 600;
    font-family: 'Segoe UI', monospace;
}

/* Total Row */
.total-row {
    background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
    font-weight: bold;
}

.total-row td {
    border: none !important;
    color: #2d3436;
}

.total-label {
    font-size: 1.1em;
    display: flex;
    align-items: center;
    gap: 8px;
}

.total-amount {
    font-size: 1.2em;
    color: #00b894 !important;
}

/* Observations Section */
.observations-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Form Controls */
.form-label {
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.form-control {
    border: 2px solid #e9ecef;
    border-radius: 10px;
    padding: 12px 15px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
}

.form-control:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    transform: translateY(-1px);
}

.professional-textarea {
    resize: vertical;
    min-height: 80px;
}

/* Error Section */
.error-section {
    margin-bottom: 20px;
}

.professional-alert {
    border: none;
    border-radius: 10px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);
}

.alert-content {
    flex: 1;
}

/* Actions Section */
.actions-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
}

.save-btn {
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    border: none;
    border-radius: 10px;
    padding: 15px 30px;
    font-weight: 600;
    font-size: 1.1em;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
}

.save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 184, 148, 0.4);
    background: linear-gradient(135deg, #00a085 0%, #00b8b0 100%);
}

/* Custom Icons */
.custom-icon {
    font-size: 1.1em;
    margin-right: 6px;
    display: inline-block;
    vertical-align: middle;
}

/* Improved spacing and layout */
.documents-table-section .table-responsive {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
}

/* Better visual separation between sections */
.client-info-section + .form-controls-section {
    border-top: 3px solid rgba(102, 126, 234, 0.1);
    position: relative;
}

.client-info-section + .form-controls-section::before {
    content: '';
    position: absolute;
    top: -1.5px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #17a2b8, #138496);
    border-radius: 2px;
}

/* Professional gradient text for amounts */
.amount-value, .amount-balance {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
}

/* Enhanced focus states */
.professional-input:focus {
    outline: none;
    border-width: 2px;
    transform: translateY(-1px);
}

/* Modal Table Logo Styles */
.lab-logo-small {
    max-width: 40px;
    max-height: 30px;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.lab-logo-small:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Lab Cell Styles */
.lab-cell {
    padding: 8px !important;
    vertical-align: middle;
    width: 60px;
    min-width: 60px;
    max-width: 60px;
}

/* Modal Table Cell Improvements */
.checkbox-cell {
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    padding: 8px !important;
    text-align: center;
}

.invoice-cell {
    width: 90px;
    min-width: 90px;
    font-weight: 600;
}

.invoice-number-badge {
    background: rgba(102, 126, 234, 0.1);
    color: #495057;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85em;
    font-weight: 600;
}

/* Professional Checkbox Styles */
.professional-checkbox {
    transform: scale(1.2);
}

.professional-checkbox input[type="checkbox"] {
    border-radius: 4px;
    border: 2px solid #dee2e6;
    transition: all 0.3s ease;
}

.professional-checkbox input[type="checkbox"]:checked {
    background-color: #17a2b8;
    border-color: #17a2b8;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.professional-checkbox input[type="checkbox"]:focus {
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    border-color: #17a2b8;
}

/* Modal Table Styles */
.modal-table-wrapper {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-table {
    margin: 0;
    width: 100%;
    background: transparent;
}

.modal-table thead {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
}

.modal-table thead th {
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 0.5px;
    padding: 12px 8px;
    border: none;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    vertical-align: middle;
}

.modal-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-table tbody tr:hover {
    background-color: rgba(102, 126, 234, 0.08);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.modal-table tbody td {
    padding: 10px 8px;
    vertical-align: middle;
    border: none;
    font-size: 0.9em;
    min-width: 80px;
    white-space: nowrap;
}

/* Celdas específicas para mejor visualización */
.modal-table .checkbox-cell {
    width: 50px;
    text-align: center;
    padding: 8px 4px;
}

.modal-table .lab-cell {
    width: 60px;
    text-align: center;
    padding: 8px 4px;
}

.modal-table .invoice-cell {
    width: 100px;
    text-align: center;
    padding: 8px 6px;
}

.modal-table .date-cell {
    width: 100px;
    text-align: center;
    padding: 8px 6px;
    font-size: 0.85em;
}

.modal-table .amount-cell {
    width: 120px;
    text-align: right;
    font-family: monospace;
    font-weight: 600;
    padding: 8px 10px;
}

/* Mejoras específicas para elementos de la tabla */
.lab-logo-small {
    max-width: 25px;
    max-height: 20px;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.invoice-number-badge {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.date-value {
    color: #6c757d;
    font-weight: 500;
}

.amount-value, .amount-paid, .amount-nc, .amount-balance {
    color: #2c3e50;
    font-weight: 600;
}

.amount-balance {
    color: #28a745;
    font-weight: 700;
}

.modal-table tfoot {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.modal-table tfoot td {
    color: white;
    font-weight: 600;
    padding: 12px 8px;
    border: none;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.total-row {
    font-size: 1em;
}

.total-label {
    text-align: center;
}

.total-amount {
    text-align: right;
    font-size: 1.1em;
}

/* Mobile Cards Styles */
.mobile-cards-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    max-height: 65vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    box-sizing: border-box;
}

/* Hide table on mobile, show cards */
@media (max-width: 991px) {
    .table-responsive-modal {
        display: none !important;
    }
    
    .mobile-cards-container {
        display: block !important;
    }
    
    .modal-table tfoot {
        display: none;
    }
}

.mobile-loading-card,
.mobile-no-results-card {
    background: rgba(248, 249, 250, 0.9);
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    margin: 20px 0;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

.facturas-cards-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 0;
}

.factura-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;
}

.factura-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 42px;
}

.card-checkbox {
    flex-shrink: 0;
}

.card-checkbox .professional-checkbox input[type="checkbox"] {
    transform: scale(1.3);
    accent-color: white;
}

.card-title {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.invoice-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.invoice-number {
    font-size: 0.85em;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 1.1;
}

.invoice-date {
    font-size: 0.75em;
    opacity: 0.9;
    line-height: 1.1;
}

.lab-info {
    flex-shrink: 0;
}

.lab-logo-card {
    width: 35px;
    height: 25px;
    object-fit: contain;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px;
}

.card-body {
    padding: 15px;
    background: white;
}

.amount-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.amount-row:last-child {
    margin-bottom: 0;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.amount-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    background: rgba(248, 249, 250, 0.5);
    margin: 0 3px;
}

.amount-item.highlight {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
}

.amount-item.highlight .amount-label {
    color: rgba(255, 255, 255, 0.9);
}

.amount-label {
    font-size: 0.75em;
    font-weight: 600;
    color: #6c757d;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.amount-value-card,
.amount-paid-card,
.amount-nc-card,
.amount-balance-card {
    font-size: 0.9em;
    font-weight: 700;
    color: #495057;
}

.amount-balance-card {
    color: white;
}



/* Loading and No Results States */
.loading-row, .no-results-row {
    background: rgba(248, 249, 250, 0.8);
}

.loading-container, .no-results-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 20px;
}

.spinner-professional {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(102, 126, 234, 0.3);
    border-top: 3px solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    color: #6c757d;
    font-weight: 500;
    font-size: 0.95em;
}

.no-results-icon {
    font-size: 2em;
    opacity: 0.7;
}

.no-results-text {
    color: #6c757d;
    font-size: 0.9em;
    line-height: 1.4;
}

/* Search Button Styles */
.search-button-group {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin-top: 10px;
    padding-top: 8px;
}

.search-btn {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border: none;
    border-radius: 10px;
    padding: 12px 25px;
    color: white;
    font-weight: 600;
    font-size: 0.95em;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    min-width: 160px;
    justify-content: center;
    margin-top: 5px;
}

.search-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.search-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.search-btn .spinner-border-sm {
    width: 18px;
    height: 18px;
    border-width: 2px;
}

/* Modal Search Section Layout */
.modal-body-professional .form-row {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.modal-body-professional .form-group {
    flex: 1;
    min-width: 200px;
    margin-bottom: 15px;
}

/* Override for search controls - Higher specificity */
.modal-search-section .search-controls .form-group {
    flex: none !important;
    display: flex !important;
    flex-direction: column !important;
    min-width: 200px !important;
    margin-bottom: 0 !important;
}

.modal-search-section .search-controls .form-group.flex-grow-1 {
    flex: 1 !important;
    min-width: 250px !important;
}

.modal-search-section .search-controls .button-group {
    flex: none !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    min-width: 200px !important;
    margin-left: 15px !important;
    flex-shrink: 0 !important;
}

.modal-body-professional .search-button-group {
    flex: 0 0 auto;
    min-width: auto;
    margin-bottom: 15px;
    margin-top: 0;
    padding-top: 0;
}

/* Form Labels */
.form-label {
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
}

/* Professional Select */
.professional-select {
    width: 100%;
}

.professional-select .form-control {
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 10px 12px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
}

.professional-select .form-control:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    background: white;
}

/* Modal Responsive Improvements */
.modal-xl {
    max-width: 1200px !important;
}

/* Modal específico para facturas pendientes */
.modal-facturas-pendientes .modal-dialog {
    max-width: 1400px !important;
    width: 95% !important;
    margin: 20px auto !important;
}

.modal-facturas-pendientes .modal-content {
    max-height: 90vh !important;
    overflow: hidden !important;
}

.modal-facturas-pendientes .modal-body {
    max-height: calc(90vh - 120px) !important;
    overflow-y: auto !important;
    padding: 20px !important;
}

@media (min-width: 1200px) {
    .modal-xl {
        max-width: 1400px !important;
    }
    
    .table-responsive-modal {
        max-height: 75vh;
    }
    
    .modal-facturas-pendientes .modal-dialog {
        max-width: 1600px !important;
        width: 98% !important;
    }
}

/* Table Responsive Container */
.table-responsive-modal {
    overflow-x: auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 70vh;
    border-radius: 12px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    position: relative;
}

.modal-table {
    min-width: 600px; /* Asegura ancho mínimo para la tabla */
    width: 100%;
    table-layout: auto;
}

/* Total Efectivo Responsive */
.total-efectivo-section {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.total-efectivo-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.total-efectivo-icon {
    font-size: 2em;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.total-efectivo-content {
    text-align: center;
}

.total-efectivo-label {
    font-size: 1.1em;
    font-weight: 600;
    color: #495057;
    margin-bottom: 5px;
}

.total-efectivo-value {
    font-size: 2em;
    font-weight: 700;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 992px) {
    .modal-xl {
        max-width: 98% !important;
        margin: 0.5rem;
    }
    
    .modal-body-professional {
        padding: 10px;
        max-height: 85vh;
        overflow-y: auto;
    }
    
    .table-responsive-modal {
        max-height: 50vh;
    }
    
    .modal-table {
        min-width: 500px;
    }
    
    .modal-table thead th {
        font-size: 0.75em;
        padding: 8px 4px;
    }
    
    .modal-table tbody td {
        font-size: 0.8em;
        padding: 8px 4px;
    }
    
    .total-efectivo-section {
        padding: 15px;
        margin: 15px 0;
    }
    
    .total-efectivo-value {
        font-size: 1.6em;
    }
}

/* Estilos para Tablets (768px - 1199px) */
@media (min-width: 768px) and (max-width: 1199px) {
    .modal-xl {
        max-width: 98% !important;
    }
    
    .modal-body-professional {
        padding: 12px;
    }
    
    .mobile-cards-container {
        padding: 10px;
        gap: 12px;
    }
    
    .mobile-invoice-card {
        padding: 16px;
        margin-bottom: 12px;
    }
    
    .card-header-mobile {
        font-size: 0.95em;
        padding: 8px 12px;
        min-height: 42px;
    }
    
    .card-details-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 12px;
    }
    
    .card-detail-item {
        padding: 8px;
    }
    
    .card-actions {
        padding: 12px 16px;
        justify-content: space-between;
    }
}

@media (max-width: 767px) {
    .modal-xl {
        max-width: 100% !important;
        margin: 0;
        height: 100vh;
    }
    
    .modal-dialog {
        height: 100vh;
        margin: 0;
        max-width: none;
    }
    
    .modal-content {
        height: 100vh;
        border-radius: 0;
    }
    
    .modal-body-professional {
        padding: 8px;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
    }
    
    .modal-body-professional .form-row {
        flex-direction: column;
        gap: 10px;
    }
    
    .modal-body-professional .form-group,
    .search-button-group {
        min-width: 100%;
        width: 100%;
    }
    
    .search-btn {
        width: 100%;
        min-width: 100%;
        padding: 12px;
        font-size: 1em;
    }
    
    .search-row {
        flex-direction: column;
    }
    
    .search-field {
        min-width: 100%;
    }
    
    .professional-header h2 {
        font-size: 1.5em;
    }
    
    .mobile-cards-container {
        max-height: calc(100vh - 300px);
        overflow-y: auto;
        padding: 8px;
    }
    
    .mobile-invoice-card {
        margin-bottom: 10px;
        font-size: 0.9em;
    }
    
    .table-responsive {
        border-radius: 10px;
    }
    
    .table-responsive-modal {
        max-height: 40vh;
        margin: 10px 0;
    }
    
    .modal-table {
        min-width: 450px;
    }
    
    .modal-table thead th {
        font-size: 0.7em;
        padding: 6px 2px;
    }
    
    .modal-table tbody td {
        font-size: 0.75em;
        padding: 6px 2px;
    }
    
    .checkbox-cell {
        width: 30px;
        min-width: 30px;
        max-width: 30px;
    }
    
    .lab-cell {
        width: 40px;
        min-width: 40px;
        max-width: 40px;
    }
    
    .invoice-cell {
        width: 70px;
        min-width: 70px;
    }
    
    .lab-logo-small {
        max-width: 25px;
        max-height: 20px;
    }
    
    .total-efectivo-section {
        padding: 20px;
        margin: 20px 10px;
        border-radius: 12px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        text-align: center;
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
    }
    
    .total-efectivo-display {
        flex-direction: column;
        gap: 10px;
    }
    
    .total-efectivo-icon {
        font-size: 2.5em;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }
    
    .total-efectivo-value {
        font-size: 1.8em;
        font-weight: 800;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.5px;
    }
    
    .total-efectivo-label {
        font-size: 1.1em;
        font-weight: 600;
        opacity: 0.95;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
}

@media (max-width: 576px) {
    .modal-table {
        min-width: 400px;
    }
    
    .modal-table thead th,
    .modal-table tbody td {
        font-size: 0.65em;
        padding: 4px 1px;
    }
    
    .lab-logo-small {
        max-width: 20px;
        max-height: 15px;
    }
    
    .total-efectivo-value {
        font-size: 1.2em;
    }
    
    .invoice-number-badge {
        font-size: 0.6em;
        padding: 2px 4px;
    }
}

/* Professional Card */
.professional-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    transition: all 0.3s ease;
}

.professional-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Client Info Section */
.client-info-section {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.client-card {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(102, 126, 234, 0.1);
}

.client-header {
    display: flex;
    align-items: flex-start;
    gap: 15px;
}

.client-icon {
    font-size: 2em;
    color: #17a2b8;
    margin-top: 5px;
}

.client-details {
    flex: 1;
}

.client-name {
    color: #2c3e50;
    font-weight: 600;
    font-size: 1.1em;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.client-nit {
    color: #6c757d;
    font-size: 0.9em;
    margin: 0 0 4px 0;
    font-weight: 500;
}

.client-address {
    color: #6c757d;
    font-size: 0.85em;
    margin: 0;
    line-height: 1.4;
}

/* Form Controls Section */
.form-controls-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.form-group {
    flex: 1;
    min-width: 200px;
}

.form-label {
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
}

.professional-input[type="date"],
.professional-input[type="number"] {
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 10px 12px;
    transition: all 0.3s ease;
    font-size: 0.9em;
    font-weight: 500;
}

.professional-input[type="date"]:focus,
.professional-input[type="number"]:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    background: white;
}

/* Nota Section Improvements */
.nota-section {
    margin-bottom: 20px;
}

.nota-details {
    font-size: 0.9em;
    color: #495057;
    margin-left: 10px;
}

/* Action Button Improvements */
.action-btn {
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    cursor: pointer;
}

.delete-btn {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: white;
}

.delete-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
}

.actions-cell {
    padding: 6px !important;
}



@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        gap: 15px;
    }
    
    .form-group {
        min-width: 100%;
    }
    
    .client-header {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
    
    .mobile-cards-container {
        max-height: calc(100vh - 180px);
        padding: 8px;
    }
    
    .professional-input {
        font-size: 0.9em;
        padding: 8px 10px;
    }
    
    /* Modal Search Responsive */
    .search-controls .search-inputs-row {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
        margin-bottom: 15px;
    }
    
    .search-controls .form-group {
        min-width: 100%;
        width: 100%;
        margin-bottom: 0;
    }
    
    .search-controls .button-group {
        width: 100%;
        margin-left: 0;
        margin-top: 15px;
        min-width: 100%;
    }
    
    .search-btn {
        width: 100%;
        height: 44px;
        font-size: 1em;
        min-width: 100%;
    }
    
    /* Mobile Cards */
    .documents-cards-container {
        padding: 8px;
    }
    
    .amounts-row-mobile {
        grid-template-columns: 1fr;
        gap: 8px;
    }
    
    .input-row-mobile {
        grid-template-columns: 1fr;
        gap: 8px;
    }
    
    .total-efectivo-mobile {
        flex-direction: column;
        text-align: center;
        gap: 8px;
    }
    
    .total-value-mobile {
        font-size: 1.4em;
    }
}

/* Tablet specific styles */
@media (min-width: 768px) and (max-width: 1199px) {
    .documents-cards-container {
        padding: 12px;
    }
    
    .amounts-row-mobile {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .input-row-mobile {
        grid-template-columns: repeat(2, 1fr);
    }
    
    /* Remove conflicting tablet rules - using grid system instead */
}

/* Desktop styles - 1200px and up */
@media (min-width: 1200px) {
    .search-controls .search-inputs-row {
        display: grid !important;
        grid-template-columns: 1fr 200px 200px !important;
        gap: 15px !important;
        align-items: end !important;
        width: 100% !important;
    }
    
    .search-controls .form-group {
        display: flex !important;
        flex-direction: column !important;
        margin-bottom: 0 !important;
    }
    
    .search-controls .button-group {
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-end !important;
        align-items: stretch !important;
    }
    
    .search-btn {
        height: 38px !important;
        min-height: 38px !important;
        font-size: 0.9em !important;
        padding: 8px 16px !important;
        width: 100% !important;
        max-width: 200px !important;
    }
}

/* Tablet styles - 768px to 1199px */
@media (min-width: 768px) and (max-width: 1199px) {
    .search-controls .search-inputs-row {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        align-items: stretch !important;
        width: 100% !important;
    }
    
    .search-controls .form-group {
        width: 100% !important;
        margin-bottom: 0 !important;
    }
    
    .search-controls .button-group {
        width: 100% !important;
        margin-top: 8px !important;
        display: flex !important;
        flex-direction: column !important;
    }
    
    .search-btn {
        width: 100% !important;
        height: 38px !important;
        min-height: 38px !important;
        font-size: 0.9em !important;
        padding: 8px 16px !important;
    }
}

/* Mobile styles - under 768px */
@media (max-width: 767px) {
    .search-controls .search-inputs-row {
        display: flex !important;
        flex-direction: column !important;
        gap: 15px !important;
        align-items: stretch !important;
        width: 100% !important;
    }
    
    .search-controls .form-group {
        width: 100% !important;
        margin-bottom: 0 !important;
    }
    
    .search-controls .button-group {
        width: 100% !important;
        margin-top: 5px !important;
        display: flex !important;
        flex-direction: column !important;
    }
    
    .search-btn {
        width: 100% !important;
        height: 42px !important;
        min-height: 42px !important;
        font-size: 1em !important;
        padding: 12px !important;
    }
}

/* Alineación del botón de búsqueda en pantallas grandes */
@media (min-width: 992px) {
    .search-controls .button-group {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        min-height: 66px; /* Para coincidir con la altura del label + input */
    }
    
    .search-controls .button-group .search-btn {
        margin-top: auto;
        align-self: stretch;
        min-height: 38px; /* Altura consistente con los inputs */
    }
    
    .search-controls .search-inputs-row {
        align-items: flex-end; /* Alinear todos los elementos al final */
    }
    
    .search-controls .form-group {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
}

/* Utility Classes */
.full-width {
    width: 100%;
}

.text-center {
    text-align: center;
}
</style>
