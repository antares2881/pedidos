<template>
    <v-app>
        <div class="presentaciones-container">
            <!-- Professional Loading State -->
            <div v-if="loader" class="loading-container">
                <div class="loading-content">
                    <div class="professional-loader">
                        <div class="loader-spinner"></div>
                        <div class="loader-pulse"></div>
                    </div>
                    <h3 class="loading-title">Cargando Presentaciones</h3>
                    <p class="loading-subtitle">Obteniendo la información de presentaciones...</p>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>

            <div v-else class="presentaciones-content">
                <!-- Header Section -->
                <div class="header-section">
                    <div class="page-header">
                        <h2><i class="fas fa-boxes mr-3"></i>Presentaciones</h2>
                        <p class="page-description">Gestiona las presentaciones de productos disponibles en el sistema</p>
                    </div>
                    <div class="header-actions">
                        <div class="search-box">
                            <i class="fas fa-search search-icon"></i>
                            <input 
                                v-model="search" 
                                type="text" 
                                placeholder="Buscar presentaciones..." 
                                class="search-input"
                            >
                        </div>
                        <button class="new-presentation-btn" @click="openModal">
                            <i class="fas fa-plus"></i>
                            Nueva Presentación
                        </button>
                    </div>
                </div>

                <!-- Professional Content -->
                <div class="professional-report-container">
                    <!-- Mobile Cards (Hidden on desktop) -->
                    <div class="mobile-cards-container">
                        <div v-for="presentacion in paginatedPresentaciones" :key="presentacion.id" class="presentation-card">
                            <div class="card-header">
                                <div class="presentation-info">
                                    <div class="presentation-icon">
                                        <i class="fas fa-box"></i>
                                    </div>
                                    <div class="presentation-details">
                                        <div class="presentation-name-mobile">{{ presentacion.presentacion }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="actions-section">
                                    <button class="mobile-action-btn edit-btn" @click="editPresentacion(presentacion)">
                                        <i class="fas fa-edit"></i>
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Table (Hidden on mobile) -->
                    <div class="desktop-table">
                        <div class="professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-box"></i>Presentación</th>
                                        <th><i class="fas fa-cogs"></i>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="presentacion in paginatedPresentaciones" :key="presentacion.id">
                                        <td class="presentation-cell">
                                            <div class="presentation-name">
                                                <div class="presentation-icon">
                                                    <i class="fas fa-box"></i>
                                                </div>
                                                <span class="name-text">{{ presentacion.presentacion }}</span>
                                            </div>
                                        </td>
                                        <td class="action-cell">
                                            <div class="action-buttons">
                                                <button class="action-btn btn-edit" @click="editPresentacion(presentacion)" title="Editar">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Professional Pagination -->
                        <div class="pagination-section">
                            <div class="pagination-info">
                                <div class="items-per-page">
                                    <span class="pagination-label">Mostrar:</span>
                                    <select v-model="itemsPerPage" @change="changeItemsPerPage(itemsPerPage)" class="items-select">
                                        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                            {{ option }}
                                        </option>
                                    </select>
                                    <span class="pagination-label">por página</span>
                                </div>
                                <div class="page-info-text">
                                    Mostrando {{ paginationInfo.start }}-{{ paginationInfo.end }} de {{ paginationInfo.total }} presentaciones
                                </div>
                            </div>
                            <div class="pagination-controls">
                                <button class="pagination-btn prev-btn" @click="prevPage" :disabled="currentPage === 1">
                                    <i class="fas fa-chevron-left"></i>
                                    Anterior
                                </button>
                                <div class="page-numbers">
                                    <button 
                                        v-for="page in getVisiblePages()" 
                                        :key="page"
                                        class="page-btn"
                                        :class="{ 
                                            'active': page === currentPage, 
                                            'ellipsis': page === '...' 
                                        }"
                                        @click="page !== '...' ? goToPage(page) : null"
                                        :disabled="page === '...'"
                                    >
                                        {{ page }}
                                    </button>
                                </div>
                                <button class="pagination-btn next-btn" @click="nextPage" :disabled="currentPage === totalPages">
                                    Siguiente
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Professional Bootstrap Modal -->
                <div v-if="dialog" class="modal-backdrop-custom" @click="closeModal">
                    <div class="modal-dialog-custom" @click.stop>
                        <div class="modal-content-custom">
                            <div class="modal-header-custom">
                                <h5 class="modal-title-custom">{{ formTitle }}</h5>
                                <button type="button" class="close-btn-custom" @click="closeModal">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body-custom">
                                <form @submit.prevent="dialog && editedIndex > -1 ? updatePresentacion() : savePresentacion()">
                                    <div class="row">
                                        <div class="col-12">
                                            <label class="field-label">Nombre de la Presentación</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="presentacion.presentacion"
                                                :class="{ 'is-invalid': hasError('presentacion') }"
                                                @input="clearError('presentacion')"
                                                placeholder="Ej: Frasco x 100 ml"
                                            >
                                            <div v-if="hasError('presentacion')" class="invalid-feedback">
                                                {{ firstError('presentacion') }}
                                            </div>
                                            <small class="form-text text-muted">
                                                Ingrese el nombre descriptivo de la presentación del producto
                                            </small>
                                        </div>
                                        
                                        <!-- Error Messages -->
                                        <div class="col-12" v-if="hasError('general')">
                                            <div class="alert alert-danger">
                                                <ul class="mb-0">
                                                    <li v-for="error in validationErrors.general" :key="error">{{ error }}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer-custom">
                                <button type="button" class="btn btn-outline-secondary me-2" @click="closeModal">
                                    <i class="fas fa-times"></i>
                                    Cancelar
                                </button>
                                <button 
                                    type="button" 
                                    class="btn save-btn"
                                    :class="editedIndex > -1 ? 'btn-warning' : 'btn-primary'"
                                    @click="editedIndex > -1 ? updatePresentacion() : savePresentacion()"
                                    :disabled="saving"
                                >
                                    <span v-if="saving">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        {{ editedIndex > -1 ? 'Actualizando...' : 'Guardando...' }}
                                    </span>
                                    <span v-else>
                                        <i :class="editedIndex > -1 ? 'fas fa-edit' : 'fas fa-save'"></i>
                                        {{ editedIndex > -1 ? 'Actualizar' : 'Guardar' }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bootstrap Modal Alternative -->
                <b-modal 
                    id="modal-presentacion" 
                    v-model="dialog" 
                    :title="formTitle"
                    hide-footer 
                    centered
                    no-close-on-backdrop
                    size="md"
                    v-if="false"
                >
                </b-modal>
            </div>
        </div>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            loader: true,
            search: '',
            dialog: false,
            editedIndex: -1,
            saving: false,
            validationErrors: {
                presentacion: []
            },
            // Paginación
            currentPage: 1,
            itemsPerPage: 15,
            itemsPerPageOptions: [10, 15, 25, 50],
            presentacion: {
                id: null,
                presentacion: ''
            },
            defaultPresentacion: {
                id: null,
                presentacion: ''
            },
            presentaciones: []
        }
    },
    
    computed: {
        formTitle() {
            return this.editedIndex >= 0 ? 'Editar Presentación' : 'Nueva Presentación'
        },
        filteredPresentaciones() {
            let filtered = this.presentaciones;
            
            // Aplicar filtro de búsqueda
            if (this.search) {
                filtered = filtered.filter(presentacion => 
                    presentacion.presentacion.toLowerCase().includes(this.search.toLowerCase())
                );
            }
            
            return filtered;
        },
        paginatedPresentaciones() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredPresentaciones.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredPresentaciones.length / this.itemsPerPage);
        },
        paginationInfo() {
            const start = (this.currentPage - 1) * this.itemsPerPage + 1;
            const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredPresentaciones.length);
            return {
                start,
                end,
                total: this.filteredPresentaciones.length
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
        this.getPresentaciones();
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
        
        getPresentaciones() {
            axios.get('/presentaciones')
                .then(res => {
                    this.presentaciones = res.data.map((el) => ({
                        id: el.id,
                        presentacion: el.presentacion
                    }));
                    this.loader = false;
                })
                .catch(err => {
                    console.log(err);
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
            this.presentacion = Object.assign({}, this.defaultPresentacion);
            this.editedIndex = -1;
            this.saving = false;
            this.validationErrors = {
                presentacion: []
            };
        },
        
        editPresentacion(item) {
            this.editedIndex = this.presentaciones.indexOf(item);
            this.presentacion = Object.assign({}, item);
            this.dialog = true;
        },
        
        validateForm() {
            this.validationErrors = {
                presentacion: []
            };
            
            let isValid = true;
            
            // Validar nombre de la presentación
            if (!this.presentacion.presentacion || this.presentacion.presentacion.trim() === '') {
                this.validationErrors.presentacion.push('El nombre de la presentación es requerido');
                isValid = false;
            }
            
            return isValid;
        },
        
        savePresentacion() {
            if (!this.validateForm()) {
                return;
            }
            
            this.saving = true;
            
            axios.post('/presentaciones', this.presentacion)
                .then(res => {
                    this.saving = false;
                    if(res.data === 'ok'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Presentación Creada',
                            text: 'La presentación fue agregada con éxito',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if(result.value){
                                location.reload();
                            }
                        })
                    } else {
                        // Manejar errores del servidor
                        if (Array.isArray(res.data) && res.data.length > 0) {
                            this.$set(this.validationErrors, 'general', res.data);
                        }
                    }
                })
                .catch(error => {
                    this.saving = false;
                    if (error.response && error.response.status === 422) {
                        this.validationErrors = error.response.data.errors;
                    } else {
                        this.$set(this.validationErrors, 'general', ['Error al guardar la presentación. Por favor, inténtelo de nuevo.']);
                    }
                });
        },
        
        updatePresentacion() {
            if (!this.validateForm()) {
                return;
            }
            
            this.saving = true;
            
            axios.put(`/presentaciones/${this.presentacion.id}`, this.presentacion)
                .then(res => {
                    this.saving = false;
                    if(res.data === 'ok'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Presentación Actualizada',
                            text: 'La presentación fue modificada con éxito',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if(result.value){
                                location.reload();
                            }
                        })
                    } else {
                        // Manejar errores del servidor
                        if (Array.isArray(res.data) && res.data.length > 0) {
                            this.$set(this.validationErrors, 'general', res.data);
                        }
                    }
                })
                .catch(error => {
                    this.saving = false;
                    if (error.response && error.response.status === 422) {
                        this.validationErrors = error.response.data.errors;
                    } else {
                        this.$set(this.validationErrors, 'general', ['Error al actualizar la presentación. Por favor, inténtelo de nuevo.']);
                    }
                });
        }
    }
}
</script>

