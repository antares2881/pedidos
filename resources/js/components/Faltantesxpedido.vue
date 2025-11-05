<template>
    <div class="faltantes-container">
        <v-container fluid class="pa-6">
            <v-row>
                <v-col cols="12">
                    <v-card class="professional-card" elevation="3">
                        <v-card-title class="professional-header">
                            <div class="header-content">
                                <div class="title-section">
                                    <v-icon left size="28" class="header-icon">mdi-clipboard-list-outline</v-icon>
                                    <div class="title-text">
                                        <h2 class="card-title">Productos Pendientes</h2>
                                        <p class="card-subtitle">Seguimiento de facturación</p>
                                    </div>
                                </div>
                                <div class="stats-section">
                                    <v-chip 
                                        v-if="pendientes.length" 
                                        class="status-chip"
                                        :color="getStatusColor()"
                                        dark
                                        label
                                    >
                                        <v-icon left small>mdi-package-variant</v-icon>
                                        {{ pendientes.length }} productos
                                    </v-chip>
                                </div>
                            </div>
                        </v-card-title>
                        
                        <v-card-text v-if="loading" class="text-center py-8">
                            <v-progress-circular
                                indeterminate
                                color="primary"
                                size="64"
                            ></v-progress-circular>
                            <div class="mt-4">Cargando datos...</div>
                        </v-card-text>

                        <v-card-text v-else-if="!pendientes.length" class="text-center py-8">
                            <v-icon size="64" color="grey lighten-2">mdi-package-variant</v-icon>
                            <div class="mt-4 grey--text">No hay productos pendientes</div>
                        </v-card-text>

                        <v-data-table
                            v-else
                            :headers="headers"
                            :items="pendientes"
                            :items-per-page="itemsPerPage"
                            :search="search"
                            class="elevation-0"
                            mobile-breakpoint="960"
                        >
                            <template v-slot:top>
                                <v-toolbar flat class="professional-toolbar">
                                    <v-row no-gutters align="center" class="pa-4">
                                        <v-col cols="12" md="6" class="pr-md-4">
                                            <v-text-field
                                                v-model="search"
                                                prepend-inner-icon="mdi-magnify"
                                                label="Buscar producto..."
                                                single-line
                                                hide-details
                                                clearable
                                                outlined
                                                dense
                                                class="search-field"
                                            ></v-text-field>
                                        </v-col>
                                        
                                        <v-col cols="12" md="6" class="d-flex justify-end align-center">
                                            <v-btn
                                                color="success"
                                                class="mr-3 export-btn-fixed"
                                                @click="exportToExcel"
                                                :loading="exportLoading"
                                                :disabled="!pendientes.length"
                                                small
                                            >
                                                <v-icon left small>mdi-file-excel</v-icon>
                                                Exportar
                                            </v-btn>
                                            
                                            <v-select
                                                v-model="itemsPerPage"
                                                :items="paginationItems"
                                                label="Filas por página"
                                                outlined
                                                dense
                                                hide-details
                                                style="max-width: 150px;"
                                                class="pagination-select-fixed"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-toolbar>
                            </template>

                            <template v-slot:[`item.item`]="{ index }">
                                <div class="index-cell">
                                    <span class="index-number">{{ index + 1 }}</span>
                                </div>
                            </template>

                            <template v-slot:[`item.producto`]="{ item }">
                                <div class="producto-cell">
                                    <span class="producto-name">{{ item.producto }}</span>
                                </div>
                            </template>

                            <template v-slot:[`item.presentacion`]="{ item }">
                                <v-chip
                                    small
                                    class="presentacion-chip"
                                    outlined
                                    color="blue darken-2"
                                >
                                    {{ item.presentacion }}
                                </v-chip>
                            </template>

                            <template v-slot:[`item.cantidad`]="{ item }">
                                <v-chip
                                    small
                                    :class="getCantidadChipClass(item.cantidad)"
                                    :color="getCantidadColor(item.cantidad)"
                                    label
                                >
                                    <v-icon left x-small>{{ getCantidadIcon(item.cantidad) }}</v-icon>
                                    {{ formatNumber(item.cantidad) }}
                                </v-chip>
                            </template>

                            <template v-slot:[`item.bonificacion`]="{ item }">
                                <v-chip
                                    small
                                    :class="getBonificacionChipClass(item.bonificacion)"
                                    :color="getBonificacionColor(item.bonificacion)"
                                    label
                                >
                                    <v-icon left x-small>{{ getBonificacionIcon(item.bonificacion) }}</v-icon>
                                    {{ getBonificacionText(item.bonificacion) }}
                                </v-chip>
                            </template>

                            <template v-slot:[`item.total`]="{ item }">
                                <div class="total-cell">
                                    <v-chip
                                        small
                                        color="primary"
                                        dark
                                        class="total-chip"
                                        label
                                    >
                                        <v-icon left x-small>mdi-calculator</v-icon>
                                        {{ formatNumber(calculateTotal(item.cantidad, item.bonificacion)) }}
                                    </v-chip>
                                </div>
                            </template>

                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pendientes: [],
                loading: false,
                exportLoading: false,
                search: '',
                itemsPerPage: 25,
                paginationItems: [
                    { text: '10', value: 10 },
                    { text: '25', value: 25 },
                    { text: '50', value: 50 },
                    { text: '100', value: 100 },
                    { text: 'Todos', value: -1 }
                ],
                headers: [
                    {
                        text: '#',
                        value: 'item',
                        sortable: false,
                        align: 'center',
                        width: '8%'
                    },
                    {
                        text: 'Producto',
                        align: 'start',
                        sortable: true,
                        value: 'producto',
                        width: '32%'
                    },
                    {
                        text: 'Presentación',
                        value: 'presentacion',
                        sortable: true,
                        width: '18%'
                    },
                    {
                        text: 'Cantidad',
                        value: 'cantidad',
                        sortable: true,
                        align: 'center',
                        width: '14%'
                    },
                    {
                        text: 'Bonificación',
                        value: 'bonificacion',
                        sortable: true,
                        align: 'center',
                        width: '14%'
                    },
                    {
                        text: 'Total',
                        value: 'total',
                        sortable: false,
                        align: 'center',
                        width: '14%'
                    }
                ]
            }
        },
        mounted() {
            this.getPendientes();
        },
        methods: {
            getPendientes() {
                this.loading = true;
                axios.get('/faltantes-pedidos')
                    .then(res => {
                        this.pendientes = res.data.pendientes || [];
                        this.loading = false;
                    })
                    .catch(err => {
                        console.error('Error al cargar los pendientes:', err);
                        this.pendientes = [];
                        this.loading = false;
                        // Opcional: mostrar mensaje de error al usuario
                        this.$toast.error('Error al cargar los datos');
                    });
            },
            
            formatNumber(number) {
                if (number === null || number === undefined || number === '') return '0';
                return new Intl.NumberFormat('es-CO').format(number);
            },
            
            getCantidadColor(cantidad) {
                if (cantidad <= 0) return 'red';
                if (cantidad <= 10) return 'orange';
                return 'green';
            },
            
            getCantidadTextClass(cantidad) {
                if (cantidad <= 0) return 'red--text text--darken-3';
                if (cantidad <= 10) return 'orange--text text--darken-3';
                return 'green--text text--darken-3';
            },

            getBonificacionColor(bonificacion) {
                return bonificacion > 0 ? 'green' : 'grey';
            },

            getBonificacionTextClass(bonificacion) {
                return bonificacion > 0 ? 'green--text text--darken-3' : 'grey--text text--darken-3';
            },

            getBonificacionText(bonificacion) {
                return bonificacion > 0 ? '+' + this.formatNumber(bonificacion) : this.formatNumber(0);
            },

            getStatusColor() {
                if (this.pendientes.length === 0) return 'grey';
                if (this.pendientes.length <= 10) return 'orange';
                if (this.pendientes.length <= 50) return 'blue';
                return 'success';
            },

            getCantidadIcon(cantidad) {
                if (cantidad <= 0) return 'mdi-alert-circle';
                if (cantidad <= 10) return 'mdi-alert';
                return 'mdi-check-circle';
            },

            getCantidadChipClass(cantidad) {
                if (cantidad <= 0) return 'cantidad-critical';
                if (cantidad <= 10) return 'cantidad-warning';
                return 'cantidad-success';
            },

            getBonificacionIcon(bonificacion) {
                return bonificacion > 0 ? 'mdi-gift' : 'mdi-minus-circle-outline';
            },

            getBonificacionChipClass(bonificacion) {
                return bonificacion > 0 ? 'bonificacion-active' : 'bonificacion-inactive';
            },
            
            calculateTotal(cantidad, bonificacion) {
                // Convertir a números para asegurar la suma correcta
                const cantidadNum = parseFloat(cantidad) || 0;
                const bonificacionNum = parseFloat(bonificacion) || 0;
                return cantidadNum + bonificacionNum;
            },
            
            exportToExcel() {
                this.exportLoading = true;
                
                try {
                    // Preparar los datos para el Excel
                    const excelData = this.pendientes.map((item, index) => ({
                        'Ítem': index + 1,
                        'Producto': item.producto,
                        'Presentación': item.presentacion,
                        'Cantidad': parseFloat(item.cantidad) || 0,
                        'Bonificación': parseFloat(item.bonificacion) || 0,
                        'Total': this.calculateTotal(item.cantidad, item.bonificacion)
                    }));

                    // Crear encabezados
                    const headers = ['Ítem', 'Producto', 'Presentación', 'Cantidad', 'Bonificación', 'Total'];
                    
                    // Convertir a CSV
                    let csvContent = headers.join(',') + '\n';
                    excelData.forEach(row => {
                        const values = headers.map(header => {
                            let value = row[header];
                            // Escapar valores que contengan comas o comillas
                            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                                value = '"' + value.replace(/"/g, '""') + '"';
                            }
                            return value;
                        });
                        csvContent += values.join(',') + '\n';
                    });

                    // Crear y descargar el archivo
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const link = document.createElement('a');
                    const url = URL.createObjectURL(blob);
                    
                    const fecha = new Date().toISOString().split('T')[0];
                    const filename = `faltantes_por_pedido_${fecha}.csv`;
                    
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Mostrar mensaje de éxito
                    this.$toast.success('Archivo descargado exitosamente');
                    
                } catch (error) {
                    console.error('Error al exportar:', error);
                    this.$toast.error('Error al generar el archivo');
                } finally {
                    this.exportLoading = false;
                }
            }
        }
    }
