<template>
    <div class="gestion-recibos-wrapper">
        <div class="abonos-container">
            <!-- Professional Header -->
            <div class="professional-header">
                <h2>
                    <i class="fas fa-receipt"></i>
                    Gestión de Recibos de Caja
                </h2>
            </div>

            <!-- Search Section -->
            <div class="search-section">
                    <div class="search-field">
                        <label class="form-label">
                            <i class="fas fa-receipt mr-1"></i>
                            Número de Recibo
                        </label>
                        <input 
                            type="text" 
                            class="form-control professional-input" 
                            v-model="filtros.num_recibo"
                            placeholder="Ej: 13442"
                            @keyup.enter="buscarRecibos"
                        >
                    </div>
                    
                    <div class="search-field">
                        <label class="form-label">
                            <i class="fas fa-users mr-1"></i>
                            Tipo de Cliente
                        </label>
                        <select class="form-control professional-select" v-model="filtros.tipo_cliente">
                            <option value="">Seleccionar tipo...</option>
                            <option value="2">Cliente directo</option>
                            <option value="1">Cliente indirecto</option>
                        </select>
                    </div>
                    
                    <div>
                        <button 
                            class="search-button" 
                            @click="buscarRecibos"
                            :disabled="loading || !filtros.num_recibo.trim()"
                        >
                            <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                            <i class="fas fa-search" v-else></i>
                            {{ loading ? 'Buscando...' : 'Buscar Recibos' }}
                        </button>
                    </div>
                </div>
                
                <div v-if="!filtros.num_recibo.trim()" class="professional-alert">
                    <div class="alert-content">
                        <i class="fas fa-info-circle custom-icon"></i>
                        <div>
                            <h6>Instrucciones de Búsqueda</h6>
                            <p>Para buscar recibos, ingrese el número de recibo y seleccione el tipo de cliente correspondiente.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loader durante la búsqueda -->
            <div v-if="loading" class="loading-section">
                <div class="loading-content">
                    <div class="spinner-professional">
                        <i class="fas fa-spinner fa-spin fa-3x text-primary"></i>
                    </div>
                    <p class="loading-text">Buscando recibos...</p>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <div v-if="recibos.length > 0" class="results-section">
                <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4">
                    <div class="mb-3 mb-lg-0">
                        <h4 class="mb-1">
                            <i class="fas fa-receipt mr-2"></i>
                            Recibos de Caja Encontrados
                        </h4>
                        <div class="d-flex align-items-center mb-2">
                            <span class="badge bg-primary mr-2">{{ recibos.length }} registro{{ recibos.length > 1 ? 's' : '' }}</span>
                            <span class="badge" :class="recibos[0].tipo_cliente === '1' ? 'bg-info' : 'bg-success'">
                                <i :class="recibos[0].tipo_cliente === '1' ? 'fas fa-store' : 'fas fa-user'" class="mr-1"></i>
                                {{ recibos[0].tipo_cliente === '1' ? 'Cliente Indirecto' : 'Cliente Directo' }}
                            </span>
                            <span v-if="recibos[0].estado_id == 3" class="badge bg-danger ml-2">
                                <i class="fas fa-ban mr-1"></i>
                                ANULADO
                            </span>
                        </div>
                        <div class="mb-2">
                            <span class="text-muted">
                                <i class="fas fa-building mr-1"></i>
                                {{ recibos[0].razon_social || recibos[0].nombre_cliente }}
                            </span>
                            <span class="text-muted mx-2">•</span>
                            <span class="text-muted">
                                <i class="fas fa-id-card mr-1"></i>
                                {{ recibos[0].nit || recibos[0].cedula_cliente }}
                            </span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="mr-3">
                            <small class="text-muted d-block">Recibo N°</small>
                            <strong class="h5">{{ recibos[0].num_recibo_caja || recibos[0].numero_recibo }}</strong>
                        </div>
                        <div class="mr-3">
                            <small class="text-muted d-block">Total recibo:</small>
                            <strong class="h4 text-success">{{ formatCurrency(totalValorAbono) }}</strong>
                        </div>
                        <button 
                            v-if="recibos[0].estado_id != 3"
                            class="btn btn-danger" 
                            @click="cancelarRecibo(recibos[0].num_recibo_caja, recibos[0].tipo_cliente, recibos[0].factura_id, recibos[0].venta_id)"
                            title="Cancelar recibo"
                        >
                            <i class="fas fa-times mr-1"></i>
                            Cancelar Recibo
                        </button>
                    </div>
                </div>
                
                <!-- Contenido cuando no está cargando -->
                <div>
                    <!-- Vista de tabla para pantallas grandes -->
                    <div class="professional-table-wrapper d-none d-lg-block">
                        <table class="table professional-table">
                            <thead>
                                <tr>
                                    <th>Fecha Factura</th>
                                    <th>Número Factura</th>
                                    <th v-if="mostrarElectronica">Electrónica</th>
                                    <th>Saldo</th>
                                    <th>Fecha Pago</th>
                                    <th>Valor Abono</th>
                                    <th>Retención</th>
                                    <th>Descuento</th>
                                    <th>Valor Nota</th>
                                    <th>Pendiente</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="recibo in recibos" :key="recibo.id">
                                    <td>{{ formatDate(recibo.fecha_factura) }}</td>
                                    <td>{{ recibo.numero_factura }}</td>
                                    <td v-if="mostrarElectronica">
                                        <span v-if="recibo.electronica !== 0" class="badge badge-success">{{ recibo.electronica }}</span>
                                        <span v-else class="badge badge-secondary">No</span>
                                    </td>
                                    <td class="text-right">{{ formatCurrency(recibo.saldo) }}</td>
                                    <td>{{ formatDate(recibo.fecha_pago) }}</td>
                                    <td class="text-right">{{ formatCurrency(recibo.valor_abono) }}</td>
                                    <td class="text-right">{{ formatCurrency(recibo.retencion) }}</td>
                                    <td class="text-right">{{ formatCurrency(recibo.descuento) }}</td>
                                    <td class="text-right">{{ formatCurrency(recibo.valor_nota) }}</td>
                                    <td class="text-right">{{ formatCurrency(recibo.pendiente) }}</td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button 
                                                class="btn btn-sm btn-info" 
                                                @click="verDetalle(recibo)"
                                                title="Ver detalle"
                                            >
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button 
                                                v-if="recibo.tipo_cliente === '1'"
                                                class="btn btn-sm btn-primary" 
                                                @click="imprimirRecibo(recibo.num_recibo_caja)"
                                                title="Imprimir recibo"
                                            >
                                                <i class="fas fa-print"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Vista de cards para móviles mejorada -->
                    <div class="d-lg-none mobile-cards">
                        <div v-for="recibo in recibos" :key="recibo.id" class="mobile-card mb-3">
                            <div class="card shadow-sm border-0">
                                <!-- Header con gradiente -->
                                <div class="card-header bg-gradient-primary text-white border-0 rounded-top">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-receipt fa-lg me-2"></i>
                                            <div>
                                                <h6 class="mb-0 fw-bold">Recibo #{{ recibo.num_recibo_caja || recibo.numero_recibo }}</h6>
                                                <small class="text-white-50">{{ formatDate(recibo.fecha_recibo || recibo.fecha) }}</small>
                                            </div>
                                        </div>
                                        <div>
                                            <span v-if="recibo.estado_id == 3 || recibo.anulado" class="badge bg-danger shadow-sm">
                                                <i class="fas fa-times-circle me-1"></i>Anulado
                                            </span>
                                            <span v-else class="badge bg-success shadow-sm">
                                                <i class="fas fa-check-circle me-1"></i>Activo
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card-body p-3">
                                    <!-- Información del cliente -->
                                    <div class="mb-3">
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-user text-muted me-2"></i>
                                            <small class="text-muted text-uppercase fw-bold">Cliente</small>
                                        </div>
                                        <h6 class="text-dark fw-bold mb-0">{{ recibo.nombre_cliente || recibo.cliente }}</h6>
                                        <small class="text-muted">{{ recibo.cedula_cliente || recibo.nit_cliente || 'N/A' }}</small>
                                    </div>
                                    
                                    <!-- Información de valores -->
                                    <div class="row g-2 mb-3">
                                        <div class="col-6">
                                            <div class="info-card bg-success bg-opacity-10 p-2 rounded">
                                                <i class="fas fa-dollar-sign text-success me-1"></i>
                                                <small class="text-muted d-block">Valor Abono</small>
                                                <strong class="text-success fw-bold">{{ formatCurrency(recibo.valor_abono || recibo.valor) }}</strong>
                                            </div>
                                        </div>
                                        <div class="col-6" v-if="recibo.pendiente">
                                            <div class="info-card bg-warning bg-opacity-10 p-2 rounded">
                                                <i class="fas fa-exclamation-triangle text-warning me-1"></i>
                                                <small class="text-muted d-block">Pendiente</small>
                                                <strong class="text-warning fw-bold">{{ formatCurrency(recibo.pendiente) }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Información adicional si existe -->
                                    <div class="row g-2 mb-3" v-if="recibo.retencion > 0 || recibo.descuento > 0 || recibo.valor_nota > 0">
                                        <div class="col-12">
                                            <div class="additional-info bg-light p-2 rounded">
                                                <small class="text-muted fw-bold d-block mb-1">
                                                    <i class="fas fa-info-circle me-1"></i>Otros valores:
                                                </small>
                                                <div class="d-flex justify-content-between flex-wrap">
                                                    <span v-if="recibo.retencion > 0" class="badge bg-secondary me-1 mb-1">
                                                        Ret: {{ formatCurrency(recibo.retencion) }}
                                                    </span>
                                                    <span v-if="recibo.descuento > 0" class="badge bg-info me-1 mb-1">
                                                        Desc: {{ formatCurrency(recibo.descuento) }}
                                                    </span>
                                                    <span v-if="recibo.valor_nota > 0" class="badge bg-warning me-1 mb-1">
                                                        Nota: {{ formatCurrency(recibo.valor_nota) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Información del vendedor si existe -->
                                    <div class="mb-3" v-if="recibo.vendedor">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-user-tie text-info me-2"></i>
                                            <small class="text-muted me-2">Vendedor:</small>
                                            <strong class="text-dark">{{ recibo.vendedor }}</strong>
                                        </div>
                                    </div>
                                    
                                    <!-- Botones de acción -->
                                    <div class="d-grid gap-2">
                                        <div class="btn-group" role="group">
                                            <button 
                                                class="btn btn-primary" 
                                                @click="verDetalle(recibo)"
                                                title="Ver detalle completo"
                                            >
                                                <i class="fas fa-eye me-2"></i>Ver Detalle
                                            </button>
                                            <button 
                                                v-if="recibo.tipo_cliente === '1' || !recibo.tipo_cliente"
                                                class="btn btn-outline-primary" 
                                                @click="imprimirRecibo(recibo.num_recibo_caja || recibo.numero_recibo)"
                                                title="Descargar recibo en PDF"
                                            >
                                                <i class="fas fa-download me-2"></i>PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Results Section -->
            <div v-if="!loading && recibos.length === 0 && busquedaRealizada" class="results-section">
                <div class="no-results">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h5>No se encontraron recibos</h5>
                    <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
            </div>

        <!-- Modal Detalle Recibo -->
        <div class="modal fade" id="modalDetalleRecibo" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content modal-content-professional">
                    <div class="modal-header modal-header-professional">
                        <h4>
                            <i class="fas fa-receipt mr-2"></i>
                            Detalle del Recibo de Caja
                        </h4>
                        <button type="button" class="close text-white" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body modal-body-professional" v-if="reciboSeleccionado">
                        <div class="row">
                            <div class="col-md-6">
                                <h6><strong>Información del Recibo</strong></h6>
                                <p><strong>Número:</strong> {{ reciboSeleccionado.num_recibo_caja }}</p>
                                <p><strong>Fecha Pago:</strong> {{ formatDate(reciboSeleccionado.fecha_pago) }}</p>
                                <p><strong>Tipo Cliente:</strong> {{ reciboSeleccionado.tipo_cliente === '1' ? 'Indirecto' : 'Directo' }}</p>
                            </div>
                            <div class="col-md-6">
                                <h6><strong>Información del Cliente</strong></h6>
                                <p><strong>Razón Social:</strong> {{ reciboSeleccionado.razon_social }}</p>
                                <p><strong>NIT:</strong> {{ reciboSeleccionado.nit }}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <h6><strong>Información de la Factura</strong></h6>
                                <p><strong>Número:</strong> {{ reciboSeleccionado.numero_factura }}</p>
                                <p v-if="reciboSeleccionado && reciboSeleccionado.tipo_cliente === '1'">
                                    <strong>Electrónica:</strong> 
                                    <span v-if="reciboSeleccionado.electronica === 1 || reciboSeleccionado.electronica === '1'" class="badge badge-success">Sí</span>
                                    <span v-else class="badge badge-secondary">No</span>
                                </p>
                                <p><strong>Fecha Factura:</strong> {{ formatDate(reciboSeleccionado.fecha_factura) }}</p>
                                <p><strong>Total Factura:</strong> {{ formatCurrency(reciboSeleccionado.total_factura) }}</p>
                            </div>
                            <div class="col-md-6">
                                <h6><strong>Detalle del Pago</strong></h6>
                                <p><strong>Valor Abono:</strong> {{ formatCurrency(reciboSeleccionado.valor_abono) }}</p>
                                <p><strong>Retención:</strong> {{ formatCurrency(reciboSeleccionado.retencion) }}</p>
                                <p><strong>Descuento:</strong> {{ formatCurrency(reciboSeleccionado.descuento) }}</p>
                                <p><strong>Valor Nota:</strong> {{ formatCurrency(reciboSeleccionado.valor_nota) }}</p>
                                <p><strong>Saldo Pendiente:</strong> {{ formatCurrency(reciboSeleccionado.pendiente) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button 
                            v-if="reciboSeleccionado && reciboSeleccionado.tipo_cliente === '1'"
                            type="button" 
                            class="btn btn-primary" 
                            @click="imprimirRecibo(reciboSeleccionado.num_recibo_caja)"
                        >
                            <i class="fas fa-print"></i> Imprimir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GestionRecibosCaja',
    data() {
        return {
            loading: false,
            busquedaRealizada: false,
            recibos: [],
            reciboSeleccionado: null,
            filtros: {
                num_recibo: '',
                tipo_cliente: ''
            }
        }
    },
    mounted() {
        // Componente listo sin configuraciones iniciales
    },
    computed: {
        mostrarElectronica() {
            // Mostrar columna de electrónica solo si hay recibos de clientes indirectos (tipo 1)
            return this.recibos.some(recibo => recibo.tipo_cliente === '1');
        },
        totalValorAbono() {
            // Suma total de los valores de abono del recibo
            return this.recibos.reduce((total, recibo) => {
                return total + parseFloat(recibo.valor_abono || 0);
            }, 0);
        }
    },
    methods: {
        async buscarRecibos() {
            this.loading = true;
            this.busquedaRealizada = true;
            this.recibos = []; // Limpiar resultados anteriores
            
            try {
                // Validar que se haya ingresado número de recibo
                if (!this.filtros.num_recibo) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campo requerido',
                        text: 'Debe ingresar el número de recibo para realizar la búsqueda'
                    });
                    this.loading = false;
                    return;
                }

                // Validar que se haya seleccionado tipo de cliente
                if (!this.filtros.tipo_cliente) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campo requerido',
                        text: 'Debe seleccionar el tipo de cliente para realizar la búsqueda'
                    });
                    this.loading = false;
                    return;
                }

                let url = '';
                
                // Determinar la ruta según el tipo de cliente
                if (this.filtros.tipo_cliente == '1') {
                    // Clientes indirectos - tabla cobros
                    url = `/cobro/${this.filtros.num_recibo}`;
                } else if (this.filtros.tipo_cliente == '2') {
                    // Clientes directos - tabla abonopedidos
                    url = `/abono/${this.filtros.num_recibo}`;
                }

                const response = await axios.get(url);
                
                // Procesar los datos según el tipo de cliente
                this.recibos = this.procesarDatosRecibo(response.data, this.filtros.tipo_cliente);
                
                if (this.recibos.length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Sin resultados',
                        text: 'No se encontraron recibos con el número especificado'
                    });
                }
            } catch (error) {
                console.error('Error al buscar recibos:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al buscar los recibos'
                });
            } finally {
                this.loading = false;
            }
        },

        procesarDatosRecibo(data, tipoCliente) {
            return data.map(item => {
                return {
                    id: item.id,
                    num_recibo_caja: item.num_recibo_caja,
                    razon_social: item.razon_social,
                    nit: item.nit,
                    fecha_factura: item.fecha_factura,
                    numero_factura: item.numero_factura,
                    electronica: tipoCliente == '1' ? item.electronica : null, // Solo para clientes indirectos
                    total_factura: item.total_factura,
                    fecha_pago: item.fecha_pago,
                    saldo: item.saldo,
                    valor_abono: item.valor_abono,
                    retencion: item.retencion || 0,
                    descuento: item.descuento || 0,
                    valor_nota: item.valor_nota || 0,
                    pendiente: item.pendiente || 0,
                    tipo_cliente: tipoCliente,
                    estado_id: item.estado_id,
                    // Incluir IDs necesarios para cancelación
                    factura_id: tipoCliente == '1' ? item.factura_id : null,
                    venta_id: tipoCliente == '2' ? item.venta_id : null
                };
            });
        },
        
        verDetalle(recibo) {
            this.reciboSeleccionado = recibo;
            $('#modalDetalleRecibo').modal('show');
        },
        
        imprimirRecibo(numRecibo) {
            window.open(`/recibo-caja/${numRecibo}`, '_blank');
        },

        async cancelarRecibo(numRecibo, tipoCliente, facturaId, ventaId) {
            // Confirmar la cancelación
            const result = await Swal.fire({
                title: '¿Confirmar cancelación?',
                text: `¿Está seguro de cancelar el recibo N° ${numRecibo}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'No, mantener'
            });

            if (result.isConfirmed) {
                try {
                    let url = '';
                    let payload = { num_recibo_caja: numRecibo };
                    
                    // Determinar la ruta y datos según el tipo de cliente
                    if (tipoCliente === '1') {
                        // Clientes indirectos - enviar factura_id
                        url = `/cancelar-cobro/${numRecibo}`;
                        payload.factura_id = facturaId;
                    } else if (tipoCliente === '2') {
                        // Clientes directos - enviar venta_id
                        url = `/cancelar-abono/${numRecibo}`;
                        payload.venta_id = ventaId;
                    }

                    const response = await axios.put(url, payload);
                    
                    if (response.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Recibo cancelado',
                            text: 'El recibo ha sido cancelado exitosamente'
                        });
                        
                        // Actualizar la búsqueda para mostrar el estado actualizado
                        this.buscarRecibos();
                    } else {
                        throw new Error(response.data.message || 'Error al cancelar el recibo');
                    }
                } catch (error) {
                    console.error('Error al cancelar recibo:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || 'Ocurrió un error al cancelar el recibo'
                    });
                }
            }
        },
        
        formatDate(date) {
            if (!date) return 'N/A';
            return new Date(date).toLocaleDateString('es-CO');
        },
        
        formatCurrency(value) {
            if (!value) return '$0';
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(value);
        }
    }
}
</script>

<style scoped>
/* Estilos principales simplificados */
.gestion-recibos-wrapper {
    padding: 20px;
    background-color: #f5f5f5;
}

.abonos-container {
    max-width: 100%;
}

/* Header simple */
.professional-header {
    background: #007bff;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
}

.professional-header h2 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

/* Sección de búsqueda simple */
.search-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    gap: 15px;
    align-items: end;
    flex-wrap: wrap;
}

.search-field {
    flex: 1;
    min-width: 200px;
}

.form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.professional-input,
.professional-select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    min-height: 42px;
}

.professional-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4z'/><path fill='%23666' d='m0 3 2 2 2-2z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px 10px;
    padding-right: 35px;
}

.professional-input:focus,
.professional-select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0,123,255,0.3);
}

.search-button {
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.search-button:hover:not(:disabled) {
    background: #218838;
}

.search-button:disabled {
    background: #6c757d;
    cursor: not-allowed;
}

/* Alert simple */
.professional-alert {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    border-radius: 4px;
    padding: 15px;
    margin-top: 15px;
}

.alert-content {
    display: flex;
    align-items: center;
}

.custom-icon {
    margin-right: 10px;
    color: #0c5460;
    font-size: 18px;
}

/* Loading simple */
.loading-section {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 8px;
    margin: 20px 0;
}

.loading-content i {
    font-size: 48px;
    color: #007bff;
}

.loading-text {
    margin: 15px 0;
    font-size: 16px;
    color: #666;
}

/* Resultados */
.results-section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
}

/* Tabla simple */
.professional-table-wrapper {
    overflow-x: auto;
    margin-top: 20px;
}

.professional-table {
    width: 100%;
    border-collapse: collapse;
}

.professional-table th {
    background: #f8f9fa;
    padding: 12px 8px;
    border: 1px solid #ddd;
    font-weight: bold;
    text-align: left;
    font-size: 13px;
}

.professional-table td {
    padding: 10px 8px;
    border: 1px solid #ddd;
    font-size: 13px;
}

.professional-table tbody tr:hover {
    background-color: #f5f5f5;
}

/* Badges simples */
.badge {
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: bold;
    color: white;
}

.bg-primary { background: #007bff; }
.bg-info { background: #17a2b8; }
.bg-success { background: #28a745; }
.bg-danger { background: #dc3545; }
.bg-warning { background: #ffc107; color: #212529; }
.bg-secondary { background: #6c757d; }

/* Botones simples */
.btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    margin-right: 3px;
}

.btn-primary { background: #007bff; color: white; }
.btn-info { background: #17a2b8; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-outline-primary { 
    background: transparent; 
    color: #007bff; 
    border: 1px solid #007bff; 
}

.btn:hover {
    opacity: 0.9;
}

/* Mobile cards */
.mobile-cards .mobile-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
    overflow: hidden;
}

.mobile-card .card-header {
    background: #007bff !important;
    color: white;
    padding: 15px;
}

.mobile-card .card-body {
    padding: 15px;
}

.info-card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
}

/* Sin resultados */
.no-results {
    text-align: center;
    padding: 40px;
    color: #666;
}

.no-results i {
    font-size: 48px;
    margin-bottom: 15px;
    color: #ccc;
}

/* Modal simple */
.modal-content-professional {
    border-radius: 8px;
}

.modal-header-professional {
    background: #007bff;
    color: white;
    padding: 15px;
}

.modal-body-professional {
    padding: 20px;
}

/* Responsive */
@media (max-width: 768px) {
    .search-section {
        flex-direction: column;
        align-items: stretch;
    }
    
    .search-field {
        min-width: auto;
    }
    
    .gestion-recibos-wrapper {
        padding: 10px;
    }
    
    .professional-header h2 {
        font-size: 20px;
    }
    
    .professional-table th,
    .professional-table td {
        padding: 8px 4px;
        font-size: 12px;
    }
}
</style>