<style scoped>
/* Professional Container */
.presentaciones-container {
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
.presentaciones-content {
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
    position: relative;
    z-index: 5;
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
    position: relative;
    z-index: 10;
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

.new-presentation-btn {
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
    position: relative;
    z-index: 10;
    white-space: nowrap;
}

.new-presentation-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Professional Report Container */
.professional-report-container {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
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
.presentation-cell {
    font-weight: 600;
    color: #1e293b;
}

.presentation-name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.presentation-icon {
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
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
}

.btn-edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}

/* Mobile Cards Styles */
.presentation-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.presentation-card:hover {
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

.presentation-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.presentation-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.presentation-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.presentation-name-mobile {
    font-weight: 700;
    color: #1e293b;
    font-size: 1.1rem;
    line-height: 1.2;
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
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
}

.edit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
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

.field-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
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

.modal-actions {
    padding: 1.5rem 2rem !important;
    background: white;
    border-top: 1px solid #e2e8f0;
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

/* Custom Modal Styles */
.modal-backdrop-custom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    padding: 1rem;
}

.modal-dialog-custom {
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-content-custom {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.modal-header-custom {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title-custom {
    font-weight: 700;
    font-size: 1.3rem;
    margin: 0;
}

.close-btn-custom {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.close-btn-custom:hover {
    background: rgba(255, 255, 255, 0.2);
}

.modal-body-custom {
    padding: 2rem;
    background: #f8fafc;
}

.modal-footer-custom {
    padding: 1.5rem 2rem;
    background: white;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
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
    .presentaciones-container {
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
    
    .presentation-card {
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
    
    .presentation-info {
        justify-content: center;
        text-align: center;
    }
    
    .presentation-name-mobile {
        font-size: 1rem;
        text-align: center;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
    
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

@media (max-width: 480px) {
    .presentaciones-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .presentation-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
    }
    
    .presentation-name-mobile {
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
</style>