</script>

<style scoped>
/* ================================
   CONTENEDOR PRINCIPAL
   ================================ */
.faltantes-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    padding: 20px 0;
}

/* ================================
   TARJETA PROFESIONAL
   ================================ */
.professional-card {
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95) !important;
    overflow: hidden;
}

.professional-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
    color: white !important;
    padding: 24px 32px !important;
    border-radius: 16px 16px 0 0 !important;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.title-section {
    display: flex;
    align-items: center;
    gap: 16px;
}

.header-icon {
    color: rgba(255, 255, 255, 0.9) !important;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.title-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.card-title {
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    margin: 0 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: -0.5px;
}

.card-subtitle {
    font-size: 0.95rem !important;
    opacity: 0.85;
    margin: 0 !important;
    font-weight: 400;
}

.stats-section {
    display: flex;
    align-items: center;
}

.status-chip {
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    padding: 8px 16px !important;
    border-radius: 20px !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}

/* ================================
   BARRA DE HERRAMIENTAS
   ================================ */
.professional-toolbar {
    background: rgba(255, 255, 255, 0.95) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    padding: 0 !important;
}

.search-field {
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}

.export-btn-fixed {
    border-radius: 8px !important;
    font-weight: 600 !important;
    text-transform: none !important;
    height: 36px !important;
    min-width: 120px !important;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3) !important;
    transition: all 0.3s ease !important;
    background: linear-gradient(135deg, #48bb78, #38a169) !important;
}

.export-btn-fixed:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4) !important;
}

