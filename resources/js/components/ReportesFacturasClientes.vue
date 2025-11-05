<template>
<div class="facturas-report-container">
    <!-- Summary Cards -->
    <div class="summary-section">
        <div class="summary-cards">
            <!-- Tarjeta Total Facturado (por defecto) -->
            <div v-if="mostrarTarjetaFacturado" class="summary-card total-facturado">
                <div class="summary-icon">
                    <span class="icon-symbol">📊</span>
                </div>
                <div class="summary-content">
                    <h4 class="summary-title">Total Facturado</h4>
                    <p class="summary-value">{{ formatCurrency(totales.totalFacturado) }}</p>
                </div>
            </div>
            
            <!-- Tarjeta Total Abonos (cuando se selecciona cobros) -->
            <div v-if="mostrarTarjetaAbonos" class="summary-card total-pagado">
                <div class="summary-icon">
                    <span class="icon-symbol">💰</span>
                </div>
                <div class="summary-content">
                    <h4 class="summary-title">Total Abonos</h4>
                    <p class="summary-value">{{ formatCurrency(totales.abonos) }}</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Barra de Acciones -->
    <div class="actions-bar">
        <div class="actions-left">
            <span class="data-info">
                {{ mostrar_cobros ? 'Cobros' : 'Facturas' }} - {{ datosActuales.length }} registros
            </span>
        </div>
        <div class="actions-right">
            <button 
                class="excel-btn" 
                @click="descargarExcel"
                :disabled="!datosActuales || datosActuales.length === 0"
            >
                <span class="excel-icon">📊</span>
                Descargar Excel
            </button>
        </div>
    </div>
    
    <!-- Desktop Table -->
    <div class="desktop-table">
        <div class="professional-table-wrapper">
            <table class="professional-table">
                <thead>
                    <tr>
                        <th class="text-center">
                            📄 Factura
                        </th>
                        <th class="text-center">
                            📅 Fecha
                        </th>
                        <th class="text-right">
                            💵 {{(mostrar_cobros ? 'Saldo' : 'Valor')}}
                        </th>
                        <th class="text-right">
                            💳 Pagos
                        </th>                        
                        <th class="text-right">
                            ⭕ NC
                        </th>                        
                        <th class="text-right">
                            📉 Descuento
                        </th>                        
                        <th class="text-right">
                            🧾 Retención
                        </th>
                        <th class="text-center">
                            📆 Fecha abono
                        </th>
                        <th class="text-right">
                            ⏳ Pendiente
                        </th>
                        <th class="text-center">
                            ✅ Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="index" class="data-row">
                        <td class="text-center invoice-cell">
                            <span class="invoice-number">{{ getNumeroFactura(item) }}</span>
                        </td>
                        <td class="text-center date-cell">
                            <span class="date-value">{{ item.fecha_factura }}</span>
                        </td>
                        <td class="text-right amount-cell">
                            <span class="amount-value">{{ (mostrar_cobros ? formatCurrency(item.saldo) : formatCurrency(item.valor)) }}</span>
                        </td>
                        <td class="text-right amount-cell">
                            <span class="amount-value payment-value">{{ formatCurrency(item.abono) }}</span>
                        </td>
                        <td class="text-right amount-cell">
                            <span class="amount-value nc-value">{{ formatCurrency(item.valor_nota) }}</span>
                        </td>
                        <td class="text-right amount-cell">
                            <span class="amount-value discount-value">{{ formatCurrency(item.descuento) }}</span>
                        </td>
                        <td class="text-right amount-cell">
                            <span class="amount-value retention-value">{{ formatCurrency(item.retencion) }}</span>
                        </td>
                        <td class="text-center date-cell">
                            <span class="date-value">{{ item.fecha_abono }}</span>
                        </td>
                        <td class="text-center amount-cell">
                            <span class="amount-value">{{ formatCurrency(item.pendiente) }}</span>
                        </td>
                        <td class="text-center amount-cell">
                            <span class="amount-value">{{ item.estado }}</span>
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
                Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, datosActuales.length) }} de {{ datosActuales.length }} registros
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
        <div v-for="(item, index) in paginatedData" :key="index" class="invoice-card">
            <div class="card-header">
                <div class="invoice-info">
                    <i class="fas fa-file-invoice invoice-icon"></i>
                    <span class="invoice-number-mobile">{{ getNumeroFactura(item) }}</span>
                </div>
                <div class="date-badge">
                    <i class="fas fa-calendar-alt"></i>
                    {{ item.fecha_factura }}
                </div>
            </div>
            
            <div class="card-body">
                <div class="main-info">
                    <div class="info-item valor-factura">
                        <i class="fas fa-dollar-sign info-icon"></i>
                        <div class="info-content">
                            <span class="info-label">Valor Factura</span>
                            <span class="info-value">{{ formatCurrency(item.valor) }}</span>
                        </div>
                    </div>
                    
                    <div class="info-item ultimo-abono">
                        <i class="fas fa-clock info-icon"></i>
                        <div class="info-content">
                            <span class="info-label">Último Abono</span>
                            <span class="info-value">{{ item.fecha_abono }}</span>
                        </div>
                    </div>
                </div>
                
                <div class="financial-info">
                    <div class="financial-row">
                        <div class="financial-item">
                            <span class="financial-label">NC</span>
                            <span class="financial-value nc">{{ formatCurrency(item.valor_nota) }}</span>
                        </div>
                        <div class="financial-item">
                            <span class="financial-label">Pagos</span>
                            <span class="financial-value payment">{{ formatCurrency(item.abono) }}</span>
                        </div>
                    </div>
                    <div class="financial-row">
                        <div class="financial-item">
                            <span class="financial-label">Descuento</span>
                            <span class="financial-value discount">{{ formatCurrency(item.descuento) }}</span>
                        </div>
                        <div class="financial-item">
                            <span class="financial-label">Retención</span>
                            <span class="financial-value retention">{{ formatCurrency(item.retencion) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import * as XLSX from 'xlsx';
    
    export default {
        props: ['datos', 'tipo_cliente', 'cobros', 'mostrar_cobros'],
        data() {
            return {
                // datos: [],
                descuento: 0,
                headers:[
                    {text: 'Factura', value: 'numero_factura'},
                    {text: 'Fecha', value: 'fecha_factura'},
                    {text: 'Valor', value: 'valor'},
                    {text: 'Fecha abono', value: 'fecha_abono'},
                    {text: 'NC', value: 'nc'},
                    {text: 'Pagos', value: 'abono'},
                    {text: 'Descuento', value: 'descuento'},
                    {text: 'Retención', value: 'retencion'},
                    {text: 'Pendiente', value: 'pendiente'},
                    {text: 'Estado', value: 'estado'},
                ],
                totales: {abonos: 0, saldo: 0, totalFacturado: 0},
                // Paginación
                currentPage: 1,
                itemsPerPage: 10,
                totalPages: 0
            }
        },
        computed: {
            // Datos a mostrar: cobros si está seleccionado, sino datos por defecto
            datosActuales() {
                return this.mostrar_cobros && this.cobros ? this.cobros : this.datos;
            },
            paginatedData() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.datosActuales.slice(start, end);
            },
            shouldPaginate() {
                return this.datosActuales.length > this.itemsPerPage;
            },
            // Determinar qué tarjeta mostrar
            mostrarTarjetaFacturado() {
                return !this.mostrar_cobros;
            },
            mostrarTarjetaAbonos() {
                return this.mostrar_cobros;
            }
        },
        watch: {
            datos: {
                handler() {
                    console.log('Datos (facturas) actualizados:', this.datos ? this.datos.length : 0, 'registros');
                    this.calcularTotales();
                    this.updatePagination();
                },
                immediate: true,
                deep: true
            },
            cobros: {
                handler() {
                    console.log('Cobros actualizados:', this.cobros ? this.cobros.length : 0, 'registros');
                    if (this.mostrar_cobros) {
                        this.calcularTotales();
                        this.updatePagination();
                    }
                },
                immediate: true,
                deep: true
            },
            mostrar_cobros: {
                handler(newVal, oldVal) {
                    const tipoAnterior = oldVal ? 'Cobros' : 'Facturas';
                    const tipoNuevo = newVal ? 'Cobros' : 'Facturas';
                    console.log(`Vista cambiada de ${tipoAnterior} a ${tipoNuevo}`);
                    
                    // Emitir evento al componente padre para actualizar conteo
                    this.$emit('vista-cambiada', {
                        tipo: newVal ? 'cobros' : 'facturas',
                        registros: this.datosActuales ? this.datosActuales.length : 0
                    });
                    
                    this.calcularTotales();
                    this.updatePagination();
                },
                immediate: true
            },
            // Watcher para datosActuales computed - recalcula cuando cambian los datos activos
            datosActuales: {
                handler(newVal, oldVal) {
                    const tipo = this.mostrar_cobros ? 'Cobros' : 'Facturas';
                    const cantidadActual = newVal ? newVal.length : 0;
                    const cantidadAnterior = oldVal ? oldVal.length : 0;
                    
                    console.log(`${tipo} - Datos cambiaron de ${cantidadAnterior} a ${cantidadActual} registros`);
                    
                    this.calcularTotales();
                    this.updatePagination();
                },
                immediate: true,
                deep: true
            }
        },
        mounted() {
            this.calcularTotales()
        },
        methods: {
            calcularTotales(){
                const tipoVista = this.mostrar_cobros ? 'Cobros' : 'Facturas';
                console.log(`Calculando totales para ${tipoVista}:`, this.datosActuales)
                
                // Reset totales
                this.totales = {abonos: 0, saldo: 0, totalFacturado: 0};
                
                // Verificar que datos existe y es un array
                if (!this.datosActuales || !Array.isArray(this.datosActuales) || this.datosActuales.length === 0) {
                    console.log(`No hay datos de ${tipoVista} para calcular totales`);
                    return;
                }
                
                let totalAbonos = 0;
                let totalFacturado = 0;
                
                this.datosActuales.forEach((el) => {
                    // Asegurar que los valores numéricos son válidos
                    const abono = parseFloat(el.abono) || 0;
                    const valor = parseFloat(el.valor) || 0;
                    
                    totalFacturado += valor;
                    totalAbonos += abono;
                });
                
                this.totales.abonos = totalAbonos;
                this.totales.totalFacturado = totalFacturado;
                
                console.log(`Totales calculados para ${tipoVista}:`, {
                    registros: this.datosActuales.length,
                    totalFacturado: totalFacturado,
                    totalAbonos: totalAbonos
                });
            },
            updatePagination() {
                this.totalPages = Math.ceil(this.datosActuales.length / this.itemsPerPage);
                this.currentPage = 1;
            },
            // Obtener número de factura considerando electronica
            getNumeroFactura(item) {
                if (this.tipo_cliente == 1) {
                    return item.electronica == 0 ? item.numero_factura : item.electronica;
                }
                return item.numero_factura;
            },
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
            },
            // Descargar Excel
            descargarExcel() {
                if (!this.datosActuales || this.datosActuales.length === 0) {
                    alert('No hay datos para descargar');
                    return;
                }

                // Crear datos para el Excel
                const datosExcel = this.datosActuales.map(item => ({
                    'Factura': this.getNumeroFactura(item),
                    'Fecha': item.fecha_factura,
                    'Valor': parseFloat(item.valor) || 0,
                    'Pagos': parseFloat(item.abono) || 0,
                    'NC': parseFloat(item.valor_nota) || 0,
                    'Descuento': parseFloat(item.descuento) || 0,
                    'Retención': parseFloat(item.retencion) || 0,
                    'Fecha Abono': item.fecha_abono || '',
                    'Pendiente': parseFloat(item.pendiente) || 0,
                    'Estado': item.estado || ''
                }));

                // Crear workbook
                const ws = XLSX.utils.json_to_sheet(datosExcel);
                const wb = XLSX.utils.book_new();
                
                // Nombre de la hoja
                const tipoReporte = this.mostrar_cobros ? 'Cobros' : 'Facturas';
                XLSX.utils.book_append_sheet(wb, ws, tipoReporte);

                // Configurar anchos de columna
                const colWidths = [
                    { wch: 12 }, // Factura
                    { wch: 12 }, // Fecha
                    { wch: 15 }, // Valor
                    { wch: 15 }, // Pagos
                    { wch: 12 }, // NC
                    { wch: 15 }, // Descuento
                    { wch: 15 }, // Retención
                    { wch: 12 }, // Fecha Abono
                    { wch: 15 }, // Pendiente
                    { wch: 10 }  // Estado
                ];
                ws['!cols'] = colWidths;

                // Nombre del archivo
                const fecha = new Date().toISOString().split('T')[0];
                const nombreArchivo = `${tipoReporte}_${fecha}.xlsx`;

                // Descargar archivo
                XLSX.writeFile(wb, nombreArchivo);
                
                console.log(`Excel descargado: ${nombreArchivo} con ${datosExcel.length} registros`);
            }
        },
    }
