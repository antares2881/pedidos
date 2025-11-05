<template>
    <v-app>
        <div class="reports-container">
            <!-- Professional Header -->
            <div class="professional-header">
                <div class="header-content">
                    <div class="header-left">
                        <h1 class="header-title">
                            <i class="fas fa-file-invoice-dollar header-icon"></i>
                            Reportes de Cartera
                        </h1>
                        <p class="header-subtitle">
                            Consulta y administra el estado de cuentas de tus clientes
                        </p>
                    </div>
                </div>
            </div>

            <!-- Professional Filters -->
            <div class="filters-section">
                <div class="filters-container">
                    <div class="filter-group">
                        <label class="filter-label">Seleccionar Cliente</label>
                        <div class="custom-select-wrapper">
                            <basic-select
                                :options="clientes"
                                :selected-option="item"
                                @select="selected"
                            ></basic-select>
                        </div>
                    </div>
                    
                    <div class="filter-group">
                        <label class="filter-label">Buscar en</label>
                        <div class="custom-select-wrapper">
                            <select 
                                v-model="cartera.tipo_cliente"
                                @change="onTipoClienteInput"
                                ref="tipoClienteSelect"
                            >
                                <option v-for="option in tiposfactura" 
                                        :key="option.value" 
                                        :value="option.value"
                                >
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="actions-section">
                    <button class="professional-btn btn-primary" @click="buscarReporte">
                        <i class="fas fa-chart-line"></i>
                        <span>Generar reporte</span>
                    </button>
                    <button 
                        class="professional-btn btn-success" 
                        @click="exportTableToExcel('tabla')" 
                        v-if="facturas.length > 0"
                    >
                        <i class="fas fa-file-excel"></i>
                        <span>Exportar Excel</span>
                    </button>
                </div>
            </div>

            <!-- Professional Loader -->
            <div class="loading-section" v-if="loading">
                <div class="professional-table-container">
                    <div class="loader-container">
                        <div class="spinner-professional"></div>
                        <h3 class="loader-title">Generando reporte de cartera</h3>
                        <p class="loader-subtitle">Obteniendo información financiera del cliente...</p>
                    </div>
                </div>
            </div>

            <!-- Professional Table Section -->
            <div class="table-section" v-if="facturas.length > 0 && !loading">
                <div class="professional-table-container">
                    <div class="table-header">
                        <div class="table-info p-5">
                            <h3 class="table-title">
                                <i class="fas fa-receipt table-icon"></i>
                                Estado de Cuenta
                            </h3>
                            <div class="client-info">
                                <span class="client-name">{{ cliente }}</span>
                                <span class="records-count">{{ facturas.length }} registros</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-responsive professional-table-wrapper">
                        <table class="professional-table" id="tabla">
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        <i class="fas fa-file-invoice"></i>
                                        Factura
                                    </th>
                                    <th class="text-center">
                                        <i class="fas fa-calendar-alt"></i>
                                        Fecha
                                    </th>
                                    <th class="text-right">
                                        <i class="fas fa-dollar-sign"></i>
                                        Valor
                                    </th>
                                    <th class="text-right">
                                        <i class="fas fa-credit-card"></i>
                                        Abono
                                    </th>
                                    <th class="text-right">
                                        <i class="fas fa-percentage"></i>
                                        Retención
                                    </th>
                                    <th class="text-right">
                                        <i class="fas fa-minus-circle"></i>
                                        NC
                                    </th>
                                    <th class="text-right saldo-header">
                                        <i class="fas fa-balance-scale"></i>
                                        Saldo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in facturas" :key="index" class="data-row">
                                    <td class="text-center invoice-cell">
                                        <span class="invoice-number">{{ row.numero_factura }}</span>
                                    </td>
                                    <td class="text-center date-cell">
                                        <span class="date-value">{{ row.fecha_factura }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value">{{ row.total_factura | currency }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value abono-value">{{ row.total_abono | currency }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value retencion-value">{{ row.retencion | currency }}</span>
                                    </td>
                                    <td class="text-right amount-cell">
                                        <span class="amount-value nc-value">{{ row.total_nota | currency }}</span>
                                    </td>
                                    <td class="text-right amount-cell saldo-cell">
                                        <span class="saldo-value">{{ row.saldo | currency }}</span>
                                    </td>
                                </tr>
                                <tr v-if="nota_credito > 0" class="nota-credito-row">
                                    <td colspan="5" class="empty-cell"></td>
                                    <td class="text-right nota-credito-label">
                                        <strong>Nota de Crédito Disponible:</strong>
                                    </td>
                                    <td class="text-right nota-credito-value">
                                        <span class="credit-note-amount">{{ nota_credito | currency }}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="total-row">
                                    <th colspan="6" class="total-label">
                                        <i class="fas fa-calculator"></i>
                                        <strong>Saldo Total {{ cliente.split(' - ')[0] }}:</strong>
                                    </th>
                                    <th class="total-amount">
                                        <span class="final-total">{{ (totalCartera - nota_credito) | currency }}</span>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
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
                cartera: {fecha_inicial: '', fecha_final: '', abono: false, cliente_id: null, tipo_cliente: 1},
                cliente: null,
                clientes: [],
                descuento: 0,
                facturas: [],
                item: {
                    value: '',
                    text: ''
                },
                loading: false,
                nota_credito: 0,
                retencion: 0,
                saldo: 0,
                tipo_cliente: null,
                tiposfactura: [
                    {text: 'Facturas CVL', value: 1},
                    {text: 'Ventas', value: 2},
                ],
                totalCartera: 0
            }
        },
        
        mounted() {
            this.getClientes();
            console.log('Valor inicial tipo_cliente:', this.cartera.tipo_cliente);
        },
        watch: {
            'cartera.tipo_cliente'(newVal) {
                console.log('Cambio en tipo_cliente:', newVal);
            }
        },
        methods: {
            buscarReporte(){
                if(this.cartera.cliente_id === null || this.cartera.cliente_id === undefined || this.cartera.cliente_id === ''){
                    Swal.fire({
                        title: 'Atención',
                        text: 'El campo cliente es requerido',
                        icon: 'warning'
                    })
                    return
                }
                if(this.cartera.tipo_cliente === null || this.cartera.tipo_cliente === undefined || this.cartera.tipo_cliente === ''){
                    Swal.fire({
                        title: 'Atención',
                        text: 'Debe elegir donde buscar la cartera del cliente',
                        icon: 'warning'
                    })
                    return
                }
                
                this.loading = true;
                this.facturas = [];
                this.totalCartera = 0;
                
                axios.post('/reporte-cartera', this.cartera)
                    .then(res => {
                        this.operacionesFacturas(res.data);
                        this.loading = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loading = false;
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo cargar el reporte de cartera',
                            icon: 'error'
                        });
                    })
            },    
            calculoCliente(cartera){
                
                this.saldo = 0;
                this.retencion = 0;                

                if(cartera.aplicaretencion === 1){
                    this.retencion = (cartera.total_factura >= 1344573)
                        ? cartera.total_factura * 0.025
                        :0;
                }

                //Valida si hay abono a la factura.
                if(cartera.total_abono !== null){
                    
                    //Si hay abono, verifica si se agrego un descuento al pago de la factura.
                    
                    this.saldo = cartera.total_factura - this.retencion - cartera.total_abono ;

                }else{
                    this.saldo = cartera.total_factura - this.retencion ;
                }

                if(this.saldo > 10){
                    this.facturas.push({
                        razon_social: cartera.razon_social,
                        numero_factura: (this.cartera.tipo_cliente == 1)
                            ?(cartera.electronica == 0)
                                ?cartera.numero_factura
                                :cartera.electronica
                            :cartera.numero_factura,
                        total_factura: cartera.total_factura,
                        total_abono: cartera.total_abono,
                        total_nota: cartera.total_nota,
                        retencion: this.retencion,
                        saldo: this.saldo,
                        fecha_factura: cartera.fecha_factura
                    })
                    this.totalCartera += this.saldo;
                }

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
            exportTableToExcel(tableID){
                var downloadLink;
                var dataType = 'application/vnd.ms-excel';
                var tableSelect = document.getElementById(tableID);
                var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
                
                // Specify file name
                let filename = this.cliente+'_cartera.xls';
                
                // Create download link element
                downloadLink = document.createElement("a");
                
                document.body.appendChild(downloadLink);
                
                if(navigator.msSaveOrOpenBlob){
                    var blob = new Blob(['ufeff', tableHTML], {
                        type: dataType
                    });
                    navigator.msSaveOrOpenBlob( blob, filename);
                }else{
                    // Create a link to the file
                    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
                
                    // Setting the file name
                    downloadLink.download = filename;
                    
                    //triggering the function
                    downloadLink.click();
                }
            },
            operacionesFacturas(item){
                this.facturas = [];
                this.totalCartera = 0;

                if(item.nota.length > 0){
                    this.nota_credito = item.nota[0].valor - item.nota[0].gastado;                         
                }else{
                    this.nota_credito = 0;          
                }

                this.cliente = item.cartera[0].razon_social + ' - Nit. ' + item.cartera[0].nit

                for (let i = 0; i < item.cartera.length; i++) {

                    this.calculoCliente(item.cartera[i]);

                }

                console.log(item);
            },
            selected(item){
                this.item = item;
                this.cartera.cliente_id = item.value
            },
            getSelectedTipoText() {
                const selected = this.tiposfactura.find(tipo => tipo.value === this.cartera.tipo_cliente);
                return selected ? selected.text : 'Ninguno';
            },
            onTipoClienteInput(event) {
                console.log('Select changed to:', event.target.value);
                console.log('Selected option text:', event.target.options[event.target.selectedIndex].text);
            },
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

/* Table Loader Styles */
.loading-section {
    margin-top: 2rem;
    width: 100%;
}

.loader-container {
    text-align: center;
    padding: 4rem 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
}

.loader-title {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1.5rem 0 0.75rem 0;
}

.loader-subtitle {
    color: #64748b;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    line-height: 1.5;
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
    grid-template-columns: 1fr 1fr;
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

/* Simple universal styling */
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
    /* Reset browser styles */
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

/* Make basic-select match exactly */
.custom-select-wrapper >>> .basic-select {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: stretch;
}

.custom-select-wrapper >>> .basic-select .form-control {
    height: 56px;
    padding: 1rem 1.25rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    background: white;
    color: #374151;
    font-weight: 500;
}



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

.professional-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.professional-btn:hover::before {
    left: 100%;
}

.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
    color: white;
}

.btn-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

.btn-success:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
    color: white;
}