.export-btn-fixed:disabled {
    opacity: 0.6 !important;
    transform: none !important;
    box-shadow: none !important;
}

.pagination-select-fixed {
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}

.pagination-select-fixed >>> .v-input__control {
    min-height: 36px !important;
}

.pagination-select-fixed >>> .v-select__selections {
    min-height: 36px !important;
    padding: 0 12px !important;
}

.pagination-select-fixed >>> .v-input__append-inner {
    margin-top: 6px !important;
}

/* ================================
   TABLA DE DATOS
   ================================ */
.v-data-table {
    background: transparent !important;
    border-radius: 0 0 16px 16px !important;
}

.v-data-table >>> .v-data-table__wrapper {
    border-radius: 0 0 16px 16px !important;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.v-data-table >>> .v-data-table-header {
    background: rgba(102, 126, 234, 0.05) !important;
    border-bottom: 2px solid rgba(102, 126, 234, 0.1) !important;
}

.v-data-table >>> .v-data-table-header th {
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    color: #4a5568 !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 16px !important;
}

.v-data-table >>> tbody tr {
    transition: all 0.2s ease !important;
}

.v-data-table >>> tbody tr:hover {
    background: rgba(102, 126, 234, 0.03) !important;
    transform: scale(1.001);
}

.v-data-table >>> tbody td {
    padding: 16px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03) !important;
}