</script>

<style scoped>
/* Container */
.facturas-report-container {
    width: 100%;
    padding: 0;
}

/* Summary Section */
.summary-section {
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 2px solid #e5e7eb;
}

.summary-cards {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

.summary-cards .summary-card {
    max-width: 400px;
    min-width: 300px;
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

.total-facturado .summary-icon {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white !important;
}

.total-pagado .summary-icon {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white !important;
}

.cartera .summary-icon {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white !important;
}

.summary-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    position: relative;
    flex-shrink: 0;
}

.icon-symbol {
    display: block;
    font-size: 2rem;
    line-height: 1;
    text-align: center;
    font-family: "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
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
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.professional-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: white;
    font-size: 0.9rem;
    min-width: 1200px;
    table-layout: fixed;
}

/* Table Header */
.professional-table thead th {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #374151;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 1rem 0.75rem;
    border-bottom: 2px solid #3b82f6;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
}

/* Estilos para encabezados con emojis */
.professional-table thead th {
    font-size: 0.9rem;
    line-height: 1.2;
}

/* Anchos específicos para columnas */
.professional-table th:nth-child(1) { width: 8%; }  /* Factura */
.professional-table th:nth-child(2) { width: 10%; } /* Fecha */
.professional-table th:nth-child(3) { width: 12%; } /* Valor */
.professional-table th:nth-child(4) { width: 12%; } /* Pagos */
.professional-table th:nth-child(5) { width: 10%; } /* NC */
.professional-table th:nth-child(6) { width: 12%; } /* Descuento */
.professional-table th:nth-child(7) { width: 12%; } /* Retención */
.professional-table th:nth-child(8) { width: 10%; } /* Fecha abono */
.professional-table th:nth-child(9) { width: 12%; } /* Pendiente */
.professional-table th:nth-child(10) { width: 8%; } /* Estado */

/* Table Body */
.professional-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
}

