<template>
    <v-app>
        <div class="laboratorios-container">
            <!-- Professional Loading State -->
            <div v-if="loader" class="loading-container">
                <div class="loading-content">
                    <div class="professional-loader">
                        <div class="loader-spinner"></div>
                        <div class="loader-pulse"></div>
                    </div>
                    <div class="loading-text">
                        <h5 class="loading-title">Cargando laboratorios...</h5>
                        <p class="loading-subtitle">Procesando información de laboratorios farmacéuticos...</p>
                        <div class="loading-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="laboratorios-content">
                <!-- Header Section -->
                <div class="header-section">
                    <div class="page-header">
                        <h2 class="page-title">
                            <i class="fas fa-flask mr-3"></i>
                            Gestión de Laboratorios
                        </h2>
                        <p class="page-description">
                            Administra los laboratorios farmacéuticos y sus datos principales.
                        </p>
                    </div>
                    
                    <div class="header-actions">
                        <div class="search-box">
                            <i class="fas fa-search search-icon"></i>
                            <input 
                                type="text" 
                                class="form-control search-input" 
                                v-model="search" 
                                placeholder="Buscar laboratorios..."
                            >
                        </div>
                        <button class="btn btn-primary new-lab-btn" @click="openModal()">
                            <i class="fas fa-plus mr-2"></i>
                            Nuevo Laboratorio
                        </button>
                    </div>
                </div>

                <!-- Professional Content -->
                <div class="professional-report-container">
                    <!-- Desktop/Tablet Table -->
                    <div class="desktop-table">
                        <div class="table-responsive professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            <i class="fas fa-image"></i>
                                            Logo
                                        </th>
                                        <th class="text-left">
                                            <i class="fas fa-industry"></i>
                                            Laboratorio
                                        </th>
                                        <th class="text-center">
                                            <i class="fas fa-tag"></i>
                                            Prefijo
                                        </th>
                                        <th class="text-center">
                                            <i class="fas fa-cogs"></i>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedLaboratorios" :key="index" class="data-row">
                                        <td class="text-center logo-cell">
                                            <img 
                                                :src="item.logo || '/images/default-lab.png'" 
                                                :alt="'Logo ' + (item.Laboratorio || 'Laboratorio')" 
                                                class="lab-logo"
                                                @error="$event.target.src = '/images/default-lab.png'"
                                            >
                                        </td>
                                        <td class="text-left lab-cell">
                                            <div class="lab-name">
                                                <i class="fas fa-industry lab-icon"></i>
                                                <span class="name-text">{{ item.Laboratorio || 'Sin nombre' }}</span>
                                            </div>
                                        </td>
                                        <td class="text-center prefix-cell">
                                            <span class="prefix-badge">{{ item.prefijo || 'N/A' }}</span>
                                        </td>
                                        <td class="text-center actions-cell">
                                            <div class="action-buttons">
                                                <button 
                                                    class="action-btn btn-edit" 
                                                    @click="editLaboratorio(item)"
                                                    title="Editar laboratorio"
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Mobile Cards -->
                    <div class="mobile-cards-container">
                        <div v-for="(item, index) in paginatedLaboratorios" :key="index" class="lab-card">
                            <div class="card-header">
                                <div class="lab-info">
                                    <div class="lab-logo-mobile">
                                        <img 
                                            :src="item.logo || '/images/default-lab.png'" 
                                            :alt="'Logo ' + (item.Laboratorio || 'Laboratorio')"
                                            @error="$event.target.src = '/images/default-lab.png'"
                                        >
                                    </div>
                                    <div class="lab-details">
                                        <span class="lab-name-mobile">{{ item.Laboratorio || 'Sin nombre' }}</span>
                                        <span class="prefix-badge-mobile">{{ item.prefijo || 'N/A' }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card-body">
                                <div class="actions-section">
                                    <button 
                                        @click="editLaboratorio(item)" 
                                        class="mobile-action-btn edit-btn"
                                    >
                                        <i class="fas fa-edit"></i>
                                        Editar Laboratorio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div class="pagination-section" v-if="filteredLaboratorios.length > 0">
                        <div class="pagination-info">
                            <div class="items-per-page">
                                <span class="pagination-label">Mostrar:</span>
                                <select 
                                    v-model="itemsPerPage" 
                                    @change="changeItemsPerPage(itemsPerPage)"
                                    class="items-select"
                                >
                                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <span class="pagination-label">registros</span>
                            </div>
                            <div class="page-info">
                                <span class="page-info-text">
                                    Mostrando {{ paginationInfo.start }} - {{ paginationInfo.end }} de {{ paginationInfo.total }} registros
                                </span>
                            </div>
                        </div>
                        
                        <div class="pagination-controls">
                            <button 
                                @click="prevPage" 
                                :disabled="currentPage === 1"
                                class="pagination-btn prev-btn"
                            >
                                <i class="fas fa-chevron-left"></i>
                                Anterior
                            </button>
                            
                            <div class="page-numbers">
                                <button 
                                    v-for="page in getVisiblePages()" 
                                    :key="page"
                                    @click="goToPage(page)"
                                    :class="['page-btn', { 'active': page === currentPage, 'ellipsis': page === '...' }]"
                                    :disabled="page === '...'"
                                >
                                    {{ page }}
                                </button>
                            </div>
                            
                            <button 
                                @click="nextPage" 
                                :disabled="currentPage === totalPages"
                                class="pagination-btn next-btn"
                            >
                                Siguiente
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Professional Bootstrap Modal -->
                <b-modal 
                    id="modal-laboratorio" 
                    v-model="dialog"
                    no-close-on-backdrop 
                    scrollable 
                    centered 
                    hide-footer 
                    :title="formTitle"
                    size="lg"
                    @hidden="resetForm"
                >
                    <div class="row">
                        <div class="col-12">
                            <label for="laboratorio">Nombre del Laboratorio</label>
                            <input 
                                type="text" 
                                id="laboratorio" 
                                class="form-control" 
                                v-model="laboratorio.Laboratorio"
                                :class="{'is-invalid': hasError('Laboratorio')}"
                                placeholder="Ingrese el nombre del laboratorio"
                                @input="clearError('Laboratorio')"
                            >
                            <div class="invalid-feedback" v-if="hasError('Laboratorio')">{{ firstError('Laboratorio') }}</div>
                        </div>
                        
                        <div class="col-6">
                            <label for="prefijo">Prefijo (3 letras)</label>
                            <input 
                                type="text" 
                                id="prefijo" 
                                class="form-control" 
                                v-model="laboratorio.prefijo"
                                :class="{'is-invalid': hasError('prefijo')}"
                                maxlength="3"
                                placeholder="Ej: LAB"
                                @input="handlePrefijoInput"
                            >
                            <div class="invalid-feedback" v-if="hasError('prefijo')">{{ firstError('prefijo') }}</div>
                            <small class="form-text text-muted">Exactamente 3 letras (se convertirá a mayúsculas)</small>
                        </div>
                        
                        <div class="col-6">
                            <label for="logo">Logo del Laboratorio</label>
                            <div class="logo-upload-section">
                                <div class="upload-area" @click="$refs.fileInput.click()">
                                    <div v-if="!logoPreview" class="upload-placeholder">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <span>Seleccionar imagen</span>
                                    </div>
                                    <div v-else class="logo-preview">
                                        <img :src="logoPreview" alt="Logo preview" class="preview-image">
                                        <div class="overlay">
                                            <i class="fas fa-edit"></i>
                                            <span>Cambiar imagen</span>
                                        </div>
                                    </div>
                                </div>
                                <input 
                                    ref="fileInput"
                                    type="file" 
                                    @change="handleFileUpload"
                                    accept="image/*"
                                    style="display: none;"
                                >
                                <small class="form-text text-muted">Formatos: JPG, PNG, GIF (máx. 2MB)</small>
                            </div>
                        </div>
                        
                        <!-- Mostrar errores generales -->
                        <div class="col-12" v-if="errors && errors.length > 0">
                            <div class="alert alert-danger" role="alert">
                                <ul class="mb-0">
                                    <li v-for="(error, index) in errors" :key="index">
                                        {{ error }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Botones de acción -->
                        <div class="col-6">
                            <button class="btn btn-outline-secondary btn-block" @click="closeModal">
                                <i class="fas fa-times mr-2"></i>Cancelar
                            </button>
                        </div>
                        <div class="col-6">
                            <button 
                                class="btn btn-warning btn-block" 
                                @click="updateLaboratorio" 
                                v-if="editedIndex >= 0"
                                :disabled="saveLoader"
                            >
                                <i v-if="!saveLoader" class="fas fa-save mr-2"></i>
                                <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                                {{ saveLoader ? 'Guardando...' : 'Guardar cambios' }}
                            </button>
                            <button 
                                class="btn btn-primary btn-block" 
                                @click="saveLaboratorio" 
                                v-else
                                :disabled="saveLoader"
                            >
                                <i v-if="!saveLoader" class="fas fa-plus mr-2"></i>
                                <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                                {{ saveLoader ? 'Creando...' : 'Crear laboratorio' }}
                            </button>
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {
    props: {
        laboratorios: {
            type: Array,
            default: () => []
        }
    },
    
    data() {
        return {
            loader: true,
            saveLoader: false, // Loader para guardar/actualizar
            search: '',
            dialog: false,
            editedIndex: -1,
            logoPreview: null,
            errors: [],
            validationErrors: {
                Laboratorio: [],
                prefijo: []
            },
            // Paginación
            currentPage: 1,
            itemsPerPage: 15,
            itemsPerPageOptions: [10, 15, 25, 50],
            laboratorio: {
                id: null,
                Laboratorio: '',
                prefijo: '',
                logo: null
            },
            defaultLaboratorio: {
                id: null,
                Laboratorio: '',
                prefijo: '',
                logo: null
            }
        }
    },
    
    computed: {
        formTitle() {
            return this.editedIndex >= 0 ? 'Editar Laboratorio' : 'Nuevo Laboratorio'
        },
        filteredLaboratorios() {
            let filtered = this.laboratorios || [];
            
            // Aplicar filtro de búsqueda
            if (this.search && this.search.trim()) {
                filtered = filtered.filter(laboratorio => {
                    if (!laboratorio) return false;
                    
                    const nombre = laboratorio.Laboratorio || '';
                    const prefijo = laboratorio.prefijo || '';
                    const searchTerm = this.search.toLowerCase();
                    
                    return nombre.toLowerCase().includes(searchTerm) ||
                           prefijo.toLowerCase().includes(searchTerm);
                });
            }
            
            return filtered;
        },
        paginatedLaboratorios() {
            const filtered = this.filteredLaboratorios || [];
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return filtered.slice(start, end);
        },
        totalPages() {
            const filtered = this.filteredLaboratorios || [];
            return Math.ceil(filtered.length / this.itemsPerPage);
        },
        paginationInfo() {
            const filtered = this.filteredLaboratorios || [];
            const start = filtered.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
            const end = Math.min(this.currentPage * this.itemsPerPage, filtered.length);
            return {
                start,
                end,
                total: filtered.length
            };
        }
    },
    
    watch: {
        search() {
            // Resetear página cuando cambie la búsqueda
            this.currentPage = 1;
        }
    },
    
    mounted() {
        // Simular carga de datos - reemplazar por llamada real a la API
        this.getLaboratorios();
    },
    
    methods: {
        // Métodos de paginación
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
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        changeItemsPerPage(newValue) {
            this.itemsPerPage = newValue;
            this.currentPage = 1; // Reset to first page
        },
        getVisiblePages() {
            const totalPages = this.totalPages;
            const current = this.currentPage;
            const delta = 2; // Número de páginas a mostrar a cada lado de la actual
            
            if (totalPages <= 7) {
                // Si hay 7 páginas o menos, mostrar todas
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }
            
            let pages = [];
            
            // Siempre mostrar la primera página
            pages.push(1);
            
            if (current - delta > 2) {
                pages.push('...');
            }
            
            // Páginas alrededor de la actual
            const start = Math.max(2, current - delta);
            const end = Math.min(totalPages - 1, current + delta);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (current + delta < totalPages - 1) {
                pages.push('...');
            }
            
            // Siempre mostrar la última página
            if (totalPages > 1) {
                pages.push(totalPages);
            }
            
            return pages;
        },
        
        getLaboratorios() {
            this.loader = true;
            
            axios.get('/laboratorios', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(res => {
                // Asignar los datos del backend al componente padre o manejar localmente
                // Como el componente recibe laboratorios como prop, emitir evento al padre
                this.$emit('laboratorios-loaded', res.data);
                this.loader = false;
            })
            .catch(err => {
                console.log('Error al cargar laboratorios:', err);
                this.showError('Error al cargar los laboratorios');
                this.loader = false;
            });
        },
        
        openModal() {
            this.resetForm();
            this.dialog = true;
        },
        
        closeModal() {
            this.dialog = false;
            this.resetForm();
        },
        
        hasError(field) {
            return !!(this.validationErrors && this.validationErrors[field] && this.validationErrors[field].length);
        },
        
        firstError(field) {
            return this.hasError(field) ? this.validationErrors[field][0] : null;
        },
        
        clearError(field) {
            if (this.validationErrors && this.validationErrors[field]) {
                this.$delete(this.validationErrors, field);
            }
        },
        
        resetForm() {
            this.laboratorio = Object.assign({}, this.defaultLaboratorio);
            this.editedIndex = -1;
            this.logoPreview = null;
            this.errors = [];
            this.saveLoader = false; // Resetear loader
            
            // Limpiar completamente todos los errores de validación
            this.validationErrors = {
                Laboratorio: [],
                prefijo: []
            };
            
            // Limpiar errores generales
            this.errors = [];
        },
        
        editLaboratorio(item) {
            if (!item) return;
            
            // Limpiar errores antes de abrir el modal para editar
            this.errors = [];
            this.saveLoader = false;
            this.validationErrors = {
                Laboratorio: [],
                prefijo: []
            };
            
            this.editedIndex = this.laboratorios.indexOf(item);
            this.laboratorio = Object.assign({}, item);
            this.logoPreview = item.logo || null;
            this.dialog = true;
        },
        
        handlePrefijoInput() {
            // Convertir a mayúsculas y limitar a 3 caracteres
            if (this.laboratorio.prefijo) {
                let value = this.laboratorio.prefijo.toUpperCase().replace(/[^A-Z]/g, '');
                this.laboratorio.prefijo = value.substring(0, 3);
            }
            this.clearError('prefijo');
        },
        
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Validar tamaño (2MB máx)
                if (file.size > 2 * 1024 * 1024) {
                    this.showError('El archivo no puede ser mayor a 2MB');
                    return;
                }
                
                // Validar tipo
                if (!file.type.startsWith('image/')) {
                    this.showError('Solo se permiten archivos de imagen');
                    return;
                }
                
                // Crear preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.logoPreview = e.target.result;
                    this.laboratorio.logo = file;
                };
                reader.readAsDataURL(file);
            }
        },
        
        validateForm() {
            this.validationErrors = {
                Laboratorio: [],
                prefijo: []
            };
            
            let isValid = true;
            
            // Validar nombre del laboratorio
            const nombreLab = this.laboratorio.Laboratorio || '';
            if (!nombreLab || nombreLab.trim() === '') {
                this.validationErrors.Laboratorio.push('El nombre del laboratorio es requerido');
                isValid = false;
            }
            
            // Validar prefijo
            const prefijo = this.laboratorio.prefijo || '';
            if (!prefijo || prefijo.length !== 3) {
                this.validationErrors.prefijo.push('El prefijo debe tener exactamente 3 letras');
                isValid = false;
            }
            
            return isValid;
        },
        
        clearError(field) {
            if (this.validationErrors && this.validationErrors[field]) {
                this.validationErrors[field] = [];
            }
        },
        
        showError(message) {
            this.errors = [message];
        },
        
        showSuccessMessage(message) {
            // Usar SweetAlert2 si está disponible
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: message,
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                // Fallback simple
                alert(message);
            }
        },
        
        saveLaboratorio() {
            if (!this.validateForm()) {
                return;
            }
            
            this.saveLoader = true; // Activar loader
            
            // Asegurar que el prefijo esté en mayúsculas
            const prefijo = this.laboratorio.prefijo || '';
            this.laboratorio.prefijo = prefijo.toUpperCase();
            
            // Crear FormData para enviar archivos
            const formData = new FormData();
            formData.append('Laboratorio', this.laboratorio.Laboratorio);
            formData.append('prefijo', this.laboratorio.prefijo);
            
            // Agregar logo si existe
            if (this.laboratorio.logo && this.laboratorio.logo instanceof File) {
                formData.append('logo', this.laboratorio.logo);
            }
            
            // Llamada real a la API
            axios.post('/laboratorios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(res => {
                this.saveLoader = false; // Desactivar loader
                if (res.data.id) {
                    // Mostrar mensaje de éxito
                    this.showSuccessMessage('Laboratorio creado exitosamente');
                    // Recargar la página para mostrar los cambios
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                } else {
                    this.validationErrors = res.data.errors || res.data || {};
                }
            })
            .catch(err => {
                this.saveLoader = false; // Desactivar loader
                // Captura validación 422 de Laravel
                if (err.response && err.response.status === 422) {
                    this.validationErrors = err.response.data.errors || {};
                } else {
                    console.log(err);
                    this.showError('Error al guardar el laboratorio');
                }
            });
        },
        
        updateLaboratorio() {
            if (!this.validateForm()) {
                return;
            }
            
            this.saveLoader = true; // Activar loader
            
            // Asegurar que el prefijo esté en mayúsculas
            const prefijo = this.laboratorio.prefijo || '';
            this.laboratorio.prefijo = prefijo.toUpperCase();
            
            // Crear FormData para enviar archivos
            const formData = new FormData();
            formData.append('Laboratorio', this.laboratorio.Laboratorio);
            formData.append('prefijo', this.laboratorio.prefijo);
            formData.append('_method', 'PUT'); // Laravel method spoofing
            
            // Agregar logo si existe y es un archivo nuevo
            if (this.laboratorio.logo && this.laboratorio.logo instanceof File) {
                formData.append('logo', this.laboratorio.logo);
            }
            
            // Llamada real a la API
            axios.post(`/laboratorios/${this.laboratorio.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(res => {
                this.saveLoader = false; // Desactivar loader
                if (res.data.status === 'ok') {
                    // Mostrar mensaje de éxito usando SweetAlert2
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Laboratorio actualizado',
                            text: 'Los cambios se han guardado correctamente',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if (result.value) {
                                location.reload();
                            }
                        });
                    } else {
                        // Fallback sin SweetAlert
                        this.showSuccessMessage('Laboratorio actualizado exitosamente');
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    }
                } else {
                    this.validationErrors = res.data.errors || res.data || {};
                }
            })
            .catch(err => {
                this.saveLoader = false; // Desactivar loader
                if (err.response && err.response.status === 422) {
                    this.validationErrors = err.response.data.errors || {};
                } else {
                    console.log(err);
                    this.showError('Error al actualizar el laboratorio');
                }
            });
        }
    }
}
</script>

<style scoped>
/* Professional Container */
.laboratorios-container {
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
.laboratorios-content {
    max-width: 1400px;
    margin: 0 auto;
}

.header-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
}

.page-header h2 {
    color: #2c3e50;
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
}

.page-description {
    color: #64748b;
    font-size: 1.1rem;
    margin: 0;
    font-weight: 400;
}

.header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    min-width: 300px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    z-index: 3;
    pointer-events: none;
}

.search-input {
    width: 100%;
    height: 50px;
    padding: 0 1rem 0 3rem !important;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.search-input::placeholder {
    color: #9ca3af;
    padding-left: 0;
}

.search-input:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: white;
}

.new-lab-btn {
    height: 50px;
    padding: 0 2rem;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.new-lab-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Mobile Cards - Hidden by default */
.mobile-cards-container {
    display: none;
}

.desktop-table {
    display: block;
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
}

/* Table Header */
.professional-table thead th {
    background: transparent;
    color: #374151;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 1.25rem 1rem;
    border-bottom: 2px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.professional-table thead th i {
    margin-right: 0.5rem;
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
.logo-cell {
    font-weight: 600;
    color: #1e293b;
    width: 80px;
}

.lab-logo {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    object-fit: contain;
    background: white;
    padding: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #e2e8f0;
}

.lab-cell {
    font-weight: 600;
    color: #1e293b;
}

.lab-name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.lab-icon {
    color: #17a2b8;
    font-size: 1rem;
    width: 20px;
    text-align: center;
}

.name-text {
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

.prefix-cell {
    color: #64748b;
    font-weight: 500;
}

.prefix-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    text-decoration: none;
}

.btn-edit {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.btn-edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

/* Mobile Cards Styles */
.lab-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.lab-card:hover {
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

.lab-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.lab-logo-mobile {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid #e2e8f0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lab-logo-mobile img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 5px;
}

.lab-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.lab-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.1rem;
    line-height: 1.2;
}

.prefix-badge-mobile {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    width: fit-content;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Actions Section Mobile */
.actions-section {
    display: flex;
    gap: 1rem;
}

.mobile-action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border: none;
}

.edit-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Professional Modal */
.professional-modal {
    border-radius: 20px !important;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
}

.modal-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
    color: white !important;
    font-size: 1.3rem !important;
    font-weight: 700 !important;
    padding: 1.5rem 2rem !important;
}

.modal-content {
    padding: 2rem !important;
    background: #f8fafc;
}

.field-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
}

/* Logo Upload Styles */
.logo-upload-section {
    width: 100%;
}

.upload-area {
    width: 100%;
    height: 150px;
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    overflow: hidden;
}

.upload-area:hover {
    border-color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
}

.upload-placeholder i {
    font-size: 2rem;
}

.logo-preview {
    position: relative;
    width: 100%;
    height: 100%;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: opacity 0.3s;
    gap: 0.5rem;
}

.upload-area:hover .overlay {
    opacity: 1;
}

.file-hint {
    color: #64748b;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    display: block;
}

.error-list {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    padding: 1rem;
}

.error-item {
    color: #dc2626;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.error-item:last-child {
    margin-bottom: 0;
}

.modal-actions {
    padding: 1.5rem 2rem !important;
    background: white;
    border-top: 1px solid #e2e8f0;
}

.cancel-btn {
    color: #64748b !important;
    font-weight: 600 !important;
}

.save-btn {
    font-weight: 600 !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Pagination Styles */
.pagination-section {
    background: white;
    border-top: 2px solid #f1f5f9;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.pagination-info {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.items-per-page {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
}

.items-select {
    padding: 0.5rem 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    background: white;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
}

.items-select:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.page-info-text {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #17a2b8;
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #9ca3af;
}

.page-numbers {
    display: flex;
    gap: 0.25rem;
    margin: 0 1rem;
}

.page-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-btn:hover:not(:disabled):not(.ellipsis) {
    border-color: #17a2b8;
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.page-btn.active {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-color: #17a2b8;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.page-btn.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    color: #9ca3af;
}

.page-btn.ellipsis:hover {
    background: transparent;
    border: none;
}

/* Responsive Pagination */
@media (max-width: 768px) {
    .pagination-section {
        padding: 1rem;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }
    
    .pagination-info {
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .items-per-page {
        justify-content: center;
    }
    
    .pagination-controls {
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .page-numbers {
        margin: 0 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .pagination-btn {
        font-size: 0.8rem;
        padding: 0.6rem 0.8rem;
    }
    
    .page-btn {
        width: 35px;
        height: 35px;
        font-size: 0.8rem;
    }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .header-section {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }
    
    .header-actions {
        justify-content: center;
    }
    
    .search-box {
        min-width: 100%;
    }
    
    .page-header h2 {
        font-size: 2rem;
        justify-content: center;
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
    .laboratorios-container {
        padding: 1rem;
    }
    
    .header-section {
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
    
    .lab-card {
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
    
    .lab-info {
        justify-content: center;
        text-align: center;
    }
    
    .lab-name-mobile {
        font-size: 1rem;
        text-align: center;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
}

@media (max-width: 480px) {
    .laboratorios-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .lab-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
    }
    
    .lab-name-mobile {
        font-size: 0.95rem;
    }
    
    .pagination-controls {
        flex-direction: column;
        gap: 1rem;
    }
    
    .page-numbers {
        margin: 0;
        order: 2;
    }
    
    .prev-btn {
        order: 1;
        align-self: stretch;
        justify-content: center;
    }
    
    .next-btn {
        order: 3;
        align-self: stretch;
        justify-content: center;
    }
}

/* Bootstrap Modal Styles */
.modal-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-bottom: none;
    border-radius: 0;
}

.modal-title {
    font-weight: 700;
    font-size: 1.2rem;
}

.modal-body {
    padding: 2rem;
    background: #f8fafc;
}

.form-control {
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.form-control:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
}

.is-invalid {
    border-color: #dc3545 !important;
}

.invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.form-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.25rem;
}

/* Logo Upload Styles for Bootstrap */
.logo-upload-section .upload-area {
    width: 100%;
    height: 120px;
    border: 2px dashed #e2e8f0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    overflow: hidden;
    margin-top: 0.5rem;
}

.logo-upload-section .upload-area:hover {
    border-color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.logo-upload-section .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    text-align: center;
}

.logo-upload-section .upload-placeholder i {
    font-size: 1.5rem;
}

.logo-upload-section .logo-preview {
    position: relative;
    width: 100%;
    height: 100%;
}

.logo-upload-section .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
}

.logo-upload-section .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(102, 126, 234, 0.8);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 6px;
}

.logo-upload-section .logo-preview:hover .overlay {
    opacity: 1;
}

.btn {
    border-radius: 8px;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-1px);
}

.btn-primary {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border: none;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.btn-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border: none;
}

.btn-warning:hover {
    background: linear-gradient(135deg, #e28b00 0%, #c26605 100%);
}

.btn-outline-secondary {
    border: 2px solid #6b7280;
    color: #6b7280;
    background: transparent;
}

.btn-outline-secondary:hover {
    background: #6b7280;
    color: white;
}

.alert-danger {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    border: 1px solid #f87171;
    border-radius: 8px;
    color: #991b1b;
}

.alert-danger ul {
    margin-bottom: 0;
}
</style>