/* ================================
   CELDAS PERSONALIZADAS
   ================================ */
.index-cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.index-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 0.875rem;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.producto-cell {
    display: flex;
    align-items: center;
}

.producto-name {
    font-weight: 600;
    color: #2d3748;
    font-size: 0.95rem;
    line-height: 1.4;
}

.presentacion-chip {
    font-weight: 500 !important;
    border-radius: 8px !important;
    border-width: 2px !important;
}

.total-cell {
    display: flex;
    justify-content: center;
}

.total-chip {
    font-weight: 700 !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3) !important;
}

/* ================================
   CHIPS DE CANTIDAD
   ================================ */
.cantidad-critical {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52) !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3) !important;
}

.cantidad-warning {
    background: linear-gradient(135deg, #ffa726, #ff9800) !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(255, 167, 38, 0.3) !important;
}

.cantidad-success {
    background: linear-gradient(135deg, #66bb6a, #4caf50) !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(102, 187, 106, 0.3) !important;
}

/* ================================
   CHIPS DE BONIFICACIÓN
   ================================ */
.bonificacion-active {
    background: linear-gradient(135deg, #26c6da, #00bcd4) !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(38, 198, 218, 0.3) !important;
}

.bonificacion-inactive {
    background: rgba(158, 158, 158, 0.1) !important;
    color: #9e9e9e !important;
    border: 1px solid rgba(158, 158, 158, 0.3) !important;
    font-weight: 500 !important;
}

/* ================================
   ESTADOS DE CARGA Y VACÍO
   ================================ */
.v-progress-circular {
    filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3)) !important;
}

/* ================================
   RESPONSIVE DESIGN
   ================================ */
@media (max-width: 960px) {
    .professional-toolbar .v-row {
        flex-direction: column !important;
        gap: 16px;
    }
    
    .professional-toolbar .v-col {
        flex-basis: auto !important;
        max-width: 100% !important;
    }
    
    .d-flex.justify-end {
        justify-content: space-between !important;
    }
    
    .export-btn-fixed {
        flex: 1;
        margin-right: 12px !important;
    }
    
    .pagination-select-fixed {
        max-width: 120px !important;
    }
}

@media (max-width: 768px) {
    .faltantes-container {
        padding: 12px 0;
    }
    
    .professional-header {
        padding: 20px 24px !important;
    }
    
    .header-content {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }
    
    .title-section {
        gap: 12px;
    }
    
    .card-title {
        font-size: 1.5rem !important;
    }
    
    .professional-toolbar {
        padding: 16px 24px !important;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 12px;
    }
    
    .export-btn {
        width: 100%;
    }
    
    .v-data-table >>> .v-data-table__wrapper {
        overflow-x: auto;
    }
}

@media (max-width: 480px) {
    .card-title {
        font-size: 1.25rem !important;
    }
    
    .professional-header {
        padding: 16px 20px !important;
    }
    
    .professional-toolbar {
        padding: 12px 20px !important;
    }
}

/* ================================
   ANIMACIONES
   ================================ */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.professional-card {
    animation: fadeInUp 0.6s ease-out;
}

.v-chip {
    transition: all 0.2s ease !important;
}

.v-chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
</style>