.professional-table tbody tr:hover {
    background: rgba(59, 130, 246, 0.05);
    transform: translateX(3px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.professional-table tbody td {
    padding: 0.875rem 0.75rem;
    vertical-align: middle;
    border-bottom: 1px solid #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Cell Styles */
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
    white-space: nowrap;
    display: inline-block;
}

.date-cell {
    color: #64748b;
    font-weight: 500;
}

.date-value {
    background: #f8fafc;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    font-size: 0.85rem;
    white-space: nowrap;
    display: inline-block;
}

.amount-cell {
    font-weight: 600;
    font-family: 'Courier New', monospace;
}

.amount-value {
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    font-weight: 700;
    color: #1e293b;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border: 1px solid #93c5fd;
    font-size: 0.85rem;
    white-space: nowrap;
    display: inline-block;
}

.nc-value {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #dc2626;
    border: 1px solid #f87171;
}

.payment-value {
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    color: #059669;
    border: 1px solid #4ade80;
}

.discount-value {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    color: #4338ca;
    border: 1px solid #a5b4fc;
}

.retention-value {
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    color: #c2410c;
    border: 1px solid #fb923c;
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

.invoice-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.invoice-icon {
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

.invoice-number-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.2rem;
}

.date-badge {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #64748b;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 600;
    border: 1px solid #e2e8f0;
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

.main-info {
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

.valor-factura .info-icon {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
}

.ultimo-abono .info-icon {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
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
}

/* Financial Info */
.financial-info {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid #e2e8f0;
}

.financial-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.financial-row:last-child {
    margin-bottom: 0;
}

.financial-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.financial-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.financial-value {
    font-weight: 700;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
}

.financial-value.nc {
    background: #fecaca;
    color: #dc2626;
}

.financial-value.payment {
    background: #bbf7d0;
    color: #059669;
}

.financial-value.discount {
    background: #e0e7ff;
    color: #4338ca;
}

.financial-value.retention {
    background: #fed7aa;
    color: #c2410c;
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
    border-color: #3b82f6;
    color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.pagination-btn.page-number.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.pagination-dots {
    color: #94a3b8;
    font-weight: 600;
    padding: 0 0.5rem;
}

/* Barra de Acciones */
.actions-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
}

.actions-left .data-info {
    color: #475569;
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.actions-right {
    display: flex;
    gap: 1rem;
}

/* Botón Excel */
.excel-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    position: relative;
    overflow: hidden;
}

.excel-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.excel-btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.excel-btn:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.excel-btn .excel-icon {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
}

.excel-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.5s;
}

.excel-btn:hover:not(:disabled)::before {
    left: 100%;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .summary-cards {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .professional-table {
        font-size: 0.85rem;
    }
    
    .professional-table thead th,
    .professional-table tbody td {
        padding: 0.75rem 0.5rem;
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
    
    .actions-bar {
        padding: 1rem 1.5rem;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .actions-left,
    .actions-right {
        width: 100%;
        justify-content: center;
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
    .summary-section {
        padding: 1rem;
    }
    
    .summary-cards {
        gap: 0.75rem;
    }
    
    .summary-card {
        padding: 1.25rem;
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
    
    .actions-bar {
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .excel-btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.85rem;
        width: 100%;
        justify-content: center;
    }
    
    .summary-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }
    
    .summary-value {
        font-size: 1.5rem;
    }
    
    .mobile-cards-container {
        padding: 1rem;
    }
    
    .invoice-card {
        padding: 1.25rem;
        margin-bottom: 0.875rem;
    }
    
    .card-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
        text-align: center;
    }
    
    .main-info {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .financial-row {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .info-item {
        padding: 0.875rem;
    }
}

@media (max-width: 480px) {
    .summary-value {
        font-size: 1.25rem;
    }
    
    .invoice-card {
        padding: 1rem;
    }
    
    .invoice-number-mobile {
        font-size: 1rem;
    }
    
    .financial-item {
        padding: 0.5rem;
    }
    
    .financial-value {
        font-size: 0.8rem;
    }
}
</style>
