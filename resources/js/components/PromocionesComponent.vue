<template>
    <div>
        <!-- Área de carga de archivo -->
        <div class="mb-4">
            <div class="upload-area" 
                 @click="$refs.fileInput.click()"
                 @dragover.prevent="dragover"
                 @dragleave.prevent="dragleave"
                 @drop.prevent="drop"
                 :class="{ 'dragover': isDragover }">
                <i class="fas fa-cloud-upload-alt fa-3x mb-3" style="color: #667eea;"></i>
                <h5>Subir archivo de promociones</h5>
                <p class="text-muted mb-0">
                    Haz clic aquí o arrastra un archivo Excel (.xlsx, .xls, .csv)
                </p>
                <input 
                    type="file" 
                    ref="fileInput" 
                    @change="handleFileSelect" 
                    accept=".xlsx,.xls,.csv"
                    style="display: none;"
                >
            </div>
            
            <div v-if="selectedFile" class="mt-3">
                <div class="alert alert-info">
                    <i class="fas fa-file-excel me-2"></i>
                    <strong>Archivo seleccionado:</strong> {{ selectedFile.name }}
                    <button type="button" class="btn btn-sm btn-outline-danger ms-2" @click="clearFile">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <!-- Campo para nombre del archivo -->
                <div class="mb-3">
                    <label for="nombreArchivo" class="form-label">Nombre del archivo:</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="nombreArchivo"
                        v-model="nombreArchivo" 
                        placeholder="Ingresa un nombre descriptivo para el archivo"
                        :disabled="loading"
                    >
                </div>
                
                <button type="button" class="btn btn-primary" @click="uploadFile" :disabled="loading || !nombreArchivo.trim()">
                    <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
                    <i v-else class="fas fa-save me-2"></i>
                    {{ loading ? 'Guardando...' : 'Guardar Archivo' }}
                </button>
            </div>
        </div>

        <!-- Spinner de carga -->
        <div v-if="loading" class="loading-spinner">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Procesando archivo Excel...</p>
        </div>

        <!-- Alertas -->
        <div v-if="alert.show" :class="'alert alert-' + alert.type" class="mb-4">
            <i :class="'fas fa-' + (alert.type === 'success' ? 'check-circle' : 'exclamation-circle') + ' me-2'"></i>
            {{ alert.message }}
        </div>

        <!-- Tabla de archivos guardados -->
        <div v-if="archivos.length > 0" class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre del Archivo</th>
                        <th>Fecha de Subida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="archivo in archivos" :key="archivo.id">
                        <td>
                            <i class="fas fa-file-excel text-success me-2"></i>
                            <strong>{{ archivo.nombre_archivo }}</strong>
                        </td>
                        <td>{{ formatDateTime(archivo.created_at) }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button 
                                    type="button" 
                                    class="btn btn-sm btn-outline-info"
                                    @click="visualizarArchivo(archivo.id)"
                                    :disabled="loading"
                                    title="Visualizar archivo"
                                >
                                    <i v-if="loading && loadingFileId === archivo.id" class="fas fa-spinner fa-spin me-1"></i>
                                    <i v-else class="fas fa-eye me-1"></i>
                                    {{ loading && loadingFileId === archivo.id ? 'Cargando...' : 'Ver' }}
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn-sm btn-outline-primary"
                                    @click="descargarArchivo(archivo.id)"
                                    :disabled="downloading === archivo.id"
                                    title="Descargar archivo"
                                >
                                    <i v-if="downloading === archivo.id" class="fas fa-spinner fa-spin me-1"></i>
                                    <i v-else class="fas fa-download me-1"></i>
                                    {{ downloading === archivo.id ? 'Descargando...' : 'Descargar' }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Paginación -->
            <div v-if="pagination.last_page > 1" class="d-flex justify-content-center mt-4">
                <nav>
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                            <button class="page-link" @click="changePage(pagination.current_page - 1)" :disabled="pagination.current_page === 1">
                                Anterior
                            </button>
                        </li>
                        <li 
                            v-for="page in getVisiblePages()" 
                            :key="page" 
                            class="page-item" 
                            :class="{ active: page === pagination.current_page }"
                        >
                            <button class="page-link" @click="changePage(page)">{{ page }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                            <button class="page-link" @click="changePage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page">
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <div class="mt-3 text-center">
                <p class="text-muted">
                    <i class="fas fa-info-circle me-2"></i>
                    Mostrando {{ archivos.length }} de {{ pagination.total }} archivos
                </p>
            </div>
        </div>

        <!-- Estado vacío -->
        <div v-else-if="!loading" class="text-center py-5">
            <i class="fas fa-file-excel fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No hay archivos guardados</h5>
            <p class="text-muted">Sube un archivo Excel para comenzar</p>
        </div>

        <!-- Modal Bootstrap-Vue para visualizar archivo -->
        <b-modal 
            id="visualizarModal" 
            v-model="showModal"
            size="xl" 
            title="Visualizar Archivo"
            hide-footer
            scrollable
            @hidden="limpiarDatosModal"
        >
            <template #modal-title>
                <i class="fas fa-file-excel text-success mr-2"></i>
                {{ archivoVisualizando.nombre }}
            </template>
            
            <!-- Información del archivo -->
            <div class="row mb-3">
                <div class="col-md-3">
                    <small class="text-muted">Fecha de subida:</small><br>
                    <strong>{{ archivoVisualizando.fecha_subida }}</strong>
                </div>
                <div class="col-md-3">
                    <small class="text-muted">Filas:</small><br>
                    <strong>{{ archivoVisualizando.filas }}</strong>
                </div>
                <div class="col-md-3">
                    <small class="text-muted">Columnas:</small><br>
                    <strong>{{ archivoVisualizando.columnas }}</strong>
                </div>
                <div class="col-md-3">
                    <small class="text-muted">Tamaño:</small><br>
                    <strong>{{ archivoVisualizando.filas }} x {{ archivoVisualizando.columnas }}</strong>
                </div>
            </div>

            <!-- Contenido del archivo -->
            <div class="table-responsive" style="max-height: 500px; overflow-y: auto;">
                <table class="table table-sm table-bordered">
                    <thead class="table-light sticky-top">
                        <tr>
                            <th v-for="(header, index) in archivoVisualizando.headers" :key="index" style="white-space: nowrap;">
                                {{ header || `Columna ${index + 1}` }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in archivoVisualizando.data" :key="rowIndex">
                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" style="white-space: nowrap;">
                                {{ cell || '' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mensaje si no hay datos -->
            <div v-if="!archivoVisualizando.data || archivoVisualizando.data.length === 0" class="text-center py-4">
                <i class="fas fa-info-circle text-muted fa-2x mb-2"></i>
                <p class="text-muted">No hay datos para mostrar en este archivo</p>
            </div>
            
            <!-- Footer personalizado -->
            <template #modal-footer>
                <b-button variant="secondary" @click="cerrarModal">
                    <i class="fas fa-times mr-1"></i>
                    Cerrar
                </b-button>
                <b-button variant="primary" @click="descargarArchivoDesdeModal">
                    <i class="fas fa-download mr-1"></i>
                    Descargar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'PromocionesComponent',
    data() {
        return {
            selectedFile: null,
            nombreArchivo: '',
            loading: false,
            loadingFileId: null,
            downloading: null,
            isDragover: false,
            showModal: false,
            archivos: [],
            pagination: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0
            },
            alert: {
                show: false,
                type: 'success',
                message: ''
            },
            archivoVisualizando: {
                id: null,
                nombre: '',
                fecha_subida: '',
                filas: 0,
                columnas: 0,
                headers: [],
                data: []
            }
        };
    },
    mounted() {
        this.loadArchivos();
    },
    beforeDestroy() {
        // Cerrar modal si está abierto
        this.showModal = false;
    },
    methods: {
        dragover(e) {
            this.isDragover = true;
        },
        dragleave(e) {
            this.isDragover = false;
        },
        drop(e) {
            this.isDragover = false;
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.selectedFile = files[0];
                this.validateFile();
            }
        },
        handleFileSelect(e) {
            this.selectedFile = e.target.files[0];
            if (this.selectedFile) {
                // Sugerir un nombre basado en el nombre del archivo
                this.nombreArchivo = this.selectedFile.name.replace(/\.[^/.]+$/, "");
            }
            this.validateFile();
        },
        validateFile() {
            if (!this.selectedFile) return;
            
            const allowedTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'text/csv'
            ];
            
            if (!allowedTypes.includes(this.selectedFile.type)) {
                this.showAlert('danger', 'Tipo de archivo no válido. Solo se permiten archivos Excel (.xlsx, .xls) o CSV.');
                this.selectedFile = null;
                return;
            }
            
            if (this.selectedFile.size > 10 * 1024 * 1024) { // 10MB
                this.showAlert('danger', 'El archivo es demasiado grande. El tamaño máximo es 10MB.');
                this.selectedFile = null;
                return;
            }
        },
        clearFile() {
            this.selectedFile = null;
            this.nombreArchivo = '';
            this.$refs.fileInput.value = '';
            this.hideAlert();
        },
        async uploadFile() {
            if (!this.selectedFile || !this.nombreArchivo.trim()) return;
            
            this.loading = true;
            this.hideAlert();
            
            const formData = new FormData();
            formData.append('archivo_excel', this.selectedFile);
            formData.append('nombre_archivo', this.nombreArchivo.trim());
            
            try {
                const response = await axios.post('/promociones/importar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                if (response.data.success) {
                    this.showAlert('success', 'Archivo guardado exitosamente.');
                    this.clearFile();
                    this.loadArchivos(); // Recargar la lista de archivos
                } else {
                    this.showAlert('danger', response.data.message || 'Error al guardar el archivo.');
                }
            } catch (error) {
                console.error('Error:', error);
                this.showAlert('danger', 'Error al subir el archivo. Por favor, inténtalo de nuevo.');
            } finally {
                this.loading = false;
            }
        },
        async loadArchivos(page = 1) {
            this.loading = true;
            
            try {
                const response = await axios.get(`/promociones?page=${page}`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (response.data.success) {
                    this.archivos = response.data.data;
                    this.pagination = {
                        current_page: response.data.current_page,
                        last_page: response.data.last_page,
                        per_page: response.data.per_page,
                        total: response.data.total
                    };
                }
            } catch (error) {
                console.error('Error al cargar archivos:', error);
                this.showAlert('danger', 'Error al cargar los archivos.');
            } finally {
                this.loading = false;
            }
        },
        async descargarArchivo(id) {
            this.downloading = id;
            
            try {
                window.open(`/promociones/descargar/${id}`, '_blank');
            } catch (error) {
                console.error('Error al descargar archivo:', error);
                this.showAlert('danger', 'Error al descargar el archivo.');
            } finally {
                this.downloading = null;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.pagination.last_page && page !== this.pagination.current_page) {
                this.loadArchivos(page);
            }
        },
        getVisiblePages() {
            const current = this.pagination.current_page;
            const last = this.pagination.last_page;
            const pages = [];
            
            if (last <= 7) {
                for (let i = 1; i <= last; i++) {
                    pages.push(i);
                }
            } else {
                if (current <= 4) {
                    for (let i = 1; i <= 5; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push(last);
                } else if (current >= last - 3) {
                    pages.push(1);
                    pages.push('...');
                    for (let i = last - 4; i <= last; i++) {
                        pages.push(i);
                    }
                } else {
                    pages.push(1);
                    pages.push('...');
                    for (let i = current - 1; i <= current + 1; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push(last);
                }
            }
            
            return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page));
        },
        showAlert(type, message) {
            this.alert = {
                show: true,
                type: type,
                message: message
            };
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                this.hideAlert();
            }, 5000);
        },
        hideAlert() {
            this.alert.show = false;
        },
        async visualizarArchivo(id) {
            this.loading = true;
            this.loadingFileId = id;
            
            try {
                const response = await axios.get(`/promociones/visualizar/${id}`);
                
                if (response.data.success) {
                    const data = response.data.data;
                    const info = response.data.info;
                    
                    // Verificar que tenemos datos
                    if (!data || data.length === 0) {
                        this.showAlert('warning', 'El archivo no contiene datos para mostrar.');
                        return;
                    }
                    
                    // Configurar datos para el modal
                    this.archivoVisualizando = {
                        id: id,
                        nombre: info.nombre,
                        fecha_subida: info.fecha_subida,
                        filas: info.filas,
                        columnas: info.columnas,
                        headers: data.length > 0 ? data[0] : [],
                        data: data.length > 1 ? data.slice(1) : []
                    };
                    
                    // Mostrar el modal de Bootstrap-Vue
                    this.showModal = true;
                } else {
                    this.showAlert('danger', response.data.message || 'Error al visualizar el archivo.');
                }
            } catch (error) {
                console.error('Error al visualizar archivo:', error);
                
                // Mostrar mensaje de error más específico
                let errorMessage = 'Error al visualizar el archivo.';
                if (error.response) {
                    if (error.response.status === 404) {
                        errorMessage = 'Archivo no encontrado.';
                    } else if (error.response.data && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                this.showAlert('danger', errorMessage);
            } finally {
                this.loading = false;
                this.loadingFileId = null;
            }
        },
        descargarArchivoDesdeModal() {
            if (this.archivoVisualizando.id) {
                this.descargarArchivo(this.archivoVisualizando.id);
                // Cerrar el modal
                this.showModal = false;
            }
        },
        cerrarModal() {
            // Cerrar el modal de Bootstrap-Vue
            this.showModal = false;
        },
        limpiarDatosModal() {
            // Limpiar datos cuando el modal se cierre
            this.archivoVisualizando = {
                id: null,
                nombre: '',
                fecha_subida: '',
                filas: 0,
                columnas: 0,
                headers: [],
                data: []
            };
        },
        formatDateTime(datetime) {
            if (!datetime) return '-';
            try {
                const date = new Date(datetime);
                return date.toLocaleString('es-CO', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch (e) {
                return datetime;
            }
        }
    }
};
</script>

<style scoped>
/* Estilos para el modal Bootstrap-Vue */
.modal-xl {
    max-width: 90% !important;
}



/* Estilos para la tabla en el modal */
.table-responsive {
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
}

.sticky-top {
    position: sticky;
    top: 0;
    z-index: 10;
}

/* Mejorar la visualización de celdas */
.table td, .table th {
    vertical-align: middle;
    padding: 0.5rem;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Estilos para el área de drag & drop */
.drag-over {
    border-color: #007bff !important;
    background-color: rgba(0, 123, 255, 0.1) !important;
}

.upload-area {
    transition: all 0.3s ease;
}

.upload-area:hover {
    background-color: #f8f9fa;
}

/* Estilos para los botones de acción */
.btn-group .btn {
    margin-right: 0;
}

/* Estilos para la paginación */
.pagination .page-link {
    color: #007bff;
}

.pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
}

/* Asegurar que los iconos estén alineados */
.fas {
    width: 1em;
    text-align: center;
}
</style>