/* Professional Table Section */
.table-section {
    margin-top: 2rem;
    width: 100%;
}

.professional-table-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    box-sizing: border-box;
}

.table-header {
    padding: 2rem 2.5rem 1.5rem;
    border-bottom: 2px solid #e5e7eb;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.table-info {
    width: 100%;
    text-align: center;
}

.table-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.table-icon {
    color: #3b82f6;
}

.client-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
}

.client-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #374151;
    text-align: center;
    line-height: 1.4;
    max-width: 90%;
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



/* Professional Table */
.professional-table-wrapper {
    max-height: none;
    border-radius: 0;
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

.professional-table thead th.saldo-header {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}

.professional-table thead th.saldo-header i {
    color: white;
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
.invoice-cell {
    font-weight: 600;
    color: #1e293b;
}

.invoice-number {
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
}

.abono-value {
    color: #059669;
    background: rgba(5, 150, 105, 0.1);
    border: 1px solid rgba(5, 150, 105, 0.2);
}

.retencion-value {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.2);
}

.nc-value {
    color: #17a2b8;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.2);
}

.saldo-cell {
    background: rgba(59, 130, 246, 0.05);
    border-left: 3px solid #3b82f6;
}

.saldo-value {
    color: #1e293b;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border: 2px solid #3b82f6;
    font-weight: 800;
    font-size: 1.05rem;
}

/* Special Rows */
.nota-credito-row {
    background: rgba(124, 58, 237, 0.05);
    border: 2px solid rgba(124, 58, 237, 0.2);
}

.nota-credito-label {
    color: #17a2b8;
    font-weight: 600;
    padding: 1rem;
}

.nota-credito-value {
    padding: 1rem;
}

.credit-note-amount {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
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

/* Responsive Design */
@media (max-width: 1200px) {
    .reports-container {
        padding: 1.5rem;
    }
    
    .professional-header {
        padding: 2rem;
    }
    
    .table-header {
        padding: 1.75rem 2rem 1.25rem;
    }
}

/* Medium screens - Tablet landscape */
@media (max-width: 992px) and (min-width: 769px) {
    .reports-container {
        padding: 1rem;
    }
    
    .professional-header,
    .filters-section {
        border-radius: 16px;
        padding: 1.75rem;
    }
    
    .professional-table-container {
        border-radius: 16px;
        overflow: hidden;
    }
    
    .table-header {
        padding: 1.5rem 1.25rem;
        text-align: center;
    }
    
    .table-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .client-name {
        font-size: 1.1rem;
        max-width: 100%;
    }
    
    .records-count {
        font-size: 0.85rem;
        padding: 0.4rem 0.9rem;
    }
    
    /* Medium screen table optimization */
    .professional-table-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    .professional-table {
        font-size: 0.85rem;
        min-width: 850px;
        table-layout: fixed;
    }
    
    /* Optimized column widths for medium screens */
    .professional-table th:nth-child(1),
    .professional-table td:nth-child(1) {
        width: 110px;
        min-width: 110px;
    }
    
    .professional-table th:nth-child(2),
    .professional-table td:nth-child(2) {
        width: 110px;
        min-width: 110px;
    }
    
    .professional-table th:nth-child(3),
    .professional-table td:nth-child(3) {
        width: 130px;
        min-width: 130px;
    }
    
    .professional-table th:nth-child(4),
    .professional-table td:nth-child(4) {
        width: 120px;
        min-width: 120px;
    }
    
    .professional-table th:nth-child(5),
    .professional-table td:nth-child(5) {
        width: 120px;
        min-width: 120px;
    }
    
    .professional-table th:nth-child(6),
    .professional-table td:nth-child(6) {
        width: 100px;
        min-width: 100px;
    }
    
    .professional-table th:nth-child(7),
    .professional-table td:nth-child(7) {
        width: 140px;
        min-width: 140px;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 0.75rem 0.5rem;
        font-size: 0.85rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .invoice-number,
    .date-value,
    .amount-value {
        padding: 0.35rem 0.6rem;
        font-size: 0.8rem;
    }
    
    .saldo-value {
        font-size: 0.85rem;
        padding: 0.4rem 0.6rem;
    }
    
    .final-total {
        font-size: 1.1rem;
        padding: 0.6rem 1rem;
    }
    
    /* Medium screen scroll indicator */
    .professional-table-wrapper::after {
        content: "← Desliza horizontalmente para ver más →";
        display: block;
        text-align: center;
        padding: 0.75rem;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
        color: #3b82f6;
        font-size: 0.8rem;
        font-weight: 600;
        border-top: 1px solid rgba(59, 130, 246, 0.2);
    }
}

@media (max-width: 1024px) {
    .filters-container {
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

/* Small tablets - Portrait mode */
@media (max-width: 768px) and (min-width: 577px) {
    .reports-container {
        padding: 0.75rem;
    }
    
    .professional-header {
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 15px;
    }
    
    .filters-section {
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 15px;
    }
    
    .professional-table-container {
        border-radius: 15px;
        margin: 0;
        overflow: hidden;
    }
    
    .table-header {
        padding: 1.5rem 1rem;
        text-align: center;
    }
    
    .table-title {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
    
    .client-name {
        font-size: 1rem;
        max-width: 95%;
    }
    
    .professional-table-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
    
    .professional-table {
        font-size: 0.8rem;
        min-width: 750px;
        table-layout: fixed;
    }
    
    /* Column widths for small tablets */
    .professional-table th:nth-child(1),
    .professional-table td:nth-child(1) {
        width: 100px;
        min-width: 100px;
    }
    
    .professional-table th:nth-child(2),
    .professional-table td:nth-child(2) {
        width: 105px;
        min-width: 105px;
    }
    
    .professional-table th:nth-child(3),
    .professional-table td:nth-child(3) {
        width: 120px;
        min-width: 120px;
    }
    
    .professional-table th:nth-child(4),
    .professional-table td:nth-child(4) {
        width: 110px;
        min-width: 110px;
    }
    
    .professional-table th:nth-child(5),
    .professional-table td:nth-child(5) {
        width: 110px;
        min-width: 110px;
    }
    
    .professional-table th:nth-child(6),
    .professional-table td:nth-child(6) {
        width: 95px;
        min-width: 95px;
    }
    
    .professional-table th:nth-child(7),
    .professional-table td:nth-child(7) {
        width: 130px;
        min-width: 130px;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 0.6rem 0.4rem;
        white-space: nowrap;
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .invoice-number,
    .date-value,
    .amount-value {
        padding: 0.3rem 0.5rem;
        font-size: 0.75rem;
    }
    
    .saldo-value {
        font-size: 0.8rem;
        padding: 0.35rem 0.5rem;
    }
    
    .final-total {
        font-size: 1rem;
        padding: 0.5rem 0.8rem;
    }
    
    /* Small tablet scroll indicator */
    .professional-table-wrapper::after {
        content: "← Desliza horizontalmente para ver más →";
        display: block;
        text-align: center;
        padding: 0.75rem;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
        color: #3b82f6;
        font-size: 0.8rem;
        font-weight: 600;
        border-top: 1px solid rgba(59, 130, 246, 0.2);
    }
}

/* Small mobile screens */
@media (max-width: 576px) {
    .professional-table {
        font-size: 0.7rem;
        min-width: 650px;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 0.5rem 0.3rem;
    }
    
    .invoice-number,
    .date-value,
    .amount-value {
        padding: 0.2rem 0.4rem;
        font-size: 0.7rem;
    }
    
    .client-name {
        font-size: 0.9rem;
        line-height: 1.2;
    }
    
    .professional-table-wrapper::after {
        content: "← Desliza para ver todas las columnas →";
        display: block;
        text-align: center;
        padding: 0.6rem;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
        color: #3b82f6;
        font-size: 0.75rem;
        font-weight: 600;
        border-top: 1px solid rgba(59, 130, 246, 0.2);
    }
}

@media (max-width: 480px) {
    .reports-container {
        padding: 0.5rem;
    }
    
    .professional-header {
        padding: 1rem;
        margin-bottom: 0.75rem;
        border-radius: 12px;
    }
    
    .filters-section {
        padding: 1rem;
        margin-bottom: 0.75rem;
        border-radius: 12px;
    }
    
    .header-title {
        font-size: 1.5rem;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
    
    .header-icon {
        font-size: 1.25rem;
    }
    
    .professional-table-container {
        border-radius: 12px;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .table-header {
        padding: 1rem 0.75rem;
        text-align: center;
    }
    
    .table-title {
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .table-icon {
        font-size: 1rem;
    }
    
    .client-info {
        align-items: center;
        gap: 0.5rem;
    }
    
    .client-name {
        font-size: 0.9rem;
        text-align: center;
        word-break: break-word;
        line-height: 1.3;
        max-width: 100%;
        padding: 0 0.5rem;
    }
    
    .records-count {
        font-size: 0.75rem;
        padding: 0.4rem 0.8rem;
    }
    
    /* Ultra-compact mobile table */
    .professional-table-wrapper {
        border-radius: 0 0 12px 12px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
    
    .professional-table {
        font-size: 0.65rem;
        min-width: 750px;
        table-layout: fixed;
    }
    
    /* Optimized column widths for mobile */
    .professional-table th:nth-child(1),
    .professional-table td:nth-child(1) {
        width: 90px;
        min-width: 90px;
    }
    
    .professional-table th:nth-child(2),
    .professional-table td:nth-child(2) {
        width: 95px;
        min-width: 95px;
    }
    
    .professional-table th:nth-child(3),
    .professional-table td:nth-child(3) {
        width: 115px;
        min-width: 115px;
    }
    
    .professional-table th:nth-child(4),
    .professional-table td:nth-child(4) {
        width: 100px;
        min-width: 100px;
    }
    
    .professional-table th:nth-child(5),
    .professional-table td:nth-child(5) {
        width: 100px;
        min-width: 100px;
    }
    
    .professional-table th:nth-child(6),
    .professional-table td:nth-child(6) {
        width: 90px;
        min-width: 90px;
    }
    
    .professional-table th:nth-child(7),
    .professional-table td:nth-child(7) {
        width: 120px;
        min-width: 120px;
    }
    
    .professional-table thead th,
    .professional-table tbody td,
    .professional-table tfoot th {
        padding: 0.5rem 0.25rem !important;
        font-size: 0.65rem !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    /* Hide icons in mobile headers to save space */
    .professional-table thead th i {
        display: none;
    }
    
    /* Ultra-compact mobile badges */
    .invoice-number {
        padding: 0.2rem 0.4rem;
        font-size: 0.6rem;
        border-radius: 4px;
        font-weight: 600;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
    
    .date-value {
        padding: 0.2rem 0.3rem;
        font-size: 0.6rem;
        border-radius: 4px;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
    
    .amount-value {
        padding: 0.2rem 0.3rem;
        font-size: 0.6rem;
        border-radius: 4px;
        font-weight: 600;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
    
    .saldo-value {
        font-size: 0.65rem;
        padding: 0.25rem 0.4rem;
        font-weight: 700;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
    
    .credit-note-amount {
        font-size: 0.6rem;
        padding: 0.2rem 0.4rem;
    }
    
    .final-total {
        font-size: 0.8rem;
        padding: 0.4rem 0.6rem;
    }
    
    /* Enhanced mobile scroll indicator */
    .professional-table-wrapper::after {
        content: "← Desliza para ver todas las columnas →";
        display: block;
        text-align: center;
        padding: 0.6rem;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
        color: #3b82f6;
        font-size: 0.7rem;
        font-weight: 600;
        border-top: 1px solid rgba(59, 130, 246, 0.2);
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    /* Mobile form adjustments */
    .filters-container {
        gap: 1rem;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .professional-btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        width: 100%;
        justify-content: center;
    }
    
    /* Mobile loader adjustments */
    .loader-container {
        padding: 2rem 1rem !important;
    }
    
    .loader-title {
        font-size: 1.1rem !important;
    }
    
    .loader-subtitle {
        font-size: 0.9rem !important;
    }
}
</style>
